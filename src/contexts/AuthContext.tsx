import React, { createContext, useContext, useState, useEffect } from 'react'

type User = {
  id: number
  login: string
  name: string
  surname: string
  role: 'admin' | 'devops' | 'developer' | 'guest'
}

type AuthContextType = {
  token: string | null
  refreshToken: string | null
  isAuthenticated: boolean
  user: User | null
  login: (login?: string, password?: string) => Promise<void>
  logout: () => void
  loginGoogle: (googleToken: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

const API_URL = 'http://localhost:3000'

export function AuthProvider({ children }: React.PropsWithChildren<object>) {
  const [token, setToken] = useState<string | null>(null)
  const [refreshToken, setRefreshToken] = useState<string | null>(null)
  const [user, setUser] = useState<User | null>(null)

  const isAuthenticated = !!token

  const setAuthState = (newToken: string | null, newRefreshToken: string | null, newUser: User | null) => {
    setToken(newToken)
    setRefreshToken(newRefreshToken)
    setUser(newUser)

    if (newToken) localStorage.setItem('token', newToken)
    else localStorage.removeItem('token')

    if (newRefreshToken) localStorage.setItem('refreshToken', newRefreshToken)
    else localStorage.removeItem('refreshToken')
  }

  const login = async (login?: string, password?: string) => {
    const response = await fetch(`${API_URL}/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ login, password }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Login failed')
    }

    const data = await response.json()
    const userData = await fetchUserData(data.token)

    setAuthState(data.token, data.refreshToken, userData)
  }

  const loginGoogle = async (googleToken: string) => {
    const res = await fetch(`${API_URL}/google-login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: googleToken }),
    })

    if (!res.ok) {
      const errorData = await res.json()
      throw new Error(errorData.message || 'Google login failed')
    }

    const data = await res.json()

    const userData = await fetchUserData(data.token)

    setAuthState(data.token, null, userData)
  }

  const fetchUserData = async (jwtToken: string): Promise<User> => {
    const protectedResponse = await fetch(`${API_URL}/protected`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${jwtToken}` },
    })

    if (!protectedResponse.ok) {
      throw new Error('Failed to fetch user data')
    }

    const json = await protectedResponse.json()
    return json.user
  }

  const logout = () => {
    setAuthState(null, null, null)
  }

  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    const storedRefresh = localStorage.getItem('refreshToken')
    if (storedToken && storedRefresh) {
      setToken(storedToken)
      setRefreshToken(storedRefresh)

      const fetchUserData = async () => {
        const protectedResponse = await fetch(`${API_URL}/protected`, {
          method: 'GET',
          headers: { 'Authorization': `Bearer ${storedToken}` },
        })
        if (protectedResponse.ok) {
          // users token was sucessfull and got data
          const userData = await protectedResponse.json()
          // console.log(userData.user)
          setUser(userData.user)
        } else {
          // user token expired and need to refresh
          console.log("REFRESH TOKEN")

          console.log(`{"refreshToken": "${storedRefresh}"}`)
          const refreshTokenResponse = await fetch(`${API_URL}/refreshToken`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: `{"refreshToken": "${storedRefresh}"}`,
          })

          if (refreshTokenResponse.ok) {
            // correctly refresh token
            console.log("REFRESH TOKEN SUCCESS")
            const refreshTokenData = await refreshTokenResponse.json()
            console.log(refreshTokenData.refreshToken)
            setToken(refreshTokenData.token)
            setRefreshToken(refreshTokenData.refreshToken)
            localStorage.setItem('token', refreshTokenData.token)
            localStorage.setItem('refreshToken', refreshTokenData.refreshToken)


            // console.log(`Bearer ${refreshTokenData.refreshToken}`)

            const protectedResponse = await fetch(`${API_URL}/protected`, {
              method: 'GET',
              headers: { 'Authorization': `Bearer ${refreshTokenData.token}` },
            })
            if (protectedResponse.ok) {
              const userData = await protectedResponse.json()
              console.log("FETCH USER SUCCESS")
              // console.log(userData.user)
              setUser(userData.user)
            } else {
              console.log("Error fetching user data")
            }

          } else {
            // fail to refresh token
            console.log("REFRESH TOKEN FAIL")
          }
        }
      }
      fetchUserData()
    }
  })

  return (
    <AuthContext.Provider value={{ token, refreshToken, isAuthenticated, user, login, logout, loginGoogle }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within an AuthProvider')
  return context
}

export default AuthProvider
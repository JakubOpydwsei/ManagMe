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

  // Helper do ustawiania stanu i localStorage
  const setAuthState = (newToken: string | null, newRefreshToken: string | null, newUser: User | null) => {
    setToken(newToken)
    setRefreshToken(newRefreshToken)
    setUser(newUser)

    if (newToken) localStorage.setItem('token', newToken)
    else localStorage.removeItem('token')

    if (newRefreshToken) localStorage.setItem('refreshToken', newRefreshToken)
    else localStorage.removeItem('refreshToken')
  }

  // Standardowe logowanie (login + password)
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
    // zakładam data: { token, refreshToken }
    const userData = await fetchUserData(data.token)

    setAuthState(data.token, data.refreshToken, userData)
  }

  // Logowanie przez Google - dostajesz token Google, wysyłasz do backendu
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
    // backend zwraca tylko token, refreshToken jest null
    const userData = await fetchUserData(data.token)

    setAuthState(data.token, null, userData)
  }

  // Pobranie danych użytkownika po tokenie JWT
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

  // Wylogowanie
  const logout = () => {
    setAuthState(null, null, null)
  }

  // Przy starcie aplikacji sprawdzamy localStorage i próbujemy wczytać usera (w tym obsługa odświeżania tokena)
  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    const storedRefresh = localStorage.getItem('refreshToken')

    if (storedToken && storedRefresh) {
      // Ustaw tokeny w stanie tymczasowo
      setToken(storedToken)
      setRefreshToken(storedRefresh)

      const fetchUser = async () => {
        // Spróbuj pobrać usera po tokenie
        const res = await fetch(`${API_URL}/protected`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })

        if (res.ok) {
          const data = await res.json()
          setUser(data.user)
        } else {
          // Jeśli token wygasł, spróbuj odświeżyć
          const refreshRes = await fetch(`${API_URL}/refreshToken`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refreshToken: storedRefresh }),
          })

          if (refreshRes.ok) {
            const refreshData = await refreshRes.json()
            setToken(refreshData.token)
            setRefreshToken(refreshData.refreshToken)
            localStorage.setItem('token', refreshData.token)
            localStorage.setItem('refreshToken', refreshData.refreshToken)

            // Pobierz usera na nowo po odświeżonym tokenie
            const protectedRes = await fetch(`${API_URL}/protected`, {
              headers: { Authorization: `Bearer ${refreshData.token}` },
            })

            if (protectedRes.ok) {
              const userData = await protectedRes.json()
              setUser(userData.user)
            } else {
              logout()
            }
          } else {
            logout()
          }
        }
      }

      fetchUser()
    }
  }, [])

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
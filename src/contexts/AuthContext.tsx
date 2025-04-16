import React, { createContext, useContext, useState, useEffect } from 'react'

type AuthContextType = {
    token: string | null
    refreshToken: string | null
    isAuthenticated: boolean
    user: User | null
    login: (login?: string, password?: string) => Promise<void>
    logout: () => void
}

type User ={
    login: string
    name: string
    surname: string
    role: 'admin' | 'devops' | 'developer'
}

const AuthContext = createContext<AuthContextType | null>(null)

const API_URL = 'http://localhost:3000'

function AuthProvider({ children }: React.PropsWithChildren<object>) {

    const [token, setToken] = useState<string | null>(null)
    const [refreshToken, setRefreshToken] = useState<string | null>(null)
    const [user, setUser] = useState<User | null>(null)

    const isAuthenticated = !!token

    const login = async (login?: string, password?: string) => {
        console.log("login start")
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
        setToken(data.token)
        setRefreshToken(data.refreshToken)

        localStorage.setItem('token', data.token)
        localStorage.setItem('refreshToken', data.refreshToken)

        const protectedResponse = await fetch(`${API_URL}/protected`,{
            method: 'GET',
            headers: { 'Authorization': `Bearer ${data.token}` },
        })
        if (protectedResponse.ok) {
            // console.log("response" + protectedResponse)
            const userData = await protectedResponse.json()
            setUser(userData)
        }

    }

    const logout = () => {
        setToken(null)
        setRefreshToken(null)
        localStorage.removeItem('token')
        localStorage.removeItem('refreshToken')
    }

    useEffect(() => {
        const storedToken = localStorage.getItem('token')
        const storedRefresh = localStorage.getItem('refreshToken')
        if (storedToken && storedRefresh) {
            setToken(storedToken)
            setRefreshToken(storedRefresh)
        }

        const fetchUserData = async () => {
            const protectedResponse= await fetch(`${API_URL}/protected`,{
                method: 'GET',
                headers: { 'Authorization': `Bearer ${storedToken}` },
            })
            if (protectedResponse.ok) {
                const userData = await protectedResponse.json()
                // console.log(userData.user)
                setUser(userData.user)
            }
        }
        fetchUserData()
    }, [])

    return (<>
        <AuthContext.Provider value={{ token, refreshToken, isAuthenticated,user, login, logout }}>
            {children}
        </AuthContext.Provider>
    </>);
}

export default AuthProvider;

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}
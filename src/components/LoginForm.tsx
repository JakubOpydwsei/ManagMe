import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
// import { useNavigate } from 'react-router-dom'

function LoginForm() {
    const { login, isAuthenticated } = useAuth()

    const [loginValue, setLoginValue] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState<string | null>(null)
    
    // const navigate = useNavigate()

    const loginUser = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)
        try {
            await login(loginValue, password)
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message)
            } else {
                setError('Błąd logowania')
            }
        }
    }
    
    if (isAuthenticated) {
        return <p>Your logined succesfully</p>
        // navigate('/profile')
    }

    return (
        <>
            <label>Login:</label>
            <input
                type="text"
                defaultValue={loginValue}
                onChange={(e) => setLoginValue(e.target.value)}
                className='block'
                required
            />
            <label>Hasło:</label>
            <input
                type="password"
                defaultValue={password}
                onChange={(e) => setPassword(e.target.value)}
                className='block'
                required
            />
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button type="button" onClick={loginUser}>Zaloguj się</button>
        </>
    )
}

export default LoginForm
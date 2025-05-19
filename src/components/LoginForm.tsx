import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import MyInput from './MyInput'
import MyButton from './MyButton'
import { useNavigate } from 'react-router-dom'
import GoogleLogin from './GoogleLonig'

function LoginForm() {
    const { login, isAuthenticated } = useAuth()

    const [loginValue, setLoginValue] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState<string | null>(null)
    
    const navigate = useNavigate()

    async function loginUser() {
        setError(null)
        try {
            await login(loginValue, password)
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message)
            } else {
                setError('Login error')
            }
        }
    }
    
    if (isAuthenticated) {
        navigate('/profile')
    }

    return (
        <>

            <MyInput label={'Login:'} value={loginValue} onChange={setLoginValue}/>

            <MyInput label={'Password:'} type='password' value={password} onChange={setPassword}/>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <MyButton text={'Login'} onClick={loginUser}/>

            <GoogleLogin />
        </>
    )
}

export default LoginForm
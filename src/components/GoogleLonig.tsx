import { useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    google: any
  }
}

const CLIENT_ID = import.meta.env.VITE_REACT_APP_GOOGLE_CLIENT_ID

const GoogleLogin = () => {
  const { loginGoogle } = useAuth()

  useEffect(() => {
    if (!CLIENT_ID) {
      console.error('Google Client ID is not set')
      return
    }

    window.google?.accounts.id.initialize({
      client_id: CLIENT_ID,
      callback: handleCredentialResponse,
    })

    window.google?.accounts.id.renderButton(
      document.getElementById('googleSignInButton'),
      { theme: 'outline', size: 'large' }
    )
  }, [])

  const handleCredentialResponse = (response: google.accounts.id.CredentialResponse) => {
    // console.log("JWT-google:", response.credential)
  
    loginGoogle(response.credential).catch((error) => {
      console.error("Google login error:", error.message)
    })
  }

  
  return <div className='w-fit m-auto pt-2' id="googleSignInButton"></div>
}

export default GoogleLogin;
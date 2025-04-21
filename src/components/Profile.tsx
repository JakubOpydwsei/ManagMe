import { useAuth } from '../contexts/AuthContext'
import MyButton from './MyButton';

function Profile() {

    const { token, refreshToken, isAuthenticated,user, logout } = useAuth()

    if (!isAuthenticated) {
        return <p>You need to be loggined in to see your profile.</p>
    }
    // console.log(user)

    return (
        <div>
            <h2>Twój profil</h2>
            <p><strong>Login:</strong> {user?.login}</p>
            <p><strong>Name:</strong> {user?.name}</p>
            <p><strong>Surname:</strong> {user?.surname}</p>
            <p><strong>Role:</strong> {user?.role}</p>
            <p><strong>Token:</strong> {token}</p>
            <p><strong>Refresh token:</strong> {refreshToken}</p>
            <MyButton text={'Log out'} onClick={logout}/>
        </div>
    )
}

export default Profile;
import { useAuth } from '../contexts/AuthContext'

function Profile() {

    const { token, refreshToken, isAuthenticated,user, logout } = useAuth()

    if (!isAuthenticated) {
        return <p>Musisz być zalogowany, aby zobaczyć profil.</p>
    }
    console.log(user)

    return (
        <div>
            <h2>Twój profil</h2>
            <p><strong>Login:</strong> {user?.login}</p>
            <p><strong>Name:</strong> {user?.name}</p>
            <p><strong>Surname:</strong> {user?.surname}</p>
            <p><strong>Role:</strong> {user?.role}</p>
            <p><strong>Token:</strong> {token}</p>
            <p><strong>Refresh token:</strong> {refreshToken}</p>
            <button onClick={logout}>Wyloguj się</button>
        </div>
    )
}

export default Profile;
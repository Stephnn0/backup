import { useSelector } from "react-redux"
import { selectCurrentUser, selectCurrentToken } from "./authSlice"
import { Link, useNavigate } from "react-router-dom"

import { useSendLogoutMutation } from '../auth/authApiSlice'


const Welcome = () => {
    const user = useSelector(selectCurrentUser)
    const token = useSelector(selectCurrentToken)

    const welcome = user ? `Welcome ${user}!` : 'Welcome!'
    const tokenAbbr = `${token.slice(0, 9)}...`

    const navigate = useNavigate();



    const [sendLogout, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useSendLogoutMutation()

    const signOut = async () => {
        await sendLogout()
        navigate('/login');
    }

    const content = (
        <section className="welcome">
            <h1>{welcome}</h1>
            <p>Token: {tokenAbbr}</p>
            <p><Link to="/userslist">Go to the Users List</Link></p>
            <button
            className="icon-button"
            title="Logout"
            onClick={signOut}
        >
             LOGOUT
        </button>
        </section>
    )

    return content
}
export default Welcome
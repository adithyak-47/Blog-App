import {useContext, useState} from 'react';
import {Navigate} from 'react-router-dom';
import { userContext } from '../userContext';


export default function Login()
{
    const [username, setUser] = useState('');
    const [password, setPass] = useState('');
    const [redirect, setRedirect] = useState(false);
    const {setUserInfo} = useContext(userContext);

    async function loginUser(event)
    {
        event.preventDefault();
        const response = await fetch('http://localhost:4000/api/login', {
            method: 'POST',
            body: JSON.stringify({username, password}),
            headers: {'Content-type': 'application/json'},
            credentials:'include'
        });
        if(response.status === 200)
        {
            response.json().then(userInfo => {
                setUserInfo(userInfo);
                setRedirect(true);
            });
        }
        else
        {
            alert('Invalid credentials!');
        }
    }

    if(redirect)
    {
        return <Navigate to={'/'} />
    }
    return(
        <form className="loginForm" onSubmit={loginUser}>
            <h1>Login</h1>
            <input type="text" placeholder="Enter username"
             value={username} 
             onChange={(event) => setUser(event.target.value)} />
            <input type="password" placeholder="Enter password"
             value={password}
             onChange={(event) => setPass(event.target.value)} />
            <button type="submit">Login</button>
        </form>
    )
}
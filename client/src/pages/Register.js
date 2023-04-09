import {useState} from 'react';
export default function Register()
{

    const [username, setUser] = useState('');
    const[password, setPass] = useState('');
    async function registerUser(event)
    {
        event.preventDefault();
        const response = await fetch('http://localhost:4000/api/register',{
            method:'POST',
            body: JSON.stringify({username, password}),
            headers: {'Content-type': 'application/json'}
        });

        if(response.status === 200) alert('Registration successful!');
        else alert('Registration failed!');
    }

    return(
        <form className="registerForm" onSubmit={registerUser}>
            <h1>Register</h1>
            <input type="text" placeholder="Enter username" 
            value={username} 
            onChange={(event) => setUser(event.target.value)} />
            <input type="password" placeholder="Enter password" 
            value={password} 
            onChange={(event) => setPass(event.target.value)} />
            <button type='submit'>Register</button>
        </form>
    )
}
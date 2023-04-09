import { Link, Navigate, useNavigate } from "react-router-dom";
import {useContext, useEffect, useState} from 'react';
import { userContext } from "./userContext";

export default function Header(){

  const {userInfo, setUserInfo} = useContext(userContext);
  const navigate = useNavigate();

    useEffect(() => {
      fetch('http://localhost:4000/api/profile', {
        credentials: 'include',
      })
      .then(response => {
        response.json()
        .then(userInfo => {
          setUserInfo(userInfo)
      });
      });
    }, [])
    
    function logout()
    {
      fetch('http://localhost:4000/api/logout', {
        method:'POST',
        credentials:'include',
      });
      setUserInfo(null);
      navigate('/');
    }

    const username = userInfo?.username;


    return(
        <header>
        <Link to="/" className="logo">Blog App</Link>
        <nav>
          {username && (
            <>
              <Link to='/create'>Create new post</Link>
              <a onClick={logout}>Logout</a>
            </>
          )}

          {!username && (
            <>
              <Link to="/login" className="login">Login</Link>
              <Link to="/register" className="register">Register</Link>
            </>
          )}
          
        </nav>
      </header>
    );
}
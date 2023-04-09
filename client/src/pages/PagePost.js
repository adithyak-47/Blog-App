import {useContext, useEffect, useState} from 'react';
import { Link, useParams } from 'react-router-dom';
import {formatISO9075} from 'date-fns';
import {userContext} from '../userContext';

export default function PagePost()
{
    const [postInfo, setPostInfo] = useState(null);
    const {userInfo} = useContext(userContext)
    const {id} = useParams();

    useEffect(() => {
        fetch(`http://localhost:4000/api/posts/${id}`)
        .then(response => {
            response.json()
            .then(postInfo => {
                setPostInfo(postInfo);
            });
        });
    }, [])

    if(!postInfo) return '';

    return(
        <div className='post-page'>
            <div className='image'>
                <img src={`http://localhost:4000/${postInfo.cover}`} alt='Post' />
            </div>
            <time>{formatISO9075(new Date(postInfo.createdAt))}</time>
            <div className='author'>by {postInfo.author.username}</div>
            {userInfo?.id === postInfo.author._id && (
                <div className='edit-row'>
                    <Link to={`/edit/${postInfo._id}`} className='edit-btn' >

                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                    <path d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z" />
                    <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z" />
                    </svg>

                        Edit this post
                    </Link>
                </div>
            )}
            <h1>{postInfo.title}</h1>
            <div dangerouslySetInnerHTML={{__html: postInfo.content}}></div>
           
        </div>
    )
}
import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import Editor from "../Editor";

export default function EditPost()
{

    const {id} = useParams();
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState('');
    const [redirect, setRedirect] = useState(false);

    useEffect(() =>{

        fetch("http://localhost:4000/api/posts/" + id)
        .then(response => {
            response.json()
            .then(postInfo => {
                setTitle(postInfo.title);
                setSummary(postInfo.summary);
                setContent(postInfo.content);
            });
        });

    }, []);

    async function updatePost(event)
    {
        event.preventDefault();
        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        data.set('id', id);
        if(files?.[0])
        {
            data.set('file', files?.[0])
        }

        const response = await fetch('http://localhost:4000/api/edit',{
            method:'PUT',
            body: data,
            credentials:'include'
        });

        if(response.status === 200)
        {
            setRedirect(true);
        }

    }

    if(redirect)
    {
        return <Navigate to={`/posts/${id}`} />
    }

    return(
        <form onSubmit={updatePost}>
            <input type="title" placeholder="Title"
             value={title} 
             onChange={event => setTitle(event.target.value)} />
            <input type="summary" placeholder="Summary" 
             value={summary}
             onChange={event => setSummary(event.target.value)} />
            <input type="file"  onChange={event => setFiles(event.target.files)} />
            <Editor value={content} onChange={setContent} />
            <button type='submit'>Update post</button>
        </form>
    )
}
import {formatISO9075} from 'date-fns';
import {Link} from 'react-router-dom';

export default function Post({_id,title, summary, cover, createdAt, author})
{
    return(
        <div className="post">
        <div className="image">
          <Link to={`/posts/${_id}`} >
            <img src={"http://localhost:4000/"+cover} alt="Sonos Era" />
          </Link>
        </div>
        <div className="content">
          <Link to={`/posts/${_id}`}>
            <h2>{title}</h2>
          </Link>
          <p className="info">
            <span className="author">{author.username}</span>
            <time>{formatISO9075(new Date(createdAt))}</time>
          </p>
          <p>
            {summary}
          </p>
        </div>
      </div>
    );
}
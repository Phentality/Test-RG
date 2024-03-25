import React from 'react';
import { Link } from 'react-router-dom';

function PostList(props) {

  // Секция с постами
  return (
    <section className='postlist'>
      {props.posts.map((post) => <Link style={{ textDecoration: 'none' }} key={post.id} to={`/posts/${post.id}`}>
        <div className='post'>
          <h2 className='post__id'>{post.id}</h2>
          <p className='post__title'>{post.title}</p>
          <p className='post__text'>{post.body}</p>
        </div>
      </Link>)}
    </section>
  )
}


export default PostList;
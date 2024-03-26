import React from 'react';
import { useParams } from 'react-router-dom';

// Страница для отображения информации о карточке
function PostPage() {
  const { id } = useParams();
  const [post, setPost] = React.useState(null);

  React.useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then(res => res.json())
      .then(data => setPost(data))
      .catch(err => console.log(err))
  }, [id])

  return (
    <main className='postpage'>
      {post && (<>
        <h1 className='postpage__id'>{id}</h1>
        <h2 className='postpage__title'>{post.title}</h2>
        <p className='postpage__text'>{post.body}</p>
      </>)}
    </main>
  )
}


export default PostPage;
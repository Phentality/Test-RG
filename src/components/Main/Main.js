import Header from '../Header/Header';
import PostsList from '../PostsList/PostsList'

// Основная часть SPA, сюда передаётся стейт для отображения кнопки ЕЩЁ
function Main(props) {
  return (
    <main>   
      <Header />
      <PostsList posts={props.posts} />
      {props.moreStatus && <button className='main__more-button'
                type="click"
                aria-label="Ещё"
                name="more"
                onClick={props.handleMore}>Ещё</button>}
    </main>

  )
}

export default Main;
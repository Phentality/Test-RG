import React from 'react';
// Роуты для создания роутинга
import { Route, Routes } from 'react-router-dom';
// Аксиос для работы с fetch запросами
import axios from 'axios';
// Основная часть SPA
import Main from '../Main/Main';
// Элемент для открытия страницы
import PostPage from '../PostPage/PostPage';
// Элемент на который перебрасывает при неправильных роутах
import NotFound from '../NotFound/NotFound';

function App() {
  // Стейт который хранит в себе все посты
  const [posts, setPosts] = React.useState([]);
  // Стейт пагинации, он сразу имеет значение 2, так как подгрузка первой страницы происходит при монтировании
  const [currentPage, setCurrentPage] = React.useState(2);
  // Стейт отвечает за активацию прогрузки постов
  const [fetching, setFecthing] = React.useState(false);
  // Стейт для определения ВСЕГО количество постов
  const [totalCount, setTotalCount] = React.useState(0);
  // Стейт для показания кнопки ЕЩЁ
  const [moreStatus, setMoreStatus] = React.useState(false);

  // Подгрузка и отрисовка первых 10 постов
  React.useEffect(() => {
    if (sessionStorage.getItem('load') <= 0) {
      axios.get(`https://jsonplaceholder.typicode.com/posts?_limit=10&_page=1`)
        .then((response) => {
          setPosts(response.data);
          setTotalCount(response.headers['x-total-count']);
        })
    }
    else {
      axios.get(`https://jsonplaceholder.typicode.com/posts?_limit=${sessionStorage.getItem('load') * 10}`)
        .then((response) => {
          setPosts(response.data);
          setTotalCount(response.headers['x-total-count']);
          setCurrentPage(Number(sessionStorage.getItem('load')) + 1);
        })
    }
  }, [])

  // Эффект который отправляет запрос на сервер для подгрузки 10ти постов
  React.useEffect(() => {
    if (fetching) {
      axios.get(`https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${currentPage}`)
        .then((response) => {
          setPosts([...posts, ...response.data]);
          setCurrentPage(prev => prev + 1);
          sessionStorage.setItem('load', currentPage);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => setFecthing(false));
    }
  }, [fetching])

  //Обработчик скролла
  const scrollHandler = React.useCallback((e) => {
    // Условие для определения нижнего края страницы
    // Из общей высоты страницы отнимаем сумму видимой области и текущее расстояние от верхнего края страницы
    // Цифра должна быть меньше 100, так как один скролл = 100
    // Выставляет условие, posts.length < 50, чтоб доскролл работал только на первые 5 добавлений
    if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100 && posts.length <= 50) {
      setFecthing(true);
    }
  }, [posts.length]);

  // Накидываем обработчик на скролл 
  React.useEffect(() => {
    document.addEventListener('scroll', scrollHandler)
    return function () {
      document.removeEventListener('scroll', scrollHandler);
    };
  }, [scrollHandler])

  // Эффект который переключает видимость кнопки ЕЩЁ
  React.useEffect(() => {
    if (Number(posts.length) === Number(totalCount) || Number(posts.length) <= 50) {
      setMoreStatus(false);
    }
    else {
      setMoreStatus(true);
    }
  }, [posts.length, totalCount])

  //Функция для кнопки ЕЩЁ, для добавления дополнительных постов после 5 добавлений от скролла
  const handleMore = () => {
    axios.get(`https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${currentPage}`)
      .then((response) => {
        setPosts([...posts, ...response.data]);
        setCurrentPage(prev => prev + 1);
        sessionStorage.setItem('load', currentPage);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  return (
    <div>
      <Routes>
        <Route path="/" element={<Main posts={posts} moreStatus={moreStatus} handleMore={handleMore} />} />
        <Route path="/posts/:id" element={<PostPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div >
  );
}

export default App;

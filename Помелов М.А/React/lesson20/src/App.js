import { BrowserRouter, Link, Navigate, Route, Routes, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './App.css';


function useTimer(interval) {
  const [active, setActive] = useState(true);
  const [second, setSecond] = useState(0);

  function handleActivity(event) {
    setSecond(0);
    setActive(true);

    // return <p>User is Active</p>;
  }

  window.addEventListener('click', handleActivity);
  window.addEventListener('mousemove', handleActivity);


  useEffect(() => {
    const timer = setInterval(
      () => setSecond((prevValue) => prevValue + 1), interval
    )
    return () => clearInterval(timer);
  }, [interval])


  if (second === 5) {
    setSecond(0);
    setActive(false);
    console.log('asdsadasd');
  }

  return second;
}


function Head() {
  return (
    <div>
      <main>
        <section class="hero">
          <div class="container">
            <h2>Откройте для себя что-то новое</h2>
            <p>Наш сайт предлагает лучшие решения для вашего бизнеса</p>
            <a href="#" class="btn">Узнать больше</a>
          </div>
        </section>

        <section class="features">
          <div class="container">
            <div class="feature">
              <h3>Легкость в использовании</h3>
              <p>Наши решения просты и удобны для каждого.</p>
            </div>
            <div class="feature">
              <h3>Безопасность данных</h3>
              <p>Мы обеспечиваем высокий уровень защиты ваших данных.</p>
            </div>
            <div class="feature">
              <h3>Поддержка 24/7</h3>
              <p>Наша команда всегда готова помочь вам в любое время суток.</p>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div class="container">
          <p>&copy; 2024 Наш сайт. Все права защищены.</p>
        </div>
      </footer>
    </div>


  );
}


function About() {
  const time = useTimer(1000);
  let navigate = useNavigate();


  if (time === 5) {
    navigate('/');
  }

  return (
    <main>
      <section class="about-us">
        <div class="container">
          <h2>Кто мы?</h2>
          <p>Наша компания предоставляет высококачественные решения для малого и среднего бизнеса. Мы
            сосредоточены на том, чтобы помочь нашим клиентам достичь успеха, предлагая инновационные решения и
            безупречное обслуживание.</p>

          <h2>Наша миссия</h2>
          <p>Мы стремимся стать вашим надежным партнёром в развитии бизнеса, предоставляя услуги, которые помогают
            эффективно решать задачи в любой отрасли.</p>

          <h2>Наши ценности</h2>
          <ul>
            <li>Честность и прозрачность</li>
            <li>Инновации и креативность</li>
            <li>Клиентоориентированность</li>
            <li>Профессионализм и качество</li>
          </ul>
          <br />
          <a href="#" class="btn">Связаться с нами</a>
        </div>
      </section>

      <section class="team">
        <div class="container">
          <h2>Наша команда</h2>
          <div class="team-members">
            <div class="member">
              <img src="Images/user1.png" alt="Член команды 1" />
              <h3>Иван Иванов</h3>
              <p>Генеральный директор</p>
            </div>
            <div class="member">
              <img src="Images/user3.png" alt="Член команды 2" />
              <h3>Анна Смирнова</h3>
              <p>Руководитель проектов</p>
            </div>
            <div class="member">
              <img src="Images/user2.png" alt="Член команды 3" />
              <h3>Максим Кузнецов</h3>
              <p>Ведущий разработчик</p>
            </div>
          </div>
        </div>
      </section>

      <div class="container">
        <p>&copy; 2024 Наша компания. Все права защищены.</p>
      </div>
    </main>
  );
}









function NotFound() {
  return (
    <h2>Page not found</h2>
  )
}


const isAutenticated = false;

function ProtectedRoute({ children }) {
  return isAutenticated ? children : <Navigate to={'/'} />
}

function App() {

  return (
    <BrowserRouter>
      <nav>
        <header>
          <div class="container">
            <h1>О нашей компании</h1>
            <nav>
              <ul class="nav-links">
                <li><Link to='/'>Head page</Link></li>
                <li> <Link to='/about'>About Us</Link></li>
                <li><Link to='/services'>Services</Link></li>
                <li><Link to='/contacts'>Contacts</Link></li>
              </ul>
            </nav>
          </div>
        </header>



        {/* <Link to={'/'} >Head</Link>
          <Link to={'/about'} >About us</Link> */}

        {/* <Link to={'/user/1'}>User 1</Link>
          <Link to={'/user/2'}>User 2</Link> */}

        {/* <Link to={'/'}>Head</Link>
          <Link to={'/about'}>About us</Link>
          <Link to={'/contacts'}>Contacts</Link> */}
      </nav>

      <Routes>
        <Route path='/' element={<Head />} />
        <Route path='/about' element={<About />} />
        <Route path='/services' element={<NotFound />} />
        <Route path='/contacts' element={<NotFound />} />



        {/* <Route path='/' element={<NewHome />} />
          <Route
            path='/about'
            element={
              <ProtectedRoute>
                <About />
              </ProtectedRoute>
            } /> */}


        {/* <Route path='*' element={<NotFound />} /> */}



        {/* <Route path='/user/:id' element={<User />} /> */}

        {/* <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/contacts' element={<Contacts />} /> */}
      </Routes>
    </BrowserRouter>

  );
}

export default App;

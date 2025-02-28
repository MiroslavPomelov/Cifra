import { BrowserRouter, Link, Navigate, Route, Routes, useNavigate, useParams } from 'react-router-dom';
import './App.css';

function Header() {


  return (
    <div class="container">
      <h1>О нашей компании</h1>
      <nav>
        <ul class="nav-links">
          <li><a href="./index.html">Главная</a></li>
          <li><a href="./aboutUs.html">О нас</a></li>
          <li><a href="#">Услуги</a></li>
          <li><a href="#">Контакты</a></li>
        </ul>
      </nav>
    </div>
  );
}

function Main() {
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
              <img src="./Images/user1.png" alt="Член команды 1" />
              <h3>Иван Иванов</h3>
              <p>Генеральный директор</p>
            </div>
            <div class="member">
              <img src="./Images/user3.png" alt="Член команды 2" />
              <h3>Анна Смирнова</h3>
              <p>Руководитель проектов</p>
            </div>
            <div class="member">
              <img src="./Images/user2.png" alt="Член команды 3" />
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





function User() {
  let { id } = useParams();

  return (
    <h2>User id: {id}</h2>
  )
}



function NewHome() {
  const navigate = useNavigate();

  const goToAbout = () => {
    navigate("/about");
  }



  return (
    <>
      <h2>Head page</h2>
      <button onClick={goToAbout}>Go to About page</button>
    </>
  )
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
    <div>
      <BrowserRouter>
        <nav>
          <Link to='/'>Head page</Link>
          <Link to='/about'>About Us</Link>

          {/* <Link to={'/'} >Head</Link>
          <Link to={'/about'} >About us</Link> */}

          {/* <Link to={'/user/1'}>User 1</Link>
          <Link to={'/user/2'}>User 2</Link> */}

          {/* <Link to={'/'}>Head</Link>
          <Link to={'/about'}>About us</Link>
          <Link to={'/contacts'}>Contacts</Link> */}
        </nav>

        <Routes>
          <Route path='/' element={<Header />} />
          <Route path='/about' element={<Main />} />



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
    </div>
  );
}

export default App;

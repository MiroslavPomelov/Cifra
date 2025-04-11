import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './components/home/home.component'
import About from './components/about/about.component'
import Navigation from './components/navigation/navigation.component'
import User from './components/user/user.component'
import "@radix-ui/themes/styles.css";
import { TabNav } from '@radix-ui/themes'

function NotFound() {
  return <Navigate to={'/'} />
}


function App() {

  return (
    <>
      <TabNav.Root>
        <TabNav.Link href='/' active>
          Head
        </TabNav.Link>
        <TabNav.Link href="/about">About</TabNav.Link>
        <TabNav.Link href="/user/:id">UserId</TabNav.Link>
      </TabNav.Root>


      <BrowserRouter>
        {/* <Navigation /> */}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/user/:id' element={<User />} />
          <Route path='/redirect' element={<NotFound />} />
        </Routes>
      </BrowserRouter>


    </>
  )
}

export default App

import './App.css'
import Card from './components/Card.tsx'
import ProfilePage from './components/ProfilePage.tsx'
import { Avatar, AvatarImage } from './components/ui/avatar.tsx'
import { Button } from './components/ui/button'

function App() {

  return (
    <>
      <ProfilePage>
        <Card>
          <AvatarImage />
        </Card>
      </ProfilePage>
    </>
  )
}

export default App

import { AvatarImage } from '@radix-ui/react-avatar'
import './App.css'
import Card from './components/Card.tsx'
import ProfilePage from './components/ProfilePage.tsx'
import { Avatar } from './components/ui/avatar.tsx'
import { Button } from './components/ui/button'

function App() {

  return (
    <>
      <ProfilePage>
        <Card>
          <Avatar>
            <AvatarImage  src="https://github.com/shadcn.png"/>
          </Avatar>
        </Card>
      </ProfilePage>
    </>
  )
}

export default App

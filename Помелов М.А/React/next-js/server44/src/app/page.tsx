import React from 'react'
import PostsPage from './posts/page'
import Posts from './components/swrPosts/posts'


const Home: React.FC = () => {
  return (
    <div>
      {/* <PostsPage>

      </PostsPage> */}

      <Posts></Posts>
    </div>
  )
}

export default Home
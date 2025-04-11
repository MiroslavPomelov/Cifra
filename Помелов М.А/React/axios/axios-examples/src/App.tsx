import { FormEvent, useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';


axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com/';
axios.defaults.headers.common['Authorization'] = 'Bearer token';

axios.get('posts', {
  params: {
    id: 1,
    postId: 12
  },
  headers: {
    'Authorization': 'Bearer token'
  }
})


//Перехватчик
axios.interceptors.request.use(config => {
  console.log(config);
  return config;
},
  error => {
    return Promise.reject(error);
  }
);




type PostType = {
  id: string,
  title: string
}

function App() {




  //POST
  // const [title, setTitle] = useState('');
  // const [response, setResponse] = useState(null);

  // const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   const newPostData = {
  //     title: title,
  //     body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus, ea laborum minus provident deserunt odio!",
  //     userId: 1
  //   }

  //   try {
  //     const res = await axios.post('https://jsonplaceholder.typicode.com/posts', newPostData);
  //     setResponse(res.data);
  //   } catch (error) {
  //     console.log(error);
  //   }


  // }

  // return (
  //   <div>
  //     <h1>Send data</h1>
  //     <form onSubmit={handleSubmit}>
  //       <input
  //         type="text"
  //         value={title}
  //         onChange={(e) => setTitle(e.target.value)}
  //         placeholder='Enter title' />
  //       <button type='submit'>Send</button>
  //     </form>

  //     {response && (
  //       <div>
  //         <h2>Response from Server</h2>
  //         <p>{JSON.stringify(response, null, 2)}</p>
  //       </div>
  //     )}
  //   </div>
  // )




  //GET
  // const [data, setData] = useState<PostType[]>([]);
  // const [loading, setLoading] = useState<boolean>(true);
  // const [error, setError] = useState<{ message: string } | null>(null);

  // useEffect(() => {
  //   axios.get('https://jsonplaceholder.typicode.com/posts')
  //     .then(response => {
  //       setData(response.data);
  //       setLoading(false);
  //     })
  //     .catch(error => {
  //       setError(error);
  //       setLoading(false);
  //     })
  // }, []);

  // if (loading) {
  //   return <p>Loading...</p>
  // }

  // if (error) {
  //   return <p>Error: {error.message}</p>
  // }

  // return (
  //   <div>
  //     <h1>Posts</h1>
  //     <ul>
  //       {data.map(post => (<li key={post.id}>{post.title}</li>))}
  //     </ul>
  //   </div>
  // )
}

export default App

// import './App.css';

// // function Welcome(props) {
// //   return <h1>Hello, {props.name}</h1>
// // }



// function ProductImage(props) {
//   return <img src={props.src} alt={props.alt} />
// }

// function ProductTitle(props) {
//   return <h2>{props.title}</h2>
// }

// function AddToCartButton() {
//   return <button>Add to Cart</button>
// }

// // function Wrapper(props) {


// //   return <div className='wrapper'>{props.children}</div>
// // }





// // function Container({children}) {
// //   return <div style={{
// //     border: '1px solid black',
// //     padding: '10px'
// //   }}>{children}</div>
// // }





// function UserGreeting() {
//   return <h1>Welcome!</h1>
// }

// function GuestGreeting() {
//   return <h1>Please, Log In!</h1>
// }

// function Greeting({ isLoggedIn }) {
//   return isLoggedIn ? <UserGreeting/> : <GuestGreeting/>
// }

// function App() {
//   return (
//     // <div>
//     //   <Welcome name = 'Alice'/>
//     //   <Welcome name = 'Bob'/>
//     //   <Welcome name = 'Denis'/>
//     // </div>



//     // <Container>
//     //   <div>
//     //     <ProductImage src='image.jpg' alt='Product' />
//     //     <ProductTitle title='product name' />
//     //     <AddToCartButton />
//     //   </div>
//     // </Container>


//     <div>
//       <Greeting isLoggedIn={false}/>
//     </div>

//   );
// }

// export default App;





























// import React, { useState } from 'react';


// // Исходный компонент
// function SomeComponent() {
//   return <div>Это какой-то компонент!</div>;
// }

// // Функция высшего порядка
// function withLogging(WrappedComponent) {
//   return function EnhancedComponent(props) {
//     console.log('Компонент был отрендерен');
//     return <WrappedComponent {...props} />;
//   };
// }


// // Обернуть компонент в HOC
// const EnhancedComponent = withLogging(SomeComponent);


// // Основной компонент приложения
// function App() {
//   return (
//     <div>
//       <h1>Пример использования HOC</h1>
//       <EnhancedComponent />
//     </div>
//   );
// }
// export default App;



















import './App.css';

// function Welcome(props) {
//   return <h1>Hello, {props.name}</h1>
// }

function MovieCard(props) {
  return (
    <div>
      <MovieTitle title={props.title}/>
      <MovieDescription description={props.description}/>
      <MovieImage src={props.src} alt={props.alt}/>
    </div>
  )
}

function MovieTitle(props) {
  return <h2>{props.title}</h2>
}

function MovieDescription(props) {
  return <p>{props.description}</p>
}

function MovieImage(props) {
  return <img src={props.src} alt={props.alt} />
}



function Wrapper(props) {
  return <div className='wrapper'>{props.children}</div>
}





function App() {
  const movies = [{
    title: 'Adasdasd',
    description: 'adadadadadadsadasdasdasdasdasdasdasd',
    releaseDate: '12/02/2025',
    image: 'sasad/asdasdas/sdasdasdasd'
  },
  {
    title: 'Adasdasd',
    description: 'adadadadadadsadasdasdasdasdasdasdasd',
    releaseDate: '12/02/2025',
    image: 'sasad/asdasdas/sdasdasdasd'
  },
  {
    title: 'Adasdasd',
    description: 'adadadadadadsadasdasdasdasdasdasdasd',
    releaseDate: '12/02/2025',
    image: 'sasad/asdasdas/sdasdasdasd'
  },
];

// movies.map(() => );


  return (
    <div>
      <MovieCard/>
    </div>

  );
}

export default App;









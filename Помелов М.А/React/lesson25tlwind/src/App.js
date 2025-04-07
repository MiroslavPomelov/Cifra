
import { type } from '@testing-library/user-event/dist/type';
import './App.css';
import Alert from './components/Alerts/Alert';
import Button from './components/button/Button';
import ProductList from './components/ProductList/ProductList';




function App() {
  const productsDataList = [
    {
      src: 'images/camera.png',
      description: 'Camera',
      price: 20000
    },
    {
      src: 'images/flashCard.png',
      description: 'FlashCard',
      price: 15000
    }
  ];

  return (
    <div>
      {/* <Button />
      <Alert type={'success'} message={'Operation has been successfull!'}/>
      <Alert type={'error'} message={'Bad asdsad!'}/> */}

      <ProductList productsDataList={productsDataList} />
    </div>
  );
}

export default App;

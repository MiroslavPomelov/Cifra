import Image from "next/image";
import Header from "./components/includes/header/Header";
import Footer from "./components/includes/footer/Footer";
import Form from "./contacts/Form";

export default function Home() {
  return (
   <div>
    <Header/>

    <p>Welcome on our site!</p>

    <Form/>

    <Footer/>
   </div>
  );
}

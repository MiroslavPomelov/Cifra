
import ImageSlider from "@/components/dashboardComponents/imageSlider/ImageSlider";
import DashboardPage from "./dashboard/page";


const slides = [
  {
    src: '/first-image.jpg',
    title: 'Слайд 1',
    description: 'Описание слайда 1'
  },
  {
    src: '/second-image.jpg',
    title: 'Слайд 2',
    description: 'Описание слайда 2'
  },
  {
    src: '/third-image.jpg',
    title: 'Слайд 3',
    description: 'Описание слайда 3'
  },
];


export default function Home() {

  return (
    <div >
      <DashboardPage/>
      {/* <ImageSlider slides={slides} interval={3000} /> */}
    </div>

  );
}

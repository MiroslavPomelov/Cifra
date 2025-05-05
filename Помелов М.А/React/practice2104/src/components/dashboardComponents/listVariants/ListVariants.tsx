import { Flex } from "@radix-ui/themes";
import ListVariantsButton from "./ui/ListVariantsButton";
import { ListVariantButtonProps } from "./types/ListVariantButtonProps.type";
import ImageSlider from "../imageSlider/ImageSlider";


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

export default function ListVariants({
  buttonsPayload,
}: {
  buttonsPayload: ListVariantButtonProps[];
}) {
  return (
    <Flex
      p={"10px"}
      direction={"column"}
      width={"30%"}
      className="bg-[#d0e3fe]"
    >
      {buttonsPayload.map((item: ListVariantButtonProps, index: number) => (
        <ul>
          <li key={index}>
            <ListVariantsButton onClick={item.onClick} text={item.text} />
          </li>
        </ul>
      ))}
      <ImageSlider slides={slides} interval={3000} />

    </Flex>
  );
}

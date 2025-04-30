import { Flex } from "@radix-ui/themes";
import ListVariantsButton from "./ui/ListVariantsButton";
import { ListVariantButtonProps } from "./types/ListVariantButtonProps.type";

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
    </Flex>
  );
}

'use client'
import ListVariants from "@/components/dashboardComponents/listVariants/ListVariants";
import { Flex } from "@radix-ui/themes";
import MainContent from "@/components/dashboardComponents/mainContent/MainContent";
import { UserRepo } from "../model/repositories/UserRepo";
import { ProductRepo } from "../model/repositories/ProductRepo";
import { WorkerRepo } from "../model/repositories/WorkerRepo";
import { useState } from "react";
import { IStringable } from "../model/repositories/interfaces/IStringable";
import { ListVariantButtonProps } from "@/components/dashboardComponents/listVariants/types/ListVariantButtonProps.type";
import { IObjectable } from "../model/repositories/interfaces/IObjectable";
import { Product } from "../model/entities/Product";

export default function DashboardPage() {
  let userRepository: UserRepo = new UserRepo();
  let productRepository: ProductRepo = new ProductRepo();
  let workerRepository: WorkerRepo = new WorkerRepo();




  const [mainContent, setMainContent] = useState<IStringable[]>(['Выберите категорию для отображения списка']);
  const [cardViewContent, setCardViewContent] = useState<IObjectable[]>([]);
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const [updatingRepository, setUpdatingRepository] = useState<number>(1);
  const productList: Product[] = productRepository.readAll();

  const newList = productList.map(item => {
    return {
      item: item
      isSelected: false
    }
  })

  const updateReporitory = (newData: object) => {
    console.log('вот')
    console.log(newData)
    if (updatingRepository == 1) {
      userRepository.update(newData)
    }
    else if (updatingRepository == 2) {
      console.log('продукты')
      productRepository.update(newData)
    }
    else if (updatingRepository == 3) {
      console.log('вот тут')
      workerRepository.update(newData)
    }
    else {
      throw new Error('Некорректные данные!')
    }
  }

  const buttonsProps: ListVariantButtonProps[] = [
    { text: 'Пользователи', onClick: () => { setMainContent(userRepository.readAll()), setCardViewContent(userRepository.readAll()), setSelectedItem(null), setUpdatingRepository(1) } },
    { text: 'Товары', onClick: () => { setMainContent(productRepository.readAll()), setCardViewContent(productRepository.readAll()), setSelectedItem(null), setUpdatingRepository(2) } },
    { text: 'Работники', onClick: () => { setMainContent(workerRepository.readAll()), setCardViewContent(workerRepository.readAll()), setSelectedItem(null), setUpdatingRepository(3) } }
  ]



  return (
    <Flex p={"20px"} height={'100vh'} direction={"row"} justify={"between"} className='bg-[#dfeefe] border-[lightgrey] border-10'>
      <ListVariants buttonsPayload={buttonsProps} />
      <MainContent productList={productList} usersData={userRepository.readAll()} data={mainContent} objects={cardViewContent} onClick={(index: number) => { setSelectedItem(index) }} onBack={() => { setSelectedItem(null) }} selectedItem={selectedItem} onUpdate={(newData: object) => { updateReporitory(newData) }} />
    </Flex>
  );
}

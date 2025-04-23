import ListVariants from "@/components/dashboardsComponents/ListVariants";
import MainContent from "@/components/dashboardsComponents/mainContent/MainContent";
import { ListVariantButtonProps } from "@/components/dashboardsComponents/mainContent/types/ListVariantButtonProps.type";
import { IStringable } from "@/model/repository/interfaces/IStrigable";
import { ProductRepo } from "@/model/repository/ProductRepo";
import { UserRepo } from "@/model/repository/UserRepo";
import { WorkerRepo } from "@/model/repository/WorkerRepo";
import { Flex } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import { title } from "process";
import { useState } from "react";

export default function DashboardPage() {
    const userRepository: UserRepo = new UserRepo();
    const productRepository: ProductRepo = new ProductRepo();
    const workerRepository: WorkerRepo = new WorkerRepo();

    const [mainContent, setMainContent] = useState<IStringable[]>([]);

    const buttonsProps: ListVariantButtonProps[] = [
        { title: 'Users', onClick: () => { setMainContent(userRepository.readAll()) } },
        { title: 'Products', onClick: () => { setMainContent(productRepository.readAll()) } },
        { title: 'Workers', onClick: () => { setMainContent(workerRepository.readAll()) } }
    ];

    return (
        <Flex p={'20px'} width={'100vw'} height={'100vh'} className="bg-blue-100 rounded-xl border-[lightgray] border-10">

            <ListVariants {} />
            <MainContent />

        </Flex>
    );



}
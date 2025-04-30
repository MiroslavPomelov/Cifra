import { Box, Button, Dialog, Flex, Text, TextField } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import { EditProfileProps } from "./types/EditProfileProps";
import { useEffect, useState } from "react";
import SelectProducts from "../selectProducts/SelectProducts";
import { User } from "@/app/model/entities/User";
import { Product } from "@/app/model/entities/Product";


export default function EditProfile(props: EditProfileProps) {
	const initialValues = props.item.toObject();
	const [tempProductList, setTempProductList] = useState<Product[]>([]);

	if ('listOfProducts' in props.item) {
		const list: Product[] = [];
		for (let i = 0; i < props.productList.length; i++) {
			list.push(props.productList[i])
		}
		setTempProductList(list);
	}


	const [formValues, setFormValues] = useState(initialValues);

	// useEffect(() => {
	// 	// Update formValues when props.item changes (if needed)
	// 	setFormValues(props.item.toObject());
	//   }, [props.item]);

	const handleChange = (key: string, value: string) => {

		if (key == 'id' || key == 'age' || key == 'weight' || key == "price") {
			setFormValues({ ...formValues, [key]: Number(value) });
		} else {
			setFormValues({ ...formValues, [key]: value });
		}

		console.log(formValues);
	};

	const handleSave = () => {
		console.log('при Save')
		console.log(formValues)
		props.onUpdate(formValues);
	};


	return (
		<Dialog.Root>
			<Dialog.Trigger>
				<Button ml={'10px'} mb={'10px'} style={{ height: '40px', width: '10%', minWidth: '110px', backgroundColor: '#4581b3', color: 'white' }}>Редактировать</Button>
			</Dialog.Trigger>

			<Dialog.Content maxWidth="450px">
				<Dialog.Title>Редактировать пользователя</Dialog.Title>
				<Dialog.Description size="2" mb="4">
					Внести изменения в профиль пользователя
				</Dialog.Description>

				<Flex direction="column" gap="3">
					{Object.entries(props.item.toObject()).filter(([key]) => key !== 'id').map(([key, value], index) => (

						<label key={index}>
							<Text as="div" size="2" mb="1" weight="bold">
								{key}:
							</Text>
							<TextField.Root
								defaultValue={value}
								onChange={(event) => handleChange(key, event.target.value)}
							/>
						</label>
					))}
				</Flex>

				<Flex gap="3" mt="4" justify="end">
					<Dialog.Close>
						<Button variant="solid" color="green">
							Cancel
						</Button>
					</Dialog.Close>
					<Dialog.Close>
						<Button type='submit' onClick={handleSave} variant="solid" color="green">Save</Button>
					</Dialog.Close>
					<Dialog.Close>
						{/* <Button type='submit' onClick={handleSave} variant="solid" color="blue">Choose goods</Button> */}

						{'listOfProducts' in props.item && (
							<SelectProducts returnProductList={(list: Product[]) => { setTempProductList(list) }} userProducts={tempProductList} listOfProducts={props.productList} />
						)}
					</Dialog.Close>
				</Flex>
			</Dialog.Content>
		</Dialog.Root>

	);
}
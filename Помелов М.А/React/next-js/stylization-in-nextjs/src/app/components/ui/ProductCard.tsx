import styled from "styled-components";
import Card from "./card/card";
import Image from "./image/image";
import Text from "./text/text";
import Button from "./button/button";
import Title from "./title/title";

export default function ProductCard(props: CardPropsType) {
    return (
        <div>
            <Card>
                <Image src={props.src}></Image>

                <Title>{props.title}</Title>

                <Text>
                    {props.description}
                </Text>

                <Text style={{ fontSize: '18px', fontWeight: 'bolder', color: "green" }}>
                    {props.price} Руб.
                </Text>

                <Button>Buy</Button>
            </Card>
        </div>
    )
}
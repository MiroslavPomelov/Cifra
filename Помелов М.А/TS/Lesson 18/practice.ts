


type SomeType = String | Number;

function typa(params: SomeType): void {
    if (params instanceof String) {
        console.log("Эта строка");
    }
    else {
        console.log("Этj число");
    }
}


interface Behaviour {
    id: string;
    name: string;
    position: string;
}

type Typee = ;
class GoodCard extends Good implements IDrawable, IImage {
    title: string;
    description: string;
    price: number;
    image: string;

    constructor(title: string, description: string, price: number, image: string) {
        super();
        this.title = title;
        this.description = description;
        this.price = price;
        this.image = image;
    }

    getInfo(): string {
        return `${this.title} ${this.description} ${this.price}`
    }

    log(): void {
        this.getInfo();
    }

    draw(parent: HTMLElement): HTMLElement {
        const goodCard: HTMLDivElement = document.createElement("div");
        goodCard.className = "good-card";

        const cardElements: HTMLDivElement = document.createElement("div");
        cardElements.className = "cardElements";

        const h2: HTMLHeadingElement = document.createElement("h2");
        h2.className = "header";

        const p1: HTMLParagraphElement = document.createElement("p");
        p1.className = "p1";

        const p2: HTMLParagraphElement = document.createElement("p");
        p2.className = "p2";

        const image: HTMLImageElement = document.createElement("img");
        image.className = "image";
        image.src = this.image;
        image.alt = "imga";

        const info: HTMLDivElement = document.createElement("div");
        p2.className = "info";

        cardElements.appendChild(h2);
        cardElements.appendChild(p1);
        cardElements.appendChild(p2);
        info.appendChild(h2);
        info.appendChild(p1);
        info.appendChild(p2);
        goodCard.appendChild(image);
        goodCard.appendChild(info);
        parent.appendChild(goodCard);

        this.log();
        document.body.appendChild(parent);

        return goodCard;
    }
}
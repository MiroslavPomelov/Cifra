"use strict";
class GoodCard extends Good {
    constructor(title, description, price, image) {
        super();
        this.title = title;
        this.description = description;
        this.price = price;
        this.image = image;
    }
    getInfo() {
        return `${this.title} ${this.description} ${this.price}`;
    }
    log() {
        this.getInfo();
    }
    draw(parent) {
        const goodCard = document.createElement("div");
        goodCard.className = "good-card";
        const cardElements = document.createElement("div");
        cardElements.className = "cardElements";
        const h2 = document.createElement("h2");
        h2.className = "header";
        const p1 = document.createElement("p");
        p1.className = "p1";
        const p2 = document.createElement("p");
        p2.className = "p2";
        const image = document.createElement("img");
        image.className = "image";
        image.src = this.image;
        image.alt = "imga";
        const info = document.createElement("div");
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

"use strict";
class CustomPerson {
    constructor(name, age, height, phoneNumber) {
        this.imagePath = "/classWork/image.jpg";
        this.name = name;
        this.age = age;
        this.height = height;
        this.phoneNumber = phoneNumber;
    }
}
const newPerson = new CustomPerson('Miroslav', 25, 173, "89999999");
const div = document.createElement("div");
div.style.display = 'flex';
div.style.flexDirection = 'column';
div.style.justifyContent = 'center';
div.style.width = '20%';
div.style.height = '20%';
div.style.margin = '10px';
div.style.backgroundColor = 'lightgrey';
div.style.textAlign = 'center';
div.style.lineHeight = '1px';
const image = document.createElement("img");
image.src = newPerson.imagePath;
image.alt = 'picture';
const h2 = document.createElement("h2");
h2.textContent = newPerson.name;
h2.style.display = 'flex';
h2.style.justifyContent = 'center';
h2.style.marginTop = '25px';
const age = document.createElement("p");
age.textContent = `Возраст: ${newPerson.age}`;
age.style.display = 'flex';
age.style.justifyContent = 'center';
const height = document.createElement("p");
height.textContent = `Рост: ${newPerson.height}`;
height.style.display = 'flex';
height.style.justifyContent = 'center';
const phoneNumber = document.createElement("p");
phoneNumber.textContent = `Телефон: ${newPerson.phoneNumber}`;
phoneNumber.style.display = 'flex';
phoneNumber.style.justifyContent = 'center';
div.appendChild(image);
div.appendChild(h2);
div.appendChild(age);
div.appendChild(height);
div.appendChild(phoneNumber);
document.body.appendChild(div);
console.log('dasdasd');

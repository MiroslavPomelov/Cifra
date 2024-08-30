document.addEventListener("DOMContentLoaded", () => {
    fetch("http://localhost:36155/good-search/vacuum-cleaner")
        .then((response) => response.json())
        .then((data) => {
            let table = document.getElementById("table");

            for (let i = 0; i < data.length; i++) {
                let image = document.createElement("img");
                image.classList = "card-img-top";
                image.src = `http://localhost:36155/good-cards/${data[i].Image}`;
                image.alt = data[i].Title;

                let cardBody = document.createElement("div");
                cardBody.classList =
                    "card-body d-flex flex-column justify-content-between";

                let wrapper = document.createElement("div");
                wrapper.classList = "wrapper mb-3";

                let cardTitle = document.createElement("h2");
                cardTitle.classList = "card-title";
                cardTitle.textContent = data[i].Title;
                cardTitle.classList.add('text-center');

                cardTitle.classList.add("mt-3");

                wrapper.appendChild(cardTitle);

                let price = document.createElement("h5");
                price.classList = "card-text";
                price.textContent = `Цена: ${data[i].Price} руб.`;
                price.classList.add('text-danger');

                let chapters = data[i].Description.split("\r\n");

                for (let j = 0; j < chapters.length; j++) {
                    let cardText = document.createElement("p");
                    cardText.classList = "card-text";
                    cardText.textContent = chapters[j];
                    cardText.classList.add('text-center');

                    wrapper.appendChild(cardText);
                }

                let button = document.createElement("button");
                button.classList = "btn btn-primary";
                button.type = "button";
                button.textContent = "Подробнее";

                cardBody.appendChild(wrapper);
                table.appendChild(image);
                table.appendChild(cardBody);
                table.appendChild(price);

            }
        });
});

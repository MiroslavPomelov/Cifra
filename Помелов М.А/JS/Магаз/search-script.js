document.getElementById('keyWord').oninput = function () {
    localStorage.setItem('keyWord', this.value);
}

let searchText = document.getElementById('SearchText');
let h2 = document.createElement('h2');
h2.textContent = `Результаты поиска по слову: ${localStorage.getItem('keyWord')}`;
h2.classList = 'mb-5'
searchText.appendChild(h2);

document.addEventListener("DOMContentLoaded", () => {
    let keyWord = document.getElementById('keyWord').value;

    fetch(`http://localhost:36155/good-search/${localStorage.getItem('keyWord')}`)
        .then((response) => response.json())
        .then((data) => {
            let table = document.getElementById("table");
            localStorage.clear();

            for (let i = 0; i < data.length; i++) {
                let col = document.createElement("div");
                col.className = "col";

                let card = document.createElement("div");
                card.classList = "card h-100";

                let image = document.createElement("img");
                image.classList = "card-img-top";
                image.src = `http://localhost:36155/good-cards/${data[i].Image}`;
                image.alt = data[i].Title;

                let cardBody = document.createElement("div");
                cardBody.classList =
                    "card-body d-flex flex-column justify-content-between";

                let wrapper = document.createElement("div");
                wrapper.classList = "wrapper mb-3";

                let cardTitle = document.createElement("h5");
                cardTitle.classList = "card-title";
                cardTitle.textContent = data[i].Title;

                let cardText = document.createElement("p");
                cardText.classList = "card-text";
                cardText.textContent = data[i].Description;

                let wrapButton = document.createElement("div");
                wrapButton.classList = "d-flex";

                let button = document.createElement("button");
                button.classList = "btn btn-primary";
                button.type = "button";
                button.textContent = "Подробнее";

                wrapper.appendChild(cardTitle);
                wrapper.appendChild(cardText);
                wrapButton.appendChild(button);
                cardBody.appendChild(wrapper);
                cardBody.appendChild(wrapButton);
                card.appendChild(image);
                card.appendChild(cardBody);
                col.appendChild(card);

                table.appendChild(col);
            }

        });
    console.log(keyWord);
});



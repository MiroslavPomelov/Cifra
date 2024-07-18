let buttons = document.getElementsByClassName('buyButton');
let basket = document.querySelector('.basket');

localStorage.clear();

function updateItemCount() {
    basket.textContent = localStorage.length;
}

for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', (event) => {
        let key = event.target.parentNode.children[0].textContent;
        let currentValue = localStorage.getItem(key);

        let co = localStorage.key.length;
        console.log(co);
        if (currentValue) {
            currentValue = parseInt(currentValue) + 1;
        } else {
            currentValue = 1;
        }

        localStorage.setItem(key, currentValue.toString());

        updateItemCount()

    });
}




// document.addEventListener('DOMContentLoaded', () => {
//     let buttons = document.getElementsByClassName('buyButton');
//     let dataContainer = document.getElementById('dataContainer');
//     let basket = document.querySelector('.basket');



//     // Function to update the number of items in localStorage
//     function updateItemCount() {
//         basket.textContent = localStorage.length;
//     }

// });















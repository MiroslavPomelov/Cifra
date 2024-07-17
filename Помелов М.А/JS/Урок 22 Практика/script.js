let buttons = document.getElementsByClassName('buyButton');

for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', (event) => {
        let key = event.target.parentNode.children[0].textContent;
        localStorage.setItem('','');
    });
}
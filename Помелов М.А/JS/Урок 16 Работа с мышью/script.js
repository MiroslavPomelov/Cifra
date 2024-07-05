

let box = document.getElementById('box');

box.addEventListener('mouseover', () => {
    box.style.backgroundColor = 'yellow';
});

box.addEventListener('mouseleave', () => {
    box.style.backgroundColor = 'red';
});


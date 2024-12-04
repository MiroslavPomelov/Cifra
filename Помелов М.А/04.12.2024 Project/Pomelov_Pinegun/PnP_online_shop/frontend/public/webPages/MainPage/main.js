const wrapper = document.querySelector(".wrapper");
const authLink = document.querySelector(".auth-link");
const registerLink = document.querySelector(".registration-link");
const btnAuth = document.querySelector(".btnLogin-popup");
const iconClose = document.querySelector(".icon-close");

registerLink.addEventListener('click', () => {
    wrapper.classList.add('active');
});

authLink.addEventListener('click', () => {
    wrapper.classList.remove('active');
});

btnAuth.addEventListener('click', () => {
    wrapper.classList.add('active-popup');
});

iconClose.addEventListener('click', () => {
    wrapper.classList.remove('active-popup');
});
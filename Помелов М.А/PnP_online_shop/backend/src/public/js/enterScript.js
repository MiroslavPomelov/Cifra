const wrapper = document.querySelector(".wrapper");
const user_personal_btn_firstname = document.querySelector(".user-personal-btn-firstname");
const user_personal_btn_lastname = document.querySelector(".user-personal-btn-lastname");
const input_firstname = document.querySelector(".user-personal-input-firstname");
const input_lastname = document.querySelector(".user-personal-input-lastname");
const a_username = document.querySelector(".userNameHead");
const a_password = document.querySelector(".user-personal-a");
const user_personal = document.querySelector(".user-personal");
const authLink = document.querySelector(".auth-link");
const registerLink = document.querySelector(".registration-link");
const btnAuth = document.querySelector(".btnLogin-popup");
const iconClose = document.querySelector(".icon-close");
const iconCloses = document.querySelector(".icon-closes");

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

iconCloses.addEventListener('click', () => {
    user_personal.style.display = 'none';
});

a_username.addEventListener('click', () => {
    user_personal.style.display = 'block';
});

a_password.addEventListener('click', () => {
    showMessage(201, "Письмо отправленно!");
});

user_personal_btn_firstname.addEventListener('click', () => {
    const chName = input_firstname.textContent;

    fetch(`http://localhost:3000/user-person:${chName}`)
        .then(response => {
            return new Promise((resolve, reject) => {
                response.json()
                    .then((answer) => {
                        resolve({
                            status: response.status,
                            message: answer.message
                        })
                    })
                    .catch((err) => {
                        reject(err)
                    })
            })
        })
        .then(data => {
            showMessage(data.status, data.message);
        })
        .catch(error => {
            showMessage(data.status, data.message);
            console.error('Error:', error);
        })

    user_personal.style.display = 'none';
});

user_personal_btn_lastname.addEventListener('click', () => {
    const chLastname = input_lastname.textContent;

    fetch(`http://localhost:3000/user-person:${chLastname}`)
});






document.getElementById('basket').addEventListener('click', function () {
    document.getElementById('cartPopup').style.display = 'flex';
});

document.getElementById('icon-closes-basket').addEventListener('click', function () {
    document.getElementById('cartPopup').style.display = 'none';
});

// Закрытие окна при клике вне его
window.addEventListener('click', function (event) {
    const popup = document.getElementById('cartPopup');
    if (event.target === popup) {
        popup.style.display = 'none';
    }
});


//CМСка
function showMessage(status, message) {
    const notifier = document.getElementById('errorMessage');

    if (status === 201) {
        notifier.style.backgroundColor = 'green';
        notifier.style.position = 'absolute';
        notifier.style.zIndex = '100';
        notifier.style.margin = '10px';
        notifier.style.borderRadius = '5px';
        notifier.style.width = '200px';
        notifier.style.height = '35px';
        notifier.style.textAlign = 'center';
    } else {
        notifier.style.backgroundColor = 'red';
        notifier.style.position = 'absolute';
        notifier.style.zIndex = '100';
        notifier.style.margin = '10px';
        notifier.style.borderRadius = '5px';
        notifier.style.width = '200px';
        notifier.style.height = '35px';
        notifier.style.textAlign = 'center';
    }

    notifier.textContent = message;
    notifier.style.display = 'block';
    setTimeout(() => {
        notifier.style.display = 'none';
    }, 3000);
}
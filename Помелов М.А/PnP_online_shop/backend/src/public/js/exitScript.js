const wrapper = document.querySelector(".wrapper");
const user_personal_btn_firstname = document.querySelector(".user-personal-btn-firstname");
const user_personal_btn_lastname = document.querySelector(".user-personal-btn-lastname");
const input_firstname = document.querySelector(".user-personal-input-firstname");
const input_lastname = document.querySelector(".user-personal-input-lastname");
const a_username = document.querySelector(".userNameHead");
const user_personal = document.querySelector(".user-personal");
const authLink = document.querySelector(".auth-link");
const registerLink = document.querySelector(".registration-link");
const iconClose = document.querySelector(".icon-close");
const iconCloses = document.querySelector(".icon-closes");
const btnAuth = document.querySelector(".btnLogin-popup");
const user_personal_username = document.querySelector(".user-personal_username");
const user_personal_firstname = document.querySelector(".user-personal-input-firstname");
const user_personal_lastname = document.querySelector(".user-personal-input-lastname");
const user_personal_age = document.querySelector(".user-personal-input-age");
const user_personal_password = document.querySelector(".user-personal-password");
// const product_type = document.querySelectorAll(".menu__move-link");
// const carousel = document.querySelector(".carousel");


registerLink.addEventListener('click', () => {
    wrapper.classList.add('active');
});

authLink.addEventListener('click', () => {
    wrapper.classList.remove('active');
});

btnAuth.addEventListener('click', async () => {
    console.log('обработка выхода');
    await fetch(`http://localhost:3000/logout`, { method: 'POST' });
    window.location.href = 'http://localhost:3000';
});

iconClose.addEventListener('click', () => {
    wrapper.classList.remove('active-popup');
});

iconCloses.addEventListener('click', () => {
    user_personal.style.display = 'none';
});

a_username.addEventListener('click', async () => {
    user_personal.style.display = 'block';
    await fetch(`http://localhost:3000/user-personal`)
        .then(response => {
            return new Promise((resolve, reject) => {
                response.json()
                    .then((answer) => {
                        user_personal_username.textContent = `${answer.username}`;
                        user_personal_firstname.value = `${answer.firstname}`;
                        user_personal_lastname.value = `${answer.lastname}`;
                        user_personal_age.textContent = `${answer.age}`;
                        resolve();
                    })
                    .catch((err) => {
                        reject(err)
                    })
            })
        })
});

// product_type.forEach(element => {
//     element.addEventListener('click', async () => {
//         const newCarousel = document.getElementById("carouselExampleIndicators");
//         newCarousel.style.display = "none";
//     });



    // await fetch(`http://localhost:3000/products?category=${}&type=${}`)
    //     .then(response => {
    //         return new Promise((resolve, reject) => {
    //             response.json()
    //                 .then((answer) => {
    //                     user_personal_username.textContent = `${answer.username}`;
    //                     user_personal_firstname.value = `${answer.firstname}`;
    //                     user_personal_lastname.value = `${answer.lastname}`;
    //                     user_personal_age.textContent = `${answer.age}`;
    //                     resolve();
    //                 })
    //                 .catch((err) => {
    //                     reject(err)
    //                 })
    //         })
    //     })
// });

user_personal_password.addEventListener('click', async (event) => {
    event.preventDefault();
    await fetch(`http://localhost:3000/changePass`)
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
});

user_personal_btn_firstname.addEventListener('click', () => {
    const chName = input_firstname.value;

    fetch(`http://localhost:3000/user-personal-change_name?firstname=${chName}`)
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
    const chLastname = input_lastname.value;

    fetch(`http://localhost:3000/user-personal-change_name?lastname=${chLastname}`)
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
    } else {
        notifier.style.backgroundColor = 'red';
    }

    notifier.textContent = message;
    notifier.style.display = 'block';
    setTimeout(() => {
        notifier.style.display = 'none';
    }, 3000);
}



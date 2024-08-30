
document.addEventListener("DOMContentLoaded", () => {
    let regButton = document.getElementById('regButton');


    let name = document.getElementById('exampleInputName1');
    let email = document.getElementById('exampleInputEmail1');
    let password = document.getElementById('exampleInputPassword1')
    let date = document.getElementById('exampleInputDate1');

    regButton.addEventListener('click', (event) => {
        event.preventDefault();
        
        fetch("http://localhost:36155/registration", {
                method: 'POST',
                body: JSON.stringify(
                    {
                        Name: name.value,
                        Email: email.value,
                        Password: password.value,
                        BirthDate: date.value
                    }
                )
            })
                .then();

    })
})


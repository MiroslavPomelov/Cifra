function LoginUser() {
    document.addEventListener('DOMContentLoaded', () => {
        let button = document.getElementById('loginButton');

        let login = document.getElementById('exampleInputEmail2');
        let password = document.getElementById('exampleInputPassword2');


        button.addEventListener('click', (event) => {
            event.preventDefault();


            let data = JSON.stringify({
                "Name": login.value,
                "Password": password.value
            });


            fetch('http://localhost:36155/enter', {
                method: "POST",
                body: data
            })
                .then(response => response.text())
                .then(data => alert(data))
                .catch(error => console.error(error));


        });
    })
}

LoginUser();
function submitLogin() {
    var email = document.getElementById("login-email").value
    var senha = document.getElementById("login-psw").value


    var data = {
        email: email,
        senha: senha
    }


    fetch('https://api-ucdb.herokuapp.com/api/v1/login/', {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify(data)
        })
        .then(function (response) {
            if (!response.ok) {
                throw new Error("Email ou senha incorretos")
            }
            return response.json()
        })
        .then(function (data) {
            alert("Usuário logado com sucesso")
            console.log(data)

            // Store
            localStorage.setItem("token", data.token)
            localStorage.setItem("login", email)

            window.location.href = "index.html"
        })
        .catch(function (error) {
            console.log('There has been a problem with your fetch operation: ' + error.message);
            alert(error.message);
        });
}

/// user logout

function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    window.location.href = "index.html";
}
/**
 * Realiza a operacao de cadastrar um usuario ao sistema.
 */
function submitRegister() {
    var fName = document.getElementById("register-fName").value
    var lname = document.getElementById("register-lName").value
    var email = document.getElementById("register-email").value
    var senha = document.getElementById("register-psw").value


    var data = {
        email: email,
        senha: senha,
        primeiroNome: fName,
        ultimoNome: lname
    }


    fetch('https://api-ucdb.herokuapp.com/api/v1/users/', {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify(data)
        })
        .then(function (response) {
            var msg = ""
            if (!response.ok) {
                if (response.status == 409) {
                    msg = "Usuário já existe"
                } else if (response.status == 500) {
                    msg = "Erro do servidor"
                } else {
                    msg = "Senha não contém 8 dígitos"
                }

                throw new Error("Não foi possível completar o cadastro: " + msg)
            }
            return response.text()
        })
        .then(function (data) {
            alert("Usuário cadastrado com sucesso")
            window.location.href = "index.html"
        })
        .catch(function (error) {
            alert(error.message);
        });
}
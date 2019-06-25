function submitRegister() {
    var fName = document.getElementById("register-fName").value
    var lname = document.getElementById("register-lName").value
    var email = document.getElementById("register-email").value
    var senha = document.getElementById("register-psw").value

    /* Gabriel */
//    var data = {
//        login: email,
//        password: senha,
//        fName: fName,
//        lName: lname
//    }
    
    /* Dudu */
    var data = {
        email: email,
        senha: senha,
        primeiroNome: fName,
        ultimoNome: lname
    }

//        fetch('https://psoft.herokuapp.com/api/v1/users/', {
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
                    msg = "Erro inesperado"
                }

                throw new Error("Não foi possível completar o cadastro: " + msg)
            }
            return response.text()
        })
        .then(function (data) {
            alert("Usuário cadastrado com sucesso")
            console.log(data)
            window.location.href = "index.html"
        })
        .catch(function (error) {
            console.log('There has been a problem with your fetch operation: ' + error.message);
            alert(error.message);
        });
}

function submitLogin() {
    var email = document.getElementById("login-email").value
    var senha = document.getElementById("login-psw").value

    /* Gabriel */
//    var data = {
//        login: email,
//        password: senha
//    }
    
    /* Dudu */
    var data = {
        email: email,
        senha: senha
    }

//        fetch('https://psoft.herokuapp.com/api/v1/auth/login', {
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
                throw new Error("Não foi possível completar o login")
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

function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    window.location.href = "index.html";
}

function submitSearch() {
    //setup before functions
    var typingTimer; //timer identifier
    var doneTypingInterval = 1000; //time in ms, 5 second for example
    var $input = $('#search');

    //on keyup, start the countdown
    $input.on('keyup', function () {
        clearTimeout(typingTimer);
        typingTimer = setTimeout(doneTyping, doneTypingInterval);
    });

    //on keydown, clear the countdown 
    $input.on('keydown', function () {
        clearTimeout(typingTimer);
    });

}

function formatarDisciplinas(listaDisciplinas) {
    console.log(listaDisciplinas);
    var repos = listaDisciplinas; // JSON Parsing
    document.getElementById("disciplinas").innerHTML = "";
    var list = '';


    listaDisciplinas.status != 404 ? repos.forEach(function (arrayItem) {

        list += ('<div class="card-container">' +
            '<hr>' +
            '<div class="card">' +
            '<div class="content">' +
            arrayItem.id + ' - ' + arrayItem.nome +
            '</div>' +
            '<button class="w3-button-sub">' +
            "<a href='subjectProfile.html?id=" +arrayItem.id + "'>Acessar perfil da disciplina</a>" +
            '</button>' +
            '</div>' +
            '<hr>' +
            '</div>');
    }) : null;

    document.getElementById("disciplinas").innerHTML = list;


}

function doneTyping() {
    var search = document.getElementById("search")
    if (search != '') {

        fetch(('https://api-ucdb.herokuapp.com/api/v1/perfil/disciplina/search?substring=' + search.value), {
                method: 'GET',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json; charset=utf-8'
                },
            })
            .then(function (response) {
                if (!response.ok) {
                    var list = ('<div class="card-container">' +
                        '<hr>' +
                        '<div class="card">' +
                        '<div class="content">' +
                        "Não foi possível encontrar uma disciplina com tal parâmetro" +
                        '</div>' +
                        '</div>' +
                        '<hr>' +
                        '</div>');
                    document.getElementById("disciplinas").innerHTML = list;
                } else {
                    console.log(response.json()
                        .then(function (data) {
                            formatarDisciplinas(data);
                        })
                    );
                }
                //                    throw new Error("Não foi possível encontrar uma disciplina com tal parâmetro")
                return response.json()
            })
        //            .then(function (data) {
        //                
        //
        //            })
    }
}

function perfilDisciplina(idDisciplina) {
//    window.location.href = "/perfil.html"
    
    console.log(idDisciplina)
    formatarPerfil(idDisciplina);
}

function formatarPerfil(idDisciplina) {
    fetch(('https://api-ucdb.herokuapp.com/api/v1/disciplina/' + idDisciplina), {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json; charset=utf-8'
            },
        })
        .then(function (response) {
            if (!response.ok) {
                throw new Error("Não foi possível encontrar uma disciplina com tal parâmetro")
            }
            return response.json()
        })
        .then(function (data) {
            /* disciplina tem:
                * ID
                * Nome
                * Número de likes (identificar quem deu like)
                * Notas atriubídas pelos alunos a disciplina
                * Comentários dos alunos sobre a disciplina
                 
                
                Ao Puxar os dados:
                    * Nota da disciplina (média)
                    * Número de likes e dislikes
                    * Exibir todos os comentários em ordem da mais recente pra mais antiga.
                    * Campo de comentários acima de todos os comentários.
                    */
        
        
        
            
            console.log(data)
        })
        .catch(function (error) {
            console.log('There has been a problem with your fetch operation: ' + error.message);
            alert(error.message);
        });
}

window.onload = function subjectDecode() {
    var id = location.search.split("?");
    var broke = id[1].split("=");

    subjectProfile(broke[1]);

}

function subjectProfile(id) {
    console.log(id);
    console.log(localStorage.getItem("token"));
    fetch(('https://api-ucdb.herokuapp.com/api/v1/perfil/?perfil-id=' + id), {
        method: 'GET',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json; charset=utf-8',
            'Authorization': `Bearer ${localStorage.token}`
        },
    })
        .then(function (response) {
            if(response.status == 500){
                throw new Error("Faça o login para poder continuar");
            }
            if (!response.ok) {
                throw new Error("Não foi possível encontrar uma disciplina com tal parâmetro")
            }
            return response.json()
        })
        .then(function (data) {
            var profile = data.disciplina;
            var responseComments = data.comentarios;
            var listComments = '';
            var listAnswers = '';
            document.getElementById("subjectbyid").innerHTML = '';
            data.comentarios.status != 404 ? responseComments.forEach(function (arrayItem) {
                var responseAwnsers = arrayItem.respostas;
                listAnswers = '';
                arrayItem.respostas.status != 404 ? responseAwnsers.forEach(function (arrayAnwser) {
                    listAnswers += ('<div class="card-answer">' +
                        '<div class="answer-name">' + arrayAnwser.user.primeiroNome + ' ' + arrayAnwser.user.ultimoNome + ':' + '</div>' +
                        '<div class="answer-text">' + arrayAnwser.text + ' - ' + '<span class="answer-time">' + arrayAnwser.hora + ', ' + arrayAnwser.data + '</span>' + '</div></div>');
                }) : null;
                if (arrayItem.user.email == localStorage.getItem("login")) {
                    if (arrayItem.text != "" && arrayItem.text != null) {
                        listComments += ('<div class="card-comment-user">' +
                            '<div class="comment-name">' + arrayItem.user.primeiroNome + ' ' + arrayItem.user.ultimoNome + ':' + '<a class="comment-delete" href="#" onclick="return removeComment(' + arrayItem.id + ')"><i class="fas fa-trash-alt"></i></a>' + '</div>' +
                            '<div class="comment-text">' + arrayItem.text + ' - ' + '<span class="comment-time">' + arrayItem.hora + ', ' + arrayItem.data + '</span>' + '</div>' +
                            '<div class="comment-answer">' + listAnswers + '</div>' +
                            "<div class='answer-area'><input type='text' class='answer-submit' onkeypress='return answerEnter(event," + arrayItem.id + ") ' placeholder='digite uma resposta...' id='answer" + arrayItem.id + "' ><a class='answer-button' href='#' onclick='return addAnswer(" + arrayItem.id + ")'><i class='fas fa-reply'></i></a></div>" +
                            '</div>')
                    }
                } else {
                    if (arrayItem.text != "" && arrayItem.text != null) {
                        listComments += ('<div class="card-comment">' +
                            '<div class="comment-name">' + arrayItem.user.primeiroNome + ' ' + arrayItem.user.ultimoNome + ':' + '</div>' +
                            '<div class="comment-text">' + arrayItem.text + ' - ' + '<span class="comment-time">' + arrayItem.hora + ', ' + arrayItem.data + '</span>' + '</div>' +
                            '<div class="comment-answer">' + listAnswers + '</div>' +
                            "<div class='answer-area'><input type='text' class='answer-submit' onkeypress='return answerEnter(event," + arrayItem.id + ") ' placeholder='digite uma resposta...' id='answer" + arrayItem.id + "' ><a class='answer-button' href='#' onclick='return addAnswer(" + arrayItem.id + ")'><i class='fas fa-reply'></i></a></div>" +
                            '</div>');
                    }
                }
            }) : null;

            var likeStatus = "";

            if (data.curtidaUser) {
                likeStatus = "button-liked";
            } else {
                likeStatus = "button-like";
            }

            document.getElementById("subjectbyid").innerHTML = "<div class='subject-name'>" + profile + "</div>" + "</br><div class='card-like'><a class=" + likeStatus + " href='#' onclick='return addLike()'><i class='fas fa-heart'></i></a><span class='number-likes'>" + data.curtidas + "</div></br>" +
                "<div class='comment-area'><input type='text' class='comment-submit' onkeypress='return commentEnter(event)' placeholder='faça um comentário...' id='comment'><a class='comment-button' href='#' onclick='return addComment()'><i class='fas fa-comment-dots'></i></a></div>" +
                "<div class='center'>" + listComments + "</div><div></div><div></div><div></div></div>";

            console.log(data)
        })
        .catch(function (error) {
            console.log('There has been a problem with your fetch operation: ' + error.message);
            alert(error.message);
            logout();
        });
}



function addComment() {
    var inputComment = document.querySelector("#comment");
    console.log(inputComment.value);
    submitComment(inputComment);
}

function submitComment(inputComment) {
    var id = location.search.split("?");
    var broke = id[1].split("=");

    var data = {
        text: inputComment.value
    }

    fetch('https://api-ucdb.herokuapp.com/api/v1/perfil/comentario/?perfil-id=' + broke[1], {
        method: 'POST',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json; charset=utf-8',
            'Authorization': `Bearer ${localStorage.token}`
        },
        body: JSON.stringify(data)
    })
        .then(function (response) {
            var msg = ""
            if (!response.ok) {
                msg = "Algo deu errado"
                throw new Error("Não foi possivel postar o comentário!")
            }
            return response.text()
        })
        .then(function (data) {
            subjectProfile(broke[1]);
        })
        .catch(function (error) {
            alert(error.message);
        })
}

function addAnswer(id) {
    var inputAnswer = document.querySelector("#answer" + id);
    submitAnswer(inputAnswer, id);
}

function submitAnswer(inputAnswer, id) {
    console.log(inputAnswer.value);
    console.log(id);
    var idSubject = location.search.split("?");
    var broke = idSubject[1].split("=");
    var idComment = id;

    var data = {
        text: inputAnswer.value
    }

    fetch('https://api-ucdb.herokuapp.com/api/v1/perfil/comentario/resposta/?comentario-id=' + idComment, {
        method: 'POST',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json; charset=utf-8',
            'Authorization': `Bearer ${localStorage.token}`
        },
        body: JSON.stringify(data)
    })
        .then(function (response) {
            var msg = ""
            if (!response.ok) {
                msg = "Algo deu errado"
                throw new Error("Não foi possivel postar a resposta!")
            }
            return response.text()
        })
        .then(function (data) {
            subjectProfile(broke[1]);
        })
        .catch(function (error) {
            alert(error.message);
        })
}

function removeComment(id) {
    var idSubject = location.search.split("?");
    var broke = idSubject[1].split("=");

    fetch('https://api-ucdb.herokuapp.com/api/v1/perfil/comentario/?comentario-id=' + id, {
        method: 'DELETE',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json; charset=utf-8',
            'Authorization': `Bearer ${localStorage.token}`
        },
    })
        .then(function (response) {
            var msg = ""
            if (!response.ok) {
                msg = "Algo deu errado"
                throw new Error("Não foi possivel apagar o comentário!")
            }
            return response.text()
        })
        .then(function (data) {
            subjectProfile(broke[1]);
        })
        .catch(function (error) {
            alert(error.message);
        })

}

function addLike() {
    var idSubject = location.search.split("?");
    var broke = idSubject[1].split("=");

    fetch('https://api-ucdb.herokuapp.com/api/v1/perfil/like/?perfil-id=' + broke[1], {
        method: 'PUT',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json; charset=utf-8',
            'Authorization': `Bearer ${localStorage.token}`
        },
    })
        .then(function (response) {
            var msg = ""
            if (!response.ok) {
                msg = "Algo deu errado"
                throw new Error("Não foi possivel realizar a operação!")
            }
            return response.text()
        })
        .then(function (data) {
            subjectProfile(broke[1]);
        })
        .catch(function (error) {
            alert(error.message);
        })
}

function answerEnter(e, idAnswer) {
    if (e.keyCode == 13) {
        addAnswer(idAnswer);
        return false;
    }
};

function commentEnter(e) {
    if (e.keyCode == 13) {
        addComment();
        return false;
    }
};

function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    window.location.href = "index.html";
}


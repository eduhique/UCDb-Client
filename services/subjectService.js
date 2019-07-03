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
            if (response.status == 500) {
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
                    if (arrayAnwser.user.email == localStorage.getItem("login")) {
                        if (arrayAnwser.text != "" && arrayAnwser.text != null) {
                            listAnswers += ('<div class="answer-flex"><div class="card-answer-user">' +
                                '<div class="answer-name">' + arrayAnwser.user.primeiroNome + ' ' + arrayAnwser.user.ultimoNome + ':' + '</div>' +
                                '<div class="answer-text">' + arrayAnwser.text + ' - ' + '<span class="answer-time">' + arrayAnwser.hora + ', ' + arrayAnwser.data + '</span>' + '</div></div>' +
                                '<a class="answer-delete" href="#" onclick="return removeComment(' + arrayAnwser.id + ')"><i class="fas fa-trash-alt"></i></a></div>');
                        }
                    } else {
                        listAnswers += ('<div class="answer-flex"><div class="card-answer">' +
                                '<div class="answer-name">' + arrayAnwser.user.primeiroNome + ' ' + arrayAnwser.user.ultimoNome + ':' + '</div>' +
                                '<div class="answer-text">' + arrayAnwser.text + ' - ' + '<span class="answer-time">' + arrayAnwser.hora + ', ' + arrayAnwser.data + '</span>' + '</div></div>' +
                                '</div>');
                    }
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

function logout2() {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    $(document).ready(function () {
        $('#id01').modal(
            {

                url: 'subject.html'
            }
        );
        $('#id01').onload();
    });
};

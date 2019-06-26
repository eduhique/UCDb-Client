window.onload = function subjectDecode() {
    var id = location.search.split("?");
    var broke = id[1].split("=");

    subjectProfile(broke[1]);

}

function subjectProfile(id) {
    console.log(id);
    console.log(localStorage.getItem("token"));
    fetch(('https://api-ucdb.herokuapp.com/api/v1/perfil/?disciplina-id=' + id), {
        method: 'GET',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json; charset=utf-8',
            'Authorization': `Bearer ${localStorage.token}`
        },
    })
        .then(function (response) {
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
                listComments += ('<div class="card-comment">' +
                    '<div class="comment-name">' + arrayItem.user.primeiroNome + ' ' + arrayItem.user.ultimoNome + ':' + '</div>' +
                    '<div class="comment-text">' + arrayItem.text + ' - ' + '<span class="comment-time">' + arrayItem.hora + ', ' + arrayItem.data + '</span>' + '</div>' +
                    '<div class="comment-answer">' + listAnswers + '</div>' +
                    "<div class='answer-area'><input type='text' class='answer-submit' placeholder='digite uma resposta...' id='answer"+ arrayItem.id +"' ><a class='answer-button' href='#' onclick='return addAnswer(" + arrayItem.id + ")'><i class='fas fa-reply'></i></a></div>" +
                    '</div>');
            }) : null;

            document.getElementById("subjectbyid").innerHTML = profile + "</br><div><span></span><span></span><span></span></div></br>" +
                "<div class='comment-title'>Comentários</div>" +
                "<div class='comment-area'><input type='text' class='comment-submit' placeholder='faça um comentário...' id='comment' ><a class='comment-button' href='#' onclick='return addComment()'><i class='fas fa-comment-dots'></i></a></div>" +
                "<div>" + listComments + "</div><div></div><div></div><div></div></div>";
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



function addComment() {
    var inputComment = document.querySelector("#comment");
    console.log(inputComment.value);
    submitComment(inputComment);
}

function submitComment(inputComment){
    var id = location.search.split("?");
    var broke = id[1].split("=");

    var data = {
        text: inputComment.value
    }

    fetch('https://api-ucdb.herokuapp.com/api/v1/perfil/comentario/?perfil-id=' + broke[1], {
        method: 'POST',
        headers:{
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json; charset=utf-8',
            'Authorization': `Bearer ${localStorage.token}`
        },
        body: JSON.stringify(data)
    })
    .then(function(response){
        var msg = ""
        if(!response.ok){
            msg = "Algo deu errado"
            throw new Error("Não foi possivel postar o comentário!")
        }
        return response.text()
    })
    .then(function(data) {
        alert("Comentário feito com sucesso")
        subjectProfile(broke[1]);
    })
    .catch(function(error){
        alert(error.message);
    })
}

function addAnswer(id){
    var inputAnswer = document.querySelector("#answer" + id);
    submitAnswer(inputAnswer, id);
}

function submitAnswer(inputAnswer, id){
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
        headers:{
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json; charset=utf-8',
            'Authorization': `Bearer ${localStorage.token}`
        },
        body: JSON.stringify(data)
    })
    .then(function(response){
        var msg = ""
        if(!response.ok){
            msg = "Algo deu errado"
            throw new Error("Não foi possivel postar a resposta!")
        }
        return response.text()
    })
    .then(function(data) {
        alert("Resposta feita com sucesso")
        subjectProfile(broke[1]);
    })
    .catch(function(error){
        alert(error.message);
    })
}

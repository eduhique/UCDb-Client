/*
 * Realiza a operacao de preparar os dados para o envio do comentario ao backend. 
 */
function addComment() {
    var inputComment = document.querySelector("#comment");
    submitComment(inputComment);
}

/**
 * Realiza a operacao de submeter o texto do comentario feito pelo usuario ao backend.
 * @param {*} inputComment texto do comentario que o usuario submeteu no sistema.
 */
function submitComment(inputComment) {
    var id = location.search.split("?");
    var broke = id[1].split("=");

    var data = {
        text: inputComment.value
    }

    fetch('https://api-ucdb.herokuapp.com/api/v1/perfil/comentario?comentario-id='+ 0 +'&perfil-id=' + broke[1], {
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
/**
 * Realiza a operacao de preparar os dados para o envio da resposta ao comentario para o backend.
 * @param {*} id eh o identificador do comentario a qual a resposta pertence.
 */
function addAnswer(id) {
    var inputAnswer = document.querySelector("#answer" + id);
    submitAnswer(inputAnswer, id);
}

/**
 * Realiza a operacao de submeter o texto da resposta ao comentario feito pelo usuario ao backend.
 * @param {*} inputAnswer texto da resposta digitado pelo usuario.
 * @param {*} id identificador do comentario a qual a resposta pertence.
 */
function submitAnswer(inputAnswer, id) {
    var idSubject = location.search.split("?");
    var broke = idSubject[1].split("=");
    var idComment = id;

    var data = {
        text: inputAnswer.value
    }

    fetch('https://api-ucdb.herokuapp.com/api/v1/perfil/comentario?comentario-id='+idComment+ '&perfil-id=' + broke[1], {
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

/**
 * Realiza a operacao de apagar um comentario ou uma resposta feita pelo proprio usuario.
 * @param {*} id identificador do comentario ou resposta.
 */
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
            alert('Comentário apagado com sucesso!')
            subjectProfile(broke[1]);
        })
        .catch(function (error) {
            alert(error.message);
        })

}

/**
 * Realiza a operacao de submeter a resposta ao comentario apertando a tecla 'enter' do teclado.
 * @param {*} e elemento o qual eh apertado pelo teclado.
 * @param {*} idAnswer identificador do comentario o qual se refere a resposta.
 */
function answerEnter(e, idAnswer) {
    if (e.keyCode == 13) {
        addAnswer(idAnswer);
        return false;
    }
};

/**
 * Realiza a operacao de submeter o comentario apertando a tecla 'enter' do teclado.
 * @param {*} e elemento o qual eh apertado pelo teclado
 */
function commentEnter(e) {
    if (e.keyCode == 13) {
        addComment();
        return false;
    }
};
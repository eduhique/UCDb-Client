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
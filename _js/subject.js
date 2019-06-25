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

            data.comentarios.status != 404 ? responseComments.forEach(function(arrayItem){
                var responseAwnsers = arrayItem.respostas;
                arrayItem.respostas.status != 404 ? responseAwnsers.forEach(function(arrayAnwser){
                    listAnswers += ('<div class="card-answer">'+
                    '<div class="answer-name">'+ arrayAnwser.user.primeiroNome + ' ' + arrayAnwser.user.ultimoNome + ':' + '</div>' +
                    '<div class="answer-text">' + arrayAnwser.text + ' - ' + '<span class="answer-time">' + arrayAnwser.hora + ', ' + arrayAnwser.data +'</span>' + '</div></div>');
                }): null;
                listComments += ('<div class="card-comment">' + 
                '<div class="comment-name">'+ arrayItem.user.primeiroNome + ' ' + arrayItem.user.ultimoNome + ':' + '</div>' + 
                '<div class="comment-text">'+ arrayItem.text + ' - ' + '<span class="comment-time">' + arrayItem.hora + ', ' + arrayItem.data +'</span>' + '</div>' + 
                '<div class="comment-answer">' + listAnswers + '</div>' +
                '</div>');
            }) : null;

            document.getElementById("subjectbyid").innerHTML = profile + "</br><div><span></span><span></span><span></span></div></br>" +
            "<div class='comment-title'>Comentários</div><div>" + listComments + "</div><div></div><div></div><div></div></div>";
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
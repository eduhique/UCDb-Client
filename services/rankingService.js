/**
 * Realiza a operacao de renderizar o ranking assim que inicia-se a pagina.
 * Por default, o ranking de likes sempre é inicializado ao carregar a pagina.
 */
window.onload = function loadRanking() {
    likeRanking();
}

/**
 * Realiza a operacao de requisicao do ranking de likes
 */
function likeRanking(){
    fetch(('https://api-ucdb.herokuapp.com/api/v1/perfil/ranking/like'), {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization': `Bearer ${localStorage.token}`
            },
        })
        .then(function (response) {
            if (!response.ok) {
                throw new Error("Não foi possível recuperar o ranking no momento")
            }
            return response.json()
        })
        .then(function (data) {
            renderRankingLike(data);
        })
        .catch(function (error) {
            alert(error.message);
        });
}
/**
 * Realiza a operacao de renderizar o ranking de likes.
 * @param {*} data JSON recebido pelo response.
 */
function renderRankingLike(data){
    var title = "Ranking de disciplinas por like";
    var responseLike = data;
    var listLike = '';
    var contador = 1;
    var buttonLike = '';

    var button = '<div class="ranking-buttons">' +
    '<span class="button-left"><a href="#" class="button-active" id="active"><i class="fas fa-heart"></i></a></span>' +
    '<span class="button-right"><a href="#" class="button-sleep" id="sleep" onclick="return commentRanking()"><i class="fas fa-comment"></i></a></span>' +
'</div>';
    document.getElementById('rankingId').innerHTML = '';

    data.status != 404 ? responseLike.forEach(function (arrayLike){

        if(arrayLike.curtidaUser){
            buttonLike = 'button-liked';
        } else{
            buttonLike = 'button-unlike';
        }
        
        if(contador == 1){
            listLike+= ('<div class="card-ranking-gold">' +
                                '<div class="ranking-text">' + contador + ".&nbsp;&nbsp;&nbsp;" + arrayLike.disciplina +'</div>' +
                                "<div class='card-like'><a class='button-ext' href='subjectProfile.html?id=" +arrayLike.id + "'><i class='fas fa-pager'></i></a><a class=" + buttonLike + " href='#' onclick='return addLike("+ arrayLike.id+")'><i class='fas fa-heart'></i></a><span class='number-likes'>" + arrayLike.curtidas + "</div>" +
                                '</div>');
        } else if(contador == 2){
            listLike+= ('<div class="card-ranking-silver">' +
                                '<div class="ranking-text">' + contador + ".&nbsp;&nbsp;&nbsp;" + arrayLike.disciplina +'</div>' +
                                "<div class='card-like'><a class='button-ext' href='subjectProfile.html?id=" +arrayLike.id + "'><i class='fas fa-pager'></i></a><a class=" + buttonLike + " href='#' onclick='return addLike("+ arrayLike.id+")'><i class='fas fa-heart'></i></a><span class='number-likes'>" + arrayLike.curtidas + "</div>" +
                                '</div>');
        } else if(contador == 3){
            listLike+= ('<div class="card-ranking-bronze">' +
                                '<div class="ranking-text">' + contador + ".&nbsp;&nbsp;&nbsp;" + arrayLike.disciplina +'</div>' +
                                "<div class='card-like'><a class='button-ext' href='subjectProfile.html?id=" +arrayLike.id + "'><i class='fas fa-pager'></i></a><a class=" + buttonLike + " href='#' onclick='return addLike("+ arrayLike.id+")'><i class='fas fa-heart'></i></a><span class='number-likes'>" + arrayLike.curtidas + "</div>" +
                                '</div>');
        } else{
            listLike+= ('<div class="card-ranking">' +
                                '<div class="ranking-text">' + contador + ".&nbsp;&nbsp;&nbsp;" + arrayLike.disciplina +'</div>' +
                                "<div class='card-like'><a class='button-ext' href='subjectProfile.html?id=" +arrayLike.id + "'><i class='fas fa-pager'></i></a><a class=" + buttonLike + " href='#' onclick='return addLike("+ arrayLike.id+")'><i class='fas fa-heart'></i></a><span class='number-likes'>" + arrayLike.curtidas + "</div>" +
                                '</div>');
        }
        contador += 1;

    }): null;

    document.getElementById('rankingId').innerHTML = button + "<div class='ranking-name'>" + title + "</div>" + listLike;
}

/**
 * Realiza a operacao de requisicao do ranking de comentarios.
 */
function commentRanking(){
    fetch(('https://api-ucdb.herokuapp.com/api/v1/perfil/ranking/comentario'), {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization': `Bearer ${localStorage.token}`
            },
        })
        .then(function (response) {
            if (!response.ok) {
                throw new Error("Não foi possível recuperar o ranking no momento")
            }
            return response.json()
        })
        .then(function (data) {
            renderRankingComment(data);
        })
        .catch(function (error) {
            alert(error.message);
        });
}

/**
 * Realiza a operacao de renderizar o ranking de comentarios.
 * @param {*} data JSON recebido pelo response.
 */
function renderRankingComment(data){
    var title = "Ranking de disciplinas por comentário";
    var responseLike = data;
    var listLike = '';
    var contador = 1;

    var button = '<div class="ranking-buttons">' +
    '<span class="button-left"><a href="#" class="button-active" id="sleep" onclick="return likeRanking()"><i class="fas fa-heart"></i></a></span>' +
    '<span class="button-right"><a href="#" class="button-sleep" id="active"><i class="fas fa-comment"></i></a></span>' +
'</div>';
    document.getElementById('rankingId').innerHTML = '';

    data.status != 404 ? responseLike.forEach(function (arrayLike){

        if(contador == 1){
            listLike+= ('<div class="card-ranking-gold">' +
                                '<div class="ranking-text">' + contador + ".&nbsp;&nbsp;&nbsp;" + arrayLike.disciplina +'</div>' +   
                                "<div class='card-like'><a class='button-ext' href='subjectProfile.html?id=" +arrayLike.id + "'><i class='fas fa-pager'></i></a><a class='button-liked'><i class='fas fa-comment'></i></a><span class='number-likes'>" + arrayLike.qtdComentario + "</span></div>" +
                                '</div>');
        } else if(contador == 2){
            listLike+= ('<div class="card-ranking-silver">' +
                            '<div class="ranking-text">' + contador + ".&nbsp;&nbsp;&nbsp;" + arrayLike.disciplina +'</div>' +   
                            "<div class='card-like'><a class='button-ext' href='subjectProfile.html?id=" +arrayLike.id + "'><i class='fas fa-pager'></i></a><a class='button-liked'><i class='fas fa-comment'></i></a><span class='number-likes'>" + arrayLike.qtdComentario + "</span></div>" +
                            '</div>');
        } else if(contador == 3){
            listLike+= ('<div class="card-ranking-bronze">' +
                            '<div class="ranking-text">' + contador + ".&nbsp;&nbsp;&nbsp;" + arrayLike.disciplina +'</div>' +   
                            "<div class='card-like'><a class='button-ext' href='subjectProfile.html?id=" +arrayLike.id + "'><i class='fas fa-pager'></i></a><a class='button-liked'><i class='fas fa-comment'></i></a><span class='number-likes'>" + arrayLike.qtdComentario + "</span></div>" +
                            '</div>');
        } else {
            listLike+= ('<div class="card-ranking">' +
                            '<div class="ranking-text">' + contador + ".&nbsp;&nbsp;&nbsp;" + arrayLike.disciplina +'</div>' +   
                            "<div class='card-like'><a class='button-ext' href='subjectProfile.html?id=" +arrayLike.id + "'><i class='fas fa-pager'></i></a><a class='button-liked'><i class='fas fa-comment'></i></a><span class='number-likes'>" + arrayLike.qtdComentario + "</span></div>" +
                            '</div>');
        }
        contador += 1;

    }): null;

    document.getElementById('rankingId').innerHTML = button + "<div class='ranking-name'>" + title + "</div>" + listLike;
}

/**
 * Realiza a operacao de adicionar um like a disciplina dentro do ranking de likes.
 * @param {*} id identificador da disciplina a qual o usuario deseja realizar o like.
 */
function addLike(id) {
    fetch('https://api-ucdb.herokuapp.com/api/v1/perfil/like/?perfil-id=' + id, {
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
            likeRanking();
        })
        .catch(function (error) {
            alert(error.message);
        })
}

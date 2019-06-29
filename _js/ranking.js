window.onload = function loadRanking() {
    likeRanking();
}

function likeRanking(){
    fetch(('https://api-ucdb.herokuapp.com/api/v1/perfil/disciplina/ranking/like'), {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json; charset=utf-8'
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
            console.log('There has been a problem with your fetch operation: ' + error.message);
            alert(error.message);
        });
}

function renderRankingLike(data){
    var title = "Ranking de disciplinas por like";
    var responseLike = data;
    var listLike = '';
    var contador = 1;

    var button = '<div class="ranking-buttons">' +
    '<span class="button-left"><a href="#" class="button-active" id="active"><i class="fas fa-heart"></i></a></span>' +
    '<span class="button-right"><a href="#" class="button-sleep" id="sleep" onclick="return commentRanking()"><i class="fas fa-comment"></i></a></span>' +
'</div>';
    document.getElementById('rankingId').innerHTML = '';

    data.status != 404 ? responseLike.forEach(function (arrayLike){
        
        listLike+= ('<div class="card-ranking">' +
                            '<div class="ranking-text">' + contador + ".&nbsp;&nbsp;&nbsp;" + arrayLike.nome +'</div>' +
                            "<div class='card-like'><a class='button-ext' href='subjectProfile.html?id=" +arrayLike.id + "'><i class='fas fa-pager'></i></a><a class='button-liked' href='#' onclick='return addLike()'><i class='fas fa-heart'></i></a><span class='number-likes'>" + 0 + "</div>" +
                            '</div>');
        contador += 1;

    }): null;

    document.getElementById('rankingId').innerHTML = button + "<div class='ranking-name'>" + title + "</div>" + listLike;
}

function commentRanking(){
    fetch(('https://api-ucdb.herokuapp.com/api/v1/perfil/disciplina/ranking/comentario'), {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json; charset=utf-8'
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
            console.log('There has been a problem with your fetch operation: ' + error.message);
            alert(error.message);
        });
}

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
        
        listLike+= ('<div class="card-ranking">' +
                            '<div class="ranking-text">' + contador + ".&nbsp;&nbsp;&nbsp;" + arrayLike.nome +'</div>' +
                            "<div class='card-like'><a class='button-ext' href='subjectProfile.html?id=" +arrayLike.id + "'><i class='fas fa-pager'></i></a><a class='button-liked'><i class='fas fa-comment'></i></a><span class='number-likes'>" + 0 + "</span></div>" +
                            '</div>');
        contador += 1;

    }): null;

    document.getElementById('rankingId').innerHTML = button + "<div class='ranking-name'>" + title + "</div>" + listLike;
}


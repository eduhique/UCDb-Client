/**
 * Realiza a operacao de submeter os dados de pesquisa de disciplina do usuario em tempo de execucao
 */
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

/**
 * Realiza a operacao de formatar as disciplinas contidas dentro do JSON.
 * @param {*} listaDisciplinas JSON contendo as informacoes das disciplinas.
 */
function formatarDisciplinas(listaDisciplinas) {
    var repos = listaDisciplinas; 
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

/**
 * Realiza a operacao de requisicao de disciplinas ao backend.
 */
function doneTyping() {
    var search = document.getElementById("search")
    if (search != '') {
        var value = search.value;
        var encodeValue = encodeURIComponent(value);

        fetch(('https://api-ucdb.herokuapp.com/api/v1/perfil/disciplina/search?substring=' + encodeValue), {
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
                return response.json()
            })
    }
}

/**
 * Realiza a operacao de preparar os dados para ir ao perfil da disciplina solicitada.
 */
function perfilDisciplina(idDisciplina) {
    formatarPerfil(idDisciplina);
}

/**
 * Realiza a operacao de requisicao da pagina com as informacoes da disciplina solicitada.
 * @param {*} idDisciplina identificador da disciplina que o usuario deseja saber informacoes.
 */
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
        })
        .catch(function (error) {
            alert(error.message);
        });
}

/**
 * Realiza a operacao de ignorar a tecla 'enter', caso seja pressionada rs.
 */
function doNothing() {  
    var keyCode = event.keyCode ? event.keyCode : event.which ? event.which : event.charCode;
    if( keyCode == 13 ) {
  
  
    if(!e) var e = window.event;
  
    e.cancelBubble = true;
    e.returnValue = false;
  
    if (e.stopPropagation) {
      e.stopPropagation();
      e.preventDefault();
    }
  }
} 

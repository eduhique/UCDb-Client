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
                return response.json()
            })
    }
}

function perfilDisciplina(idDisciplina) {
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
            console.log(data)
        })
        .catch(function (error) {
            console.log('There has been a problem with your fetch operation: ' + error.message);
            alert(error.message);
        });
}


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

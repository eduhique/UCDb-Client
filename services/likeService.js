/**
 * Realiza a operacao de atribuir um like pelo usuario a determinada disciplina.
 */
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
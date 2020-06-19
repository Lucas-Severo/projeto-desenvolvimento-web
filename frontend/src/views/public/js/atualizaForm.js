const api = require('../../../services/api');

document.getElementById("atualizarForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const id = document.getElementById("id").innerHTML;
    console.log(id);

});
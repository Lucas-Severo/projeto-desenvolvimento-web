
document.getElementById("add").addEventListener("click", () => {
    const elemento = document.querySelector(".product__info").cloneNode(true);

    document.querySelector(".form__produtos").appendChild(elemento);
});
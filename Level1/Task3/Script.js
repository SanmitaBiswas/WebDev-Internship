const form = document.getElementById("btn");
const modal = document.getElementById("modal");
const close = document.getElementById("closeModal");

form.onclick = function(e) {
    e.preventDefault();
    modal.style.display = "block";
}

close.onclick = () => {
    modal.style.display = "none";
}

window.onclick = function(e) {
    if(e.target == modal) {
        modal.style.display = "none";
    }
}

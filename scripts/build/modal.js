"use strict";
var modal = document.getElementById("modal-container");
var aboutButton = document.getElementById("info-button");
var modalClose = document.getElementsByClassName("modal-close")[0];
aboutButton.onclick = function () {
    modal.style.display = "block";
};
modalClose.onclick = function () {
    modal.style.display = "none";
};
// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};

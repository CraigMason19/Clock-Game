"use strict";
var settingsModal = document.getElementById("settings-modal");
var aboutModal = document.getElementById("about-modal");
var settingsButton = document.getElementById("settings-button");
var aboutButton = document.getElementById("info-button");
var settingsClose = settingsModal.getElementsByClassName("modal-close")[0];
var aboutClose = aboutModal.getElementsByClassName("modal-close")[0];
// Mouse click
settingsButton.onclick = function () {
    settingsModal.style.display = "block";
};
aboutButton.onclick = function () {
    aboutModal.style.display = "block";
};
// Close buttons
settingsClose.onclick = function () {
    settingsModal.style.display = "none";
};
aboutClose.onclick = function () {
    aboutModal.style.display = "none";
};
// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == settingsModal) {
        settingsModal.style.display = "none";
    }
    else if (event.target == aboutModal) {
        aboutModal.style.display = "none";
    }
};

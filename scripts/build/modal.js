import { clocks } from './app.js';
export let markerMode = 'marker-numeral';
var settingsButton = document.getElementById("settings-button");
var aboutButton = document.getElementById("info-button");
var settingsModal = document.getElementById("settings-modal");
var aboutModal = document.getElementById("about-modal");
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
// Allow the settings buttons to dynamically alter the header color or markings
document.querySelectorAll('.item-button').forEach(button => {
    button.addEventListener('click', () => {
        if (button.hasAttribute('data-theme')) {
            const theme = button.getAttribute('data-theme');
            document.documentElement.style.setProperty('--color-header', `var(--color-header-${theme})`);
        }
        else if (button.hasAttribute('data-marker')) {
            markerMode = button.getAttribute('data-marker');
            clocks.forEach(c => c.setMarkings(markerMode));
        }
    });
});

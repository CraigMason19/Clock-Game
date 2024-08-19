var modal = document.getElementById("modal-container") as HTMLElement;
var aboutButton = document.getElementById("info-button") as HTMLButtonElement;
var modalClose = document.getElementsByClassName("modal-close")[0] as HTMLSpanElement;

aboutButton.onclick = function() {
    modal.style.display = "block";
}

modalClose.onclick = function() {
	modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
	if (event.target == modal) {
		modal.style.display = "none";
	}
}
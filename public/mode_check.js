function modeChanged(checkboxElem) {
    if (checkboxElem.checked) {
        localStorage.setItem("mode", 1);
        alert("You will be changed to Firebase mode");
        // Initialize Firebase
    } else {
        localStorage.setItem("mode", 0);
        alert("You will be changed to REST mode");
    }
}
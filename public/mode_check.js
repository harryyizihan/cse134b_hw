function modeChanged(checkboxElem) {
    if (checkboxElem.checked) {
        global_mode = 1;
        alert("You will be changed to Firebase mode");
    } else {
        global_mode = 0;
        alert("You will be changed to REST mode");
    }
}
function modeChanged(checkboxElem) {
    if (checkboxElem.checked) {
        localStorage.setItem("mode", 1);
    } else {
        localStorage.setItem("mode", 0);
    }
}
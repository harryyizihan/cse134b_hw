(function() {
    const btnSignOut = document.getElementById('sign-out-btn');

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {

        } else {
            //alert("You are not logged in, how could you get to this page???");
        }
    });

    btnSignOut.addEventListener('click', e => {
        global_mode = localStorage.getItem("mode");
        if (global_mode == 1) {
            firebase.auth().signOut().then(function() {
                alert('successfully logged out!');
                window.location = 'login_form.html';
            }).catch(function(error) {
                alert(error);
            });
        }

        //REST
        else {

        }

    });
}());
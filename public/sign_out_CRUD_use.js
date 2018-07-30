(function() {
    const btnSignOut = document.getElementById('sign-out-btn');

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {

        } else {
            //alert("You are not logged in, how could you get to this page???");
        }
    });

    btnSignOut.addEventListener('click', e => {
        firebase.auth().signOut().then(function() {
            alert('successfully logged out!');
            window.location = 'login_form.html';
        }).catch(function(error) {
            alert(error);
        });
    });
}());
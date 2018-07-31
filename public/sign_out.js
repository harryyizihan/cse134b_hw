(function() {
    const btnSignOut = document.getElementById('sign-out-btn');
    const btnSignOut2 = document.getElementById('sign-out-btn-2');

    btnSignOut.addEventListener('click', e => {
        var global_mode = localStorage.getItem("mode");
        if (global_mode == 1) {
            firebase.auth().signOut().then(function() {
                alert('successfully logged out!');
                window.location.href = 'login_form.html';
            }).catch(function(error) {
                alert(error);
            });
        } 
        
        //REST
        else {
            window.location.href = 'login_form.html';
        }
    });

    btnSignOut2.addEventListener('click', e => {
        var global_mode = localStorage.getItem("mode");
        if (global_mode == 1) {
            firebase.auth().signOut().then(function() {
                alert('successfully logged out!');
                window.location.href = 'login_form.html';
            }).catch(function(error) {
                alert(error);
            });
        } 
        
        //REST
        else {
            window.location.href = 'login_form.html';
        }
    });
}());
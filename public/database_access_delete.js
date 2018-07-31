(function() {
    var config = {
        apiKey: "AIzaSyCNwQawqcisZevqPOA-HKubRkEQl-CGX0Y",
        authDomain: "real-issue-tracker.firebaseapp.com",
        databaseURL: "https://real-issue-tracker.firebaseio.com",
        storageBucket: "real-issue-tracker.appspot.com"
    };
    firebase.initializeApp(config);

    var rootNode = document.getElementById('closeselect');

    var userId;
    var issueInfoTable=[];
    //const attachment;
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            userId = user.uid; 
            firebase.database().ref('/users/' + userId).on('value', function(snapshot) {
            	var localcount=1;
                snapshot.forEach(element => {
                	console.log(element.val().status);
                	if(element.val().status=="close"||element.val().status=="resolve"){

                	}else{
                    	var node = document.createElement("option");
                    	node.setAttribute("value", element.val().id);
	                    var content = 'Issue #' + element.val().id + ': ' + element.val().name;
	                    var textNode = document.createTextNode(content);
	                    node.appendChild(textNode);
	                    rootNode.appendChild(node);
	                    issueInfoTable[localcount]=[];
	                    issueInfoTable[localcount].push(element.val().name);
	                    issueInfoTable[localcount].push(element.val().type);
	                    issueInfoTable[localcount].push(element.val().importance);
	                    issueInfoTable[localcount].push(element.val().description);
	                    localcount=localcount+1;
                	}
                });
            });
        } else {
            //alert("You are not logged in, how could you get to this page???");
            return null;
        }
    });

    const deletebutton=document.getElementById("deletebutton");
    deletebutton.addEventListener('click',function(){
        const selector=document.getElementById("closeselect");
        const deletereason=document.getElementsByClassName("checks");
        var reasons="";
        var index=selector.value;
        var firebaseref=firebase.database().ref("users/"+userId+"/");
        for (var i = 0; i < 4; i++) {
            if(deletereason[i].checked){
                reasons+=deletereason[i].value+" ";
            }
        };
        firebaseref.child(index).remove();
        var globalref=firebase.database().ref("deletelogs");
        globalref.child(userId).child(index).set(reasons);
    });
    
}());

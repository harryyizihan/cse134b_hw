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
    var issueInfoTable = [];
    //const attachment;

    if (localStorage.getItem("mode") == 1) {
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                userId = user.uid;
                firebase.database().ref('/users/' + userId).on('value', function(snapshot) {
                    var localcount = 1;
                    snapshot.forEach(element => {
                        console.log(element.val().status);
                        if (element.val().status == "close" || element.val().status == "resolve") {

                        } else {
                            var node = document.createElement("option");
                            node.setAttribute("value", element.val().id);
                            var content = 'Issue #' + element.val().id + ': ' + element.val().name;
                            var textNode = document.createTextNode(content);
                            node.appendChild(textNode);
                            rootNode.appendChild(node);
                            issueInfoTable[localcount] = [];
                            issueInfoTable[localcount].push(element.val().name);
                            issueInfoTable[localcount].push(element.val().type);
                            issueInfoTable[localcount].push(element.val().importance);
                            issueInfoTable[localcount].push(element.val().description);
                            localcount = localcount + 1;
                        }
                    });
                });
            } else {
                //alert("You are not logged in, how could you get to this page???");
                return null;
            }
        });
    }

    //REST
    else {
        const url_db = 'http://localhost:3000/db';

            let xhr = new XMLHttpRequest();
            let numIssues;
            xhr.open('GET', url_db, true);
            xhr.onload = function() {
                data = JSON.parse(this.responseText);
                numIssues = data.issues.length;

                for (i = 0; i < numIssues; i++) {
                    var node = document.createElement("option");
                    node.setAttribute("value", data.issues[i].id);
                    var content = 'Issue #' +  data.issues[i].id + ': ' + data.issues[i].name;
                    var textNode = document.createTextNode(content);
                    node.appendChild(textNode);
                    rootNode.appendChild(node);
                    issueInfoTable[i]=[];
                    issueInfoTable[i].push(data.issues[i].name);
                    issueInfoTable[i].push(data.issues[i].type);
                    issueInfoTable[i].push(data.issues[i].importance);
                    issueInfoTable[i].push(data.issues[i].description);
                }
            }
            xhr.send();
    }


    var selector = document.getElementById("closeselect");
    var list = document.getElementById("issue-info");
    selector.addEventListener('change', function() {
        var current = selector.selectedIndex;

        var removables = document.getElementsByClassName('removable');
        while (removables[0]) {
            removables[0].parentNode.removeChild(removables[0]);
        }
        if (current !== "") {
            var svg = document.getElementById('curvedborder2');
            svg.setAttribute('d', 'M100,100 L200,100');
            list.style.display = "block";
            var listItem1 = document.createElement('li');
            listItem1.innerHTML = "Project in concern: " + "<br>" + issueInfoTable[current][0];
            listItem1.className = "removable";
            listItem1.style = "font-size:14px"
            list.appendChild(listItem1);
            var listItem2 = document.createElement('li');
            listItem2.innerHTML = "Issue Type: " + issueInfoTable[current][1];
            listItem2.className = "removable";
            listItem2.style = "font-size:14px"
            list.appendChild(listItem2);
            var listItem3 = document.createElement('li');
            listItem3.innerHTML = "Importance: " + issueInfoTable[current][2];
            listItem3.className = "removable";
            listItem3.style = "font-size:14px";
            listItem3.style.color = issueInfoTable[current][2] > 66 ? "red" : (issueInfoTable[current][2] > 33 ? "blue" : "green");
            list.appendChild(listItem3);
            var listItem4 = document.createElement('li');
            listItem4.innerHTML = "Description: " + issueInfoTable[current][3] + "<hr>";
            listItem4.className = "removable";
            listItem4.style = "font-size:12px"
            list.appendChild(listItem4);
        };
    });

    const submitbutton = document.getElementById("submitbutton");
    const statusradio = document.getElementsByClassName("radioin");
    submitbutton.addEventListener('click', function() {
        const shortdesc = document.getElementById("shortdescfield");
        const longdesc = document.getElementById("longdescfield");
        const statusradio = document.getElementsByClassName("radioin");
        var index = selector.value;

        if (localStorage.getItem("mode") == 1) {
            var firebaseref = firebase.database().ref("users/" + userId + "/" + index);
            var status = (statusradio[0].checked == true) ? "closed" : "resolved";
            firebaseref.child("status").set(status);
            firebaseref.child("closeshortdesc").set(shortdesc.value);
            firebaseref.child("closelongdesc").set(longdesc.value);
            alert("Successfully " + status + " the issue!");
            window.location = 'issuelist.html';
        }

        // REST
        else {
            const url_db='http://localhost:3000/db';
            let xhr=new XMLHttpRequest();
            var updates={};
            updates.name=issueInfoTable[index][0];
            updates.type=issueInfoTable[index][1];
            updates.importance=issueInfoTable[index][2];
            updates.description=issueInfoTable[index][3];
            updates.status=(statusradio[0].checked == true) ? "closed" : "resolved";
            updates.closeshortdesc=shortdesc.value;
            update.closelongdesc=longdesc.value;
            xhr.open('PUT',url_db,true);
            xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
            xhr.onload=function(){
                window.location='issuelist.html';
            }
            xhr.send(updates);
        }

    });
}());
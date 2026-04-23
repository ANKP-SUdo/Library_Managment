const ADMIN_EMAIL = "admin@gmail.com";

$(document).ready(function() {
    $(".login-form").submit(function(e) {
        e.preventDefault();
        login();
    });

    $(".register-form").submit(function(e) {
        e.preventDefault();
        registerMe();
    });

    firebase.auth().onAuthStateChanged(function(user) {
        if (user && user.email !== ADMIN_EMAIL) {
            window.location = "user_portal.html";
        }
    });

});

function registerMe() {
    var db = firebase.firestore();
    var name = document.getElementById("usr_name").value.trim();
    var password = document.getElementById("usr_pass").value;
    var email = document.getElementById("usr_email").value.trim();
    var rollNumber = document.getElementById("usr_roll").value.trim();
    var dateOfBirth = document.getElementById("usr_dob").value;

    if (!name || !password || !email || !rollNumber || !dateOfBirth) {
        window.alert("Please complete all signup fields.");
        return;
    }

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(function(result) {
            var createdUser = result.user;
            return db.collection("users").doc(createdUser.uid).set({
                uid: createdUser.uid,
                name: name,
                Email: email,
                Roll_Number: rollNumber,
                DOB: dateOfBirth,
                books: [],
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            }).catch(function(error) {
                return createdUser.delete().catch(function(deleteError) {
                    console.log("Rollback failed:", deleteError);
                }).then(function() {
                    throw error;
                });
            });
        })
        .then(function() {
            window.alert("Account created successfully.");
            window.location = "user_portal.html";
        })
        .catch(function(error) {
            window.alert(error.message);
        });
}

function login() {
    var email = document.getElementById("username").value.trim();
    var password = document.getElementById("password").value;

    if (!email || !password) {
        window.alert("Enter your email and password.");
        return;
    }

    if (email === ADMIN_EMAIL) {
        window.alert("Use the admin login page for the admin account.");
        return;
    }

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(function() {
            window.location = "user_portal.html";
        })
        .catch(function(error) {
            window.alert(error.message);
        });
}


const ADMIN_EMAIL = "admin@gmail.com";

$(document).ready(function() {
    $(".login-form").submit(function(e) {
        e.preventDefault();
        login();
    });

    $("#back_button").click(function() {
        logout();
    });

    firebase.auth().onAuthStateChanged(function(user) {
        if (user && user.email === ADMIN_EMAIL) {
            window.location = "admin_portal.html";
        }
    });
});

function login() {
    var email = document.getElementById("username").value.trim();
    var password = document.getElementById("password").value;

    if (email !== ADMIN_EMAIL) {
        window.alert("Only the admin account can sign in here.");
        return;
    }

    firebase.auth().signInWithEmailAndPassword(email, password)
        .catch(function(error) {
            window.alert(error.message);
        });
}

function logout() {
    firebase.auth().signOut().catch(function(error) {
        console.log("Sign out failed:", error);
    });
}

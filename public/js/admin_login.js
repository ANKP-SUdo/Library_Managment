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

function getFriendlyAdminMessage(error, fallbackMessage) {
    var errorMessages = {
        "auth/invalid-email": "Enter a valid admin email address.",
        "auth/user-not-found": "The admin account was not found in Firebase Authentication.",
        "auth/wrong-password": "The admin password is incorrect.",
        "auth/invalid-credential": "The admin email or password is incorrect.",
        "auth/too-many-requests": "Too many attempts. Please wait a bit and try again.",
        "auth/operation-not-allowed": "Email/password sign-in is not enabled in Firebase Authentication."
    };

    if (!error) {
        return fallbackMessage;
    }

    if (error.code && errorMessages[error.code]) {
        return errorMessages[error.code];
    }

    if (error.code) {
        return fallbackMessage + " (" + error.code + ")";
    }

    return fallbackMessage;
}

function login() {
    var email = document.getElementById("username").value.trim();
    var password = document.getElementById("password").value;

    if (!email || !password) {
        window.alert("Enter the admin email and password.");
        return;
    }

    if (email !== ADMIN_EMAIL) {
        window.alert("Only the admin account can sign in here.");
        return;
    }

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(function() {
            console.log("Admin login succeeded for:", email);
        })
        .catch(function(error) {
            console.error("Admin login failed:", error);
            window.alert(getFriendlyAdminMessage(error, "Admin login failed."));
        });
}

function logout() {
    firebase.auth().signOut().catch(function(error) {
        console.log("Sign out failed:", error);
    });
}

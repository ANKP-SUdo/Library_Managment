const ADMIN_EMAIL = "admin@gmail.com";
var isRegistering = false;

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
        if (user && user.email !== ADMIN_EMAIL && !isRegistering) {
            window.location = "user_portal.html";
        }
    });

});

function getFriendlyFirebaseMessage(error, fallbackMessage) {
    var errorMessages = {
        "auth/email-already-in-use": "That email address is already registered.",
        "auth/invalid-email": "Enter a valid email address.",
        "auth/weak-password": "Password should be at least 6 characters long.",
        "auth/operation-not-allowed": "Email/password sign-in is not enabled in Firebase Authentication.",
        "auth/user-not-found": "No account was found for that email address.",
        "auth/wrong-password": "The password is incorrect.",
        "auth/invalid-credential": "The email or password is incorrect.",
        "auth/too-many-requests": "Too many attempts. Please wait a bit and try again.",
        "permission-denied": "The profile could not be saved to Firestore. Check your Firestore rules and deployment."
    };

    if (!error) {
        return fallbackMessage;
    }

    if (error.code && errorMessages[error.code]) {
        return errorMessages[error.code];
    }

    var messageText = "";

    if (typeof error.message === "string") {
        messageText = error.message;
    } else {
        try {
            messageText = JSON.stringify(error);
        } catch (serializationError) {
            messageText = "";
        }
    }

    if (messageText.indexOf("CONFIGURATION_NOT_FOUND") !== -1) {
        return "Firebase Authentication is not configured for this app. Enable Email/Password sign-in in Firebase Console and confirm localhost is an authorized domain.";
    }

    if (messageText.indexOf("EMAIL_NOT_FOUND") !== -1) {
        return "No account was found for that email address.";
    }

    if (messageText.indexOf("INVALID_LOGIN_CREDENTIALS") !== -1) {
        return "The email or password is incorrect.";
    }

    if (messageText.indexOf("PASSWORD_LOGIN_DISABLED") !== -1) {
        return "Email/password sign-in is not enabled in Firebase Authentication.";
    }

    if (messageText.indexOf("PERMISSION_DENIED") !== -1) {
        return "The profile could not be saved to Firestore. Check your Firestore rules and deployment.";
    }

    if (error.code) {
        return fallbackMessage + " (" + error.code + ")";
    }

    return fallbackMessage;
}

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

    isRegistering = true;

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(function(result) {
            var createdUser = result.user;
            console.log("Auth signup succeeded for:", createdUser.uid);

            return db.collection("users").doc(createdUser.uid).set({
                uid: createdUser.uid,
                name: name,
                Email: email,
                Roll_Number: rollNumber,
                DOB: dateOfBirth,
                books: [],
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            }).then(function() {
                console.log("Firestore profile created for:", createdUser.uid);
            }).catch(function(error) {
                console.error("Firestore profile creation failed:", error);

                return createdUser.delete().catch(function(deleteError) {
                    console.error("Rollback delete failed:", deleteError);
                }).then(function() {
                    throw error;
                });
            });
        })
        .then(function() {
            isRegistering = false;
            window.alert("Account created successfully.");
            window.location = "user_portal.html";
        })
        .catch(function(error) {
            isRegistering = false;
            console.error("Signup flow failed:", error);
            window.alert(getFriendlyFirebaseMessage(error, "Signup failed."));
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
            console.log("User login succeeded for:", email);
            window.location = "user_portal.html";
        })
        .catch(function(error) {
            console.error("User login failed:", error);
            window.alert(getFriendlyFirebaseMessage(error, "Login failed."));
        });
}


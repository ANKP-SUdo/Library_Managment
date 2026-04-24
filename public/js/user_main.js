const ADMIN_EMAIL = "admin@gmail.com";

$(document).ready(function() {
    $("#log_button").click(function() {
        logout();
    });

    firebase.auth().onAuthStateChanged(function(user) {
        if (!user || user.email === ADMIN_EMAIL) {
            window.location = "usr_login.html";
            return;
        }

        loadBooks();
        loadProfile(user.uid);
    });
});

function escapeHtml(value) {
    return String(value || "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/\"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

function loadBooks() {
    var db = firebase.firestore();
    var container = $("#books");

    container.empty();

    db.collection("books").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            var data = doc.data();
            container.append(
                "<div><h2>" + escapeHtml(data.bookcode) + " - " + escapeHtml(data.bookname) + "</h2>" +
                "<h3>" + escapeHtml(data.author1) + (data.author2 ? " , " + escapeHtml(data.author2) : "") + "</h3>" +
                "<h3>" + escapeHtml(data.subject) + "</h3>" +
                "<p>" + escapeHtml(data.tags) + "</p>" +
                "</div><hr>"
            );
        });

        if (!container.children().length) {
            container.append("<p>No books available right now.</p>");
        }
    }).catch(function(error) {
        console.log("Error getting books:", error);
        container.html("<p>Unable to load books right now.</p>");
    });
}

function loadProfile(uid) {
    var db = firebase.firestore();
    var container = $("#about_me");

    container.empty();

    db.collection("users").doc(uid)
        .get()
        .then(function(doc) {
            if (!doc.exists) {
                container.html("<p>User profile not found.</p>");
                return;
            }

            var data = doc.data();
            var borrowedBooks = Array.isArray(data.books) ? data.books : [];
            var booksSet = "<ul>";

            if (borrowedBooks.length) {
                for (var i = 0; i < borrowedBooks.length; i++) {
                    booksSet += "<li>" + escapeHtml(borrowedBooks[i]) + "</li>";
                }
            } else {
                booksSet += "<li>No books issued</li>";
            }

            booksSet += "</ul>";

            container.append(
                "<div><h1>Name : " + escapeHtml(data.name) + "</h1>" +
                "<h2>Roll Number : " + escapeHtml(data.Roll_Number) + "</h2>" +
                "<h2>Date of Birth : " + escapeHtml(data.DOB) + "</h2>" +
                "<h2>E-mail Id: " + escapeHtml(data.Email) + "</h2><hr>" +
                "<h2>Books</h2>" +
                booksSet +
                "</div>"
            );
        })
        .catch(function(error) {
            console.log("Error getting profile:", error);
            container.html("<p>Unable to load your profile right now.</p>");
        });
}

function logout() {
    firebase.auth().signOut().then(function() {
        window.location = "usr_login.html";
    }).catch(function(error) {
        console.log("error", error);
    });
}

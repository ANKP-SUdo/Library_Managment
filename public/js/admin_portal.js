const ADMIN_EMAIL = "admin@gmail.com";

$(document).ready(function() {
    $("#Students_search").submit(function(e) {
        e.preventDefault();
        loadUsers($("#student-search-bar").val().trim().toLowerCase());
        showStudents();
    });

    $("#Books_search").submit(function(e) {
        e.preventDefault();
        loadBooks($("#book-search-bar").val().trim().toLowerCase());
        showBooks();
    });

    $("#log_button").click(function() {
        logout();
    });

    document.getElementById("books").style.display = "none";
    document.getElementById("users").style.display = "none";

    firebase.auth().onAuthStateChanged(function(user) {
        if (!user || user.email !== ADMIN_EMAIL) {
            window.location = "admin_login.html";
            return;
        }

        loadBooks("");
        loadUsers("");
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

function showBooks() {
    document.getElementById("users").style.display = "none";
    document.getElementById("books").style.display = "block";
}

function showStudents() {
    document.getElementById("books").style.display = "none";
    document.getElementById("users").style.display = "block";
}

function loadBooks(searchTerm) {
    var db = firebase.firestore();
    var container = $("#books");

    container.empty();

    db.collection("books").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            var data = doc.data();
            var searchable = [
                data.bookcode,
                data.bookname,
                data.author1,
                data.author2,
                data.subject,
                data.tags
            ].join(" ").toLowerCase();

            if (searchTerm && searchable.indexOf(searchTerm) === -1) {
                return;
            }

            container.append(
                "<div><h2>" + escapeHtml(data.bookcode) + " - " + escapeHtml(data.bookname) + "</h2>" +
                "<h3>" + escapeHtml(data.author1) + (data.author2 ? " , " + escapeHtml(data.author2) : "") + "</h3>" +
                "<h3>" + escapeHtml(data.subject) + "</h3>" +
                "<p>" + escapeHtml(data.tags) + "</p>" +
                "</div><hr>"
            );
        });

        if (!container.children().length) {
            container.append("<p>No books found.</p>");
        }
    }).catch(function(error) {
        console.log("Error getting books:", error);
        container.html("<p>Unable to load books right now.</p>");
    });
}

function loadUsers(searchTerm) {
    var db = firebase.firestore();
    var container = $("#users");

    container.empty();

    db.collection("users").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            var data = doc.data();
            var borrowedBooks = Array.isArray(data.books) ? data.books : [];
            var searchable = [
                data.name,
                data.Roll_Number,
                data.DOB,
                data.Email,
                borrowedBooks.join(" ")
            ].join(" ").toLowerCase();

            if (searchTerm && searchable.indexOf(searchTerm) === -1) {
                return;
            }

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
                "<div><h2>" + escapeHtml(data.name) + "</h2>" +
                "<h3>Roll Number : " + escapeHtml(data.Roll_Number) + "</h3>" +
                "<h3>Date of Birth : " + escapeHtml(data.DOB) + "</h3>" +
                "<h3>E-mail Id: " + escapeHtml(data.Email) + "</h3>" +
                booksSet +
                "</div><hr>"
            );
        });

        if (!container.children().length) {
            container.append("<p>No students found.</p>");
        }
    }).catch(function(error) {
        console.log("Error getting users:", error);
        container.html("<p>Unable to load students right now.</p>");
    });
}

function logout() {
    firebase.auth().signOut().then(function() {
        window.location = "admin_login.html";
    }).catch(function(error) {
        console.log("error", error);
    });
}

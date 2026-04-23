const ADMIN_EMAIL = "admin@gmail.com";

$(document).ready(function() {
    $("#book-form").submit(function(e) {
        e.preventDefault();
        addThis();
    });

    firebase.auth().onAuthStateChanged(function(user) {
        if (!user || user.email !== ADMIN_EMAIL) {
            window.location = "admin_login.html";
        }
    });
});

function addThis() {
    var bookCode = document.getElementById("book_code").value.trim();
    var bookName = document.getElementById("book_name").value.trim();
    var author1 = document.getElementById("author1").value.trim();
    var author2 = document.getElementById("author2").value.trim();
    var subject = document.getElementById("Subject").value.trim();
    var tags = document.getElementById("tags").value.trim();
    var db = firebase.firestore();

    if (!bookCode || !bookName || !author1 || !subject) {
        window.alert("Please fill in all required book details.");
        return;
    }

    db.collection("books").doc(bookCode).set({
        bookcode: bookCode,
        bookname: bookName,
        author1: author1,
        author2: author2,
        subject: subject,
        tags: tags,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
    })
        .then(function() {
            window.alert("Book added successfully.");
            window.location = "admin_portal.html";
        })
        .catch(function(error) {
            console.error("Error writing document:", error);
            window.alert(error.message);
        });
}

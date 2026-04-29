# Library Management System

## Mini Project Report

### Project Title

Library Management System

### Project Type

Web-based Library Management Application

### Live Project Link

https://library-managment-e5f95.web.app

---

## 1. Abstract

The Library Management System is a web-based application designed to manage
library users and books through separate admin and user portals. The system
allows users to register, log in, and view available books, while the admin can
log in, add books, view student records, and search book/user data.

The application is developed using HTML, CSS, JavaScript, Firebase
Authentication, Firebase Firestore, and Firebase Hosting. Docker support is also
implemented using Nginx so the frontend can be served inside a container. GitHub
Actions are used for Firebase deployment and Docker image build automation.

---

## 2. Introduction

Traditional library operations such as managing book records, student records,
and user access can become time-consuming when handled manually. This project
aims to simplify these operations by providing a digital platform where users
can access library information and admins can manage records efficiently.

The project uses Firebase as the backend service, which removes the need for a
custom server and provides authentication, database storage, and hosting.

---

## 3. Problem Statement

Manual library management can lead to issues such as:

- Difficulty maintaining book and student records
- Time-consuming search and update operations
- Lack of centralized access to library data
- Manual handling of user registration and authentication

This project solves these problems by creating a web-based system with separate
interfaces for users and administrators.

---

## 4. Objectives

The main objectives of the project are:

- To provide a simple online library portal
- To allow users to register and log in securely
- To allow users to view available books
- To allow admins to add and manage book records
- To allow admins to view and search student records
- To store data securely using Firebase Firestore
- To deploy the application using Firebase Hosting
- To implement Docker-based containerization for local/demo deployment

---

## 5. Scope of the Project

The system includes:

- Admin login
- User registration and login
- User portal
- Admin portal
- Add book functionality
- View/search books
- View/search registered users
- Firebase Authentication integration
- Firestore database integration
- Firebase Hosting deployment
- Docker containerization

The system does not currently include:

- Online payment
- Book issue/return approval workflow
- Fine calculation
- Advanced reporting dashboard
- Email notification system

---

## 6. Technology Stack

| Category | Technology |
| --- | --- |
| Frontend | HTML, CSS, JavaScript |
| JavaScript Library | jQuery |
| Authentication | Firebase Authentication |
| Database | Firebase Firestore |
| Hosting | Firebase Hosting |
| Containerization | Docker |
| Web Server in Container | Nginx |
| Automation | GitHub Actions |
| Version Control | Git and GitHub |

---

## 7. System Architecture

The system follows a frontend-with-cloud-backend architecture.

```text
User Browser
    |
    | HTML/CSS/JavaScript
    |
Firebase Hosting / Docker Nginx Server
    |
    | Firebase SDK
    |
Firebase Authentication + Firestore Database
```

The frontend is served either through Firebase Hosting or through a Docker
container running Nginx. The application uses Firebase SDKs in the browser to
communicate with Firebase Authentication and Firestore.

---

## 8. Main Modules

### 8.1 Home Page

The home page provides two entry points:

- Admin Login
- User Login

### 8.2 User Module

The user module allows students/users to:

- Register with personal details
- Log in using email and password
- View their profile
- View available books
- Log out securely

### 8.3 Admin Module

The admin module allows the administrator to:

- Log in using the admin account
- Add new books
- View available books
- Search books
- View registered users
- Search student records
- Log out securely

### 8.4 Firebase Authentication

Firebase Authentication is used for:

- User registration
- User login
- Admin login
- Session management
- Protecting admin and user pages

### 8.5 Firestore Database

Firestore is used to store:

- Book records
- User profile records
- User book information

---

## 9. Database Design

The project uses Firebase Firestore, a NoSQL cloud database.

### 9.1 Users Collection

Collection name:

```text
users
```

Main fields:

| Field | Description |
| --- | --- |
| uid | Firebase Authentication user ID |
| name | User name |
| Email | User email address |
| Roll_Number | Student roll number |
| DOB | Date of birth |
| books | List of issued books |
| createdAt | Account creation timestamp |

### 9.2 Books Collection

Collection name:

```text
books
```

Main fields:

| Field | Description |
| --- | --- |
| bookcode | Unique book code |
| bookname | Name of the book |
| author1 | Primary author |
| author2 | Secondary author |
| subject | Book subject |
| tags | Search tags |
| createdAt | Book creation timestamp |

---

## 10. Security Rules

Firestore security rules are used to protect database access.

Main security behavior:

- Only signed-in users can read books
- Only the admin can create, update, or delete books
- Users can create their own profile
- Users can read only their own profile
- Admin can read user records
- Unknown document access is denied

The admin account is identified using the configured admin email.

---

## 11. Containerization Using Docker

Docker is implemented to package the static frontend into a container.

### Docker Components

| File | Purpose |
| --- | --- |
| Dockerfile | Builds the Docker image using Nginx |
| nginx.conf | Configures Nginx to serve frontend files |
| docker-compose.yml | Runs the container locally |
| .dockerignore | Excludes unnecessary files from Docker build context |

### Docker Run Command

```powershell
docker compose up --build
```

Application URL:

```text
http://localhost:8080
```

Docker only serves the frontend. Firebase Authentication and Firestore still run
from Firebase cloud services.

---

## 12. Deployment

### 12.1 Firebase Hosting

Firebase Hosting is used as the main deployment platform.

Live URL:

```text
https://library-managment-e5f95.web.app
```

Firebase Hosting serves the files from the `public` folder.

### 12.2 GitHub Actions

GitHub Actions are used for automation.

Existing workflows:

- Firebase Hosting deployment on pull requests
- Firebase Hosting deployment on merge to main
- Docker image build workflow

The Docker workflow builds the image on pull requests and publishes it to GitHub
Container Registry on pushes to the main branch.

---

## 13. Testing

The project was tested using:

- Local Firebase serving
- Docker container serving
- Firebase hosted URL
- Browser testing
- Firebase Authentication login/signup testing
- Firestore read/write permission testing

### Docker Verification

The Docker container was verified with:

- Successful Docker image build
- Running container status
- Healthy container state
- HTTP status `200` from `localhost:8080`
- Successful loading of key frontend files

---

## 14. Advantages

- Simple and easy-to-use interface
- Separate admin and user portals
- Cloud-based authentication
- Cloud-hosted database
- No custom backend server required
- Firebase Hosting provides easy deployment
- Docker allows container-based local/demo execution
- GitHub Actions improve automation

---

## 15. Limitations

- Admin role is based on a fixed admin email
- No full book issue/return workflow yet
- No fine management system
- No dashboard analytics
- No email notification system
- Internet is required for Firebase services

---

## 16. Future Enhancements

Possible future improvements include:

- Book issue and return management
- Due date and fine calculation
- Admin dashboard with statistics
- Email notifications
- Role-based access control using Firebase custom claims
- Book availability tracking
- Search filters by author, subject, and tags
- Responsive UI improvements
- PDF report generation

---

## 17. Conclusion

The Library Management System successfully provides a basic digital solution for
managing library books and users. It uses Firebase Authentication for secure
login, Firestore for cloud database storage, and Firebase Hosting for online
deployment. Docker support adds containerization, making the project easier to
run consistently in different environments.

Overall, the project demonstrates the use of modern web technologies, cloud
services, deployment automation, and containerization in a practical library
management scenario.

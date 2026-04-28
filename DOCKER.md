# Docker Setup

This project is a static Firebase web app. Docker only serves the files in the
`public` folder; Firebase Authentication and Firestore still use the Firebase
project configured in `public/js/firebase-config.js`.

## Run With Docker Compose

```powershell
docker compose up --build
```

Open:

```text
http://localhost:8080
```

Stop the container:

```powershell
docker compose down
```

## Run With Docker Commands

Build the image:

```powershell
docker build -t library-management .
```

Run the container:

```powershell
docker run --name library-management -p 8080:80 library-management
```

Open:

```text
http://localhost:8080
```

Stop and remove the container:

```powershell
docker stop library-management
docker rm library-management
```

## GitHub Actions Automation

The workflow at `.github/workflows/docker-image.yml` builds the Docker image on
pull requests and pushes.

On pull requests, it only checks that the image builds successfully.

On pushes to `main`, it also publishes the image to GitHub Container Registry:

```text
ghcr.io/<github-owner>/<repository-name>
```

No Docker Hub account is required for this workflow. It uses GitHub's built-in
`GITHUB_TOKEN`.

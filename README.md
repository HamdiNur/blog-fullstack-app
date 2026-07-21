# Blog Journal — Full Stack App

A full-stack blog application built to practice Spring Boot entity relationships, REST API design, and connecting a separate frontend to a Java backend.

Built as part of a learning path toward a larger Hospital Management System project — this one focuses specifically on one-to-many relationships (Post ↔ Comment), DTO design, and React ↔ Spring Boot integration.

## Tech Stack

**Backend**
- Java 21
- Spring Boot 4.1.0
- Spring Data JPA / Hibernate
- PostgreSQL
- Lombok
- Maven

**Frontend**
- React (Vite)
- Tailwind CSS v4
- React Router

## Features

- Full CRUD on blog posts (create, read, update, delete)
- Comments on posts, with a one-to-many relationship (cascade delete, orphan removal)
- Clean DTO separation (list view vs. detail view with nested comments) to avoid circular serialization
- Inline post editing
- Custom confirm modals for destructive actions
- CORS-configured API for local frontend development

## Project Structure

blog-project/
├── blog-api/ # Spring Boot backend
└── blog-frontend/ # React + Vite frontend


## Running Locally

### Backend

1. Create a PostgreSQL database named `blogdb`
2. In `blog-api/src/main/resources/application.properties`, set your own database credentials:
```properties
   spring.datasource.url=jdbc:postgresql://localhost:5432/blogdb
   spring.datasource.username=your_username
   spring.datasource.password=your_password
```
3. Run the app:
```bash
   cd blog-api
   ./mvnw spring-boot:run
```
   The API will be available at `http://localhost:8080`

### Frontend

```bash
cd blog-frontend
npm install
npm run dev
```
The app will be available at `http://localhost:5173`

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/posts` | List all posts (summary) |
| GET | `/posts/{id}` | Get a single post with nested comments |
| POST | `/posts` | Create a new post |
| PUT | `/posts/{id}` | Update a post |
| DELETE | `/posts/{id}` | Delete a post (cascades to its comments) |
| POST | `/posts/{id}/comments` | Add a comment to a post |
| DELETE | `/comments/{id}` | Delete a comment |

## What I Learned

- Designing and mapping JPA entity relationships (`@OneToMany` / `@ManyToOne`), including cascading and orphan removal
- Why raw entities shouldn't be returned directly from a REST API, and how to design DTOs to avoid infinite recursion in bidirectional relationships
- Connecting a separately hosted frontend to a Spring Boot API, including CORS configuration
- Structuring a React app with reusable components, routing, and local state management
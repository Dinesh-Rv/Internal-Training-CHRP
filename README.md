# Product Management System API

A Node.js RESTful API for managing product categories, built with TypeScript, Express, Sequelize, and PostgreSQL.

## Features
- Category CRUD operations (Create, Read, Update, Delete)
- PostgreSQL database with Sequelize ORM
- Clean service/controller architecture
- Swagger (OpenAPI) documentation at `/api-docs`
- ESLint and Prettier for code quality
- **Jest unit testing and coverage**

## Prerequisites
- Node.js (v18+ recommended)
- PostgreSQL database

## Getting Started

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd <your-repo-directory>
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
Refer to the `.env.example` file for required environment variables and create your own `.env` file in the project root.

### 4. Run the application
- For development (with hot reload):
  ```bash
  npm run dev
  ```
- For production build:
  ```bash
  npm run build
  npm start
  ```

### 5. Access the API
- Base URL: `http://localhost:3000/api/categories`
- Swagger docs: `http://localhost:3000/api-docs`

## Testing
- Run all tests:
  ```bash
  npm test
  ```
- Run tests in watch mode:
  ```bash
  npm run test:watch
  ```
- Run tests with coverage report:
  ```bash
  npm run test:coverage
  ```

## API Endpoints

### Category
| Method | Endpoint                | Description                |
|--------|-------------------------|----------------------------|
| POST   | `/api/categories`       | Create a new category      |
| GET    | `/api/categories`       | Get all categories         |
| GET    | `/api/categories/:id`   | Get category by ID         |
| PUT    | `/api/categories/:id`   | Update category by ID      |
| DELETE | `/api/categories/:id`   | Delete (soft) category by ID |

### Example POST Body
```json
{
  "name": "Electronics",
  "description": "All kinds of electronic items",
  "isActive": true
}
```

## Linting & Formatting
- Run ESLint:
  ```bash
  npx eslint .
  ```
- Run Prettier:
  ```bash
  npx prettier --write .
  ```

## Swagger Documentation
- Visit [http://localhost:3000/api-docs](http://localhost:3000/api-docs) for interactive API docs.
- Endpoints are documented using OpenAPI/Swagger JSDoc comments in the route files.

## License
MIT 
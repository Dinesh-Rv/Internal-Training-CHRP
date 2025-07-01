# Stock Management System

A Node.js + TypeScript stock management system using Express.js, PostgreSQL, and Sequelize ORM.

## Features
- Express.js REST API
- PostgreSQL with Sequelize ORM
- TypeScript (strict mode)
- ESLint & Prettier for code quality
- MVC project structure

## Getting Started

### Prerequisites
- Node.js >= 16
- PostgreSQL

### Installation
```bash
npm install
```

### Environment Variables
Create a `.env` file in the root:
```
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name
PORT=3000
```

### Development
```bash
npm run dev
```

### Build
```bash
npm run build
```

### Lint & Format
```bash
npm run lint
npm run format
```

## Project Structure
```
src/
├── controllers/
├── models/
├── routes/
├── services/
├── middlewares/
├── utils/
├── config/
├── types/
└── app.ts
``` 
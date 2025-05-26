# SWAPI Nest Project

This project is a RESTful Star Wars API (SWAPI) implementation built using the NestJS framework. It provides a structured and scalable backend for managing Star Wars-related data, including support for file uploads.

## Tech Stack

- **Framework**: [NestJS](https://nestjs.com/)
- **Language**: TypeScript
- **Database**: MySQL
- **ORM**: [TypeORM](https://typeorm.io/) for database interaction
- **Validation**: [class-validator](https://github.com/typestack/class-validator) for data validation
- **File Uploads**: Handled using [Multer](https://github.com/expressjs/multer)
- **Configuration**: Managed via `config.yaml` for database and application settings
- **API Documentation**: [Swagger](https://swagger.io/) integration for interactive API documentation (available at `/api`)

## Prerequisites

Before running the project, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/) (v8 or higher)
- [MySQL](https://www.mysql.com/) (v8 or higher)

Additionally, ensure that a MySQL database with the name provided in the `config.yaml` file (e.g., `swapi2`) is already created.

## Installation

1. Clone the repository:
  ```bash
  git clone <repository-url>
  cd swapi_nest/swapi
  ```
2. Install dependencies:
  ```bash
  npm install
  ```

## Configuration

To configure the application, edit the `config.yaml` file and provide the following details:

### Database Configuration

- **host**: The hostname or IP address of your MySQL database server (e.g., `localhost` or `127.0.0.1`).
- **port**: The port number on which your MySQL database server is running (default: `3306`).
- **username**: The username for authenticating with the MySQL database.
- **password**: The password associated with the specified username.
- **database**: The name of the MySQL database to be used by the application (e.g., `swapi2`).

### Application Configuration

- **protocol**: The protocol used by the application (e.g., `http` or `https`).
- **host**: The hostname or IP address where the application will be accessible (e.g., `localhost` or `0.0.0.0`).
- **port**: The port number on which the application will run (e.g., `3000`).

## Running the Application

1. Before running the application, ensure the application is compiled:
  ```bash
  npm run build
  ```

2. Start the application in development mode:
  ```bash
  npm run start:dev
  ```
3. Start the application in production mode:
  ```bash
  npm run start:prod
  ```

In both cases ensure all necessary environment variables are set.

- **Database Migrations**: On the first setup, make sure to run all pending migrations to prepare the database schema:
  ```bash
  npm run migration:run
  ```

The application will be accessible at the host and port specified in your configuration (e.g., `http://<host>:<port>`).
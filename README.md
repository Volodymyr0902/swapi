# SWAPI Nest Project

This project is a RESTful Star Wars API (SWAPI) implementation built using the NestJS framework. It provides a structured and scalable backend for managing Star Wars-related data, including support for file uploads.

## Tech Stack

- **Framework**: [NestJS](https://nestjs.com/)
- **Language**: TypeScript
- **Database**: MySQL
- **Fast-access storage**: [Redis](https://redis.io/) is used for storing refresh tokens, password restoration tokens, and rate limiting data
- **ORM**: [TypeORM](https://typeorm.io/) for database interaction
- **Validation**: [class-validator](https://github.com/typestack/class-validator) for data validation
- **File Uploads**: Handled using [Multer](https://github.com/expressjs/multer)
- **File Storage**: [AWS S3](https://aws.amazon.com/s3/) integration for managing file uploads
- **Authentication**: [Passport-local](http://www.passportjs.org/packages/passport-local/) and [Passport-jwt](http://www.passportjs.org/packages/passport-jwt/) for user authentication with multi-sessions support
- **Authorization**: Role-Based Access Control (RBAC) for managing user permissions
- **Mailing**: [Nodemailer](https://nodemailer.com/about/) is used for password restoration functionality
- **Rate Limiting**: [NestJS Throttler](https://docs.nestjs.com/security/rate-limiting) is used for API rate limiting
- **Configuration**: Managed via `.env` for database, application and services settings
- **API Documentation**: [Swagger](https://swagger.io/) integration for interactive API documentation (available at `/api`)
- **Containerization**: [Docker](https://www.docker.com/) for consistent runtime environment
- **CI/CD**: [GitHub Actions](https://github.com/features/actions) workflow for automated testing, linting, and Docker image build and publishing

## Configuration

To configure the application, edit the `.env.schema` file in the project's root, provide your own credentials and/or basic variables. Remove '.schema'. part when completed.

## Running the Application

You can run the application either using Docker or locally on your machine.

## In any case:

1. Clone the repository:
  ```bash
  git clone https://github.com/Volodymyr0902/swapi
  cd swapi
  ```
2. Configure your environment variables.

### 1. Running with Docker

1. Ensure [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/) are installed.

2. Start the application and dependencies:
  ```bash
  docker compose up --build
  ```
  This will build and start the application along with a MySQL database container.

3. The application will be accessible at the `http://localhost:8000/api`.

### 2. Running Locally

#### Prerequisites

- [Node.js](https://nodejs.org/) (v22 or higher)
- [npm](https://www.npmjs.com/) (v8 or higher)
- [MySQL](https://www.mysql.com/) (v8 or higher)
- [Redis](https://redis.io/open-source/) (v8 or higher)

Ensure a MySQL database (e.g., `swapi2`) is created on your local instance as specified in your `.env` file.

#### Installation

1. Install dependencies:
  ```bash
  npm install
  ```

#### Running

1. Build the application:
  ```bash
  npm run build
  ```
2. Start in development mode:
  ```bash
  npm run start:dev
  ```
  Or start in production mode:
  ```bash
  npm run start:prod
  ```

In both cases, ensure all necessary environment variables are set.

- **Database Migrations**: Migrations are run automatically during setup, so no manual action is required to prepare the database schema.

The application will be accessible at the host and port specified in your configuration (e.g., `http://<host>:<port>`).
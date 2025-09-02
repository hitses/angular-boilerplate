# Angular 20 Boilerplate with OAuth2, Tailwind & Prettier

This project is a starter template for building Angular 20 applications connected to a backend API.
It includes a pre-configured authentication flow using Google OAuth 2.0, JWT token handling, and a secure route structure.

## Features

- Angular 20 with modern setup
- Google OAuth 2.0 authentication (login & register)
- JWT token management with automatic validation
- Route protection using canActivate guard
- Interceptor to attach and verify tokens on each backend request
- Logout functionality available inside the protected area
- Tailwind CSS for utility-first styling
- Prettier for code formatting consistency
- Environment-based API configuration (http://localhost:3000/api by default)

## Project Structure

- Public routes:
  - `/landing` – landing page
  - `/legal` – legal information page
- Protected route:
  - `/main` – requires valid JWT, accessible only after login
- Auth flow:
  - Login / register with Google OAuth 2.0
  - JWT stored and validated
  - Token automatically added to backend requests via interceptor

## Installation

```bash
# Clone this repository

git clone https://github.com/hitses/angular-boilerplate

# Navigate into the project

cd angular-boilerplate

# Install dependencies

npm install
```

## Running the Project

```bash
# Start the development server

ng serve
```

By default, the frontend connects to the backend at:

```bash
http://localhost:3000/api
```

This is configured in the src/environments/ files.
Update these values as needed for different environments.

## Authentication & Guards

- Unauthenticated users can access /landing and /legal.
- Authenticated users (with valid JWT) can access /main.
- Route Guard (canActivate) ensures that only authenticated users reach the protected routes.
- Interceptor checks the token on every HTTP request to the backend.

## Dependencies

- Angular OAuth2 OIDC – Google OAuth 2.0 login/register flow
- Tailwind CSS – modern utility-first styling
- Prettier – code formatting

## Next Steps

This boilerplate is meant as a starting point. From here, you can:

- Build new components and features on top of the /main route
- Extend backend API integration
- Customize styles with Tailwind CSS
- Add more route guards, interceptors, or services as needed

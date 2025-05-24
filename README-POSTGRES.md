# PostgreSQL Authentication with FreeData

This project has been configured to use PostgreSQL from FreeData for user authentication. Follow these steps to set up the database connection:

## Setup Instructions

1. **Create a FreeData PostgreSQL Database**
   - Sign up for a FreeData account if you don't have one
   - Create a new PostgreSQL database
   - Note your database credentials (username, password, host, database name)

2. **Configure Environment Variables**
   - Create a `.env.local` file in the root of your project with the following variables:
   ```
   POSTGRES_USER=your_freedata_username
   POSTGRES_PASSWORD=your_freedata_password
   POSTGRES_HOST=your_freedata_host
   POSTGRES_DB=your_freedata_database
   POSTGRES_PORT=5432
   POSTGRES_SSL=true
   ```

3. **Initialize the Database**
   - Start the development server:
   ```
   npm run dev
   ```
   - Visit `/api/auth/init` in your browser to create the necessary database tables

## Database Schema

The application uses the following database schema:

```sql
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  password_salt TEXT NOT NULL,
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP
)
```

## Authentication Flow

1. **User Registration (Signup)**
   - User submits registration form with name, email, and password
   - System checks if the email already exists in the database
   - If not, the password is securely hashed with a salt
   - User data is stored in the PostgreSQL database
   - Authentication cookie is set

2. **User Login**
   - User submits login form with email and password
   - System retrieves the user record from PostgreSQL
   - Password is verified against the stored hash
   - If valid, authentication cookie is set

3. **Authentication Check**
   - Middleware checks for the presence of a valid authentication cookie
   - Protected routes require authentication
   - Public routes (login/signup) redirect to home if already authenticated

## Security Notes

- Passwords are hashed using PBKDF2 with a unique salt for each user
- Authentication cookies are HTTP-only for security
- Database credentials should be kept secure and not committed to version control
- In production, use environment variables for all sensitive information

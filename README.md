# Personal Notes Manager with OAuth Login

This is a full-stack web application that allows users to create, view, edit, and delete personal notes. Users must log in via OAuth (Google) to access their notes.

## Features

### Core Features

- **OAuth Login**: Users can log in using their Google account.
- **Notes Management**:
- **Create Note**: Add new notes with a title and content.
- **View Notes**: See a list of all personal notes.
- **Delete Note**: Remove existing notes.
- **User Dashboard**: Display the logged-in user’s name/email and provide a logout option.
- **Secure API Endpoints**: All note operations are protected and accessible only by authenticated users.
- **User-Specific Notes**: Each note is uniquely linked to the authenticated user.
- **Responsive UI**: Designed to work well on various screen sizes using Tailwind CSS.

### Bonus Features

- **Edit Notes**: Users can update the title and content of existing notes.
- **Notification Messages**: Display toast notifications for login, logout, and CRUD operations (e.g., "Note created successfully!").
- **Extendable OAuth**: The backend is structured to easily support additional OAuth providers (e.g., GitHub, Facebook) by adding more Passport strategies.

## Technologies Used

### Frontend

- **React.js**: A JavaScript library for building user interfaces.
- **Vite**: A fast build tool for modern web projects.
- **JavaScript**: The primary programming language.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **React Router DOM**: For client-side routing.

### Backend

- **Node.js**: A JavaScript runtime environment.
- **Express.js**: A fast, unopinionated, minimalist web framework for Node.js.
- **MongoDB**: A NoSQL document database.
- **Mongoose**: An ODM (Object Data Modeling) library for MongoDB and Node.js.
- **Passport.js**: Authentication middleware for Node.js.
- `passport-google-oauth20`: Passport strategy for authenticating with Google using OAuth 2.0.
- **JSON Web Tokens (JWT)**: For secure, stateless authentication sessions.
- **`express-session`**: Middleware for managing session cookies.
- **`cors`**: Node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
- **`dotenv`**: Loads environment variables from a `.env` file.

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local instance or cloud service like MongoDB Atlas)
- Google Cloud Project:
  - Go to the [Google Cloud Console](https://console.cloud.google.com/).
  - Create a new project.
  - Navigate to "APIs & Services" > "Credentials".
  - Click "Create Credentials" > "OAuth client ID".
  - Select "Web application".
  - Add `http://localhost:5000/auth/google/callback` as an Authorized redirect URI.
  - Add `http://localhost:5173` (or your frontend development URL) as an Authorized JavaScript origin.
  - Note down your **Client ID** and **Client Secret**.

## Git clocne

**clone-repo**

```bash
https://github.com/vishnuu5/personal-notes-manager.git
```

### Backend Setup

1.  **Navigate to the backend directory**:

```bash
cd backend
```

2.  **Install dependencies**:

```bash
npm install
```

3.  **Create a `.env` file**:
    Create a file named `.env` in the `backend/` directory and add the following environment variables. Replace the placeholder values with your actual credentials and desired secrets.

```bash
    MONGO_URI=your_mongodb_connection_string
    GOOGLE_CLIENT_ID=your_google_client_id
    GOOGLE_CLIENT_SECRET=your_google_client_secret
    JWT_SECRET=secret_key_jwt
    SESSION_SECRET=keyyy
    CLIENT_URL=http://localhost:5173
    SERVER_URL=http://localhost:5000
```

4.  **Start the backend server**:

```bash
npm start
```

    The backend server will run on `http://localhost:5000`.

### Frontend Setup

1.  **Navigate to the frontend directory**:

```bash
cd ../frontend
```

2.  **Install dependencies**:

```bash
npm install
```

3.  **Start the frontend development server**:

```bash
npm run dev
```

The frontend application will run on `http://localhost:5173` (or another port if 5173 is in use).

## OAuth Implementation Approach

The application uses **Passport.js** for OAuth authentication with Google.

1.  **Google Strategy**: `passport-google-oauth20` is configured to handle the OAuth flow. It redirects the user to Google's authentication page.
2.  **Callback URL**: After successful authentication with Google, Google redirects the user back to our specified callback URL (`/auth/google/callback`).
3.  **User Serialization/Deserialization**: Passport serializes the user into the session (storing only the user ID) and deserializes the user from the session on subsequent requests, fetching the full user object from the database.
4.  **JWT Generation**: Upon successful Google login, the backend generates a JSON Web Token (JWT) containing the user's ID. This JWT is then sent to the frontend.
5.  **Client-Side Storage**: The frontend stores this JWT (e.g., in `localStorage`).
6.  **Protected Routes**: For every subsequent API request to protected endpoints (e.g., notes CRUD), the frontend sends the JWT in the `Authorization` header (as a Bearer token).
7.  **JWT Verification Middleware**: The backend uses a middleware (`auth.js`) to verify the JWT. If valid, it decodes the user ID and attaches the user object to the request, allowing access to the protected resource. If invalid or missing, it rejects the request.
8.  **Session Management**: `express-session` is used to manage the session cookie, which stores the Passport session data. This works in conjunction with JWT for a robust authentication system.

## Challenges and Decisions

- **CORS Configuration**: A common challenge in full-stack applications is handling Cross-Origin Resource Sharing (CORS) between the frontend and backend. I explicitly configured `cors` in the Express app to allow requests from the frontend's origin (`http://localhost:5173`).
- **Authentication Strategy**: I chose Passport.js for OAuth due to its extensive ecosystem of strategies for various providers and its flexibility. Combining it with JWT provides a stateless authentication mechanism for API calls, which is scalable and widely used.
- **Database Choice**: MongoDB was chosen as recommended, leveraging Mongoose for schema definition and easy interaction with the database. This allows for flexible document structures for notes and user profiles.
- **Frontend State Management**: For authentication and notifications, React Context API was used. This provides a simple and effective way to manage global state without external libraries for this scale of application.
- **Responsive Design**: Tailwind CSS was chosen for its utility-first approach, which makes building responsive UIs efficient and maintainable.
- **Logout Flow**: Initially, a `fetch` request for logout caused CORS issues due to server-side redirects. This was resolved by directly setting `window.location.href` to the backend's logout endpoint, allowing the browser to handle the full page navigation and session destruction correctly.
- **Infinite Re-render on Login Redirect**: The `AuthRedirectHandler` in `App.jsx` was causing an infinite loop due to repeated state updates from URL parameters. This was fixed by clearing the URL parameters using `window.history.replaceState` immediately after processing them, ensuring the `useEffect` only runs once for the login redirect.

# Mentorship Backend

## Overview
The backend for the mentorship platform is built to provide core functionalities like user authentication, mentor-mentee management, session scheduling, notifications, and more. It serves as the backbone of the mentorship platform, enabling seamless communication and data flow between the frontend and the database.

---

## Features
- **User Authentication**: Sign up, login, and password reset with JWT and role-based access (mentor/mentee).
- **Profile Management**: Create and update mentor/mentee profiles.
- **Mentor-Mentee Matching**: Match mentors and mentees based on skills, preferences, and availability.

- **Notifications**: Email and in-app notifications for session reminders and updates.


---

## Tech Stack
- **Node.js**: Runtime environment.
- **Express.js**: Backend framework.
- **MongoDB**: Database to store user and session data.
- **Mongoose**: MongoDB ODM.

- **JWT**: Authentication.


---

## Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- Redis (optional for caching)

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/karankumar12345/mentorship-platform-server
   cd mentorship-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following keys:
   ```env
 PORT=8000
DB_URL=mongodb://127.0.0.1:27017/Karankumarsaw
ACCESS_TOKEN_EXPIRY=300 # Default 5 minutes
REFRESH_TOKEN_EXPIRY=3540 # Default 59 minutes

REFRESH_TOKEN_SECRET=
REFRESH_TOKEN_SECRET=
JWT_SECRET=
ORIGIN=


4. Start the server:
   ```bash
   npm run dev
   ```

---

## API Endpoints

### Authentication
| Method | Endpoint       | Description          |
|--------|----------------|----------------------|
| POST   | /api/v1/user/register | Create a new user    |
| POST   | /api/v1/user/login  | Login user          |
| POST   | /api/v1/logout | Reset password |
| POST   | /api/v1/user/all | Get All User   |
| POST   | /api/v1/user/:id  | Get by id          |
| POST   | /api/v1/me | User details |


### User Management
| Method | Endpoint       | Description               |
|--------|----------------|---------------------------|
| GET   | /api/v1/user/all | Get All User   |
| GET   | /api/v1/user/:id  | Get by id          |
| GET   | /api/v1/me | User details |



## Folder Structure
```
mentorship-backend/
    │
│   ├── config/          # Environment and database configuration
│   ├── controllers/     # Business logic for routes
│   ├── models/          # Mongoose models
│   ├── routes/          # API routes
│   ├── middlewares/     # Authentication and other middlewares
│   ├── utils/           # Utility functions
    └── index.js           # Express app setup
    ├ ── .env                 # Environment variables
├── .gitignore           # Ignored files
├── package.json         # Dependencies and scripts
└── README.md            # Project documentation
```

---

## Development
- Run the server in development mode:
  ```bash
  npm run dev
  ```
- Lint and format code:
  ```bash
  npm run lint
  npm run format
  ```

---

## Deployment
1. Build the project:
   ```bash
   npm run build
   ```
2. Use a hosting provider (e.g., Heroku, AWS, or Vercel) to deploy the backend.

---

## Contributing
1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Make changes and commit:
   ```bash
   git commit -m "Added feature-name"
   ```
4. Push to your branch:
   ```bash
   git push origin feature-name
   ```
5. Create a pull request.

---

## License
This project is licensed under the MIT License. See the LICENSE file for details.

---

## Contact
For queries, contact [your-email@example.com](karankumar2004122@gmail.com).
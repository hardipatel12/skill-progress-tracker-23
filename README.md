\# Skill Progress Tracker



\## Student Information



\- Student No.: 23

\- Name: Hardi Patel



\## Project Description



Skill Progress Tracker is a React-based web application for managing and tracking technical skills. The application uses a React frontend and an Express.js REST API backend.



\## Features



\### Frontend

\- React.js application using Vite

\- React Router navigation

\- Home, Skills and About pages

\- Reusable components

\- Props

\- useState

\- useEffect

\- Controlled input

\- Loading state

\- Error handling

\- Add skills

\- Mark skills as Complete/Pending

\- Delete skills



\### Backend

\- Express.js REST API

\- GET skills

\- POST new skill

\- PUT/update skill

\- DELETE skill

\- Request logging middleware

\- 404 error handling

\- Global error handling

\- In-memory data storage



\## API Endpoints



| Method | Endpoint | Description |

|--------|----------|-------------|

| GET | `/skills` | Get all skills |

| POST | `/skills` | Add a new skill |

| PUT | `/skills/:id` | Update a skill |

| DELETE | `/skills/:id` | Delete a skill |



\## Project Structure



```text

skill-progress-tracker-23/

│

├── skills-api-23/

│   ├── server.js

│   ├── package.json

│   └── ...

│

├── skills-frontend-23/

│   ├── src/

│   ├── package.json

│   └── ...

│

├── .gitignore

└── README.md



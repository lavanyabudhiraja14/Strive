<div align="center">

# Strive 🌱

**An AI-powered productivity platform where consistency grows into a living virtual island.**

[Live Demo](https://strive-liard.vercel.app)

</div>

---

## Overview

Strive turns goals, tasks, coding progress, and daily consistency into a visual growth experience. As users complete tasks and maintain streaks, their island develops with trees, flowers, stones, cottages, and other rewards.

The platform also includes an AI productivity coach that uses current goals, tasks, and streak data to provide concise, personalized guidance.

## Features

- **Goals and progress tracking** — Create goals, monitor completion, and view success rates
- **Task planning** — Add, complete, link, and remove tasks from a calendar-based workflow
- **Growing virtual island** — Unlock visual island elements through consistent activity
- **Streak tracking** — Track current streaks, longest streaks, and completed days
- **Progress dashboard** — View activity charts, consistency grids, completion metrics, and active goals
- **AI productivity coach** — Receive recommendations generated from goals, tasks, and island progress
- **AI chat** — Ask Strive for focused productivity and learning advice
- **Developer profile** — View LeetCode, Codeforces, AtCoder, and CodeChef statistics
- **Secure authentication** — Sign up and log in using JWT-based authentication

## Tech Stack

### Frontend

- React 19
- Vite
- Tailwind CSS
- React Router
- Axios
- Recharts
- React Calendar

### Backend

- Node.js
- Express
- MongoDB and Mongoose
- JSON Web Tokens
- bcrypt.js
- Groq SDK
- Axios and Cheerio

## Project Structure

```text
Strive/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   └── server.js
│   ├── package.json
│   └── package-lock.json
├── public/
├── src/
│   ├── api/
│   ├── assets/
│   ├── components/
│   ├── pages/
│   ├── App.jsx
│   └── main.jsx
├── package.json
├── package-lock.json
└── vite.config.js
```

## Getting Started

### Prerequisites

Install the following before running the project:

- Node.js
- npm
- MongoDB or a MongoDB Atlas connection
- A Groq API key

### 1. Clone the repository

```bash
git clone https://github.com/lavanyabudhiraja14/Strive.git
cd Strive
```

### 2. Install frontend dependencies

```bash
npm install
```

### 3. Install backend dependencies

```bash
cd backend
npm install
```

### 4. Configure the backend

Create `backend/.env`:

```env
PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_jwt_secret
GROQ_API_KEY=your_groq_api_key
```

The frontend currently sends API requests to `http://localhost:8000/api`, so the backend should use port `8000` for local development.

Never commit real credentials or API keys.

### 5. Start the backend

From the `backend` directory:

```bash
npm run dev
```

### 6. Start the frontend

Open another terminal in the project root:

```bash
npm run dev
```

Vite will print the local development URL in the terminal.

## Available Scripts

### Frontend

| Command | Description |
|---|---|
| `npm run dev` | Start the Vite development server |
| `npm run build` | Create a production build |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview the production build |

### Backend

| Command | Description |
|---|---|
| `npm run dev` | Start the API with Nodemon |
| `npm start` | Start the API with Node.js |

## API Routes

The backend exposes routes for:

```text
/api/auth
/api/users
/api/goals
/api/tasks
/api/skills
/api/island
/api/ai
/api/developer-profile
```

Protected routes expect a JWT bearer token.

## Contributing

1. Fork the repository.
2. Create a focused branch:

   ```bash
   git switch -c feature/your-change
   ```

3. Make and test your changes.
4. Commit with a clear message.
5. Push your branch and open a pull request describing what changed and why.

Please keep pull requests focused and avoid unrelated changes.

---

<div align="center">

Built to make consistency visible, engaging, and rewarding.

</div>

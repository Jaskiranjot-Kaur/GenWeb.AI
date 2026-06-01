# GenWeb.AI

GenWeb.AI is a full-stack web app for generating website code from natural-language prompts.  
It includes a React + Vite frontend and an Express + MongoDB backend with Google sign-in and credit-based generation flow.

## Tech Stack

- **Frontend:** React, Vite, Redux Toolkit, Tailwind CSS, Framer Motion, Firebase Auth
- **Backend:** Node.js, Express, MongoDB (Mongoose), JWT, OpenRouter API

## Repository Structure

```text
GenWeb.AI/
├── client/   # React frontend
└── server/   # Express backend
```

## Prerequisites

- Node.js 18+
- npm
- MongoDB database
- Firebase project (for Google auth)
- OpenRouter API key

## Environment Variables

### Client (`client/.env`)

```bash
VITE_FIREBASE_API_KEY=your_firebase_api_key
```

### Server (`server/.env`)

```bash
PORT=8000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
OPENROUTER_API_KEY=your_openrouter_api_key
```

## Setup & Run

### 1) Install dependencies

```bash
cd client && npm install
cd ../server && npm install
```

### 2) Start backend

```bash
cd server
npm run dev
```

### 3) Start frontend

```bash
cd client
npm run dev
```

Frontend runs on `http://localhost:5173` by default.

## Scripts

### Client

- `npm run dev` – start development server
- `npm run build` – create production build
- `npm run lint` – run ESLint
- `npm run preview` – preview production build

### Server

- `npm run dev` – start server with nodemon
- `npm start` – start server with node

## API Routes (Current)

- `POST /api/auth/google` – Google login/signup
- `GET /api/auth/logout` – logout
- `GET /api/user/me` – get current authenticated user
- `POST /api/website/generate` – generate website from prompt

## Notes

- Authentication is cookie-based (JWT in `token` cookie).
- Website generation uses OpenRouter and stores generated code in MongoDB.

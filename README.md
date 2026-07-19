# RecruitAI 🚀

RecruitAI is an intelligent, AI-powered Career Copilot and Dashboard designed to help users build a powerful professional identity, track job applications, optimize resumes, and prepare for interviews.

## ✨ Features

- **Advanced Profile Center**: A unified Career Identity Center that captures Personal Information, Professional Details, Career Goals, Skills, Education, Experience, and Projects.
- **Intelligent Onboarding**: Seamlessly syncs initial user setup data into their comprehensive career profile.
- **Dynamic Dashboard**: Interactive widgets offering Career Health Metrics, AI Insights, Learning Progress, and quick actions.
- **Specialized Workspaces**:
  - **Resume Center**: Build, optimize, and analyze your resume.
  - **Interview Center**: Prepare with AI-driven mock interviews.
  - **Coding Center**: Practice technical coding assessments.
  - **Job Tracker**: Manage and track active job applications.
- **Modern UI/UX**: Built with a sleek, dark-mode-first aesthetic featuring glassmorphism, smooth micro-animations, and responsive design.
- **Robust Security**: Secure authentication using HTTP-only cookies, JWTs, and secure route protection.

## 🛠️ Tech Stack

### Frontend
- **React.js** (via Vite)
- **Tailwind CSS v4** (Utility-first styling)
- **Zustand** (Global state management)
- **React Hook Form** & **Zod** (Form handling & validation)
- **Framer Motion** (Fluid animations)
- **Lucide React** (Beautiful iconography)
- **Axios** (API requests with automatic interceptors)

### Backend
- **Node.js** & **Express.js** (RESTful API architecture)
- **MongoDB** & **Mongoose** (NoSQL Database & ORM)
- **JWT** (Authentication)
- **bcryptjs** (Password hashing)
- **dotenvx** (Environment variable management)

## 📂 Project Structure

```text
recruitai/
├── client/                 # React Frontend (Vite)
│   ├── src/
│   │   ├── components/     # Reusable UI components & Widgets
│   │   ├── layouts/        # Layout wrappers (DashboardLayout, etc.)
│   │   ├── pages/          # Full page views (Dashboard, Profile, Onboarding)
│   │   ├── store/          # Zustand stores (authStore, profileStore, uiStore)
│   │   ├── services/       # Axios API configurations
│   │   ├── routes/         # Protected and Public routing logic
│   │   └── styles/         # Global CSS and Tailwind directives
├── server/                 # Node.js Backend
│   ├── config/             # Database connection & configurations
│   ├── controllers/        # Business logic (auth, user, profile, resume)
│   ├── models/             # Mongoose schemas (User, Profile, etc.)
│   ├── middleware/         # Custom middlewares (auth validation)
│   └── routes/             # Express API route definitions
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB connection string (Atlas or local)

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/recruitai.git
cd recruitai
```

### 2. Backend Setup
```bash
cd server
npm install
```
Create a `.env` file in the `server` directory and add the necessary environment variables (see `.env.example` if available, typically requires `PORT`, `MONGODB_URI`, `JWT_SECRET`, `CLIENT_URL`).
```bash
npm run dev
```

### 3. Frontend Setup
Open a new terminal window:
```bash
cd client
npm install
```
Create a `.env` file in the `client` directory:
```env
VITE_API_URL=http://localhost:5000/api
```
```bash
npm run dev
```

### 4. Open the App
Visit `http://localhost:5173` in your browser.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

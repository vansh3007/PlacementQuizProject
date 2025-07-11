
# 🎯 Placement Preparation Platform

A full-stack monorepo for a modern Placement Preparation Platform, featuring:

- 🎛 **Admin Panel**: Manage quizzes, jobs, and users.
- 👨‍🎓 **User Portal**: Take quizzes, track performance, and apply for jobs.
- ⚙️ **Backend**: Secure REST API with JWT auth, Prisma ORM, and Cloudinary integration.

---

## 📁 Project Structure

```
PlacementQuizProject/
├── Admin/       # React + Vite + TypeScript (Admin Panel)
├── Client/      # React + Vite + TypeScript (User Portal)
└── Server/      # Node.js + Express + TypeScript + Prisma (API)
```

---

## 🚀 Getting Started

### ✅ Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [npm](https://www.npmjs.com/) (v9+)
- [MySQL](https://www.mysql.com/) (for production)
- [Vercel CLI](https://vercel.com/docs/cli) (optional, for deployment)

---

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/vansh3007/PlacementQuizProject.git
cd PlacementQuizProject
```

---

### 2️⃣ Setup Environment Variables

#### 🔐 Backend (`Server/`)

```bash
cp Server/.env.example Server/.env
```

> Fill in:
> - `DATABASE_URL`
> - `JWT_SECRET`, `REFRESH_TOKEN_SECRET`
> - `CLOUDINARY_*`, `EMAIL_*` etc.

#### 👨‍🎓 User Frontend (`Client/`)

```bash
cp Client/.env.example Client/.env
```

> Set `VITE_API_URL`, `VITE_GOOGLE_CLIENT_ID`, etc.

#### 👩‍💼 Admin Frontend (`Admin/`)

```bash
cp Admin/.env.example Admin/.env
```

> Set `VITE_API_URL` or other env variables if used.

---

### 3️⃣ Install Dependencies

Using Workspaces:

```bash
npm install --workspaces
```

Or individually:

```bash
cd Server && npm install
cd ../Admin && npm install
cd ../Client && npm install
```

---

### 4️⃣ Setup Database

```bash
cd Server
npx prisma generate
npx prisma migrate deploy
```

---

### 5️⃣ Start Development Servers

#### Backend

```bash
cd Server
npm run dev
```

#### Admin Frontend

```bash
cd Admin
npm run dev
```

#### User Frontend

```bash
cd Client
npm run dev
```

📍 URLs:
- Admin: `http://localhost:5173`
- User: `http://localhost:5174`
- API: `http://localhost:5000`

---



## 🌐 Deployment

- Both frontends are configured for **Vercel** (`vercel.json`).
- Push the repo to GitHub and import `Admin/` and `Client/` as separate projects on [vercel.com](https://vercel.com/).
- Set environment variables from `.env` files on the Vercel dashboard.

> 🔁 The backend (`Server/`) can be deployed using Vercel Serverless Functions or platforms like Railway, Render, or traditional VPS.

---

## ✨ Features

### Admin Panel

- Admin login/logout
- Upload questions via Excel
- Manage users and job listings
- Rich text job descriptions (editor)

### User Portal

- Google OAuth login/signup
- Take quizzes (category-wise)
- Review quiz history & performance analytics
- Browse and apply for jobs

### Backend

- RESTful API using Express
- JWT Authentication (Access/Refresh)
- File uploads with Cloudinary
- Prisma ORM (MySQL)
- Nodemailer for email notifications

---

## 🛠️ Tech Stack

| Layer      | Technologies |
|------------|--------------|
| Frontend   | React, Vite, TypeScript, Tailwind CSS, Zustand, Radix UI, Lucide Icons |
| Backend    | Node.js, Express, TypeScript, Prisma, MySQL, Cloudinary, Nodemailer |
| Deployment | Vercel (Frontend + Serverless API), Railway/Render (optional for backend) |

---

## 🧪 Scripts

Each workspace supports:

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build (frontend)
npm run lint     # Lint code
```

---

## 🤝 Contributing

1. Fork this repository
2. Create your feature branch:
   ```bash
   git checkout -b feature/your-feature
   ```
3. Commit your changes and push:
   ```bash
   git push origin feature/your-feature
   ```
4. Open a Pull Request

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 👥 Authors

- [Vansh Shrivastava](https://github.com/vansh3007)
- [Ashwani Sharma](https://github.com/ashwanisharma30)


---

## 🙏 Acknowledgements

- [Vite](https://vitejs.dev/)
- [React](https://react.dev/)
- [Prisma](https://www.prisma.io/)
- [Vercel](https://vercel.com/)

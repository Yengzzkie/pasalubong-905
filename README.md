# Nadamart

Nadamart is a full-stack marketplace application built with **Next.js**, **PostgreSQL**, **Prisma**, **Supabase**, and **TailwindCSS**. This guide will help technical reviewers set up and run the project locally for development or inspection purposes.

---

## 🧰 Tech Stack

- **Frontend**: Next.js, React, TailwindCSS, MUI, Framer Motion
- **Backend**: Next.js API routes, Prisma ORM
- **Database**: PostgreSQL
- **Auth**: NextAuth.js
- **Storage/Realtime**: Supabase

---

## 🚀 Getting Started

### 1. **Clone the Repository**

```bash
git clone git@github.com:Yengzzkie/nadamart.git
cd nadamart
```

### 2. **Install Dependencies**

```bash
npm install
```

### 3. **Configure Environment Variables**

Create a `.env` file at the root of the project based on the following example:

```env
# Database
DATABASE_URL="postgresql://postgres:password@host:port/postgres"
DIRECT_URL="postgresql://postgres:password@host:port/postgres"

# Supabase
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"

# NextAuth / Auth
AUTH_SECRET="your-auth-secret"
JWT_SECRET="your-jwt-secret"

# Google Maps API
NEXT_PUBLIC_GOOGLE_MAP_API_KEY="your-google-map-api-key"

# App mode
NODE_ENV="development"
```

> **Note**: Ensure your PostgreSQL instance is running and the database `nadamart` exists.


> **Note**: You can also run this command in CLI to generate your own AUTH_SECRET and JWT_SECRET then copy and paste the generated random string from CLI to the .env file.
```bash
openssl rand -base64 32
```

---

### 4. **Generate Prisma Client**

```bash
npx prisma generate
```



---

## 🧪 Development

Start the development server:

```bash
npm run dev
```

Visit `http://localhost:3000` in your browser.

---

## 📁 Project Structure Overview

```
/prisma          # Prisma schema and migration files
/app/api         # Backend API routes
/app/components  # Shared UI components
/lib             # Utility and helper functions
```

## 📮 Feedback

If you run into any issues while setting up Nadamart locally, please feel free to reach out via issues or contact me directly.
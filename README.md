# **DevConnect** 🚀

***A Social Platform Crafted for Developers***

---

## 📌 Table of Contents

1. [Overview](#overview)
2. [Key Features](#key-features)
3. [Tech Stack](#tech-stack)
4. [Installation & Setup](#installation--setup)
5. [Usage](#usage)
6. [Contributing](#contributing)
7. [License](#license)
8. [Contact & Support](#contact--support)

---

## 🏷️ Overview

DevConnect is a purpose-built social ecosystem enabling developers to share, collaborate, and showcase their work seamlessly. With real-time interactions, version control integration, and an achievement-driven environment, we empower you to accelerate your professional growth and network with like-minded innovators.

---

## 🚀 Key Features

* **Code Sharing & Collaboration**: Effortlessly publish code snippets or full-scale projects; leverage inline comments and collaborative threads.
* **Developer Networking**: Follow peers, endorse skills, and foster meaningful connections.
* **Real-Time Chat**: Engage in instantaneous discussions via integrated chat channels and direct messages.
* **Project Showcase**: Highlight your portfolios, receive community feedback, and benchmark progress.
* **Version Control Management**: Native Git workflows for pull requests, branching, and merge tracking.
* **Achievement System**: Gamified badges and rewards to recognize contributions and milestones.

---

## 🛠️ Tech Stack

| Layer          | Technology                               |
| -------------- | ---------------------------------------- |
| Frontend       | Next.js (React SSR & Static Generation)  |
| Backend        | Express.js (Node.js Framework)           |
| Database       | Supabase (PostgreSQL, Realtime APIs)     |
| Authentication | JWT / OAuth Providers                    |
| Deployment     | Vercel (Frontend & Backend - Serverless) |

---

## 🔧 Installation & Setup

> Follow these steps to initialize DevConnect locally:

1. **Clone Repository**

```bash
$ git clone https://github.com/<YOUR_USERNAME>/devconnect.git
$ cd devconnect
```

2. **Install Dependencies**

* Frontend:

  ```bash
  $ cd frontend
  $ npm install
  ```
* Backend:

  ```bash
  $ cd ../backend
  $ npm install
  ```

3. **Configure Environment Variables**

Create a `.env` file in the `backend` directory with the following entries:

```dotenv
SUPABASE_URL=<YOUR_SUPABASE_URL>
SUPABASE_KEY=<YOUR_SUPABASE_KEY>
JWT_SECRET=<YOUR_JWT_SECRET>
```

4. **Start Development Servers**

* **Backend** (Locally for development purposes)

  ```bash
  $ cd backend
  $ npm start
  ```
* **Frontend**

  ```bash
  $ cd ../frontend
  $ npm run dev
  ```

Once both servers are running, open your browser at `http://localhost:3000` to access DevConnect.

---

## 🎯 Usage

1. **Sign Up / Log In**

   * Register a new account or authenticate via OAuth.
2. **Complete Your Profile**

   * Add a bio, tech stack, portfolio links, and social handles.
3. **Share & Collaborate**

   * Post code snippets with syntax highlighting; initiate pull requests for peer reviews.
4. **Engage in Discussions**

   * Join channels, send direct messages, and leverage threads for organized dialogues.
5. **Showcase Projects**

   * Upload portfolios, annotate your process, and gather constructive feedback.
6. **Track Achievements**

   * Earn badges for milestones like first PR merged, 100 code shares, or community moderator status.

---

## 🤝 Contributing

We welcome and value your contributions! To maintain high standards, please adhere to the following workflow:

1. **Fork** the repository to your GitHub account.
2. **Create a feature branch**:

   ```bash
   $ git checkout -b feat/your-feature-name
   ```
3. **Commit changes** with clear, descriptive messages.
4. **Push** your branch:

   ```bash
   $ git push origin feat/your-feature-name
   ```
5. **Open a Pull Request** against the `develop` branch of the main repository.

**Coding Standards**: ESLint (Airbnb config), Prettier formatting, and meaningful inline documentation are required. Ensure all unit and integration tests pass before submission.

---

## 📜 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for full terms.

---

## 📬 Contact & Support

For inquiries, feature requests, or support:

* **Email**: [gagah.p.412@gmail.com](mailto:gagah.p.412@gmail.com)
* **Discord**: [Join our server]([https://discord.gg/your-discord-invite](https://discord.gg/ev5G3HbQ))

> *Note: Replace `<YOUR_USERNAME>`, `<YOUR_SUPABASE_URL>`, `<YOUR_SUPABASE_KEY>`, and `<YOUR_JWT_SECRET>` with your actual credentials.*

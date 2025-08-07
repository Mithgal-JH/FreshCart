# FreshCart 🛒

FreshCart is a modern and responsive e-commerce web application built with React and Firebase. **This project was developed as an educational tool to practice and demonstrate core web development concepts**, including user authentication, real-time database interactions, and dynamic front-end rendering.

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen?style=for-the-badge&logo=vercel)](https://freshcart.sevalla.page)

---

## ✨ Features

- **User Authentication**: Secure sign-up and login system using both email/password and Google Sign-In, powered by Firebase Authentication.
- **Dynamic Product Catalog**: Products are fetched in real-time from a Firestore database.
- **Advanced Filtering & Search**:
  - Live search functionality to find products by title.
  - Filter products by category, price range, and customer ratings.
- **Interactive Shopping Cart**: Users can add, remove, clear the cart, and view items with real-time updates to the total cost and item count.
- **Responsive Design**: A mobile-first, clean user interface built with Tailwind CSS.
- **User Feedback**: Integrated contact form using EmailJS for easy communication.
- **Notifications**: User-friendly toast notifications for actions like logging in, adding items to the cart, etc.

---

## 🛠️ Tech Stack

- **Frontend**:
  - [React](https://reactjs.org/) (with Hooks & Context API)
  - [React Router](https://reactrouter.com/) for client-side routing.
  - [Tailwind CSS](https://tailwindcss.com/) for styling.
- **Backend & Database**:
  - [Firebase](https://firebase.google.com/)
  - **Firestore**: For the product database.
  - **Firebase Authentication**: For user sign-up and login.
- **Libraries**:
  - [React Toastify](https://fkhadra.github.io/react-toastify/introduction/) for notifications.
  - [EmailJS](https://www.emailjs.com/) for the contact form.

---

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js (v14 or later)
- npm

### Installation

1.  **Clone the repository:**
    ```sh
    git clone [https://github.com/your-username/freshcart.git](https://github.com/your-username/freshcart.git)
    cd freshcart
    ```
2.  **Install NPM packages:**
    ```sh
    npm install
    ```
3.  **Set up your environment variables:**

    - Create a `.env` file in the root of your project.
    - Add your Firebase project configuration to this file. You can get these keys from your Firebase project console.

    _`.env` file example:_

    ```
    REACT_APP_API_KEY=your_firebase_api_key
    REACT_APP_AUTH_DOMAIN=your_firebase_auth_domain
    REACT_APP_PROJECT_ID=your_firebase_project_id
    REACT_APP_STORAGE_BUCKET=your_firebase_storage_bucket
    REACT_APP_MESSAGING_SENDER_ID=your_firebase_Messaginger_id
    REACT_APP_APP_ID=your_firebase_app_id
    ```

### Available Scripts

In the project directory, you can run:

- **`npm start`**: Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
- **`npm run build`**: Builds the app for production.

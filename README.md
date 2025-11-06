# Launch Stack

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

> Launch Stack is a simple, elegant, and fast tool for indie hackers and developers to create a beautiful, shareable launch page for their next big thing. Stop wrestling with complex website builders and get your project online in minutes.

<!-- ADD A SCREENSHOT OR GIF HERE -->
<!-- 
![Launch Stack Demo](./path/to/your/screenshot.png) 
A GIF showing the customization flow would be even better!
-->

## ✨ Key Features

-   **✨ Dynamic & Customizable Pages:** Easily update your project's name, tagline, and description.
-   **🎨 Beautiful Gradients & Color Themes:** Choose from a selection of stunning gradients and color palettes to match your brand.
-   **🔗 Add Your Important Links:** Direct your audience to your GitHub, Twitter, Product Hunt, or any other important link.
-   **👤 Simple User Profiles:** Manage your name, email, and avatar to personalize your page.
-   **🌙 Dark Mode Support:** Automatically adapts to your user's preferred theme.
-   **📱 Fully Responsive Design:** Looks great on desktop, tablet, and mobile devices.
-   **🚀 Blazing Fast:** Built with Vite for an instant development experience and a performant production build.

## 🚀 Live Demo

Check out the live application here: **[https://launch-stack.vercel.app/](https://launch-stack.vercel.app/)**

## 🛠️ Tech Stack

This project is built with modern and efficient web technologies:

-   **Frontend:** [React 18](https://reactjs.org/)
-   **Build Tool:** [Vite](https://vitejs.dev/)
-   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
-   **Routing:** [React Router](https://reactrouter.com/)
-   **Icons:** [React Icons](https://react-icons.github.io/react-icons/)
-   **Deployment:** [Vercel](https://vercel.com/)

> **Note on Authentication:** This project was originally built with Firebase Authentication and Firestore. It has been refactored to use a **mock authentication system** for easy local development without requiring a Firebase backend. The authentication flow and state management remain the same, making it simple to swap in a real backend if needed.

## 📋 Getting Started (Local Development)

To get a local copy up and running, follow these simple steps.

### Prerequisites

-   Node.js (v16 or higher)
-   npm (comes with Node.js) or yarn

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/launch-stack.git
    ```

2.  **Navigate to the project directory:**
    ```bash
    cd launch-stack
    ```

3.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

4.  **Start the development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    ```

5.  **Open your browser:**
    Navigate to [http://localhost:5173](http://localhost:5173) to see the application in action.

## 📁 Project Structure

src/
├── components/ # Reusable UI components (LinkCard, Button, etc.)
├── context/ # React Context providers (AuthContext, ProfileContext)
├── pages/ # Main page components (HomePage)
├── hooks/ # Custom React hooks
├── App.jsx # Main app component with router setup
├── main.jsx # Entry point of the application
└── index.css # Global styles and Tailwind imports


## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📝 License

Distributed under the MIT License. See `LICENSE.txt` for more information.
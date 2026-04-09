# TUF Calendar Dashboard

A highly engineered, responsive calendar and personal dashboard application featuring a unique "Wall-Hanging" aesthetic. Built with React and Tailwind CSS, this project focuses on pixel-perfect responsive design across all devices—from budget mobile phones to ultra-wide 4K displays—while providing seamless local state management for daily tasks and memos.

## ✨ Features

  * **Architectural "Wall-Hanging" UI:** A custom, geometry-driven design that visually mimics a physical calendar hanging on a wall, complete with spiral binding and textured shadows.
  * **Fluid Responsive Design:** Meticulously scaled breakpoints using CSS `clamp()` and custom Tailwind modifiers (`min-[2500px]:`) to ensure perfect visual balance on:
      * Mobile viewports (320px to 430px)
      * Standard laptops (1366x768)
      * Full HD monitors (1920x1080)
      * Premium / QHD+ Displays (2560x1600)
  * **Smart Date Logic:** Powered by `date-fns` for accurate multi-day range selections, chronological interval sorting, and fluid month-to-month navigation.
  * **Persistent Storage:** Custom React hooks synchronize Daily Memos and Tasks directly to the browser's `localStorage`, ensuring data is never lost on refresh.
  * **Interactive Task Manager:** Add, toggle, and delete tasks natively on both desktop (via Enter key) and mobile (via dedicated tactile buttons).

## 🛠️ Tech Stack

  * **Framework:** [React](https://reactjs.org/) (via [Vite](https://vitejs.dev/))
  * **Styling:** [Tailwind CSS](https://tailwindcss.com/)
  * **Date Formatting:** [date-fns](https://date-fns.org/)
  * **Icons:** [Lucide React](https://lucide.dev/)

## 🚀 Getting Started

Follow these instructions to set up and run the project locally on your machine.

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed (version 16.x or higher is recommended).

### Installation

1.  **Clone the repository**

    ```bash
    git clone https://github.com/your-username/tuf-calendar.git
    cd tuf-calendar
    ```

2.  **Install dependencies**

    ```bash
    npm install
    ```

3.  **Start the development server**

    ```bash
    npm run dev
    ```

4.  **View the app**
    Open your browser and navigate to the local URL provided by Vite (usually `http://localhost:5173`).

## 📁 Project Structure Overview

  * `src/components/CalendarView.jsx`: The main smart component handling state, `localStorage` synchronization, and date logic.
  * `src/components/DesktopView.jsx`: The presentation layer for tablets, laptops, and ultra-wide monitors.
  * `src/components/MobileView.jsx`: The optimized presentation layer for smartphones.
  * `src/hooks/useNotes.js`: Custom hook managing the read/write operations for Daily Memos to the browser's local storage.
  * `src/utils/calendar.js`: Utility functions abstracting `date-fns` logic for range selections and chronological checks.


## 👨‍💻 Author

**Sayam**

  * LinkedIn: https://www.linkedin.com/in/sayam242/
  * GitHub: [@YourGitHubHandle](https://www.google.com/search?q=https://github.com/YourGitHubHandle)

-----

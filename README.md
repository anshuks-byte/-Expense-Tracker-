# Wealth Manager — Personal Expense Tracker

A premium, fully responsive Single-Page Application (SPA) designed to help users track, manage, and optimize their daily personal finances with absolute clarity. 

Built using vanilla front-end web technologies, **Wealth Manager** combines a sophisticated user interface with real-time financial data calculation and dynamic personalization features.

---

##  Key Features

*   **Responsive Single-Page Architecture:** A layout built using modern CSS Flexbox and Grid, optimized for fluid viewing across mobile, tablet, and desktop viewports.
*   **Sage Green Design System:** A clean UI inspired by high-end financial dashboards. Features a custom vector workspace hero illustration directly underneath the navigation header.
*   **Real-time Financial Aggregations:** Dynamic calculation engine that processes inputs instantly to update three high-level metric panels: *Net Balance*, *Total Income*, and *Total Expenses*.
*   **Interactive Ledger Management:** 
    *   Sequential stacked transaction history placed logically beneath the management form.
    *   Dynamic category pill tags (**Groceries, Utilities, Salary, EMI, Entertainment, General**).
    *   Filter streams by transaction types (*All, Income, Expenses*).
    *   Advanced sorting dropdown menu (*Newest first, Oldest first, Highest amount*).
*   **Dynamic Identity Initialization:** An authentication module that securely parses user input strings to generate a custom, letter-initial avatar icon dynamically in the upper toolbar upon sign-in.
*   **Accessibility Mode:** A lightweight theme-toggle feature utilizing CSS native variables to instantly flip between premium Light and Dark modes.

---

## 🛠️ Technology Stack

*   **HTML5:** Semantic architecture for structured and accessible document trees.
*   **CSS3 (Custom Properties):** Clean layouts engineered via modern Flexbox/Grid modules alongside theme variables for instant dark-mode inversion.
*   **Vanilla JavaScript (ES6+):** Pure functional state architecture, DOM injection routines, real-time calculation matrices, and sorting/filtering algorithms.
*   **Font Awesome:** Lightweight, vectorized icon typography library for UI actions.

---

## 📂 Project Structure

```text
wealth-manager/
│
├── index.html     # Application layout markup, overlays, and hero vector graphics
├── style.css     # Premium palette styles, grids, and dark/light theme definitions
└── script.js      # State engine, calculation arrays, and initialization algorithms

# RoboAdvisor Project

## Overview
RoboAdvisor is an automated financial investment platform designed to help users build and manage personalized investment portfolios. The application uses a full-stack JavaScript approach, combining a Node.js/Express backend with a MongoDB database and a Next.js (React) frontend. It features user authentication, portfolio management, market data integration, and intelligent investment advice through heuristic rules and optional AI integration.

## Features
- **User Authentication & Authorization**  
  - Secure signup, login, and role-based access using JWT tokens.
  
- **Portfolio Management**  
  - Create, update, and delete portfolios.
  - Store detailed portfolio information including assets, risk levels, investment goals, and time horizon.
  - Display portfolios with comprehensive details including risk assessments and recommended allocations.
  
- **Market Data Integration**  
  - Retrieve live market data and top gainers/losers.
  - Visualize market data with charts.

- **Investment Advice & AI Integration**  
  - **Heuristic-Based Advice:**  
    Uses custom rules based on risk level, investment goals, and time horizon to recommend asset allocation and provide investment advice.
  - **Optional AI Integration:**  
    Can integrate with external AI services (like OpenAI) for dynamic, personalized advice.
  
- **Responsive Frontend**  
  - Built with Next.js and Material-UI for a modern, responsive design.
  - Separate views for portfolio lists and detailed portfolio pages with charts and tables.

## Technology Stack
- **Backend:**  
  - Node.js with Express  
  - MongoDB with Mongoose  
  - JWT for authentication  
  - Nodemailer for email notifications (optional)  
  - Axios for API calls
- **Frontend:**  
  - Next.js (React)  
  - Material-UI (MUI)  
  - react-chartjs-2 and Chart.js for data visualizations
- **AI Integration (Optional):**  
  - OpenAI API (or heuristic-based logic as a fallback)

## Project Structure
```
roboadvisor-backend/
├── controllers/
│   ├── authController.js
│   └── portfolioController.js
├── middlewares/
│   └── authMiddleware.js
├── models/
│   ├── Portfolio.js
│   └── User.js
├── routes/
│   ├── auth.js
│   └── portfolio.js
├── utils/
│   ├── marketData.js
│   ├── portfolioAI.js
│   └── investmentAdviceService.js
├── config/
│   └── db.js
├── index.js
└── package.json
```
- **controllers:** Contains logic for handling authentication and portfolio operations.
- **middlewares:** Contains middleware for protecting routes and role-based access.
- **models:** Defines Mongoose schemas for Portfolio and User.
- **routes:** Sets up API endpoints for authentication and portfolio management.
- **utils:** Contains helper modules for market data integration, heuristic investment advice, and AI-based recommendations.
- **config:** Holds database connection configuration.
- **index.js:** Entry point for the backend server.

## Installation & Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (v14 or later)
- [MongoDB](https://www.mongodb.com/) (local installation or MongoDB Atlas)
- [npm](https://www.npmjs.com/)

### Backend Setup
1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd roboadvisor-backend
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Create a .env file in the project root and add the following variables:**
   ```env
   PORT=5000
   MONGO_URI=<your_mongodb_connection_string>
   JWT_SECRET=<your_jwt_secret>
   OPENAI_API_KEY=<your_openai_api_key>         # For AI integration (optional)
   FMP_API_KEY=<your_financialmodelingprep_api_key>  # For market data integration (optional)
   ```
4. **Start the backend server:**
   ```bash
   node index.js
   ```
   You should see messages indicating that MongoDB is connected and the server is running.

### Frontend Setup (Next.js)
1. **Navigate to your frontend directory:**
   ```bash
   cd roboadvisor-frontend
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Configure environment variables in a .env.local file:**
   ```env
   NEXT_PUBLIC_SERVER_URL=http://127.0.0.1:5000
   ```
4. **Start the development server:**
   ```bash
   npm run dev
   ```
   Your frontend should now be running at http://localhost:3000.

## API Endpoints

### Authentication
- **POST** `/api/auth/register` – Register a new user.
- **POST** `/api/auth/login` – Login and obtain a JWT token.
- **GET** `/api/auth/me` – Get authenticated user details.

### Portfolio Management
- **POST** `/api/portfolios` – Create a new portfolio (protected).
- **GET** `/api/portfolios` – Get all portfolios for the authenticated user (protected).
- **GET** `/api/portfolios/:id` – Get a single portfolio by ID (protected).
- **PUT** `/api/portfolios/:id` – Update a portfolio (protected).
- **DELETE** `/api/portfolios/:id` – Delete a portfolio (protected).

### Market Data
- **GET** `/api/market/stock/:symbol` – Get market data for a specific stock.
- **GET** `/api/market/top-performers` – Get top gainers/losers (if implemented).

## Frontend Features
- **Portfolio List:**
  - Displays a list of portfolios for the authenticated user with options to view, edit, or delete.
- **Portfolio Detail:**
  - A detailed view that shows:
    - Portfolio summary (name, risk level, risk assessment, investment goals, time horizon)
    - Recommended allocation with a pie chart visualization and textual advice
    - Asset list with details such as symbol, quantity, and purchase price
    - Action buttons to edit, rebalance, or go back to the portfolio list
- **Responsive Design:**
  - The frontend uses Material-UI components for a modern and responsive user interface.

## Investment Advice & AI Integration
- **Heuristic Investment Advice:**
  - Uses custom heuristics based on risk level, investment goals, and time horizon to provide asset allocation recommendations and textual advice.
- **Optional AI Integration:**
  - The project can integrate with OpenAI’s API to generate dynamic, personalized investment advice. This integration is managed in the `utils/openaiService.js` and `utils/portfolioAI.js` modules.

## Contributing
Contributions are welcome! Feel free to fork the repository and submit pull requests. Please follow standard coding practices and ensure your changes are well-tested.

## License
This project is licensed under the MIT License.

## Contact
For questions or support, please contact [Your Name] at [your-email@example.com].


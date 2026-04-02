# Inventory Management System

## Project Overview
This project is a clean, powerful, and responsive **full-stack CRUD** (Create, Read, Update, Delete) application designed for seamless product management. It provides users with a central hub to manage digital inventory stocks, track item values, and visually alert managers when items drop below sustainable thresholds.

## Features
- **Add Product:** Introduce new inventory items quickly with customizable properties including dynamically tracked minimum stock limits.
- **View All Products:** Visualize stock data across an interactive, responsive real-time dashboard.
- **Update Product:** Effortlessly modify product pricing, categorization, or active inventory counts.
- **Delete Product:** Permanently remove discontinued product lines.
- **Search Products by Name:** Find specific items seamlessly using real-time search filtering.
- **Filter Products by Category:** Drill down into specific sectors dynamically sorted on the UI.
- **Highlight Low Stock Products:** The system enforces proactive stock management; any items whose quantity drops to or below its defined `minStock` threshold (`quantity <= minStock`) are visually flagged and sorted automatically.

## Tech Stack
- **Frontend:** React (Hooks, Vite)
- **Backend:** Node.js with Express
- **Database:** MongoDB (Mongoose)

## Folder Structure
```text
inventory-management/
├── backend/
│   ├── controllers/       # Business logic (fetching, creating, parsing)
│   ├── models/            # Mongoose Schema definitions
│   ├── routes/            # REST API route endpoints
│   ├── .env               # Secrets and Database variables
│   └── server.js          # Core Express initialization
└── frontend/
    ├── src/
    │   ├── components/    # Reusable UI fragments (Form, Table, Dashboard)
    │   ├── api.js         # Axios integration for Backend routing
    │   └── App.jsx        # Main React State container
    ├── index.css          # Styling definitions
    └── package.json       # React dependencies
```

## Installation & Setup Instructions

### 1. Clone the repository
```bash
git clone <repository_url>
cd inventory-management
```

### 2. Backend Setup
```bash
cd backend
npm install
npm start
```
*Note: The backend will run natively on `http://localhost:5000`.*

### 3. Frontend Setup
Open a brand new terminal window:
```bash
cd frontend
npm install
npm run dev
```

### 4. Database Connection
Ensure MongoDB is running locally or set up a MongoDB Atlas cluster. You must configure the database path via environment variables as instructed in the next section.

## Environment Variables
To securely connect the backend to your database, create a `.env` file strictly inside the `backend` directory.

Fill it out using the following default format:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
```
*(Example local string: `mongodb://127.0.0.1:27017/inventory`)*

## API Endpoints
The backend server exposes the following RESTful APIs:
- `POST /products` - Create a new product.
- `GET /products` - Retrieve a full array of all products.
- `PUT /products/:id` - Update an existing product by passing its unique ID.
- `DELETE /products/:id` - Delete a targeted product completely.
- `GET /products/low-stock` - Fetch an isolated list of all items currently sitting below their safe minimum threshold.

## Assumptions
- **No Authentication Implemented:** Designed gracefully as an internal tool without complex login gates.
- **Single User System:** Operations are globally executed without tracking specific session users.
- **Database Availability:** Requires either a local MongoDB Community Server instance operating on port 27017 or a valid external MongoDB Atlas string.

## Future Improvements
- **User Authentication:** Restrict database changes via Login/Signup JWT flow.
- **Dashboard Analytics:** Implement complex historical line-charts and exportable revenue tracking.
- **Pagination:** Restrict datagrid sizes natively on the backend for massive datasets.
- **Deployment:** Push and containerize the application to cloud providers like AWS or Vercel/Render.

## How to Run Locally 
If you are running within a Windows environment, a shortcut method is available:
1. Double-click the provided `start.bat` file in the root directory.
2. The script will automatically trigger parallel execution spaces and launch both environments.
3. Open `http://localhost:5173` to interact with the UI.

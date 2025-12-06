# Product Showcase & Enquiry Application

A full-stack web application that allows users to browse products, filter by category, search by name, and submit enquiries. Built with React (Frontend) and Node.js/Express + SQLite (Backend).

## 🚀 Features

- **Product Listing:** Pagination, Search, and Category Filtering.
- **Product Details:** Modal view with extended product information.
- **Enquiry System:** Users can submit enquiries which are validated and stored in the database.
- **Admin API:** Endpoint available to retrieve all submitted enquiries.
- **Responsive Design:** Works on Desktop and Mobile.
- **Robust Image Handling:** Uses external high-quality images with fallback error handling.

## 🛠 Tech Stack

- **Frontend:** React.js, CSS3 (Custom Responsive Styling), Axios.
- **Backend:** Node.js, Express.js.
- **Database:** SQLite (Zero-configuration, file-based SQL DB).

---

## ⚙️ Setup & Run Instructions

**Prerequisites:** Node.js installed on your machine.

### 1. Backend Setup
The backend handles the API and the SQLite database.

1. Open a terminal and navigate to the backend folder:
   ```bash
   cd backend

Install dependencies:

npm install

Start the server:

npm start
The server runs on http://localhost:3001.

2. Frontend Setup
The frontend is the React user interface.
Open a new terminal (keep backend running) and navigate to the frontend folder:

cd frontend

Install dependencies:

npm install

Start the React app:

npm start
The application will open automatically at http://localhost:3000.

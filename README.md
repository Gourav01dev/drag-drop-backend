# Node.js Backend Project

This is a Node.js backend project built with Express.js and connected to a MongoDB database using MongoDB Atlas.

## Features

- Express.js server
- MongoDB Atlas integration
- Environment variable support using `.env`
- Hot-reloading with `nodemon`

## Prerequisites

- **Node.js v20.17.0**
- **npm** (comes with Node.js)
- **MongoDB Atlas** account (to get a connection URI)

## Getting Started

### 1. Clone the Repository

    git clone https://github.com/Gourav01dev/drag-drop-backend
    cd drag-drop-backend

### 2. Install Dependencies
Install all required Node.js packages:

    npm install

### 3. Set Up Environment Variables
Create a .env file in the root directory and add the following variables:

    PORT=5000
    MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-name>.mongodb.net/<database-name>?retryWrites=true&w=majority
💡 
`Replace your_mongodb_atlas_connection_string_here with your actual MongoDB connection URI.`

### 4. Run the Project
Start the development server with:

    npm run dev

`This will start the server on http://localhost:5000.`

### Note - `ensure ther servers is running on http://localhost:5000 to connect with Frontend app`




# HireVeda - MERN Stack Portfolio Builder

A multi-step portfolio builder built on the **MERN** stack (**MongoDB, Express, React, Node.js**) with a modern **Tailwind CSS v4.0** glassmorphic user interface.

## Project Structure
- **`/frontend`**: React application powered by Vite, utilizing Tailwind CSS v4.0 for styling and Lucide React for modern icons.
- **`/backend`**: Node.js & Express.js REST API using Mongoose schema validation for database read/write operations.

---

## Getting Started

### 1. Database Configuration (MongoDB Atlas)
1. Sign in to your [MongoDB Atlas Console](https://www.mongodb.com/cloud/atlas).
2. Create a free Cluster and a Database (e.g., `resumeDB`).
3. Obtain your Connection String (URI).
4. Open the `/backend/.env` file and set the connection URI:
   ```env
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxx.mongodb.net/resumeDB?retryWrites=true&w=majority
   ```
   *(Note: Remember to whitelist your IP Address under the Atlas Network Access panel to allow connections from your local machine).*

### 2. Running the Project

You can run both the frontend and backend servers simultaneously from the root directory:

```bash
# Start backend server (Runs on http://localhost:5000)
npm run backend

# Start frontend Vite server (Runs on http://localhost:5173)
npm run frontend
```

Alternatively, you can run them in separate terminal tabs:

**For Backend:**
```bash
cd backend
npm run dev
```

**For Frontend:**
```bash
cd frontend
npm run dev
```

---

## Interview Guide: How It Works under the Hood

Since this project was built for your MERN interview, here is how the data flows so you can explain it to the interviewer:

### 1. State Management in React
- All user input data is tracked in a single root state object (`profileData`) in [App.jsx](file:///c:/Users/Machine/Documents/Github/Hireveda/frontend/src/App.jsx).
- As the user clicks **"Save & Continue"**, the state updates. The forms are split into steps:
  - **Step 1**: Basic info + validations (Email regex, Phone length).
  - **Step 2**: Experience list (Dynamic adding and removing of jobs).
  - **Step 3**: Education list (Dynamic additions, checks for at least one record).
  - **Step 4**: Skills (Interactive tag component that lets you type and hit Enter).
  - **Step 5**: Resume Preview.

### 2. Pop-up/Modal Updates
- In the Preview step ([PreviewSection.jsx](file:///c:/Users/Machine/Documents/Github/Hireveda/frontend/src/components/PreviewSection.jsx)), an **"Edit"** button is placed next to each section.
- Clicking "Edit" opens a beautiful backdrop-blurred popup ([Modal.jsx](file:///c:/Users/Machine/Documents/Github/Hireveda/frontend/src/components/Modal.jsx)) showing an input form pre-populated with a temporary clone of the state (`tempData`).
- Saving the modal form pushes changes to the parent state, updating the preview in real-time.

### 3. API Integration & Cors
- When **""** is clicked, a fetch POST request is sent to `http://localhost:5000/api/profiles`.
- To allow the React client (on port 5173) to communicate with the Express server (on port 5000), `cors` middleware is configured on the backend.

### 4. Database Persistence (Mongoose Schema)
- On the backend, [Profile.js](file:///c:/Users/Machine/Documents/Github/Hireveda/backend/models/Profile.js) defines a structured schema mapping to the MongoDB collection.
- Mongoose model checks that essential items are present, saves the profile, and returns the generated `_id` document reference to the client.

## Project Overview

# Contact Us User Authentication Management Application

This is a Full Stack Developer Intern assignment project. The application is a "Contact Us" User Authentication Management System with frontend, admin, and backend functionalities. It allows users to submit their contact details, which are stored in a MongoDB database. Admins can securely log in, view, and manage the submitted data.


### Features

- User-friendly form for submitting contact details.
- Secure login/logout system for the admin panel.
- Authentication implemented without using Firebase or ready-made tools.
- Signup options: Manual, Google (Gmail), and Facebook.
- Admin can view submitted contact details listwise and individually.
- Multiple selection option for contact data.
- Secure logout functionality.
- Level-3 graded and professional-grade API.

#### Contact Data Management
- Stored contact information in a MongoDB database.
- Send an email with a PDF copy of each submitted data to admin.
- Allow admin to download contact data as PDF or Excel files (individually or all together).

#### SEO & Social Media Integration
- Schema Markup, Open Graph tags, and Twitter Card metadata for better SEO.
- Social sharing buttons (Facebook, Twitter, Email, Copy Link) on the Contact Us page.

---

## Technology Stack

- **Frontend**: Next.js
- **Styling**: Tailwind CSS
- **Backend**: Node.js , Express.js
- **Database**: MongoDB

---

## Live Deployment

The application is deployed and accessible at:  
👉 [https://contacts-opal-iota.vercel.app/](https://contacts-opal-iota.vercel.app/)

---

## Setup Instructions

Follow these steps to set up and run the project locally.

### Prerequisites

- Node.js (v16 or higher)
- MongoDB Atlas account or local MongoDB installation
- Git

### Step 1: Clone the Repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### Step 2: Install Dependencies

#### Frontend
Navigate to the `frontend` directory and install dependencies:

```bash
cd frontend
npm install
```

#### Backend
Navigate to the `backend` directory and install dependencies:

```bash
cd ../backend
npm install
```

### Step 3: Set Up Environment Variables

Create a `.env` file in the `backend` directory and add the following variables:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
EMAIL_USER=your_email_address
EMAIL_PASS=your_email_password
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
FACEBOOK_APP_ID=your_facebook_app_id
FACEBOOK_APP_SECRET=your_facebook_app_secret
```

Replace the placeholders with your actual credentials.

### Step 4: Run the Application

#### Start the Backend Server
Navigate to the `backend` directory and run:

```bash
nodemon || node index.js
```

The backend server will start on `http://localhost:5000`.

#### Start the Frontend Development Server
Navigate to the `frontend` directory and run:

```bash
npm run dev
```

The frontend application will start on `http://localhost:3000`.

### Step 5: Access the Application

- **Frontend**: Open your browser and go to `http://localhost:3000`.
- **Admin Dashboard**: Access the admin panel at `http://localhost:3000/admin`.

---

## Deployment

The project is deployed on **Vercel**. You can access the live application here:  
👉 [https://contacts-opal-iota.vercel.app/](https://contacts-opal-iota.vercel.app/)

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

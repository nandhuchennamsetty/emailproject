## Email API Integration & Template Management System

A full-stack web application that enables businesses to create email templates, manage contacts, and send bulk personalized emails using a third-party email service (SendGrid).

This project demonstrates backend integration, database design, API development, and a responsive frontend with clear UX for non-technical users.

## Features

## Email API Integration

Integrated SendGrid Email API

Secure API key handling using environment variables

Supports bulk email sending

## Template Management

Create, edit, and delete email templates

Dynamic placeholders (e.g., {{name}})

Subject and body customization

## Template Storage

MongoDB used for persistent template storage

RESTful APIs for CRUD operations

## Contact Management

Add and manage contacts

Group contacts (Customers, Employees, Leads, etc.)

Fetch contacts by group

## Bulk Email Sending

Select an email template

Choose a contact group

Send personalized emails to all contacts in one click

## Responsive UI

Clean and intuitive dashboard

Mobile, tablet, and desktop friendly

Step-based user flow for better UX

## Tech Stack
Frontend

React.js

Axios

CSS Grid & Flexbox

Responsive Design

Backend

Node.js

Express.js

MongoDB (Mongoose)

SendGrid API

## Project Folder Structure
Backend Structure
backend/
│── src/
│   ├── config/
│   │   ├── db.js
│   │   └── sendgrid.js
│   ├── controllers/
│   │   ├── template.controller.js
│   │   ├── contact.controller.js
│   │   └── email.controller.js
│   ├── models/
│   │   ├── Template.js
│   │   └── Contact.js
│   ├── routes/
│   │   ├── template.routes.js
│   │   ├── contact.routes.js
│   │   └── email.routes.js
│   ├── utils/
│   │   └── replaceVariables.js
│   ├── app.js
│   └── server.js
│── .env
│── package.json

Frontend Structure
frontend/
│── src/
│   ├── components/
│   │   ├── TemplateForm.jsx
│   │   ├── TemplateList.jsx
│   │   ├── ContactForm.jsx
│   │   ├── ContactList.jsx
│   │   └── SendEmails.jsx
│   ├── pages/
│   │   └── Dashboard.jsx
│   ├── services/
│   │   └── api.js
│   ├── styles/
│   │   └── global.css
│   ├── App.jsx
│   └── main.jsx
│── package.json

## Environment Variables

Create a .env file in the backend root:

PORT=5000
MONGO_URI=your_mongodb_connection_string
SENDGRID_API_KEY=your_sendgrid_api_key
SENDER_EMAIL=verified_sender_email


## Important: The sender email must be verified in SendGrid.

## How Email Personalization Works

Email templates support dynamic placeholders.

Example template body:

Hello {{name}},

Welcome to our platform!


During sending:

{{name}} is replaced with the contact’s name

Each recipient receives a personalized email

## How to Run the Project
Backend Setup
cd backend
npm install
npm start

Frontend Setup
create-react-app frontend
cd frontend
npm start


Frontend runs on:

http://localhost:3000

Backend runs on:

http://localhost:5000

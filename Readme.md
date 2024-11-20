# Backend - Portfolio Email Server

This repository contains the backend server for handling contact form submissions in my portfolio project. It is built using **Node.js**, **Express**, and **Nodemailer** for sending emails.

## Requirements
Before running the backend, make sure you have **Node.js** installed. You also need to configure the environment variables in the `.env` file.

## Environment Variables
The backend requires certain environment variables to work correctly. Create a `.env` file in the root directory of the project and add the following variables:

**EMAIL_USER**: The email address that will be used to send messages.

**EMAIL_PASS**: The password or app-specific password for the email address used for sending messages.

**EMAIL_HOST**: The SMTP server's host address (e.g., smtp.gmail.com).

## Example `.env` File

```bash
# Gmail credentials
    EMAIL_USER=your-email@gmail.com # Replace with your email address (e.g., Gmail, SMTP service email)
    EMAIL_PASS=your-email-password  # Replace with your email password or App password
    EMAIL_HOST=smtp.gmail.com       # Replace with the SMTP server host (e.g., smtp.gmail.com for Gmail)

# Environment setting
    NODE_ENV=development  # Use 'production' in the live environment

    # You may add other configuration variables here if needed, such as:
    # EMAIL_FROM: From address to use for sending emails (same as EMAIL_USER or different)
    # Example: EMAIL_FROM=your-email@example.com
```

## Getting Started

Follow these steps to set up and run the backend server:

1. **Clone the repository**

    ```bash
    git clone https://github.com/FranciscoAverruz/portfolioEmailServer.git
    cd portfolioEmailServer
    ```

2. **Install dependencies**

    Run the following command to install the necessary dependencies:

    ```bash
    npm install
    ```
3. **Start the server**

    To start the server in development mode with `nodemon` (which auto-restarts the server when changes are made), run:

    ```bash
    npm start
    ```

The server will be available at http://localhost:5000 or the port you have configured in your `.env` file.

## API Endpoint

The backend exposes a single API endpoint:

```bash
POST /api/send-email`
```

This endpoint is used to send the contact form data to the specified email address.

### Request Body
The body of the POST request should include the following fields:

- **name**: The name of the person sending the message.
- **email**: The email address of the sender.
- **message**: The content of the message.
- **country**: The country of the sender (optional, can be used to enhance the email content).

### Example Request:

```json
{
"name": "John Doe",
"email": "johndoe@example.com",
"message": "Hello, I would like to get in touch regarding your portfolio.",
"country": "USA",
"phone": "+1-123-456-7890"
}
```

### Response

- **200 OK**: The email was successfully sent.

    **Example response:**

    ```json
    {
    "status": "success",
    "message": "Email sent successfully!"
    }
    ```

- **400 Bad Request**: The request was malformed or missing required fields.

    **Example response:**

    ```json
    {
    "status": "error",
    "message": "All fields are required."
    }
    ```

- **500 Internal Server Error**: There was an issue with the email service.

    **Example response:**

    ```json
    {
    "status": "error",
    "message": "There was an error sending the email. Please try again later."
    }
    ```

## Technologies Used

- **Node.js**: JavaScript runtime for building the server.
- **Express**: Web framework for building the API and handling routing.
- **Nodemailer**: Node.js library for sending emails via SMTP.
- **dotenv**: A zero-dependency module to load environment variables from a .env file.
- **CORS**: Middleware to enable Cross-Origin Resource Sharing, allowing requests from the frontend.

    ### Notes
    If you use **Gmail** as the email provider, you will need to allow **Less secure apps** or generate an App password for better security. For other email providers, refer to their documentation to enable SMTP access.

    - **How to generate an App password for Gmail:** Follow this [guide on the Google Support website](https://support.google.com/accounts/answer/185833?hl=en) to generate an App password for secure use with your Gmail account.

    - **Nodemailer setup for Gmail**: Refer to the [Nodemailer documentation on using Gmail](https://nodemailer.com/usage/using-gmail/) for detailed instructions on setting up Gmail as your email provider.

## Deployment

To deploy the backend in a production environment, follow these steps:

1. Set the environment variables in your production environment (for example, using a service like Render, Heroku, AWS, etc). 
2. Deploy the server to your preferred hosting provider.
3. Make sure the frontend points to the correct production backend URL by updating the `VITE_API_URL` variable in the frontend `.env` file.

## Troubleshooting

- **Email not sending**: Make sure your email provider allows `SMTP` access. If you are using Gmail, ensure you have generated an **App password** or enabled **Less secure apps** in your Google account settings.
- **CORS errors**: Ensure that the frontend is sending requests to the correct backend URL, and that CORS is properly configured.

For additional help, refer to the [NodeMailer documentation](https://nodemailer.com/about/index.html).
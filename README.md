# Pogoscanner Status App

This is a simple web application to check and update the status of Pogoscanner.

## Features

- Check if Pogoscanner is in use
- Toggle the status of Pogoscanner
- Display appropriate messages and images based on the status

## Technologies Used

- Next.js
- React
- Prisma
- PostgreSQL
- Tailwind CSS
- Framer Motion

## Getting Started

### Prerequisites

- Node.js
- npm
- PostgreSQL database

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/yourusername/pogoscanner-status-app.git
   cd pogoscanner-status-app
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Set up the environment variables:
   Create a `.env.local` file in the root directory and add the following:

   ```sh
   DATABASE_URL="your-database-url"
   JWT_SECRET="your-jwt-secret"
   ```

4. Run the development server:

   ```sh
   npm run dev
   # or
   yarn dev
   ```

   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Usage

- Open the application in your browser.
- The status of Pogoscanner will be displayed.
- Click the button to toggle the status.

## API Endpoints

- `GET /api/status/` - Fetch the current status of Pogoscanner.
- `POST /api/status/` - Update the status of Pogoscanner.

## License

This project is licensed under the MIT License.

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [Prisma](https://www.prisma.io/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)

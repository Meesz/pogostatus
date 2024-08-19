# PogoStatus

PogoStatus is a Next.js application designed to monitor and update the status of a service. This project is bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

bash
npm run dev
or
yarn dev
or
pnpm dev
or
bun dev

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Project Structure

### Frontend

The frontend of the application is built using Next.js and Tailwind CSS. The main components and pages are located in the `app` directory.

#### Main Components

- `app/page.tsx`: The main page of the application.
- `app/statuspage/page.tsx`: The status page component that displays and updates the service status.
- `app/signin/page.tsx`: The sign-in page for user authentication.

### Backend

The backend is powered by Next.js API routes and Prisma for database interactions.

#### API Routes

- `app/api/status/route.ts`: Handles fetching and updating the service status.
- `app/api/user/route.ts`: Handles user creation and password hashing.
- `app/api/auth/[...nextauth]/route.ts`: Manages authentication using NextAuth.

### Database

The project uses Prisma as the ORM to interact with a MySQL database. The Prisma schema is defined in `prisma/schema.prisma`.

### Middleware

The middleware for authentication is defined in `middleware.ts`.

## Configuration

### Environment Variables

Ensure you have a `.env` file in the root of your project with the following variables:

DATABASE_URL="your-database-url"
NEXTAUTH_SECRET="your-nextauth-secret"

### Tailwind CSS

Tailwind CSS is configured in `tailwind.config.ts` and `postcss.config.mjs`.

### TypeScript

TypeScript configuration is defined in `tsconfig.json`.

## Scripts

The following scripts are available in the `package.json`:

- `dev`: Runs the development server.
- `build`: Builds the application for production.
- `start`: Starts the production server.
- `lint`: Runs ESLint to check for linting errors.

## License

This project is licensed under the MIT License.

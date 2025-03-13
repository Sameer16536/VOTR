# VOTR

VOTR is a full-stack application designed to manage users, tasks, and submissions. It consists of a backend built with Express and Prisma, and two frontend applications built with Next.js.

## Project Structure

- `backend`: Contains the backend code including API routes, controllers, and Prisma schema.
- `user-frontend`: Contains the frontend code for user interactions.
- `worker-frontend`: Contains the frontend code for worker interactions.

## Getting Started

### Prerequisites

- Node.js
- PostgreSQL
- AWS account (for S3)

### Setup

1. Clone the repository:
    ```bash
    git clone https://github.com/your-repo/votr.git
    cd votr
    ```

2. Install dependencies for each part of the project:

    ```bash
    # Backend
    cd backend
    npm install

    # User Frontend
    cd ../user-frontend
    npm install

    # Worker Frontend
    cd ../worker-frontend
    npm install
    ```

3. Set up environment variables:

    Create a `.env` file in the `backend` directory with the following content:
    ```env
    DATABASE_URL=your_database_url
    JWT_SECRET=your_jwt_secret
    AWS_ACCESS_KEY_ID=your_aws_access_key_id
    AWS_SECRET_ACCESS_KEY=your_aws_secret_access_key
    AWS_BUCKET_NAME=your_s3_bucket_name
    ```

4. Run database migrations:
    ```bash
    cd backend
    npx prisma migrate dev
    ```

### Running the Application

1. Start the backend server:
    ```bash
    cd backend
    npm start
    ```

2. Start the user frontend:
    ```bash
    cd ../user-frontend
    npm run dev
    ```

3. Start the worker frontend:
    ```bash
    cd ../worker-frontend
    npm run dev
    ```

### Usage

- Open [http://localhost:3000](http://localhost:3000) for the user frontend.
- Open [http://localhost:3001](http://localhost:3001) for the worker frontend.
- The backend server runs on [http://localhost:3002](http://localhost:3002).

## Learn More

To learn more about the technologies used in this project, check out the following resources:

- [Next.js Documentation](https://nextjs.org/docs)
- [Express Documentation](https://expressjs.com/)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [AWS S3 Documentation](https://docs.aws.amazon.com/s3/index.html)

## License

This project is licensed under the MIT License.
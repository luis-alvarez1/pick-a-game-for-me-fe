# Pick a Game for Me

A modern web application to manage your game collection and help you decide what to play next. Built with React, TypeScript, and Tailwind CSS.

> **Note**: This is the frontend application. The backend API is available at [pick-a-game-for-me-be](https://github.com/luis-alvarez1/pick-a-game-for-me-be).

## Features

-   🎮 **Game Management**

    -   Add, edit, and delete games
    -   Track completion status
    -   View game details
    -   Filter games by platform and completion status
    -   Search games by name

-   🎲 **Random Game Picker**

    -   Let the app choose a random game for you
    -   Perfect for when you can't decide what to play

-   🖥️ **Platform Management**

    -   Add and manage gaming platforms
    -   View games by platform
    -   Organize your collection

-   🔐 **User Authentication**
    -   Secure login and signup
    -   Protected routes
    -   Persistent sessions

## Tech Stack

-   **Frontend**

    -   React 18
    -   TypeScript
    -   Tailwind CSS
    -   React Router
    -   React Hot Toast
    -   Axios

-   **Backend**
    -   NestJS
    -   PostgreSQL
    -   JWT Authentication

## Getting Started

### Prerequisites

-   Node.js (v16 or higher)
-   npm or yarn
-   Access to the backend API (see [backend repository](https://github.com/luis-alvarez1/pick-a-game-for-me-be))

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/luis-alvarez1/pick-a-game-for-me-fe.git
    cd pick-a-game-for-me-fe
    ```

2. Install dependencies:

    ```bash
    npm install
    # or
    yarn install
    ```

3. Configure the API host:

    - Open `src/services/apiService.ts`
    - Update the `baseURL` in the `axios.create()` call to match your backend URL:
        ```typescript
        const api = axios.create({
            baseURL: "http://your-backend-url:3000",
            // ... rest of the configuration
        });
        ```

4. Start the development server:

    ```bash
    npm run dev
    # or
    yarn dev
    ```

5. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── games/         # Game-related components
│   ├── layout/        # Layout components
│   ├── platforms/     # Platform-related components
│   └── ui/            # Basic UI components
├── pages/             # Page components
├── services/          # API services
├── types/             # TypeScript types
└── utils/             # Utility functions
```

## API Integration

The application integrates with a NestJS backend API. All API requests require authentication using JWT tokens. The following endpoints are used:

-   Authentication: `/auth/login`, `/users/signup`
-   Games: `/games`, `/games/:id`, `/games/search`, `/games/pick`
-   Platforms: `/platforms`, `/platforms/:id`

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

-   [React](https://reactjs.org/)
-   [TypeScript](https://www.typescriptlang.org/)
-   [Tailwind CSS](https://tailwindcss.com/)
-   [NestJS](https://nestjs.com/)

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
    -   Paginated game list with customizable page size
    -   Smart pagination controls with first/last page navigation

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
    -   Vite
    -   Docker
    -   Nginx

-   **Backend**
    -   NestJS
    -   PostgreSQL
    -   JWT Authentication
    -   Docker

## Getting Started

### Prerequisites

-   Docker and Docker Compose
-   Git

### Installation

#### Using Docker (Recommended)

1. Clone the repository:

    ```bash
    git clone https://github.com/luis-alvarez1/pick-a-game-for-me-fe.git
    cd pick-a-game-for-me-fe
    ```

2. Create the PostgreSQL data directory:

    ```bash
    sudo mkdir -p /data/postgresql-games
    sudo chown -R 70:70 /data/postgresql-games
    ```

3. Start the application:

    ```bash
    docker-compose up -d
    ```

4. Access the application at [http://localhost:3001](http://localhost:3001)

#### Local Development

1. Clone the repository:

    ```bash
    git clone https://github.com/luis-alvarez1/pick-a-game-for-me-fe.git
    cd pick-a-game-for-me-fe
    ```

2. Install dependencies:

    ```bash
    yarn install
    ```

3. Start the development server:

    ```bash
    yarn dev
    ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Project Structure

```
├── src/
│   ├── components/     # Reusable UI components
│   │   ├── games/     # Game-related components
│   │   │   ├── GameCard.tsx
│   │   │   ├── GameModal.tsx
│   │   │   ├── GamesList.tsx
│   │   │   ├── GamesSearchBar.tsx
│   │   │   └── Pagination.tsx
│   │   └── ui/        # Common UI components
│   ├── pages/         # Page components
│   ├── services/      # API services
│   ├── types/         # TypeScript types
│   └── utils/         # Utility functions
├── docker-compose.yml # Docker Compose configuration
├── Dockerfile        # Frontend Docker configuration
├── nginx.conf       # Nginx reverse proxy configuration
└── tailwind.config.js # Tailwind CSS configuration
```

## Docker Configuration

The application uses Docker Compose to orchestrate three services:

-   **Frontend** (port 3001)

    -   Nginx-based container serving the React application
    -   Handles static file serving and API proxying
    -   Built with Vite and TypeScript

-   **Backend** (port 8001)

    -   NestJS application
    -   Handles API requests and business logic
    -   Communicates with PostgreSQL

-   **PostgreSQL** (port 5432)
    -   Persistent data storage
    -   Data stored in `/data/postgresql-games`

### Environment Variables

-   Frontend:

    -   `VITE_BACKEND_URL`: API endpoint (/api)

-   Backend:
    -   `DB_HOST`: PostgreSQL host
    -   `DB_PORT`: PostgreSQL port
    -   `DB_USER`: Database user
    -   `DB_PW`: Database password
    -   `DB_NAME`: Database name
    -   `JWT_SECRET`: JWT signing secret

## API Integration

The application uses a reverse proxy setup with Nginx:

-   All API requests are proxied through `/api` to the backend service
-   Authentication endpoints: `/api/auth/login`, `/api/users/signup`
-   Game endpoints:
    -   `/api/games` - List all games
    -   `/api/games/:id` - Get game details
    -   `/api/games/search` - Search games with pagination
    -   `/api/games/pick` - Pick a random game
-   Platform endpoints: `/api/platforms`, `/api/platforms/:id`

### Pagination

The game list supports pagination with the following features:

-   Configurable page size (10, 25, 50, or 100 items per page)
-   Smart pagination controls showing current page context
-   First/last page navigation
-   Total items and pages count
-   Automatic page reset when filters change

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
-   [Docker](https://www.docker.com/)
-   [Nginx](https://nginx.org/)

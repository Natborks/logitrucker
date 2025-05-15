# Real-Time Logistics Tracker

This project is a real-time driver dispatch and monitoring system designed to simulate the coordination of delivery drivers during emergencies. It includes a WebSocket server (Node.js) and a React-based dashboard for interacting with driver data in real time. The system allows dispatchers to pause/resume drivers, complete trips, and reassign tasks dynamically. Driver locations are simulated and periodically updated for demonstration purposes.

## Setup Instuctions

To get started, ensure you have Node.js and npm installed.

1. Clone the repository and navigate into the project directory.
2. Start the backend WebSocket server:

   - Navigate to the `backend` directory.
   - Run `npm install` to install dependencies.
   - Start the server with `npm run start`.
   - The WebSocket server will be available at `ws://localhost:3000`.

3. Start the frontend React dashboard:
   - Navigate to the `logitracker` directory.
   - Run `npm install` to install dependencies.
   - Start the development server with `npm run dev`.
   - Visit `http://localhost:5173` to access the dashboard.

### Architectural Decisions

The architectural design prioritizes simplicity, real-time feedback, and rapid prototyping. The backend sends data asychronuosly and the the fronted reads this data via websockets and updates the ui accordingly. The backend server uses the sockets library to achieve this. For this project my goal was to minimize the use of npm packages on the frontend and use API provided by react.

1. React Context API and Reducer: The react contect API is very capable of managing global state. Given the scope of the project and the number of components, I felt It would be simpler to use a combination of both for global state management.

2. CSS modules for styling: I usually prefer CSS modules, or styled components for styling because of the use of raw css. Using something like tailwind add an additional layer of complexity in that, you have to know the tailwind API in addition
   to normal css, customizing colors and sizes can be tricky, and the styles for components can get bloated and mmake it harder to read components.

3. I chose to use leaflet mainly becaue its free and easy to get started with

4. The absence of a database posed a significant challenge, and it meant that I had to maintain driver state on both the frontend and backend and keep them in sync, but doing so also allow for fast iteration.

### Limitations and further improvements

- UI updates: Although I love the react team's wonderful philosophy of colocating state, styles, etc., to a component as much as possible, it can make styling harder to navigate. I've been exploring Andy Bell's [Every Layout](https://every-layout.dev/layouts/) which promotes a more scalable and composable approach to CSS architecture.
- Adding a database (e.g., PostgreSQL or Redis) would greatly simplify state management and persistence, particularly in multi-session environments.
- Manually handling optimistic updates is error-prone, especially with asynchronous state updates. Using tools like useOptimistic (experimental in React) could help streamline this process
- Testing on both backend and frontend can be very helpful given the complex nature of state updates.
- mplementing offline support and sync mechanisms is a future goal, especially for environments with unstable connections.

Future enhancements could include adding persistent storage (e.g. Redis or PostgreSQL), formal schema validation (e.g. using Zod or Joi), role-based access, better fault tolerance, and a richer frontend UI with modals and analytics.

import { RouterProvider } from 'react-router-dom';
import router from './router/router';

/**
 * The app entry point delegates rendering to the router configuration.
 */
export default function App() {
  return <RouterProvider router={router} />;
}


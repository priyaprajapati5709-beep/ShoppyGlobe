import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App.jsx';
import store from './redux/store';
import './index.css';

const container = document.getElementById('root');

if (container) {
  const root = createRoot(container);

  // Mount the app and wire it to the Redux store.
  root.render(
    <StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </StrictMode>,
  );
}

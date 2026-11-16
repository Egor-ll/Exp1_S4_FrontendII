import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './styles.css';

function StartingScreen() {
  return (
    <main className="startup-screen" role="status">
      <p>Preparando la librería…</p>
    </main>
  );
}

class AppErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error('Error al mostrar la tienda:', error, info.componentStack);
  }

  render() {
    if (this.state.error) {
      return (
        <main className="app-error" role="alert">
          <p className="eyebrow">ERROR AL MOSTRAR LA TIENDA</p>
          <h1>La aplicación encontró un problema</h1>
          <p>{this.state.error.message || String(this.state.error)}</p>
          <p>Comparte este mensaje para corregir el componente que falló.</p>
        </main>
      );
    }

    return this.props.children;
  }
}

async function enableMock() {
  if (!import.meta.env.DEV) {
    return true;
  }

  try {
    const { worker } = await import('./mocks/browser.js');
    await worker.start({ onUnhandledRequest: 'bypass' });
    return true;
  } catch (error) {
    console.error('No se pudo iniciar el servidor REST simulado (MSW):', error);
    return false;
  }
}

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(<StartingScreen />);

async function startApp() {
  // If service worker registration hangs, still show the app after a short wait.
  const startupTimeout = new Promise((resolve) => {
    window.setTimeout(() => resolve(false), 1500);
  });

  await Promise.race([enableMock(), startupTimeout]);

  root.render(
    <AppErrorBoundary>
      <React.StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </React.StrictMode>
    </AppErrorBoundary>,
  );
}

startApp();

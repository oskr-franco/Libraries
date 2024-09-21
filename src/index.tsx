import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const render = (Component: React.FC) => {
  root.render( <Component />);
};
  
render(App);

if (module.hot) {
  module.hot.accept('./App', async () => {
    const { default: NextApp } = await import('./App');
    render(NextApp);
  });
}
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { IntlProvider } from 'react-intl';
import moment from 'moment';

import Vms from './routes';
import store from './store';
import messages_it from './intl/localizationData/it';
import messages_en from './intl/localizationData/en';
import './style.scss';

// 1. Inizializzazione delle icone social gratuite
library.add(fab);

// 2. Configurazione della lingua e della localizzazione
const messages = {
  'it': messages_it,
  'en': messages_en,
};

let language = navigator.language.split(/[-_]/)[0];
const ls = localStorage.getItem('vms.user');

if (ls) {
  const user = JSON.parse(ls);
  if (user.language) language = user.language.split(/[-_]/)[0];
}

moment.locale(language);

// 3. Avvio del rendering dell'applicazione React
const container = document.getElementById('root');
const root = createRoot(container);

const App = () => {
  return (
    <BrowserRouter>
      <IntlProvider
        locale={language}
        messages={messages[language]}
      >
        <Vms />
      </IntlProvider>
    </BrowserRouter>
  );
};

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

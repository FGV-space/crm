import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { fas } from '@fortawesome/pro-solid-svg-icons';
import { fad } from '@fortawesome/pro-duotone-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/pro-regular-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import Vms from './routes';
import store from './store';
import './style.scss';

library.add(far, fad, fab, fas);

// Language setup
import { IntlProvider } from 'react-intl';
import messages_it from './intl/localizationData/it';
import messages_en from './intl/localizationData/en';

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

import moment from 'moment';
moment.locale(language);
// end

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
}

root.render(
  <React.StrictMode>
    <Provider
      store={store}
    >
      <App />
    </Provider>
  </React.StrictMode>
);

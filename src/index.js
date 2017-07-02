import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';
//import registerServiceWorker from './registerServiceWorker';
import { createStore } from 'redux';
import stt from './reducers';
import './css/bootswatch_slate.css';
import './css/bs-custom.css';
import './css/snackbar-custom.css';
import './css/index.css';

const store = createStore(
  stt,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);
const rootEl = document.getElementById('root');

const render = () => {
  ReactDOM.render(
    <App
      obj={store.getState()}
      updateClientlist={(cl) => store.dispatch({ type: 'UPDATE_CLIENTLIST', clientlist: cl })}
      updateTmpClient={(c) => store.dispatch({ type: 'UPDATE_TMP_CLIENT', tmp_client: c })}
      updateClient={(cobj) => store.dispatch({ type: 'UPDATE_CLIENT', client: cobj })}
      updateApplistForClient={(alfc) => store.dispatch({ type: 'UPDATE_APPLIST_FOR_CLIENT', applistForClient: alfc })}
      updateAppForClient={(afc) => store.dispatch({ type: 'UPDATE_APP_FOR_CLIENT', appForClient: afc })}
      clientlistURL='http://selection4test.ru/projects/gpo/build/_examples/clientlist.json'
      updateFormState={(cfs) => store.dispatch({ type: 'UPDATE_FORM_STATE', currentFormState: cfs })}
    />,
    rootEl
  );
}

render();
store.subscribe(render);

// пример подписки на изменение store:
//store.subscribe(() => {console.log(`Store has updated! New store: ${JSON.stringify(store.getState())}`)});

//registerServiceWorker();

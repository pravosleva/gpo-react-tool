import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './components/App';
//import registerServiceWorker from './registerServiceWorker';
import { createStore } from 'redux';
import stt from './reducers';
import './css/bootswatch_slate.css';
import './css/bs-custom.css';
import './css/snackbar-custom.css';

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
      updateClient={(c) => store.dispatch({ type: 'UPDATE_CLIENT', client: c })}
      updateApplistForClient={(alfc) => store.dispatch({ type: 'UPDATE_APPLIST_FOR_CLIENT', applistForClient: alfc })}
      updateAppForClient={(afc) => store.dispatch({ type: 'UPDATE_APP_FOR_CLIENT', appForClient: afc })}
      mainURL=''
    />,
    rootEl
  );
}

render();
store.subscribe(render);

//registerServiceWorker();

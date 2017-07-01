export default (
  state = {
    currentFormState: {editorString: ''},
    clientlist: [],
    tmp_client: '',
    client: '',
    applistForClient: [],
    appForClient: ''
  },
  action
) => {
  switch (action.type) {
    case 'UPDATE_FORM_STATE': state.currentFormState = action.currentFormState; return state;
    case 'UPDATE_TMP_CLIENT':
      state.tmp_client = action.tmp_client;
      return state;
    case 'UPDATE_CLIENT':
      state.client = action.client;
      return state;
    case 'UPDATE_CLIENTLIST': state.clientlist = action.clientlist; return state;
    case 'UPDATE_APPLIST_FOR_CLIENT': state.applistForClient = action.applistForClient; return state;
    case 'UPDATE_APP_FOR_CLIENT': state.appForClient = action.appForClient; return state;
    default: return state;
  }
};

import React, { Component } from 'react';
import '../css/App.css';
import PropTypes from 'prop-types';
import axios from 'axios';
import { show } from 'js-snackbar';
import '../css/snackbar-custom.css';
import Modal from './Modal';
//import RichTextEditor from 'react-rte';
import '../css/snackbar-custom.css';
import MyStatefulEditor from './MyStatefulEditor';

show({text: '&#10004; Test msg', customClass: `alert alert-warning`, pos: `top-right`, duration:60000});

class App extends Component {
  constructor(props){
    super(props);

    this.axiosReqForClientlist = this.axiosReqForClientlist.bind(this);
    this.axiosReqForConfig = this.axiosReqForConfig.bind(this);
    this.tmpDrop = this.tmpDrop.bind(this);
  }

  updateStateObj(propName, e) {
    //console.log(e.target.value);
    switch(propName){
      case 'client':
        //show({text: `&#10004; Client will changed to ${e.target.value}`, customClass: `alert alert-success`, pos: `top-right`});
        this.props.updateClient(e.target.value);
        this.props.updateTmpClient(e.target.value);
        show({text: `&#10004; Ok! ${e.target.value} selected as Client.`, customClass: `alert alert-success`, pos: `top-right`, duration: 60000, pauseOnHover: true});
        break;
      case 'tmp_client':
        this.props.updateTmpClient(e.target.value);
        this.props.updateClient("");
        break;
      default: break;
    }
  }
  axiosReqForClientlist() {
    let self = this;
    axios({
      method: 'get',
      url: self.props.clientlistURL,
      //url: './clientlist.json', // from _examples
      //url: 'http://selection4test.ru/projects/gpo/_examples/clientlist.json', // from tester
      //url: 'https://typeahead-js-twitter-api-proxy.herokuapp.com/demo/search?q=tst',
      responseType:'json'
    })
      .then((response)=>{
        //console.log(typeof response);
        self.props.updateClientlist(response.data);
        show({text: `&#10004; It's Ok: ${JSON.stringify(response.data)}`, customClass: `alert alert-success`, pos: `top-right`, duration: 60000, pauseOnHover: true});
      })
      .catch(function (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          show({text: `&#10008; Error response: ${error.response.data}`, customClass: `alert alert-danger`, pos: `top-right`, duration: 60000, pauseOnHover: true});
          //console.log(error.response.status);
          //console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          show({text: `&#10008; Error request: ${error.config.url}`, customClass: `alert alert-danger`, pos: `top-right`, duration: 60000, pauseOnHover: true});
        } else {
          // Something happened in setting up the request that triggered an Error
          show({text: `&#10008; Error: ${error.message}`, customClass: `alert alert-danger`, pos: `top-right`, duration: 60000, pauseOnHover: true});
        }
        //console.log(error.config);
      });

  }
  axiosReqForConfig() {
    if(this.props.obj.client===''){
      show({text: `&#10008; Will you please select the Client...`, customClass: `alert alert-danger`, pos: `top-right`, pauseOnHover: true});
      return;
    };
    show({text: `&#10008; Sorry, this option is Under Construction yet...`, customClass: `alert alert-warning`, pos: `top-right`, duration: 60000, pauseOnHover: true});
  }
  tmpDrop() {
    this.props.updateClientlist([]);
    this.props.updateTmpClient("");
    this.props.updateClient("");
  }
  render() {
    const { obj } = this.props;
    let clientlist_displayed = obj.clientlist.filter(function(e, i){
      return e.clientName.toLowerCase().includes(obj.tmp_client.toLowerCase())
    }, this);
    //display={this.state.addContainerFormOpened ? 'block' : 'none'}
    let clientlistSearchingDisplay;
    obj.clientlist.length!==0?clientlistSearchingDisplay='block':clientlistSearchingDisplay='none';
    return (
      <div className="container">

        <h1>Clientlist (targetlist) Section</h1>
        <label>Set the clientlist (targerlist)</label>
        <div className='input-group'>
          <button type="button"
            className='btn btn-primary btn-sm'
            onClick={this.axiosReqForClientlist}>
            AXIOS GET for clientlist (targetlist)
          </button>
        </div>
        <div style={{display: clientlistSearchingDisplay, }}>
          <label className={obj.client!==''?'text-success':'text-danger'}>Select the client (target)</label>
          <div className='input-group'>
            <input className='form-control input-sm' type='text' value={obj.tmp_client} onChange={this.updateStateObj.bind(this, 'tmp_client')}/>
            <span className="input-group-btn">
              <button className='btn btn-default btn-sm' type="button"
                onClick={this.tmpDrop}>
                REMOVE clientlist (targetlist) from store
              </button>
              <button className={'btn btn-primary btn-sm' + (obj.client!==''?'':' disabled')} type="button"
                onClick={this.axiosReqForConfig}>
                GET for config
              </button>
            </span>
          </div>
          <select style={{marginTop:'10px'}} multiple className='form-control input-sm shadow' onChange={this.updateStateObj.bind(this, 'client')}>
            {
              clientlist_displayed.map(
                function(e, i) {
                  return <option key={i} value={e.clientName}>{e.clientName}</option>
                }, this
              )
            }
          </select>
        </div>
        <hr />

        <h1>App select Section</h1>
        <label>You will select the apps to unstall for targer</label>
        <p>Under construction...</p>
        <hr />

        <div style={{display:'none'}}>
          <h1>Modal 1 Section</h1>
          <p>Under construction...</p>
          <Modal key={0}></Modal>
          <hr />
        </div>

        <h1>react-rte test</h1>
        <label>You could make new json</label>
        <MyStatefulEditor updateFormState={this.props.updateFormState} />
        <label>Result</label>
        <input className='form-control input-sm' type='text' value={obj.currentFormState.editorString} disabled />

      </div>
    );
  }
}

App.propTypes = {
  obj: PropTypes.object.isRequired,
  updateClientlist: PropTypes.func.isRequired,
  updateTmpClient: PropTypes.func.isRequired,
  updateClient: PropTypes.func.isRequired,
  updateApplistForClient: PropTypes.func.isRequired,
  updateAppForClient: PropTypes.func.isRequired,
  clientlistURL: PropTypes.string.isRequired,
  updateFormState: PropTypes.func.isRequired,
}

export default App;

import React, { Component } from 'react';
import '../css/App.css';
import '../css/index.css';
import PropTypes from 'prop-types';
import axios from 'axios';
import { show } from 'js-snackbar';
import '../css/snackbar-custom.css';
import Modal from './Modal';
//import RichTextEditor from 'react-rte';
import '../css/snackbar-custom.css';
import MyStatefulEditor from './MyStatefulEditor';

show({text: '&#10004;&nbsp;&nbsp;Last Update at 2017-07-03', customClass: `alert alert-warning`, pos: `top-center`, duration:5000});

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      _ids_appsToInstall: []
    }
    this.axiosReqForClientlist = this.axiosReqForClientlist.bind(this);
    this.axiosReqForConfig = this.axiosReqForConfig.bind(this);
    this.fullDrop = this.fullDrop.bind(this);
    this.axiosReqToCreateNewJSON = this.axiosReqToCreateNewJSON.bind(this);
    this.axiosReqToInstall = this.axiosReqToInstall.bind(this);
  }

  updateStateObj(propName, e) {
    //console.log(e.target.value);
    switch(propName){
      case 'client':
        /*  Remember:
            e.target.value - is _id of the client here.
        */
        let obj = this.props.obj, client_to_state;
        client_to_state = obj.clientlist.filter(function(el, i){return el._id===e.target.value}, this)[0];
        this.props.updateClient(client_to_state);
        this.props.updateTmpClient(client_to_state.clientName);
        show({text: `&#10004;&nbsp;&nbsp;Ok! ${client_to_state.clientName} selected as Client.`, customClass: `alert alert-success`, pos: `top-center`, duration: 5000, pauseOnHover: true});

        this.setState({_ids_appsToInstall:[]});
        break;
      case 'tmp_client':
        this.props.updateTmpClient(e.target.value);
        this.props.updateClient({clientName:'', configURL:'', _id:''});
        this.props.updateApplistForClient([]);

        this.setState({_ids_appsToInstall:[]});
        break;
      default: break;
    }
  }
  axiosReqForClientlist() {
    this.setState({_ids_appsToInstall:[]});

    let self = this;
    let _getUUID = () => {
      let newUUID = ('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        let r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
      }));
      return newUUID;
    };
    axios({
      method: 'get',
      url: self.props.clientlistURL,
      //url: './_examples/clientlist.json', // from ./_examples
      //url: 'http://selection4test.ru/projects/gpo/_examples/clientlist.json', // from tester
      //url: 'https://typeahead-js-twitter-api-proxy.herokuapp.com/demo/search?q=tst',
      responseType:'json'
    })
      .then((response)=>{
        //console.log(typeof response);
        let clientlist = response.data;
        // --- Need to create new prop '_id' as unique ID for this client (for usage in Front-end only)
        clientlist.map((e, i)=>{
          e._id = _getUUID();
        });
        // --- Tested.
        self.props.updateClientlist(clientlist);
        show({text: `&#10004;&nbsp;&nbsp;It's Ok: ${clientlist.length} clients has taken from Back-end...`, customClass: `alert alert-success`, pos: `top-center`, duration: 5000, pauseOnHover: true});
      })
      .catch(function (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          show({text: `&#10008;&nbsp;&nbsp;Error response: ${error.response.data}`, customClass: `alert alert-danger`, pos: `top-center`, duration: 60000, pauseOnHover: true});
          //console.log(error.response.status);
          //console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          show({text: `&#10008;&nbsp;&nbsp;Error request: ${error.config.url}`, customClass: `alert alert-danger`, pos: `top-center`, duration: 60000, pauseOnHover: true});
        } else {
          // Something happened in setting up the request that triggered an Error
          show({text: `&#10008;&nbsp;&nbsp;Error: ${error.message}`, customClass: `alert alert-danger`, pos: `top-center`, duration: 60000, pauseOnHover: true});
        }
        //console.log(error.config);
      });

  }
  axiosReqForConfig() {
    this.setState({_ids_appsToInstall:[]});

    let configURL = this.props.obj.client.configURL;
    let self = this;
    let _getUUID = () => {
      let newUUID = ('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        let r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
      }));
      return newUUID;
    };
    if(this.props.obj.client===''){
      show({text: `&#10008;&nbsp;&nbsp;Will you please select the Client...`, customClass: `alert alert-danger`, duration: 5000, pos: `top-center`, pauseOnHover: true});
      return;
    }else{
      //console.log(`${configURL}`);
      //show({text: `&#10004;&nbsp;&nbsp;It's Ok: GET req will send to ${configURL}`, customClass: `alert alert-success`, pos: `top-center`, duration: 10000, pauseOnHover: true});
    };
    axios({
      method: 'get',
      url: self.props.obj.client.configURL,
      responseType:'json'
    })
      .then((response)=>{
        let applistForClient = response.data;
        // --- Need to create new prop '_id' as unique ID for this client (for usage in Front-end only)
        applistForClient.map((e, i)=>{
          e._id = _getUUID();
        });
        // ---
        self.props.updateApplistForClient(applistForClient);
        show({text: `&#10004;&nbsp;&nbsp;It's Ok: ${JSON.stringify(applistForClient.length)} apps are possible to install for this client.`, customClass: `alert alert-success`, pos: `top-center`, duration: 5000, pauseOnHover: true});
      })
      .catch(function (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          show({text: `&#10008;&nbsp;&nbsp;Error response: ${error.response.data}`, customClass: `alert alert-danger`, pos: `top-center`, duration: 60000, pauseOnHover: true});
          //console.log(error.response.status);
          //console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          show({text: `&#10008;&nbsp;&nbsp;Error request: ${error.config.url}`, customClass: `alert alert-danger`, pos: `top-center`, duration: 60000, pauseOnHover: true});
        } else {
          // Something happened in setting up the request that triggered an Error
          show({text: `&#10008;&nbsp;&nbsp;Error: ${error.message}`, customClass: `alert alert-danger`, pos: `top-center`, duration: 60000, pauseOnHover: true});
        }
        //console.log(error.config);
      });
  }
  componentDidUpdate() {
    console.log(`_ids_appsToInstall.length = ${this.state._ids_appsToInstall.length}: ${JSON.stringify(this.state._ids_appsToInstall)}`);
  }
  checkboxTest(e) {
    //console.log(e.target.value);
    let _ids_appsToInstall = this.state._ids_appsToInstall,
      included = false, _id;
    _ids_appsToInstall.map((el, i)=>{ if(el===e.target.value){ included = true; _id = i } });
    if(included===true){
      // В массиве он есть - Удалить элемент...
      _ids_appsToInstall.splice(_id, 1);
    }else{
      // В массиве его нет - Добавить элемент...
      _ids_appsToInstall.push(e.target.value);
    }
    this.setState({ _ids_appsToInstall });
  }
  fullDrop() {
    this.props.updateClientlist([]);
    this.props.updateTmpClient('');
    this.props.updateClient({clientName:'', configURL:'', _id:''});
    this.props.updateApplistForClient([]);
    this.setState({_ids_appsToInstall:[]});
  }
  axiosReqToCreateNewJSON() {
    show({text: `&#10008;&nbsp;&nbsp;Sorry, this option is Under Construction yet...`, customClass: `alert alert-warning`, pos: `top-center`, duration: 5000, pauseOnHover: true});
    // See this.props.obj.currentFormState.editorString
    //..
  }
  axiosReqToInstall() {
    show({text: `&#10008;&nbsp;&nbsp;Sorry, this option is Under Construction yet...`, customClass: `alert alert-warning`, pos: `top-center`, duration: 5000, pauseOnHover: true});
    // See this.props.obj.applistForClient & this.state._ids_appsToInstall
    //..
  }
  render() {
    const { obj } = this.props;
    let clientlist_displayed = obj.clientlist.filter(function(e, i){
      return e.clientName.toLowerCase().includes(obj.tmp_client.toLowerCase())
    }, this);
    let applistForClient = obj.applistForClient;

    let isValidJSON = function(str){
      try{ JSON.parse(str) }catch(e){ return false }
      return true;
    };

    return (
      <div className="container">

        <h1>Clientlist Section</h1>
        <div className='row'>
          <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
            <label>Set the clientlist</label>
            <br />
            <div className='btn-group'>
              <button type="button"
                className='btn btn-primary btn-sm'
                onClick={this.axiosReqForClientlist}>
                AXIOS GET for clientlist
              </button>
            </div>
            <div style={{display:(obj.clientlist.length!==0?'block':'none')}}>
              <label className={obj.client.clientName!==''?'text-success':'text-danger'}>Select the client (target)</label>
              <div className='input-group'>
                <input className='form-control input-sm' type='text' value={obj.tmp_client} onChange={this.updateStateObj.bind(this, 'tmp_client')}/>
                <span className="input-group-btn">
                  <button className='btn btn-default btn-sm' type="button"
                    onClick={this.fullDrop}
                    title='Remove clientlist from store'>
                    REM
                  </button>
                  <button className={'btn btn-primary btn-sm' + (obj.client.clientName!==''?'':' disabled')} type="button"
                    onClick={this.axiosReqForConfig}>
                    GET for config
                  </button>
                </span>
              </div>
              <select style={{marginTop:'10px'}} multiple className='form-control input-sm shadow' onChange={this.updateStateObj.bind(this, 'client')}>
                {
                  clientlist_displayed.map(
                    function(e, i) {
                      return <option key={i} value={e._id}>{e.clientName}</option>
                    }, this
                  )
                }
              </select>
            </div>
          </div>
          <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
            <div style={{display:(applistForClient.length!==0?"block":"none")}}>
              <label>You will select the apps to install on client PC</label>
              <ul>
                {
                  applistForClient.map(function(e, i){ return <li><input type="checkbox" value={e._id} onClick={this.checkboxTest.bind(this)} />{e.appName}</li> }, this)
                }
              </ul>
              <div style={{display:(this.state._ids_appsToInstall.length!==0?"block":"none")}}>
                <label>You could to make request to Back-end to install the program on client PC</label>
                <div className='btn-group'>
                  <button type="button"
                    className='btn btn-primary btn-sm'
                    onClick={this.axiosReqToInstall}>
                    AXIOS GET to install
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr />

        <div style={{display: 'none'}}>
          <h1>Modal 1 Section</h1>
          <p>Under construction...</p>
          <Modal key={0}></Modal>
          <hr />
        </div>

        <h1>Editor Section (based on react-rte)</h1>
        <div className='row'>
          <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
            <label>You could make new json</label>
            <div className='shadow' >{/* style={{transform:'translate(0px,0px) scaleX(1.062) rotate3d(1, 0, .2, -8deg)'}} */}
              <MyStatefulEditor updateFormState={this.props.updateFormState} style={{zIndex:'0'}} />
            </div>
          </div>
          <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
            <label
              className={isValidJSON(obj.currentFormState.editorString)===true?'text-success':'text-muted'}>
              Result: {isValidJSON(obj.currentFormState.editorString)===true?'it is correct json string!':'json is not valid...'}
            </label>

            <div className='shadow special'>
              <textarea
                className='form-control input-sm expandable' type='text'
                style={{height:"70px"}}
                value={obj.currentFormState.editorString}
                disabled></textarea>
            </div>
            <div className='btn-group pull-right' style={{display:(isValidJSON(obj.currentFormState.editorString)===true?'block':'none')}}>
              <button type="button"
                className='btn btn-primary btn-sm'
                style={{marginTop:'10px', marginBottom:'10px'}}
                onClick={this.axiosReqToCreateNewJSON}>
                AXIOS POST to create new instruction
              </button>
            </div>

          </div>
        </div>

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

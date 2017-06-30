import React, { Component } from 'react';
import '../css/App.css';
import PropTypes from 'prop-types';
import axios from 'axios';
import { show } from 'js-snackbar';
import '../css/snackbar-custom.css';
show({text: '&#10004; Test msg', customClass: `alert alert-warning`, pos: `top-right`});

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

        <h1>Welcome to React</h1>

        <label>Set the clientlist</label>
        <div className='input-group'>
          <button type="button"
            className='btn btn-primary btn-sm'
            onClick={this.axiosReqForClientlist}>
            AXIOS GET for clientlist
          </button>
        </div>
        <hr />

        <div style={{display: clientlistSearchingDisplay}}>
          <label className={obj.client!==''?'text-success':'text-danger'}>Select the client</label>
          <div className='input-group'>
            <input className='form-control input-sm' type='text' value={obj.tmp_client} onChange={this.updateStateObj.bind(this, 'tmp_client')}/>
            <span className="input-group-btn">
              <button className='btn btn-default btn-sm' type="button"
                onClick={this.tmpDrop}>
                REMOVE clientlist from store
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
}

export default App;

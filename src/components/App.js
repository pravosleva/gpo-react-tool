import React, { Component } from 'react';
import '../css/App.css';
import PropTypes from 'prop-types';
import axios from 'axios';
import { show } from 'js-snackbar';
import '../css/snackbar-custom.css';
show({text: '&#10004; Test msg', customClass: `alert alert-warning`, pos: `top-right`});

class App extends Component {
  updateStateObj(propName, e) {
    //console.log(e.target.value);
    switch(propName){
      case 'client':
        show({text: `&#10004; Client will changed to ${e.target.value}`, customClass: `alert alert-success`, pos: `top-right`});
        this.props.updateClient(e.target.value);
        this.props.updateTmpClient(e.target.value);
        break;
      case 'tmp_client':
        this.props.updateTmpClient(e.target.value);
        this.props.updateClient("");
        break;
      default: break;
    }
  }
  render() {
    const { obj } = this.props;
    let clientlist_displayed = obj.clientlist.filter(function(e, i){
      return e.name.toLowerCase().includes(obj.tmp_client.toLowerCase())
    }, this);
    return (
      <div className="container">

        <h1>Welcome to React</h1>
        <label className={obj.client!==''?'text-success':'text-danger'}>Select the client</label>
        <div className='input-group'>
          <input className='form-control input-sm' type='text' value={obj.tmp_client} onChange={this.updateStateObj.bind(this, 'tmp_client')}/>
          <span className="input-group-btn">
            <button className={'btn btn-primary btn-sm' + (obj.client!==''?'':' disabled')} type="button"
              onClick={() => {console.log('Here should be GET or POST req...')}}>
              Get config
            </button>
          </span>
        </div>
        <select style={{marginTop:'10px'}} multiple className='form-control input-sm shadow' onChange={this.updateStateObj.bind(this, 'client')}>
          {clientlist_displayed.map(function(e, i) {
            return (<option key={i}>{e.name} / {e.configURL}</option>)
          }, this)}
        </select>


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
  mainURL: PropTypes.string.isRequired,
}

export default App;

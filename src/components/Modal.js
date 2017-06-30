import React from 'react';
import ReactModal from 'react-modal';
import '../css/react-modal-custom.css';

export default class Modal extends React.Component {
  constructor () {
    super();
    this.state = {
      showModal: false
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleOpenModal () {
    this.setState({ showModal: true });
  }

  handleCloseModal () {
    this.setState({ showModal: false });
  }

  render () {
    return (
      <div>
        <button onClick={this.handleOpenModal} className='btn btn-primary btn-sm'>Trigger Modal</button>
        <ReactModal
           isOpen={this.state.showModal}
           contentLabel="Minimal Modal Example"
           style={{position:'relative'}}
        >
          <button style={{position:'absolute', top:'20px', right:'20px'}} onClick={this.handleCloseModal} className='btn btn-primary btn-sm'>Close Modal</button>
          <h2>Hello React-Modal</h2>
          <button style={{position:'absolute', bottom:'20px', right:'20px'}} onClick={() => {window.alert('hello world')}} className='btn btn-primary btn-sm'>Hello world</button>

        </ReactModal>
      </div>
    );
  }
}

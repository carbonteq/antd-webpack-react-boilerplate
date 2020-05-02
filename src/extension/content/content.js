/* global document */

import React, { Component } from 'react';
import { render } from 'react-dom';
import { Drawer, Button } from 'antd';
import Content from '../../app/containers/Content';

class InjectApp extends Component {

  constructor(props){
    super(props);
    this.state = { visible: false };
  }

  componentDidMount(){
    document.getElementById('inject-react').scrollIntoView();
  }

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const {currentShEventId} = this.props;
    return (
      <div>
        <Button type="primary" onClick={this.showDrawer}>
          Stubhub Stats Explorer
        </Button>
        <Drawer
          width={550}
          placement="right"
          closable={true}
          onClose={this.onClose}
          visible={this.state.visible}
        >
          <Content shEventId={currentShEventId}/>
        </Drawer>
      </div>
    );
  }
}


window.addEventListener('load', () => {
  const injectDOM = document.createElement('div');
  injectDOM.id = 'inject-react';
  injectDOM.style.textAlign = 'center';
  document.body.appendChild(injectDOM);
  render(<InjectApp />, injectDOM);
});

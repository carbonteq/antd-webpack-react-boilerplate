import React from 'react';
import AppLayout from '../components/appLayout';
import '../assets/content.css';

class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
  }

  render() {
    return (
      <AppLayout title="Extension Boiler Plate">
        <div>Add content script related content here</div>
      </AppLayout>
    );
  }
}


export default Content;

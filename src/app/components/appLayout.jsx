import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Row, Col } from 'antd';

const { Content } = Layout;

export default function AppLayout(props) {
  const { title, children } = props;
  return (
    <Layout>
      <Content style={{ padding: '24px 16px 0', background: 'white' }}>
        <Row>
          <Col style={{ textAlign: 'center' }}>
            <h2>
              {title}
            </h2>
          </Col>
        </Row>
        {children}
      </Content>
    </Layout>
  );
}

AppLayout.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

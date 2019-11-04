import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row
} from 'reactstrap';
import React, { Component } from 'react';

import FormStaticPage from './FormStaticPage';

class AddStaticPage extends Component {

  handleSubmit = async (data) => {
    return this.props.actions.addStaticPage(data);
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col lg={12}>
            <Card>
              <CardHeader>
                <strong><i className="icon-info pr-1"></i>Add new static page</strong>
              </CardHeader>
              <CardBody>
                <FormStaticPage onSubmit={this.handleSubmit} {...this.props}/>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default AddStaticPage;

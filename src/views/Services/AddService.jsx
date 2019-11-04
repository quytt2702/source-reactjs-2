import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row
} from 'reactstrap';
import React, { Component } from 'react';

import FormService from './FormService';

class AddService extends Component {

  handleSubmit = async (data) => {
    return this.props.actions.addService(this.props.match.params.salon_id, data);
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col lg={12}>
            <Card>
              <CardHeader>
                <strong><i className="icon-info pr-1"></i>Add new service</strong>
              </CardHeader>
              <CardBody>
                <FormService onSubmit={this.handleSubmit} {...this.props}/>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default AddService;

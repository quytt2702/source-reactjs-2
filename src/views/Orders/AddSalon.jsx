import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row
} from 'reactstrap';
import React, { Component } from 'react';

import FormSalon from './FormSalon';

class AddSalon extends Component {

  handleSubmit = async (data) => {
    return this.props.actions.addSalon(data);
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col lg={12}>
            <Card>
              <CardHeader>
                <strong><i className="icon-info pr-1"></i>Add new salon</strong>
              </CardHeader>
              <CardBody>
                <FormSalon onSubmit={this.handleSubmit} {...this.props}/>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default AddSalon;

import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row
} from 'reactstrap';
import React, { Component } from 'react';

import FormPromotion from './FormPromotion';

class AddPromotion extends Component {

  handleSubmit = async (data) => {
    return this.props.actions.addPromotion(data);
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col lg={12}>
            <Card>
              <CardHeader>
                <strong><i className="icon-info pr-1"></i>Add new promotions</strong>
              </CardHeader>
              <CardBody>
                <FormPromotion onSubmit={this.handleSubmit} {...this.props}/>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default AddPromotion;

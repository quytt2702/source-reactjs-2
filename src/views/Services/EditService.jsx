import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row
} from 'reactstrap';
import React, { Component } from 'react';

import FormService from './FormService';
import build from 'redux-object';

class EditService extends Component {

  handleSubmit = async (data) => {
    return this.props.actions.editService(this.props.match.params.service_id, data);
  }

  render() {
    let service = build(this.props.services.schema, 'Service', this.props.match.params.service_id);
    if (!service) {
      service = this.props.services.show;
    }

    return (
      <div className="animated fadeIn">
        <Row>
          <Col lg={12}>
            <Card>
              <CardHeader>
                <strong><i className="icon-info pr-1"></i>Edit service</strong>
              </CardHeader>
              <CardBody>
                <FormService onSubmit={this.handleSubmit} service={service} {...this.props} />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default EditService;

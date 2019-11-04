import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row
} from 'reactstrap';
import React, { Component } from 'react';

import FormSalon from './FormSalon';
import build from 'redux-object';

class EditSalon extends Component {

  handleSubmit = async (data) => {
    return this.props.actions.editSalon(this.props.match.params.id, data);
  }

  render() {
    let salon = build(this.props.salons.schema, 'Salon', this.props.match.params.id);
    if (!salon) {
      salon = this.props.salons.show;
    }

    return (
      <div className="animated fadeIn">
        <Row>
          <Col lg={12}>
            <Card>
              <CardHeader>
                <strong><i className="icon-info pr-1"></i>Edit salon</strong>
              </CardHeader>
              <CardBody>
                <FormSalon onSubmit={this.handleSubmit} salon={salon} {...this.props} />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default EditSalon;

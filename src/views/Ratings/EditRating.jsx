import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row
} from 'reactstrap';
import React, { Component } from 'react';

import FormRating from './FormRating';
import build from 'redux-object';

class EditRating extends Component {

  handleSubmit = async (data) => {
    return this.props.actions.editRating(this.props.match.params.id, data);
  }

  render() {
    let rating = build(this.props.ratings.schema, 'Rating', this.props.match.params.id);
    if (!rating) {
      rating = this.props.ratings.show;
    }

    return (
      <div className="animated fadeIn">
        <Row>
          <Col lg={12}>
            <Card>
              <CardHeader>
                <strong><i className="icon-info pr-1"></i>Edit rating</strong>
              </CardHeader>
              <CardBody>
                <FormRating onSubmit={this.handleSubmit} rating={rating} {...this.props} />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default EditRating;

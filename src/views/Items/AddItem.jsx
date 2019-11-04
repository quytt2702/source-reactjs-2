import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row
} from 'reactstrap';
import React, { Component } from 'react';

import FormItem from './FormItem';

class AddItem extends Component {

  handleSubmit = async (data) => {
    return this.props.actions.addItem(this.props.match.params.service_id, data);
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col lg={12}>
            <Card>
              <CardHeader>
                <strong><i className="icon-info pr-1"></i>Add new item</strong>
              </CardHeader>
              <CardBody>
                <FormItem onSubmit={this.handleSubmit} {...this.props}/>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default AddItem;

import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row
} from 'reactstrap';
import React, { Component } from 'react';

import FormItem from './FormItem';
import build from 'redux-object';

class EditItem extends Component {

  handleSubmit = async (data) => {
    return this.props.actions.editService(this.props.match.params.item_id, data);
  }

  render() {
    let item = build(this.props.items.schema, 'ServiceItem', this.props.match.params.item_id);
    if (!item) {
      item = this.props.items.show;
    }

    return (
      <div className="animated fadeIn">
        <Row>
          <Col lg={12}>
            <Card>
              <CardHeader>
                <strong><i className="icon-info pr-1"></i>Edit item</strong>
              </CardHeader>
              <CardBody>
                <FormItem onSubmit={this.handleSubmit} item={item} {...this.props} />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default EditItem;

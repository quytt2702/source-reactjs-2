import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row
} from 'reactstrap';
import React, { Component } from 'react';

import FormUser from './FormUser';

class AddUser extends Component {

  handleSubmit = async (data) => {
    return this.props.actions.addUser(data);
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col lg={12}>
            <Card>
              <CardHeader>
                <strong><i className="icon-info pr-1"></i>Add new user</strong>
              </CardHeader>
              <CardBody>
                <FormUser onSubmit={this.handleSubmit} {...this.props}/>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default AddUser;

import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row
} from 'reactstrap';
import React, { Component } from 'react';

import FormUser from './FormUser';

class EditUser extends Component {

  handleSubmit = async (data) => {
    return this.props.actions.editUser(this.props.match.params.id, data);
  }

  render() {
    const {show} = this.props.users;
    return (
      <div className="animated fadeIn">
        <Row>
          <Col lg={12}>
            <Card>
              <CardHeader>
                <strong><i className="icon-info pr-1"></i>Edit user</strong>
              </CardHeader>
              <CardBody>
                <FormUser onSubmit={this.handleSubmit} user={show} {...this.props} />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default EditUser;

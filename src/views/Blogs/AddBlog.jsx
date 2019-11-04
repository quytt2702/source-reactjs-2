import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row
} from 'reactstrap';
import React, { Component } from 'react';

import FormBlog from './FormBlog';

class AddBlog extends Component {

  handleSubmit = async (data) => {
    return this.props.actions.addBlog(data);
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col lg={12}>
            <Card>
              <CardHeader>
                <strong><i className="icon-info pr-1"></i>Add new blog</strong>
              </CardHeader>
              <CardBody>
                <FormBlog onSubmit={this.handleSubmit} {...this.props}/>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default AddBlog;

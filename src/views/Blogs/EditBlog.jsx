import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row
} from 'reactstrap';
import React, { Component } from 'react';

import FormBlog from './FormBlog';
import build from 'redux-object';

class EditBlog extends Component {

  handleSubmit = async (data) => {
    return this.props.actions.editBlog(this.props.match.params.id, data);
  }

  render() {
    let blog = build(this.props.blogs.schema, 'Blog', this.props.match.params.id);
    if (!blog) {
      blog = this.props.blogs.show;
    }

    return (
      <div className="animated fadeIn">
        <Row>
          <Col lg={12}>
            <Card>
              <CardHeader>
                <strong><i className="icon-info pr-1"></i>Edit blog</strong>
              </CardHeader>
              <CardBody>
                <FormBlog onSubmit={this.handleSubmit} blog={blog} {...this.props} />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default EditBlog;

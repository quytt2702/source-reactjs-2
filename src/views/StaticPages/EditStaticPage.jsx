import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row
} from 'reactstrap';
import React, { Component } from 'react';

import FormStaticPage from './FormStaticPage';
import build from 'redux-object';

class EditStaticPage extends Component {

  handleSubmit = async (data) => {
    return this.props.actions.editStaticPage(this.props.match.params.id, data);
  }

  render() {
    let staticPage = build(this.props.staticPages.schema, 'StaticPage', this.props.match.params.id);
    if (!staticPage) {
      staticPage = this.props.staticPages.show;
    }

    return (
      <div className="animated fadeIn">
        <Row>
          <Col lg={12}>
            <Card>
              <CardHeader>
                <strong><i className="icon-info pr-1"></i>Edit static page</strong>
              </CardHeader>
              <CardBody>
                <FormStaticPage onSubmit={this.handleSubmit} staticPage={staticPage} {...this.props} />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default EditStaticPage;

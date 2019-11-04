import "@blueprintjs/datetime/lib/css/blueprint-datetime.css";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import 'antd/dist/antd.css';

import { Button as BtnUpload, Icon, Upload } from 'antd';

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Form,
  FormGroup,
  Input,
  InputGroup,
  Label,
  FormFeedback
} from 'reactstrap';
import { ContentState, EditorState, convertToRaw } from 'draft-js';
import React, { Component } from 'react';

import { AppSwitch } from '@coreui/react';
import { Editor } from 'react-draft-wysiwyg';
import _ from 'lodash';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

const API_UPLOAD_URL = process.env.REACT_APP_UPLOAD_URL || 'localhost:9000';

class FormStaticPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      description: '',
      page_name: '',
      content: '',
      status: 0,
      editorState: EditorState.createEmpty(),
      submitting: false,
      photo: [],
      fileList: [],
    }
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  handleUploadChange = (info) => {
    let fileList = info.fileList;
    let ids = this.state.photo;

    fileList = fileList.map((file) => {
      if (file.response) {
        file.url = file.response.url;
      }
      return file;
    });

    fileList = fileList.filter((file) => {
      if (file.response) {
        if (file.response.data !== undefined) {
          ids = _.concat(ids, file.response.data.id);
          return file.response.data !== undefined;
        }
      }
      return true;
    });

    this.setState({ fileList, photo: _.uniqBy(ids) });
  }

  handleSubmit = async (e) => {
    e.preventDefault();

    if (this.state.submitting) {
      return;
    }

    await this.setState({
      submitting: true
    });

    const data = this.state;
    data.content = draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()));

    this.props.onSubmit(data).then(async (res) => {
      if (res.payload && (res.payload.status === 201 || res.payload.status === 200)) {
        return this.props.history.push('/static-pages');
      }
      if (res.error && res.error.response && res.error.response.status === 422) {
        this.setState({
          submitting: false
        });
      }
    }).catch(e => {
      return this.setState({
        submitting: false
      });
    });
  }

  componentWillReceiveProps = (props) => {
    const { staticPage } = props;
    if (staticPage && staticPage !== {}) {
      const contentState = ContentState.createFromBlockArray(htmlToDraft(staticPage.content || ''));
      const image = staticPage.image ? [{
          uid: staticPage.image.id,
          id: staticPage.image.id,
          name: staticPage.image.name,
          url: staticPage.image.url
        }] :  this.state.fileList;

      this.setState({
        name: staticPage.name || '',
        description: staticPage.description || '',
        page_name: staticPage.page_name || '',
        editorState: EditorState.createWithContent(contentState),
        status: staticPage.status || 0,
        fileList: image
      });
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
      error: ''
    });
  }

  handleChangeStatus = e => {
    this.setState({
      [e.target.name]: +e.target.checked*10,
      error: ''
    });
  }

  render() {
    const { editorState } = this.state;
    const { token } = this.props.auth.user;

    const props = {
      action: API_UPLOAD_URL,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      onChange: this.handleUploadChange,
      onRemove: async (file) => {
        const id = file.id || file.response.data.id || null;
        if (id !== null) {
          await this.props.actions.deleteImage(id);
          this.setState({
            ...this.state,
            photos: this.state.photos.filter(value => value !== id)
          });
        }
      },
      listType: 'picture',
      multiple: false,
      name: 'photo'
    };

    return (
      <Card>
      <CardBody>
      <Form autoComplete="off" onSubmit={this.handleSubmit} className="was-validated">
        <FormGroup>
          <InputGroup>
            <AppSwitch className={'mx-1'} variant={'pill'} color={'success'} label onChange={this.handleChangeStatus} checked={this.state.status === 10} name="status"/>
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <InputGroup>
            <Input required type="text" name="name" placeholder="Name for slug" onChange={this.handleChange} value={this.state.name} autoComplete="off" />
            <FormFeedback className="help-block">The name field is required.</FormFeedback>
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <InputGroup>
            <Input required type="text" name="page_name" placeholder="Page name" onChange={this.handleChange} value={this.state.page_name} autoComplete="off" />
            <FormFeedback className="help-block">The page name field is required.</FormFeedback>
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <InputGroup>
            <Input required type="text" name="description" placeholder="Description" onChange={this.handleChange} value={this.state.description} autoComplete="off" />
            <FormFeedback className="help-block">The description field is required.</FormFeedback>
          </InputGroup>
        </FormGroup>
        <Label htmlFor="prependedInput"><h5>Manage Photo</h5></Label>
        <FormGroup>
          <Upload {...props} fileList={this.state.fileList}>
            <BtnUpload>
              <Icon type="upload" /> upload
            </BtnUpload>
          </Upload>
        </FormGroup>
        <FormGroup>
          <Editor
            editorState={editorState}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            onEditorStateChange={this.onEditorStateChange}
          />
        </FormGroup>
      </Form>
      </CardBody>
      <CardFooter>
        <FormGroup className="form-actions">
          <Button type="submit" onClick={this.handleSubmit} size="sm" className="float-right" color="secondary">Submit</Button>
        </FormGroup>
      </CardFooter>
      </Card>
    )
  }
}

export default FormStaticPage;

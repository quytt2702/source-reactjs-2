import "@blueprintjs/datetime/lib/css/blueprint-datetime.css";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import 'antd/dist/antd.css';

import { Button as BtnUpload, Icon, Upload } from 'antd';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Col,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  FormFeedback,
  Label,
  Row
} from 'reactstrap';
import { ContentState, EditorState, convertToRaw } from 'draft-js';
import React, { Component } from 'react';

import { AppSwitch } from '@coreui/react';
import { Editor } from 'react-draft-wysiwyg';
import Select from 'react-select';
import { TimePicker } from "@blueprintjs/datetime";
import _ from 'lodash';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import moment from 'moment';

const API_UPLOAD_URL = process.env.REACT_APP_UPLOAD_URL || 'localhost:9000';

class FormSalon extends Component {

  static ENABLE = 10;

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      phone: '',
      address: '',
      type: '',
      location: '',
      status: 0,
      times: [
        {
          weekday: 'Sunday',
          begin_time: null,
          end_time: null,
        },
        {
          weekday: 'Monday',
          begin_time: null,
          end_time: null,
        },
        {
          weekday: 'Tuesday',
          begin_time: null,
          end_time: null,
        },
        {
          weekday: 'Wednesday',
          begin_time: null,
          end_time: null,
        },
        {
          weekday: 'Thursday',
          begin_time: null,
          end_time: null,
        },
        {
          weekday: 'Friday',
          begin_time: null,
          end_time: null,
        },
        {
          weekday: 'Saturday',
          begin_time: null,
          end_time: null,
        },
      ],
      owners: [],
      submitting: false,
      selectedOption: [],
      selectedType: null,
      users: [],
      photos: [],
      fileList: [],
      types: [],
      editorState: EditorState.createEmpty(),
    }
    this.timePicker = [];
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  handleUploadChange = (info) => {
    let fileList = info.fileList;
    let ids = this.state.photos;

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

    this.setState({ fileList, photos: _.uniqBy(ids) });
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
    data.info = draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()));

    this.props.onSubmit(data).then(async (res) => {
      if (res.payload && (res.payload.status === 201 || res.payload.status === 200)) {
        return this.props.history.push('/salons');
      }
      if (res.error && res.error.response) {
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
    const { salon } = props;
    if (salon && salon !== {}) {

      const contentState = ContentState.createFromBlockArray(htmlToDraft(salon.info || ''));

      const images = (salon.images && salon.images.length > 0 && salon.images.map(image => {
        return {
          uid: image.id,
          id: image.id,
          name: image.name,
          url: image.url
        }
      })) || this.state.fileList;

      let times = (salon.times && salon.times.length > 0 && salon.times.map(time => {
        return { weekday: time.weekday, begin_time: time.begin_time, end_time: time.end_time };
      })) || this.state.times;

      const order = { Sunday: 0, Monday: 1, Tuesday: 2, Wednesday: 3, Thursday: 4, Friday: 5, Saturday: 6 };
      if (times && times.length > 0) {
        times.sort(function (a, b) {
          return order[a.weekday] - order[b.weekday];
        });
      }

      times = _.merge([], this.state.times, times);

      this.setState({
        name: salon.name || '',
        phone: salon.phone || '',
        address: salon.address || '',
        owners: (salon.owners && salon.owners.map(owner => owner.id)) || [],
        type: salon.type || '',
        selectedOption: (salon.owners && salon.owners.map(owner => {
          return { value: owner.id, label: `${owner.name} - ${owner.email}`};
        })) || [],
        selectedType: { value: salon.type, label: salon.type === 'makeup' ? 'Make up' : _.startCase(salon.type)},
        editorState: EditorState.createWithContent(contentState),
        status: salon.status || 0,
        times: times,
        fileList: images
      });
    }
  }

  componentDidMount = () => {
    this.props.actions.getUsers().then(res => {
      if (!res.payload || res.payload.status !== 200) {
        return;
      }
      const responsive = res.payload.data.data;
      const options = responsive.map(item => {
        return { value: item.id, label: `${item.attributes.name} - ${item.attributes.email}` };
      });
      this.setState({
        users: Object.values(options),
        types: [
          { value: 'hair', label: 'Hair' },
          { value: 'makeup', label: 'Make up' },
          { value: 'nail', label: 'Nail' },
          { value: 'spa', label: 'Spa' }
        ]
      });
    });
  }

  onChangeOwner = (opt) => {
    this.setState({ selectedOption: opt }, () => {
      this.setState({
        owners: this.state.selectedOption.map(owner => owner.value)
      })
    });
  }

  onChangeType = (opt) => {
    this.setState({ selectedType: opt, type: opt.value });
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

  onChangeBeginTime_0 = (e) => {
    this.onChangeBeginTime(e, 0);
  }
  onChangeBeginTime_1 = (e) => {
    this.onChangeBeginTime(e, 1);
  }
  onChangeBeginTime_2 = (e) => {
    this.onChangeBeginTime(e, 2);
  }
  onChangeBeginTime_3 = (e) => {
    this.onChangeBeginTime(e, 3);
  }
  onChangeBeginTime_4 = (e) => {
    this.onChangeBeginTime(e, 4);
  }
  onChangeBeginTime_5 = (e) => {
    this.onChangeBeginTime(e, 5);
  }
  onChangeBeginTime_6 = (e) => {
    this.onChangeBeginTime(e, 6);
  }

  onChangeEndTime_0 = (e) => {
    this.onChangeEndTime(e, 0);
  }
  onChangeEndTime_1 = (e) => {
    this.onChangeEndTime(e, 1);
  }
  onChangeEndTime_2 = (e) => {
    this.onChangeEndTime(e, 2);
  }
  onChangeEndTime_3 = (e) => {
    this.onChangeEndTime(e, 3);
  }
  onChangeEndTime_4 = (e) => {
    this.onChangeEndTime(e, 4);
  }
  onChangeEndTime_5 = (e) => {
    this.onChangeEndTime(e, 5);
  }
  onChangeEndTime_6 = (e) => {
    this.onChangeEndTime(e, 6);
  }


  onChangeBeginTime = (e, i) => {
    let time = this.state.times[i];
    time = {
      ...time,
      begin_time: moment(e.toLocaleString()).unix(),
    }
    const oldTimes = this.state.times;
    oldTimes[i] = _.merge({}, this.state.times[i], time);
    const newTimes = _.merge({}, this.state.times, oldTimes);
    this.setState({
      ...this.state,
      times: Object.values(newTimes)
    });
  }

  onChangeEndTime = (e, i) => {
    let time = this.state.times[i];
    time = {
      ...time,
      end_time: moment(e.toLocaleString()).unix(),
    }
    const oldTimes = this.state.times;
    oldTimes[i] = _.merge({}, this.state.times[i], time);
    const newTimes = _.merge({}, this.state.times, oldTimes);
    this.setState({
      ...this.state,
      times: Object.values(newTimes)
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
      multiple: true,
      name: 'photo'
    };

    return (
      <Card>
      <CardBody>
      <Form autoComplete="off" onSubmit={this.handleSubmit} className="was-validated">
        <FormGroup>
          <InputGroup>
            <AppSwitch className={'mx-1'} variant={'pill'} color={'success'} label onChange={this.handleChangeStatus} checked={this.state.status === FormSalon.ENABLE} name="status"/>
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <InputGroup>
            <InputGroupAddon addonType="append">
              <InputGroupText><i className="fa fa-user"></i></InputGroupText>
            </InputGroupAddon>
            <Input type="text" name="name" placeholder="Name" onChange={this.handleChange} value={this.state.name} autoComplete="off" required />
            <FormFeedback className="help-block">The name field is required.</FormFeedback>
          </InputGroup>
        </FormGroup>
        <Label htmlFor="prependedInput"><h5>Select Type of Salon</h5></Label>
        <FormGroup>
          <Select required value={this.state.selectedType} name="type" onChange={this.onChangeType} options={this.state.types} />
        </FormGroup>
        <FormGroup>
          <InputGroup>
            <InputGroupAddon addonType="append">
              <InputGroupText><i className="fa fa-phone"></i></InputGroupText>
            </InputGroupAddon>
            <Input type="phone" name="phone" placeholder="Phone" onChange={this.handleChange} value={this.state.phone} autoComplete="off" />
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <InputGroup>
            <InputGroupAddon addonType="append">
              <InputGroupText><i className="fa fa-address-card"></i></InputGroupText>
            </InputGroupAddon>
            <Input required type="text" name="address" placeholder="Address" onChange={this.handleChange} value={this.state.address} autoComplete="off" />
            <FormFeedback className="help-block">The address field is required.</FormFeedback>
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <InputGroup>
            <InputGroupAddon addonType="append">
            <InputGroupText><i className="fa fa-globe"></i></InputGroupText>
            </InputGroupAddon>
            <Input required type="text" name="location" placeholder="City" onChange={this.handleChange} value={this.state.location} autoComplete="off" />
            <FormFeedback className="help-block">The location field is required.</FormFeedback>
          </InputGroup>
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
        <Label htmlFor="prependedInput"><h5>Select Owners</h5></Label>
        <FormGroup>
          <Select required value={this.state.selectedOption} name="owners" isMulti onChange={this.onChangeOwner} options={this.state.users} />
        </FormGroup>
        <Label htmlFor="prependedInput"><h5>Manage Photos</h5></Label>
        <FormGroup>
          <Upload {...props} fileList={this.state.fileList}>
            <BtnUpload>
              <Icon type="upload" /> upload
            </BtnUpload>
          </Upload>
        </FormGroup>
        <Label htmlFor="prependedInput"><h5>Manage Open Hours</h5></Label>
        {
          this.state.times.map((time,i) => {
            return (
              <Row key={i}>
                <Col xs="4">
                  <FormGroup>
                    {i === 0 && <Label htmlFor="ccmonth">WEEK DAY</Label>}
                    <Input type="text" name="address" onChange={this.handleChange} value={time.weekday} autoComplete="off" disabled />
                  </FormGroup>
                </Col>
                <Col xs="4">
                  <FormGroup>
                    {i === 0 && <Label htmlFor="ccmonth">BEGIN TIME</Label>}
                    <div><TimePicker useAmPm={false} value={new Date(time.begin_time*1000)} onChange={this[`onChangeBeginTime_${i}`]} /></div>
                  </FormGroup>
                </Col>
                <Col xs="4">
                  <FormGroup>
                    {i === 0 && <Label htmlFor="ccmonth">END TIME</Label>}
                    <div><TimePicker useAmPm={false} value={new Date(time.end_time*1000)} onChange={this[`onChangeEndTime_${i}`]} /></div>
                  </FormGroup>
                </Col>
              </Row>
            )
          }
        )
        }
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

export default FormSalon;

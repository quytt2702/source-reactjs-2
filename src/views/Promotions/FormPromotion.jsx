import "@blueprintjs/datetime/lib/css/blueprint-datetime.css";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import 'antd/dist/antd.css';

import { Button as BtnUpload, Icon, Upload, DatePicker } from 'antd';

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

import React, { Component } from 'react';

import { AppSwitch } from '@coreui/react';
import _ from 'lodash';
import moment from 'moment';
import Select from 'react-select';

class FormPromotion extends Component {

  constructor(props) {
    super(props);

    this.state = {
      quantity: '',
      begin_time: '',
      salon_id: null,
      selectedSalon: null,
      end_time: '',
      price: '',
      status: 0,
      submitting: false,
    }
  }

  componentDidMount = () => {
    this.props.actions.getSalons().then(res => {
      if (!res.payload || res.payload.status !== 200) {
        return;
      }
      const responsive = res.payload.data.data;
      const options = responsive.map(item => {
        return { value: item.id, label: `${item.attributes.name} - ${item.attributes.address}` };
      });
      this.setState({
        salons: Object.values(options),
        types: [
          { value: 'hair', label: 'Hair' },
          { value: 'makeup', label: 'Make up' },
          { value: 'nail', label: 'Nail' },
          { value: 'spa', label: 'Spa' }
        ]
      });
    });
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

    this.props.onSubmit(data).then(async (res) => {
      if (res.payload && (res.payload.status === 204)) {
        return this.props.history.push('/promotions');
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

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
      error: ''
    });
  }

  onChangeSalon = (opt) => {
    this.setState({ selectedSalon: opt, salon_id: opt.value });
  }

  handleChangeStatus = e => {
    this.setState({
      [e.target.name]: +e.target.checked*10,
      error: ''
    });
  }

  onChangeDateRange = (moment, string) => {
    this.setState({
      begin_time: string[0],
      end_time: string[1]
    })
  }

  render() {
    const { editorState } = this.state;
    const { token } = this.props.auth.user;
    const { RangePicker } = DatePicker;
    const dateFormat = 'YYYY-MM-DD';

    return (
      <Card>
      <CardBody>
      <Form autoComplete="off" onSubmit={this.handleSubmit} className="was-validated">
        <Label htmlFor="prependedInput"><h5>Select Salon</h5></Label>
        <FormGroup>
          <Select required value={this.state.selectedSalon} name="salon_id" onChange={this.onChangeSalon} options={this.state.salons} />
          <FormFeedback className="help-block">The salon field is required.</FormFeedback>
        </FormGroup>
        <FormGroup>
          <InputGroup>
            <Input required type="number" name="quantity" placeholder="Quantity" onChange={this.handleChange} value={this.state.quantity} autoComplete="off" />
            <FormFeedback className="help-block">The quantity field is required.</FormFeedback>
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <InputGroup>
            <Input required type="number" name="price" placeholder="Price" onChange={this.handleChange} value={this.state.description} autoComplete="off" />
            <FormFeedback className="help-block">The price field is required.</FormFeedback>
          </InputGroup>
        </FormGroup>
        <FormGroup>
        <Label htmlFor="prependedInput"><h5>From day to day</h5></Label>
          <InputGroup>
            <RangePicker
              defaultValue={[moment(new Date(), dateFormat), moment(new Date(), dateFormat)]} onChange={this.onChangeDateRange}
            />
          </InputGroup>
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

export default FormPromotion;

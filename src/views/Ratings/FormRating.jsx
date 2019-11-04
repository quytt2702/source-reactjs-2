import "@blueprintjs/datetime/lib/css/blueprint-datetime.css";

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  FormFeedback
} from 'reactstrap';
import React, { Component } from 'react';

import { AppSwitch } from '@coreui/react';
import Select from 'react-select';

class FormRating extends Component {

  static ENABLE = 1;
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      description: '',
      star: '',
      status: 2,
      salon_id: 0,
      submitting: false,
      selectedOption: [],
      users: []
    }
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    console.log(this.state);

    if (this.state.submitting) {
      return;
    }

    await this.setState({
      submitting: true
    });

    this.props.onSubmit(this.state).then(async (res) => {
      if (res.payload && (res.payload.status === 201 || res.payload.status === 200)) {
        return this.props.history.push('/ratings', this.state);
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
    const { rating } = props;
    if (rating && rating !== {}) {
      this.setState({
        name: rating.name || '',
        description: rating.description || '',
        star: rating.star || '',
        salon_id: rating.salon_id || null,
        selectedOption: { value: rating.salon.id, label: rating.salon.name },
        status: rating.status || 2,
      });
    }
  }

  componentWillMount = () => {
    this.props.actions.getSalons().then(res => {
      if (!res.payload && res.payload.status !== 200) {
        return;
      }
      const responsive = res.payload.data.data;
      const options = responsive.map(item => {
        return { value: item.id, label: `${item.attributes.name}` };
      });
      this.setState({
        salons: Object.values(options)
      });
    });
  }

  onChangeSalon = (opt) => {
    this.setState({ selectedOption: opt, salon_id: opt.value });
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
    return (
      <Card>
      <CardBody>
      <Form autoComplete="off" onSubmit={this.handleSubmit} className="was-validated">
        <FormGroup>
          <InputGroup>
            <AppSwitch className={'mx-1'} variant={'pill'} color={'success'} label onChange={this.handleChangeStatus} checked={this.state.status === FormRating.ENABLE} name="status"/>
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <InputGroup>
            <Input required type="text" name="name" placeholder="Name" onChange={this.handleChange} value={this.state.name} autoComplete="off" />
            <FormFeedback className="help-block">The name field is required.</FormFeedback>
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <InputGroup>
            <InputGroupAddon addonType="append">
              <InputGroupText><i className="fa fa-envelope"></i></InputGroupText>
            </InputGroupAddon>
            <Input required type="email" name="email" placeholder="Email" onChange={this.handleChange} value={this.state.email} autoComplete="off" />
            <FormFeedback className="help-block">The email field is required.</FormFeedback>
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <InputGroup>
            <Input type="textarea" name="description" placeholder="Message" onChange={this.handleChange} value={this.state.description} autoComplete="off" />
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <InputGroup>
            <InputGroupAddon addonType="append">
              <InputGroupText><i className="fa fa-star"></i></InputGroupText>
            </InputGroupAddon>
            <Input required type="text" name="star" placeholder="ex: 4.5" onChange={this.handleChange} value={this.state.star} autoComplete="off" />
            <FormFeedback className="help-block">The star field is required.</FormFeedback>
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <Select value={this.state.selectedOption} name="salon_id" onChange={this.onChangeSalon} options={this.state.salons} />
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

export default FormRating;
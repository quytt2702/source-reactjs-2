import {
  Button,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  FormFeedback
} from 'reactstrap';
import React, { Component } from 'react';

class FormUser extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      password: '',
      email: '',
      phone: '',
      address: '',
      role: 'salon_owner',
      submitting: false,
      logged: false
    }
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    if (this.state.submitting) {
      return;
    }

    await this.setState({
      submitting: true
    });

    this.props.onSubmit(this.state).then(async (res) => {
      if (res.payload && (res.payload.status === 201 || res.payload.status === 200)) {
        return this.props.history.push('/users', this.state);
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
    const { user } = props;
    if (user && user.attributes) {
      this.setState({
        name: user.attributes.name || '',
        email: user.attributes.email || '',
        phone: user.attributes.phone || '',
        address: user.attributes.address || '',
        role: user.attributes.roles[0] || '',
      });

    }
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
      error: ''
    });
  }

  render() {

    return (
      <Form autoComplete="off" onSubmit={this.handleSubmit} className="was-validated">
        <FormGroup>
          <InputGroup>
            <InputGroupAddon addonType="append">
              <InputGroupText><i className="fa fa-user"></i></InputGroupText>
            </InputGroupAddon>
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
            <Input type="text" name="address" placeholder="Address" onChange={this.handleChange} value={this.state.address} autoComplete="off" />
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <InputGroup>
            <InputGroupAddon addonType="append">
              <InputGroupText><i className="fa fa-asterisk"></i></InputGroupText>
            </InputGroupAddon>
            <Input required type="password" name="password" placeholder="Password" onChange={this.handleChange} value={this.state.password} autoComplete="off" />
            <FormFeedback className="help-block">The password field is required.</FormFeedback>
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <InputGroup>
            <InputGroupAddon addonType="append">
              <InputGroupText>Role</InputGroupText>
            </InputGroupAddon>
            <Input type="select" name="role" value={this.state.role} onChange={this.handleChange}>
              <option value="super_admin">Super Admin</option>
              <option value="salon_owner">Salon Owner</option>
              <option value="member">Member</option>
            </Input>
          </InputGroup>
        </FormGroup>
        <FormGroup className="form-actions">
          <Button type="submit" size="sm" className="float-right" color="secondary">Submit</Button>
        </FormGroup>
      </Form>
    )
  }
}

export default FormUser;
import 'react-table/react-table.css';

import { Badge, Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import { Link, NavLink } from 'react-router-dom';
import React, { Component } from 'react';

import Table from '../Common/Table';

class Users extends Component {

  constructor(props) {
    super(props);

    this.removeItem = this.removeItem.bind(this);
  }

  paginate = async (page, size) => {
    await this.props.actions.getUsers(page, size);
  }

  removeItem = async (id, e) => {
    e.preventDefault();
    await this.props.actions.deleteUser(id);
  }

  render() {
    const { list } =  this.props.users;

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Users <small className="text-muted">List</small>
                <div className="card-header-actions">
                  <NavLink to="/users/add" rel="noreferrer noopener" className="card-header-action"><i className="icon-plus icons font-1xl"></i> Add</NavLink>
                </div>
              </CardHeader>
              <CardBody>
                <Table
                  columns={[
                    {
                      Header: "Id",
                      id: "id",
                      accessor: d => <NavLink className="diss" to={`users/${d.id}`}>{d.id}</NavLink>,
                      filterable: false,
                    },
                    {
                      Header: "Name",
                      id: "name",
                      accessor: d => <NavLink className="diss" to={`users/${d.id}`}>{d.attributes.name}</NavLink>,
                      filterable: false,
                    },
                    {
                      Header: "Email",
                      accessor: 'attributes.email',
                      filterable: false,
                    },
                    {
                      Header: "Phone",
                      accessor: 'attributes.phone',
                      filterable: false,
                      sortable: false,
                    },
                    {
                      Header: "Address",
                      accessor: 'attributes.address',
                      filterable: false,
                      sortable: false,
                    },
                    {
                      Header: "Role",
                      id: "roles",
                      accessor: d => {
                        const getBadge = (roles) => {
                          return roles.includes('super_admin') ? 'success' :
                            roles.includes('salon_owner') ? 'secondary' : '';
                        };
                        return <Badge tag={Link} to={`users/${d.id}`} color={getBadge(d.attributes.roles)}>{d.attributes.roles.join(', ')}</Badge>;
                      },
                      filterable: false
                    },
                    {
                      Header: "Action",
                      id: "type",
                      accessor: d => {
                        return (
                          <div className="">
                            <NavLink className="card-header-action btn diss" to={`users/${d.id}`}><i className="fa fa-pencil-square-o"></i></NavLink>
                            <NavLink className="card-header-action btn diss" to={`users/${d.id}`} onClick={(e) => this.removeItem(d.id, e)}><i className="fa fa-trash-o"></i></NavLink>
                          </div>
                        )
                      },
                      filterable: false,
                      sortable: false,
                    }
                  ]}
                  list={list}
                  paginate={this.paginate}
                  {...this.props}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Users;
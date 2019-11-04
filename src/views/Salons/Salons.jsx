import 'react-table/react-table.css';

import { Badge, Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import { Link, NavLink } from 'react-router-dom';
import React, { Component } from 'react';

import Table from '../Common/Table';

class Salons extends Component {

  constructor(props) {
    super(props);

    this.removeItem = this.removeItem.bind(this);
  }

  paginate = async (page, size) => {
    await this.props.actions.getSalons(page, size);
  }

  removeItem = async (id, e) => {
    e.preventDefault();
    await this.props.actions.deleteSalon(id);
  }

  render() {
    const { list } =  this.props.salons;

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Salons <small className="text-muted">List</small>
                <div className="card-header-actions">
                  <NavLink to="/salons/add" rel="noreferrer noopener" className="card-header-action"><i className="icon-plus icons font-1xl"></i> Add</NavLink>
                </div>
              </CardHeader>
              <CardBody>
                <Table
                  columns={[
                    {
                      Header: "Id",
                      id: "id",
                      accessor: d => <NavLink className="diss" to={`salons/${d.id}`}>{d.id}</NavLink>,
                      filterable: false,
                    },
                    {
                      Header: "Name",
                      id: "name",
                      accessor: d => <NavLink className="diss" to={`salons/${d.id}`}>{d.attributes.name}</NavLink>,
                      filterable: false,
                    },
                    {
                      Header: "Address",
                      accessor: 'attributes.address',
                      filterable: false,
                    },
                    {
                      Header: "Phone",
                      accessor: 'attributes.phone',
                      filterable: false,
                      sortable: false,
                    },
                    {
                      Header: "Status",
                      id: "status",
                      accessor: d => {
                        const getBadge = (status) => {
                          return status === 10 ? 'success' :
                            status === 0 ? 'secondary' : '';
                        };
                        const getStatusName = (status) => {
                          return status === 10 ? 'Enable' :
                            status === 0 ? 'Disable' : 'NOT SET';
                        };
                        return <Badge tag={Link} to={`salons/${d.id}`} color={getBadge(d.attributes.status)}>{getStatusName(d.attributes.status)}</Badge>;
                      },
                      filterable: false
                    },
                    {
                      Header: "Action",
                      id: "type",
                      accessor: d => {
                        return (
                          <div className="">
                            <NavLink className="card-header-action btn diss" to={`salons/${d.id}`}><i className="fa fa-pencil-square-o"></i></NavLink>
                            <NavLink className="card-header-action btn diss" to={`salons/${d.id}/services`}><i className="cui-list icons"></i></NavLink>
                            <NavLink className="card-header-action btn diss" to={`salons/${d.id}`} onClick={(e) => this.removeItem(d.id, e)}><i className="fa fa-trash-o"></i></NavLink>
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

export default Salons;

import 'react-table/react-table.css';

import { Badge, Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import { Link, NavLink } from 'react-router-dom';
import React, { Component } from 'react';

import Table from '../Common/Table';
import build from 'redux-object';

class Orders extends Component {

  constructor(props) {
    super(props);

    this.removeItem = this.removeItem.bind(this);
  }

  paginate = async (page, size) => {
    await this.props.actions.getOrders(page, size);
  }

  addRelation = (data) => {
    return data.map(row => build(this.props.orders.schema, 'Order', row.id));
  }

  removeItem = async (id, e) => {
    e.preventDefault();
    await this.props.actions.deleteOrder(id);
  }

  render() {
    const { list } =  this.props.orders;

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Orders <small className="text-muted">List</small>
                <div className="card-header-actions">
                  <NavLink to="/orders/add" rel="noreferrer noopener" className="card-header-action"><i className="icon-plus icons font-1xl"></i> Add</NavLink>
                </div>
              </CardHeader>
              <CardBody>
                <Table
                  columns={[
                    {
                      Header: "Id",
                      id: "id",
                      accessor: d => <NavLink className="diss" to={`/orders/${d.id}`}>{d.id}</NavLink>,
                      filterable: false,
                    },
                    {
                      Header: "Salon",
                      id: "salon",
                      accessor: d => <NavLink className="diss" to={`/salons/${d.salon.id}`}>{d.salon.name}</NavLink>,
                      filterable: false,
                    },
                    {
                      Header: "Buyer",
                      id: "user",
                      accessor: d => <NavLink className="diss" to={`/users/${d.user.id}`}>{d.user.name}</NavLink>,
                      filterable: false,
                    },
                    {
                      Header: "Quantity",
                      accessor: 'quantity',
                      filterable: false,
                    },
                    {
                      Header: "Total",
                      accessor: 'amount',
                      filterable: false,
                    },
                    {
                      Header: "Tax",
                      accessor: 'tax',
                      filterable: false,
                    },
                    {
                      Header: "Date",
                      accessor: 'date',
                      filterable: false,
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
                          return status === 10 ? 'Confirmed' :
                            status === 0 ? 'Waiting' : 'NOT SET';
                        };
                        return <Badge tag={Link} to={`orders/${d.id}`} color={getBadge(d.status)}>{getStatusName(d.status)}</Badge>;
                      },
                      filterable: false
                    },
                    {
                      Header: "Action",
                      id: "type",
                      accessor: d => {
                        return (
                          <div className="">
                            <NavLink className="card-header-action btn diss" to={`orders/${d.id}`}><i className="fa fa-pencil-square-o"></i></NavLink>
                            <NavLink className="card-header-action btn diss" to={`orders/${d.id}`} onClick={(e) => this.removeItem(d.id, e)}><i className="fa fa-trash-o"></i></NavLink>
                          </div>
                        )
                      },
                      filterable: false,
                      sortable: false,
                    }
                  ]}
                  list={list}
                  resolveData={this.addRelation}
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

export default Orders;

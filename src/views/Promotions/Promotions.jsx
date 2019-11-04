import 'react-table/react-table.css';

import { Badge, Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import { Link, NavLink } from 'react-router-dom';
import React, { Component } from 'react';

import Table from '../Common/Table';
import build from 'redux-object';

class Promotions extends Component {

  constructor(props) {
    super(props);

    this.removeItem = this.removeItem.bind(this);
  }

  paginate = async (page, size) => {
    await this.props.actions.getPromotions(page, size);
  }

  addRelation = (data) => {
    return data.map(row => build(this.props.promotions.schema, 'Promotion', row.id));
  }

  removeItem = async (id, e) => {
    e.preventDefault();
    await this.props.actions.deletePromotion(id);
  }

  render() {
    const { list } =  this.props.promotions;

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Promotions <small className="text-muted">List</small>
                <div className="card-header-actions">
                  <NavLink to="/promotions/add" rel="noreferrer noopener" className="card-header-action"><i className="icon-plus icons font-1xl"></i> Add</NavLink>
                </div>
              </CardHeader>
              <CardBody>
                <Table
                  columns={[
                    {
                      Header: "Id",
                      id: "id",
                      filterable: false,
                    },
                    {
                      Header: "Salon",
                      id: "salon",
                      accessor: d => d.salon && <NavLink className="diss" to={`/salons/${d.salon.id}`}>{d.salon.name}</NavLink>,
                      filterable: false,
                    },
                    {
                      Header: "Code",
                      id: "code",
                      accessor: 'code',
                      filterable: false,
                    },
                    {
                      Header: "Price",
                      accessor: 'price',
                      filterable: false,
                      sortable: false,
                    },
                    {
                      Header: "Begin Time",
                      accessor: 'begin_time',
                      filterable: false,
                      sortable: false,
                    },
                    {
                      Header: "End Time",
                      accessor: 'end_time',
                      filterable: false,
                      sortable: false,
                    },
                    {
                      Header: "Status",
                      id: "status",
                      accessor: d => {
                        const getBadge = (status) => {
                          return status === 5 ? 'success' :
                            status === 2 ? 'secondary' : '';
                        };
                        const getStatusName = (status) => {
                          return status === 5 ? 'Used' :
                            status === 2 ? 'Available' : 'NOT SET';
                        };
                        return <Badge color={getBadge(d.status)}>{getStatusName(d.status)}</Badge>;
                      },
                      filterable: false
                    },
                    {
                      Header: "Action",
                      id: "type",
                      accessor: d => {
                        return (
                          <div className="">
                            <NavLink className="card-header-action btn diss" to={`promotions/${d.id}`} onClick={(e) => this.removeItem(d.id, e)}><i className="fa fa-trash-o"></i></NavLink>
                          </div>
                        )
                      },
                      filterable: false,
                      sortable: false,
                    }
                  ]}
                  list={list}
                  paginate={this.paginate}
                  resolveData={this.addRelation}
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

export default Promotions;

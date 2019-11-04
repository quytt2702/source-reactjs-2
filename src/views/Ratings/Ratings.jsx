import 'react-table/react-table.css';

import { Badge, Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import { Link, NavLink } from 'react-router-dom';
import React, { Component } from 'react';

import Table from '../Common/Table';
import build from 'redux-object';


class Ratings extends Component {

  constructor(props) {
    super(props);

    this.removeItem = this.removeItem.bind(this);
  }

  paginate = async (page, size) => {
    await this.props.actions.getRatings(page, size);
  }

  removeItem = async (id, e) => {
    e.preventDefault();
    await this.props.actions.deleteRating(id);
  }

  render() {
    const { list } =  this.props.ratings;
    console.log(list);    

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Ratings <small className="text-muted">List</small>
                <div className="card-header-actions">
                  <NavLink to="/ratings/add" rel="noreferrer noopener" className="card-header-action"><i className="icon-plus icons font-1xl"></i> Add</NavLink>
                </div>
              </CardHeader>
              <CardBody>
                <Table
                  columns={[
                    {
                      Header: "Id",
                      id: "id",
                      accessor: d => <NavLink className="diss" to={`ratings/${d.id}`}>{d.id}</NavLink>,
                      filterable: false,
                    },
                    {
                      Header: "Name",
                      id: "name",
                      accessor: d => <NavLink className="diss" to={`ratings/${d.id}`}>{d.attributes.name}</NavLink>,
                      filterable: false,
                    },
                    {
                      Header: "Email",
                      id: "email",
                      accessor: d => <NavLink className="diss" to={`ratings/${d.id}`}>{d.attributes.email}</NavLink>,
                      filterable: false,
                    },
                    {
                      Header: "Salon",
                      id: "salon_id",
                      accessor: d => {
                      	const rating = build(this.props.ratings.schema, 'Rating', d.id);
                      	return <NavLink className="diss" to={`salons/${rating.salon.id}`}>{rating.salon.name}</NavLink>
                      },
                      filterable: false,
                    },
                    {
                      Header: "Message",
                      accessor: 'attributes.description',
                      filterable: false,
                      sortable: false,
                    },
                    {
                      Header: "Star",
                      accessor: 'attributes.star',
                      filterable: false,
                      sortable: false,
                    },
                    {
                      Header: "Status",
                      id: "status",
                      accessor: d => {
                        const getBadge = (status) => {
                          return status === 1 ? 'success' :
                            status === 2 ? 'secondary' : '';
                        };
                        const getStatusName = (status) => {
                          return status === 1 ? 'Enable' :
                            status === 2 ? 'Disable' : 'NOT SET';
                        };
                        return <Badge tag={Link} to={`ratings/${d.id}`} color={getBadge(d.attributes.status)}>{getStatusName(d.attributes.status)}</Badge>;
                      },
                      filterable: false
                    },
                    {
                      Header: "Action",
                      id: "type",
                      accessor: d => {
                        return (
                          <div className="">
                            <NavLink className="card-header-action btn diss" to={`ratings/${d.id}`}><i className="fa fa-pencil-square-o"></i></NavLink>
                            <NavLink className="card-header-action btn diss" to={`ratings/${d.id}`} onClick={(e) => this.removeItem(d.id, e)}><i className="fa fa-trash-o"></i></NavLink>
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

export default Ratings;
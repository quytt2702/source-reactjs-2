import 'react-table/react-table.css';

import { Badge, Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import { Link, NavLink } from 'react-router-dom';
import React, { Component } from 'react';

import Table from '../Common/Table';
import build from 'redux-object';

class Items extends Component {

  constructor(props) {
    super(props);

    this.removeItem = this.removeItem.bind(this);
  }

  paginate = async (page, size) => {
    const { service_id } = this.props.match.params;
    await this.props.actions.getItems(service_id, page, size);
  }

  removeItem = async (id, e) => {
    e.preventDefault();
    await this.props.actions.deleteItem(id);
  }

  render() {
    const { list } =  this.props.items;
    const { service_id } = this.props.match.params;
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Items <small className="text-muted">List</small>
                <div className="card-header-actions">
                  <NavLink to={`/services/${service_id}/items/add`} rel="noreferrer noopener" className="card-header-action"><i className="icon-plus icons font-1xl"></i> Add</NavLink>
                </div>
              </CardHeader>
              <CardBody>
                <Table
                  columns={[
                    {
                      Header: "Id",
                      id: "id",
                      accessor: d => <NavLink className="diss" to={`/items/${d.id}`}>{d.id}</NavLink>,
                      filterable: false,
                    },
                    {
                      Header: "Name",
                      id: "name",
                      accessor: d => <NavLink className="diss" to={`/items/${d.id}`}>{d.attributes.name}</NavLink>,
                      filterable: false,
                    },
                    {
                      Header: "Price",
                      accessor: "attributes.price",
                      filterable: false,
                    },
                    {
                      Header: "Description",
                      accessor: "attributes.description",
                      filterable: false,
                    },
                    {
                      Header: "Service",
                      id: "service",
                      accessor: d => {
                        const item = build(this.props.items.schema, 'Item', d.id);
                        return item && <NavLink className="diss" to={`/services/${item.service.id}`}>{item.service.name}</NavLink>
                      },
                      filterable: false,
                    },
                    {
                      Header: "Action",
                      id: "type",
                      accessor: d => {
                        return (
                          <div className="">
                            <NavLink className="card-header-action btn diss" to={`/items/${d.id}`}><i className="fa fa-pencil-square-o"></i></NavLink>
                            <NavLink className="card-header-action btn diss" to={`/items/${d.id}`} onClick={(e) => this.removeItem(d.id, e)}><i className="fa fa-trash-o"></i></NavLink>
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

export default Items;

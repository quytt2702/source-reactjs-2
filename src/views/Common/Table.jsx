import 'react-table/react-table.css';

import React, { Component } from 'react';

import PropTypes from 'prop-types';
import ReactTable from "react-table";
import { sleep } from "../../helpers/common";

class Table extends Component {
  static propTypes = {
    list: PropTypes.object.isRequired,
    columns: PropTypes.array.isRequired,
    paginate: PropTypes.func.isRequired
  }

  constructor() {
    super();

    this.state = {
      loading: true
    };
  }

  paginate = async (state, instance) => {
    await this.setState({ loading: true });
    await this.props.paginate(state.page + 1, state.pageSize);
    await sleep(900);
    this.setState({ loading: false });
  }

  render() {
    const { list, columns, resolveData } = this.props;
    const pages = list.meta && list.meta.pagination && list.meta.pagination.total_pages ? list.meta.pagination.total_pages : 0;
    return (
      <ReactTable
        columns={columns}
        manual // Forces table not to paginate or sort automatically, so we can handle it server-side
        data={list.data}
        pages={pages} // Display the total number of pages
        loading={this.state.loading} // Display the loading overlay when we need it
        onFetchData={this.paginate} // Request new data when things change
        filterable
        defaultPageSize={10}
        className="-striped -highlight"
        resolveData={resolveData}
      />
    )
  }
}

Table.defaultProps = {
  list: {},
  columns: [],
  paginate: () => {}
};

export default Table;
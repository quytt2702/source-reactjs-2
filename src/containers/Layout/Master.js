import * as Actions from '../../actions';

import {
  AppAside,
  AppBreadcrumb,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav,
} from '@coreui/react';
import React, { Component } from 'react';

import Aside from './Aside';
import { Container } from 'reactstrap';
import Footer from './Footer';
import Header from './Header';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// sidebar nav config
import navigation from '../../_nav';
// routes config
import routes from '../../routes/routes';

class Master extends Component {

  render() {
    const {container} = this.props;

    return (
      <div className="app">
        <AppHeader fixed>
          <Header {...this.props}/>
        </AppHeader>
        <div className="app-body">
          <AppSidebar fixed display="lg">
            <AppSidebarHeader />
            <AppSidebarForm />
            <AppSidebarNav navConfig={navigation} {...this.props} />
            <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar>
          <main className="main">
            <AppBreadcrumb appRoutes={routes.routes}/>
            <Container fluid>
              {container}
            </Container>
          </main>
          <AppAside fixed hidden>
            <Aside />
          </AppAside>
        </div>
        <AppFooter>
          <Footer />
        </AppFooter>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth.user
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Master);
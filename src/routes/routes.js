import {
  Page404,
  Page500,
  Register
} from '../views/Pages';

import App from '../containers/App';
import Loadable from 'react-loadable'
import LoginPage from '../containers/pages/LoginPage.jsx';
import React from 'react';

function Loading() {
  return <div>Loading...</div>;
}

const Dashboard = Loadable({
  loader: () => import('../views/Dashboard/Dashboard'),
  loading: Loading,
});

const UsersPage = Loadable({
  loader: () => import('../containers/pages/Users/UsersPage.jsx'),
  loading: Loading,
});

const User = Loadable({
  loader: () =>
    import('../containers/pages/Users/User.jsx'),
  loading: Loading,
});

const SalonsPage = Loadable({
  loader: () =>
    import('../containers/pages/Salons/SalonsPage.jsx'),
  loading: Loading,
});

const Salon = Loadable({
  loader: () =>
    import('../containers/pages/Salons/Salon.jsx'),
  loading: Loading,
});

const OrdersPage = Loadable({
  loader: () =>
    import('../containers/pages/Orders/OrdersPage.jsx'),
  loading: Loading,
});


const ServicesPage = Loadable({
  loader: () =>
    import('../containers/pages/Services/ServicesPage.jsx'),
  loading: Loading,
});

const Service = Loadable({
  loader: () =>
    import('../containers/pages/Services/Service.jsx'),
  loading: Loading,
});

const ItemsPage = Loadable({
  loader: () =>
    import('../containers/pages/Items/ItemsPage.jsx'),
  loading: Loading,
});

const Item = Loadable({
  loader: () =>
    import('../containers/pages/Items/Item.jsx'),
  loading: Loading,
});


const StaticPagesPage = Loadable({
  loader: () =>
    import('../containers/pages/StaticPages/StaticPagesPage.jsx'),
  loading: Loading,
});

const StaticPage = Loadable({
  loader: () =>
    import('../containers/pages/StaticPages/StaticPage.jsx'),
  loading: Loading,
});

const RatingsPage = Loadable({
  loader: () =>
    import('../containers/pages/Ratings/RatingsPage.jsx'),
  loading: Loading,
});

const Rating = Loadable({
  loader: () =>
    import('../containers/pages/Ratings/Rating.jsx'),
  loading: Loading,
});

const BlogsPage = Loadable({
  loader: () =>
    import('../containers/pages/Blogs/BlogsPage.jsx'),
  loading: Loading,
});

const Blog = Loadable({
  loader: () =>
    import('../containers/pages/Blogs/Blog.jsx'),
  loading: Loading,
});

const PromotionsPage = Loadable({
  loader: () =>
    import('../containers/pages/Promotions/PromotionsPage.jsx'),
  loading: Loading,
});

const Promotion = Loadable({
  loader: () =>
    import('../containers/pages/Promotions/Promotion.jsx'),
  loading: Loading,
});

const routes = [
  {
    component: App,
    requireLogin: '/login',
    routes: [
      { path: '/', exact: true, name: 'Home', component: Dashboard },
      { path: '/dashboard', name: 'Dashboard', component: Dashboard },
      { path: '/users', exact: true,  name: 'Users', component: UsersPage },
      { path: '/users/add', exact: true, name: 'Add user', component: User },
      { path: '/users/:id', exact: true, name: 'User Details', component: User },
      { path: '/salons', exact: true,  name: 'Salons', component: SalonsPage },
      { path: '/salons/:salon_id/services', exact: true,  name: 'Serives', component: ServicesPage },
      { path: '/salons/:salon_id/services/add', exact: true, name: 'Add service', component: Service },
      { path: '/services/:service_id', exact: true, name: 'Service Details', component: Service },
      { path: '/services/:service_id/items', exact: true,  name: 'Items', component: ItemsPage },
      { path: '/services/:service_id/items/add', exact: true, name: 'Add item', component: Item },
      { path: '/items/:item_id', exact: true, name: 'Item Details', component: Item },
      { path: '/salons/add', exact: true, name: 'Add salon', component: Salon },
      { path: '/salons/:id', exact: true, name: 'Salon Details', component: Salon },
      { path: '/static-pages', exact: true,  name: 'Static Pages', component: StaticPagesPage },
      { path: '/static-pages/add', exact: true,  name: 'Add Static Page', component: StaticPage },
      { path: '/static-pages/:id', exact: true, name: 'Static Page Details', component: StaticPage },
      { path: '/orders', exact: true,  name: 'Orders', component: OrdersPage },
      { path: '/ratings', exact: true,  name: 'Ratings', component: RatingsPage },
      { path: '/ratings/add', exact: true, name: 'Add Rating', component: Rating },
      { path: '/ratings/:id', exact: true, name: 'Rating Details', component: Rating },
      { path: '/blogs', exact: true,  name: 'Blogs', component: BlogsPage },
      { path: '/blogs/add', exact: true,  name: 'Add Blog', component: Blog },
      { path: '/blogs/:id', exact: true, name: 'Blog Details', component: Blog },
      { path: '/promotions', exact: true, name: 'Promotions List', component: PromotionsPage },
      { path: '/promotions/add', exact: true, name: 'Add Promotions', component: Promotion },
      { path: '/login', exact: true, name: 'User Details', component: LoginPage, ignoreTemplate: true },
      { path: '/register', exact: true, name: 'User Details', component: Register, ignoreTemplate: true },
      { path: '/404', exact: true, name: 'User Details', component: Page404, ignoreTemplate: true },
      { path: '/500', exact: true, name: 'User Details', component: Page500, ignoreTemplate: true },
      { name: 'Not found', component: Page404, ignoreTemplate: true }
    ]
  }
];

export default routes;

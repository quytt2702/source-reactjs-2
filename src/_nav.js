export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer',
      badge: {
        variant: 'info',
        text: 'NEW',
      },
    },
    {
      title: true,
      name: 'Managements',
      wrapper: { // optional wrapper object
        element: '', // required valid HTML5 element tag
        attributes: {} // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: '' // optional class names space delimited list for title item ex: "text-center"
    }, {
      name: 'Orders',
      url: '/orders',
      icon: 'fa fa-shopping-basket',
    },
    {
      name: 'Users',
      url: '/users',
      icon: 'fa fa-users',
    }, {
      name: 'Salons',
      url: '/salons',
      icon: 'fa fa-bank',
    },{
      name: 'Promotions',
      url: '/promotions',
      icon: 'fa fa-file-text',
    }, {
      name: 'Static Pages',
      url: '/static-pages',
      icon: 'fa fa-newspaper-o',
    }, {
      name: 'Ratings',
      url: '/ratings',
      icon: 'nav-icon icon-star',
    }, {
      name: 'Blogs',
      url: '/blogs',
      icon: 'fa fa-file-text',
    },
  ]
};

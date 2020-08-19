import LiveReport from './pages/LiveReport'
import Reports from './pages/Reports'
import Kiosks from './pages/Kiosks'
import KiosksMap from './pages/KiosksMap'
import Drivers from './pages/Drivers'
import EditDriver from './pages/EditDriver'
import AddDriver from './pages/AddDriver'
import Orders from './pages/Orders'
import OrderDetail from './pages/OrderDetail'
import Cars from './pages/Cars'
import Charts from './pages/Charts'
import Payments from './pages/Payments'
import MobileUsers from './pages/MobileUsers'
import MobileUsersDetail from './pages/MobileUsersDetail'
import Tariffs from './pages/Tariffs'
import Points from './pages/Points'
import NotFound from './pages/NotFound'

const routes = [
  {
    key: '345345',
    path: '/live-report',
    Component: LiveReport,
  },
  {
    key: '54765345',
    exact: true,
    path: '/reports',
    Component: Reports,
  },
  {
    key: '3254234',
    exact: true,
    path: '/kiosks',
    Component: Kiosks,
  },
  {
    key: '32542343',
    exact: true,
    path: '/kiosks/map/:id',
    Component: KiosksMap,
  },
  {
    key: '68675',
    exact: true,
    path: '/drivers',
    Component: Drivers,
  },
  {
    key: '98765',
    exact: true,
    path: '/drivers/edit/:id',
    Component: EditDriver,
  },
  {
    key: '7685676',
    exact: true,
    path: '/drivers/add-driver',
    Component: AddDriver,
  },
  {
    key: '67876i6',
    exact: true,
    path: '/orders',
    Component: Orders,
  },
  {
    key: '879o6789i67',
    exact: true,
    path: '/orders/detail/:id',
    Component: OrderDetail,
  },
  {
    key: '879867',
    exact: true,
    path: '/cars',
    Component: Cars,
  },
  {
    key: '7856456',
    exact: true,
    path: '/charts',
    Component: Charts,
  },
  {
    key: '567456745',
    exact: true,
    path: '/payments',
    Component: Payments,
  },
  {
    key: '567574567',
    exact: true,
    path: '/mobile-users',
    Component: MobileUsers,
  },
  {
    key: '56724567',
    exact: true,
    path: '/mobile-users/:id',
    Component: MobileUsersDetail,
  },
  {
    key: '54643',
    exact: true,
    path: '/tariffs',
    Component: Tariffs,
  },
  {
    key: '565564344',
    exact: true,
    path: '/points',
    Component: Points,
  },
  {
    key: '5675745645643',
    exact: true,
    path: '*',
    Component: NotFound,
  },
]
export default routes

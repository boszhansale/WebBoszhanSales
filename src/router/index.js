import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/HomeView.vue'
import Auth from '../views/AuthView.vue'
import NotFound from '../views/NotFoundView.vue'
import ListOfMarketsPhys from '../views/phys/ListOfMarketsPhysView.vue'
import ProductList from '../views/ProductListView.vue'
import LegalEntities from '../views/legal/ListOfLegalEntitiesView.vue'
import ListOfMarketsLegal from '../views/legal/ListOfMarketsLegalView.vue'
import Basket from '../views/BasketView.vue'
import MyOrders from '../views/MyOrdersView.vue'
import MyOrderProducts from '../views/MyOrderProductsView.vue'
import CreateNewMarket from '../views/phys/CreateNewMarketView.vue'

const routes = [
  {
    path: '/auth',
    name: 'Auth',
    component: Auth
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/phys/markets',
    name: 'ListOfMarketsPhys',
    component: ListOfMarketsPhys
  },
  {
    path: '/markets/create',
    name: 'CreateNewMarket',
    component: CreateNewMarket
  },
  {
    path: '/legal',
    name: 'LegalEntities',
    component: LegalEntities
  },
  {
    path: '/legal/markets',
    name: 'legal.markets',
    component: ListOfMarketsLegal
  },
  {
    path: '/products',
    name: 'ProductList',
    component: ProductList
  },
  {
    path: '/basket',
    name: 'Basket',
    component: Basket
  },
  {
    path: '/my/orders',
    name: 'MyOrders',
    component: MyOrders
  },
  {
    path: '/my/order/products',
    name: 'MyOrderProducts',
    component: MyOrderProducts
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

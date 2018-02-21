// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import vueResource from 'vue-resource'
import Customers from './components/Customers'
import About from './components/About'
import Add from './components/Add'

Vue.use(vueResource)
Vue.use(VueRouter)

const router = new VueRouter ({
  mode: 'history',
  base: __dirname,
  routes: [
    {path:'/', component: Customers},
    {path: '/about', component: About},
    {path: '/add', component: Add}
  ]
});

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  template: `
    <div id="app">
    <nav class="navbar navbar-expand-md navbar-dark bg-dark">
      <a class="navbar-brand" href="#">vCustomers</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarsExampleDefault">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <a class="nav-link" href="#"><router-link to="/">Home</router-link></a>
          </li>
          <li class="nav-item">
          <a class="nav-link" href="#"><router-link to="/about">About</router-link></a>
          </li>
        </ul>
        <ul class="navbar-nav navbar-right">
          <li class="nav-item">
            <a class="nav-link" href="#"><router-link to="/add">Add Customer</router-link></a>
          </li>
        </ul>
      </div>
    </nav>
      <router-view></router-view>
    </div>
  `
}).$mount('#app')

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import vueResource from 'vue-resource'
import Customers from './components/Customers'
import About from './components/About'

Vue.use(vueResource)
Vue.use(VueRouter)

const router = new VueRouter ({
  mode: 'history',
  base: __dirname,
  routes: [
    {path:'/', component: Customers},
    {path: '/about', component: About}
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
        <form class="form-inline my-2 my-lg-0">
          <input class="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search">
          <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>
      </div>
    </nav>
    <router-link to="/about">About</router-link>
      <router-view></router-view>
    </div>
  `
}).$mount('#app')

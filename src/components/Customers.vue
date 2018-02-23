<template>
  <div class="customers container">
    <Alert v-if="alert" v-bind:message="alert" />

    <h1 class="page-header">Manage Customers</h1>
    <input type="text" class="form-control" placeholder="Enter Last Name" v-model="filterInput">
    <br />
    <table class="table table-striped">
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="customer in filterBy(customers, filterInput)" :key="customer.id">
          <td>{{ customer.first_name }}</td>
          <td>{{ customer.last_name }}</td>
          <td>{{ customer.email }}</td>
          <td><router-link class="btn btn-default" v-bind:to="{ path: '/customer/'+customer.slug, params: {customer: customer.slug} }">View</router-link></td>
          <td></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import db from './firebaseInit'
import Alert from './Alert';

export default {
  name: 'customers',
  data () {
    return {
      customers: [],
      alert:'',
      filterInput:""
    }
  },
  methods: {
    fetchCustomers() {
      db.collection('contacts').get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          let data = {
            'id': doc.id,
            'first_name': doc.data().first_name,
            'last_name': doc.data().last_name,
            'phone': doc.data().phone,
            'email': doc.data().email,
            'address': doc.data().address,
            'city': doc.data().city,
            'state': doc.data().state,
            'slug': doc.data().slug
          }
          console.log("fetchCustomers ran, data return as:" + data);

          this.customers.push(data);
        })
      })

      // this.$http.get('http://slimapp/api/customers')
      // .then(function(response){
      //   this.customers = response.body;
      // });
    },
    filterBy(list, value) {
      value = value.charAt(0).toUpperCase() + value.slice(1);
      return list.filter(function(customer){
        return customer.last_name.indexOf(value) > -1;
      });
    }
  },
  created: function() {
    this.fetchCustomers();
    if(this.$route.query.alert) {
      this.alert = this.$route.query.alert;
    }
  },
  updated: function() {
    // this.fetchCustomers();
  },
  components: {
    Alert
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

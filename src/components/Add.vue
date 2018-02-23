<template>
  <div class="add container">
      <Alert v-if="alert" v-bind:message="alert"/>
    <h1 class="page-header">Add Customer</h1>
    <form v-on:submit.prevent="addCustomer">
         <div class="well">
            <h4>Customer Info</h4>
            <div class="form-group">
                <label>First Name</label>
                <input type="text" class="form-control" placeholder="First Name" v-model="customer.first_name" required>
            </div>
            <div class="form-group">
                <label>Last Name</label>
                <input type="text" class="form-control" placeholder="Last Name" v-model="customer.last_name" required>
            </div>
        </div>
        <div class="well">
            <h4>Customer Contact</h4>
            <div class="form-group">
                <label>Email</label>
                <input type="text" class="form-control" placeholder="Email" v-model="customer.email" required>
            </div>
            <div class="form-group">
                <label>Phone</label>
                <input type="text" class="form-control" placeholder="Phone" v-model="customer.phone" required>
            </div>
        </div>

        <div class="well">
            <h4>Customer Location</h4>
            <div class="form-group">
                <label>Address</label>
                <input type="text" class="form-control" placeholder="Address" v-model="customer.address" required>
            </div>
            <div class="form-group">
                <label>City</label>
                <input type="text" class="form-control" placeholder="City" v-model="customer.city" required>
            </div>
            <div class="form-group">
                <label>State</label>
                <input type="text" class="form-control" placeholder="State" v-model="customer.state" required>
            </div>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>
import db from './firebaseInit'
import Alert from './Alert'

export default {
  name: 'add',
  data () {
    return {
        customer: {},
        alert:''
    }
  },
  methods: {
      addCustomer(e) {
        db.collection('contacts').add({
            first_name: this.customer.first_name,
            last_name: this.customer.last_name,
            phone: this.customer.phone,
            email: this.customer.email,
            address: this.customer.address,
            city: this.customer.city,
            state: this.customer.state,
            slug: this.generateUUID()
        })
        .then(function (docRef) {
            console.log('Document written with ID: ', docRef.id)
        })
        .catch(function (error) {
            console.error('Error adding document: ', error)
        })

        // if(!this.customer.first_name || !this.customer.last_name || !this.customer.email) {
        //     this.alert = 'Please fill in all required fields';
        // } else {
        //     let newCustomer = {
        //         first_name: this.customer.first_name,
        //         last_name: this.customer.last_name,
        //         phone: this.customer.phone,
        //         email: this.customer.email,
        //         address: this.customer.address,
        //         city: this.customer.city,
        //         state: this.customer.state
        //     }

        //     this.$http.post('http://slimapp/api/customer/add', newCustomer)
        //         .then(function(response){
        //             this.$router.push({path: '/', query: {alert: 'Customer Added'}});
        //         });
        //     e.preventDefault();
        // }
        // e.preventDefault();
      },

        generateUUID () {
          let d = new Date().getTime()
          let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            let r = (d + Math.random() * 16) % 16 | 0
            d = Math.floor(d / 16)
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16)
          })
          
          return uuid
        }


  },
  components: {
      Alert
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

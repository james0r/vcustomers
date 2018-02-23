<template>
  <div class="edit container">
      <Alert v-if="alert" v-bind:message="alert"/>
    <h1 class="page-header">Edit Customer</h1>
    <form v-on:submit.prevent="updateCustomer">
         <div class="well">
            <h4>Customer Info</h4>
            <div class="form-group">
                <label>First Name</label>
                <input type="text" class="form-control" placeholder="First Name" v-model="customer.first_name">
            </div>
            <div class="form-group">
                <label>Last Name</label>
                <input type="text" class="form-control" placeholder="Last Name" v-model="customer.last_name">
            </div>
        </div>
        <div class="well">
            <h4>Customer Contact</h4>
            <div class="form-group">
                <label>Email</label>
                <input type="text" class="form-control" placeholder="Email" v-model="customer.email">
            </div>
            <div class="form-group">
                <label>Phone</label>
                <input type="text" class="form-control" placeholder="Phone" v-model="customer.phone">
            </div>
        </div>

        <div class="well">
            <h4>Customer Location</h4>
            <div class="form-group">
                <label>Address</label>
                <input type="text" class="form-control" placeholder="Address" v-model="customer.address">
            </div>
            <div class="form-group">
                <label>City</label>
                <input type="text" class="form-control" placeholder="City" v-model="customer.city">
            </div>
            <div class="form-group">
                <label>State</label>
                <input type="text" class="form-control" placeholder="State" v-model="customer.state">
            </div>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>
import Alert from './Alert'
import db from './firebaseInit'

export default {
  name: 'edit',
  data () {
    return {
        customer: {},
        alert:'',
        slug: null
    }
  },
  methods: {
      fetchCustomer(slug) {
          console.log("this is what's being passed as slug to fetchCustomers: " + slug);
        db.collection('contacts').where('slug', '==', slug).get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            console.log(doc.id, ' => ', doc.data())
            this.customer.first_name = doc.data().first_name
            this.customer.last_name = doc.data().last_name
            this.customer.phone = doc.data().phone
            this.customer.email = doc.data().email
            this.customer.address = doc.data().address
            this.customer.city = doc.data().city
            this.customer.state = doc.data().state
            this.customer.slug = slug
          })
        })
      },
      updateCustomer(e) {
        if(!this.customer.first_name || !this.customer.last_name || !this.customer.email) {
            this.alert = 'Please fill in all required fields';
        } else {
            let updCustomer = {
                first_name: this.customer.first_name,
                last_name: this.customer.last_name,
                phone: this.customer.phone,
                email: this.customer.email,
                address: this.customer.address,
                city: this.customer.city,
                state: this.customer.state
            }

            this.$router.push({path: '/', query: {alert: 'Customer Updated'}});

            // this.$http.put('http://slimapp/api/customer/update/'+this.$route.params.id, updCustomer)
            //     .then(function(response){
            //         this.$router.push({path: '/', query: {alert: 'Customer Updated'}});
            //     });
            // e.preventDefault();
        }
        // e.preventDefault();
      }
  },
  created: function() {
      console.log("This has been past through route params as slug: " + this.$route.params.slug);
      this.fetchCustomer(this.$route.params.slug);
  },
  component: {
      Alert
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

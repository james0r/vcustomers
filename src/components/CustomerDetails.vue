<template>
  <div class="details container">
      <router-link to="/">Back</router-link>
    <h1 class="page-header">{{ first_name }} {{ last_name }}
        <span class="float-right">
            <router-link class="btn btn-primary" v-bind:to="{ path: '/edit/'+ this.slug, params: { slug } }">Edit</router-link>
            <button class="btn-danger btn" v-on:click="deleteCustomer(slug)">Delete</button>
        </span>
    </h1>
    <ul class="list-group">
            <li class="list-group-item"><span class="fas fa-phone-square" aria-hidden="true"></span> {{phone}}</li>
            <li class="list-group-item"><span class="fas fa-envelope-square" aria-hidden="true"></span> {{email}}</li>
        </ul>

        <ul class="list-group">
            <li class="list-group-item"> {{address}}</li>
            <li class="list-group-item">{{city}}</li>
            <li class="list-group-item">{{state}}</li>
        </ul>
  </div>
</template>

<script>
import db from './firebaseInit'

export default {
  name: 'customerdetails',
  data () {
    return {
        first_name: null,
        last_name: null,
        phone: null,
        email: null,
        address: null,
        city: null,
        state: null,
        slug: null,
    }
  },
  methods: {
      fetchCustomer(slug) {
          db.collection('contacts').where('slug', '==', slug).get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            console.log(doc.id, ' => ', doc.data())
            this.first_name = doc.data().first_name
            this.last_name = doc.data().last_name
            this.phone = doc.data().phone
            this.email = doc.data().email
            this.address = doc.data().address
            this.city = doc.data().city
            this.state = doc.data().state
            this.slug = doc.data().slug
            console.log("this.slug now is equal to: " + this.slug);
          })
        })
       
          console.log("slug is: " + slug, "query returns: " + db.collection('contacts').where("slug", "==", slug));
          
    //       this.$http.get('http://slimapp/api/customer/'+id)
    //      .then(function(response){
    //      this.customer = response.body;
    //   });
      },
 
      deleteCustomer(id) {
          this.$http.delete('http://slimapp/api/customer/delete/'+id)
         .then(function(response){
         this.$router.push({path: '/', query: {alert: 'Customer Deleted'}});
        });
      }
  },
  created: function(){
      this.fetchCustomer(this.$route.params.slug);
      console.log("this is what's being passed as params.slug on onCreated: " + this.$route.params.slug);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

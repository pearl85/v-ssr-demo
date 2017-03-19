<template>
   <div class="film-list">
      <film :films="filmlist"></film>     
   </div>
</template>
<script>
   import ProductCard from './component/ProductCard.vue';
   import axios from 'axios'
   import Vue from 'vue';
   import store from './store'

  export default {
  components: {
    Film
  },
     created () {
    //this.API.fetchProducts()
  },
  computed: {
    filmlist() {
      return this.store.filmlist?this.store.filmlist : ''
    }
  }
  }
</script>
<style>
   .film-list {
  color:red
   }
</style>
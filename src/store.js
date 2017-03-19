import Vue from 'vue'
import axios from 'axios'

const store = {
  currentUser: null
}

const API = {
  fetchProducts () {
    if (store.results) return
      axios.get('films.json', { baseURL: 'http://localhost:5000/', responseType: 'json'
    })
      .then((res) => {
        store.results = res.data
      })
  }
}

Vue.mixin({
  data () {
    return {
      store
    }
  },
  computed: {
    API () {
      return API
    }
  }
})
export default store



import Vue from 'vue';
import App from '../src/App.vue';
const VueApp = Vue.extend(App);
new VueApp({
    el: '.film-list',
});

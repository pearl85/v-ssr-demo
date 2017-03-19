// server-entry.js
import Vue from 'vue';
import App from '../src/App.vue';
import store from '../src/store'
const app = new Vue(App);
// the default export should be a function
// which will receive the context of the render call
export default function(context) {
    Object.assign(store, context.store)
    return new Promise((resolve, reject) => {
        resolve(app);
    });
};




const fs = require('fs');
const path = require('path');
const express = require('express');
const vueServerRenderer = require('vue-server-renderer');
const app = express();
const axios = require('axios');
axios.defaults.adapter = require('axios/lib/adapters/http');
// Server-Side Bundle File
const serverBundleFilePath = path.join(__dirname, '../dist/bundle.server.js')
const serverBundleFileCode = fs.readFileSync(serverBundleFilePath, 'utf8');
const bundleRenderer = vueServerRenderer.createBundleRenderer(serverBundleFileCode);
// Client-Side Bundle File
const clientBundleFilePath = path.join(__dirname, '../dist/bundle.client.js');
const clientBundleFileUrl = '/dist/bundle.client.js';


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Methods", "Content-Type");

    next();
});


const getProducts = () => {
    return Promise.resolve(
        axios.get('films.json')
        .then((res) => {
            return res.data;
        })
    )
}


// Server-Side Rendering
app.get('/', function(req, res) {

    getProducts().then((results) => {
        const store = { results }
        bundleRenderer.renderToString({ url: req.url, store }, (err, html) => {
            if (err) {
                res.status(500).send(`
              <h1>Error: ${err.message}</h1>
              <pre>${err.stack}</pre>`);
            } else {
                res.send(`<!DOCTYPE html>
                  <html>
                     <head>
                        <meta charset="utf-8">
                        <title>Vue 2.0 SSR</title>
                     </head>
                     <body>
                        ${html}
                      <script src="${clientBundleFileUrl}"></script>
                     </body>
                  </html>`);
            }
        });

    })



});
// Client-Side Bundle File
app.get(clientBundleFileUrl, function(req, res) {
    const clientBundleFileCode = fs.readFileSync(clientBundleFilePath, 'utf8');
    res.send(clientBundleFileCode);
});
const serviceURL = '/films.json';
const serviceURLPath = path.join(__dirname, '../films.json')
    // Client-Side Bundle File
app.get(serviceURL, function(req, res) {
    const serviceResponse = fs.readFileSync(serviceURLPath, 'utf8');
    res.send(serviceResponse);
});
// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, function() {
    console.log(`Example app listening on port ${PORT}!`);
});

const axios = require('axios');

axios.put('http://localhost:3000/instrumentos/I23', {
    "#text": "Kazoo"
}).then(resp => {
    console.log(resp.data);
}).catch(error => {
    console.log(error);
});

const mongoose = require('mongoose');

const credentialSchema = new mongoose.Schema({
    provider: {
        type: String, 
        required: true,
    },
    id : {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('federated_cred', credentialSchema);
let { Org } = require('@salesforce/core');

module.exports = {
    getOrg: async () => { 
        return await Org.create();
    }
};
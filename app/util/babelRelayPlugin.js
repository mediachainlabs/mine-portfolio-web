var getBabelRelayPlugin = require('babel-relay-plugin');
var schema = require('../../tmp/schema.json');
module.exports = getBabelRelayPlugin(schema.data);


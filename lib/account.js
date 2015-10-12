var DS = require('dslink'),
    jsforce = require('jsforce'),
    context = require('./context');




module.exports = DS.createNode({
  onInvoke: function(params) {
    var c = params.sandbox ? new jsforce.Connection({ loginUrl: 'https://cs7.salesforce.com' }) : new jsforce.Connection();
    context.accounts[params.name] = { conn: c };
    var conn = context.accounts[params.name].conn;
    conn.login(params.username, params.password, function(err, res) {
      if (err) { return console.error(err); }
      context.link.addNode('/' + params.name, {
        status: {
          $name: 'Status',
          $type: 'string',
          '?value': ''
        },
        query: {
          $is: 'querySF',
          $name: 'Query',
          $invokable: 'read',
          $params: [
            {
              name: 'sql',
              type: 'string'
            }
          ]
        },
        create: {
          $is: 'createObject',
          $name: 'Create Object',
          $invokable: 'write',
          $params: [
            {
              name: 'object',
              type: 'string'
            },
            {
              name: 'json',
              type: 'string'
            }
          ]
        },
        update: {
          $is: 'updateObject',
          $name: 'Update Object',
          $invokable: 'write',
          $params: [
            {
              name: 'object',
              type: 'string'
            },
            {
              name: 'json',
              type: 'string'
            }
          ]
        },
        'delete': {
          $is: 'deleteObject',
          $name: 'Delete Object',
          $invokable: 'write',
          $params: [
            {
              name: 'object',
              type: 'string'
            },
            {
              name: 'id',
              type: 'string'
            }
          ]
        },
        retrieve: {
          $is: 'retrieveObject',
          $name: 'Retrieve Object',
          $invokable: 'read',
          $params: [
            {
              name: 'object',
              type: 'string'
            },
            {
              name: 'id',
              type: 'string'
            }
          ]
        }
      });
    });
    return {};
  }
});
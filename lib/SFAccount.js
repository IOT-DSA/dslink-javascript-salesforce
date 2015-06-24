var DS = require('dslink'),
    jsforce = require('jsforce'),
    context = require('./context');




module.exports = DS.createNode({
  onInvoke: function(params) {
    context.accounts[params.name] = { conn: new jsforce.Connection() };
    var conn = context.accounts[params.name].conn;
    conn.login(params.username, params.password, function(err, res) {
      if (err) { return console.error(err); }
      context.link.addNode('/' + params.name, {
        apiUsage: {
          $name: 'API Usage',
          limit: {
            $name: 'Limit',
            $type: 'number',
            '?value': conn.limitInfo.apiUsage ? conn.limitInfo.apiUsage.limit : null
          },
          used: {
            $name: 'Used',
            $type: 'number',
            '?value': conn.limitInfo.apiUsage ? conn.limitInfo.apiUsage.used : null
          }
        },
        query: {
          $is: 'querySF',
          $name: 'Query API',
          $invokable: 'read',
          $params: [
            {
              name: 'sql',
              type: 'string'
            }
          ]
        }
      });
    });
    return {};
  }
});
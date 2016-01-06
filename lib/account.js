var DS = require('dslink');
var jsforce = require('jsforce');
var context = require('./context');
var Promise = require('es6-promise').Promise;

module.exports.Account = DS.createNode({
  load: function(map) {
    DS.SimpleNode.prototype.load.call(this, map);

    if(!context.accounts[this.configs.$$name]) {
      var c = this.configs.$$sandbox ?
          new jsforce.Connection({ loginUrl: 'https://cs7.salesforce.com' }) :
          new jsforce.Connection();

      context.accounts[this.configs.$$name] = {
        conn: c,
        promise: new Promise(function(resolve, reject) {
          conn.login(this.configs.$$username, this.configs.$$password, function(err, res) {
            if (err) {
              this.provider.removeNode(this.path);
              reject(err);
              return console.log(err);
            }

            resolve();
          });
        }.bind(this))
      };
    }
  }
});

module.exports.AddAccount = DS.createNode({
  onInvoke: function(params) {
    var c = params.sandbox ?
        new jsforce.Connection({ loginUrl: 'https://cs7.salesforce.com' }) :
        new jsforce.Connection();

    var conn = context.accounts[params.name].conn;
    conn.login(params.username, params.password, function(err, res) {
      if (err)
        return console.error(err);

      context.accounts[params.name] = {
        conn: c,
        promise: new Promise.resolve()
      };

      this.provider.addNode('/' + params.name, context.accountStructure(params.name, params.sandbox, params.username, params.password));
    }.bind(this));
    return {};
  }
});

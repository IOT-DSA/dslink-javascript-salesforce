var DS = require('dslink');
var jsforce = require('jsforce');
var context = require('./context');

module.exports.Delete = DS.createNode({
  onInvoke: function(params) {
    var parentName = this.path.split('/')[1];
    var promise = context.accounts[parentName].promise;
    var conn = context.accounts[parentName].conn;

    return promise.then(function() {
      conn.sobject(params['object']).destroy(params['id'], function(err, ret) {
        if (err || !ret.success)
          return console.error(err, ret);
        this.provider.getNode('/' + parentName + '/status')
            .updateValue('Deleted Record Id: ' + ret.id);
      }.bind(this));
    }.bind(this));
  }
});

module.exports.Retrieve = DS.createNode({
  onInvoke: function(params) {
    var parentName = this.path.split('/')[1];
    var promise = context.accounts[parentName].promise;
    var conn = context.accounts[parentName].conn;
    var r = new DS.AsyncTableResult();

    promise.then(function() {
      conn.sobject(params['object']).retrieve(params['id'], function(err, record) {
        var c = [];
        for (var n in record) {
          if (n !== 'attributes') {
            c.push({
              name: n,
              type: 'dynamic'
            });
          }
        }

        r.columns = c;

        var ret = [];
        var item = [];

        for (var nn = 0; nn < c.length; nn++) {
          item.push(record[c[nn].name]);
        }

        ret.push(item);
        r.update(ret);
        r.close();
      });
    }.bind(this)).catch(function() {
      r.close();
    });

    return r;
  }
});

module.exports.Create = DS.createNode({
  onInvoke: function(params) {
    var parentName = this.path.split('/')[1];
    var promise = context.accounts[parentName].promise;
    var conn = context.accounts[parentName].conn;

    var data = JSON.parse(params.json);
    console.log(data);

    return promise.then(function() {
      conn.sobject(params['object']).create(data, function(err, ret) {
        if (err || !ret.success)
          return console.error(err, ret);
        this.provider.getNode('/' + parentName + '/status')
            .updateValue('Created Record Id: ' + ret.id);
      }.bind(this));
    }.bind(this));
  }
});

module.exports.Update = DS.createNode({
  onInvoke: function(params) {
    var parentName = this.path.split('/')[1];
    var promise = context.accounts[parentName].promise;
    var conn = context.accounts[parentName].conn;

    var data = JSON.parse(params.json);
    console.log(data);

    return promise.then(function() {
      conn.sobject(params['object']).update(data, function(err, ret) {
        if (err || !ret.success)
          return console.error(err, ret);
        this.provider.getNode('/' + parentName + '/status')
            .updateValue('Updated Record Id: ' + ret.id);
      }.bind(this));
    }.bind(this));
  }
});

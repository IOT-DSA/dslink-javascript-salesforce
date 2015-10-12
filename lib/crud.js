var DS = require('dslink'),
    jsforce = require('jsforce'),
    context = require('./context');

module.exports = {

  Delete: DS.createNode({
    onInvoke: function(params) {
      var parentName = this.path.split('/')[1];
      var conn = context.accounts[parentName].conn;
      conn.sobject(params['object']).destroy(params['id'], function(err, ret) {
        if (err || !ret.success) { return console.error(err, ret); }
        context.link.updateValue('/' + parentName + '/status', 'Deleted Record Id: ' + ret.id);
      });
    }
  }),

  Retrieve: DS.createNode({
    onInvoke: function(params) {
      var parentName = this.path.split('/')[1];
      var conn = context.accounts[parentName].conn;
      var r = new DS.AsyncTableResult();
      conn.sobject(params['object']).retrieve(params['id'], function(err, record) {
        var c = [];
        for (var n in record) {
          if (n !== 'attributes') {
            c.push({"name": n, "type": 'dynamic' });
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
    return r;
    }
  }),

  Create: DS.createNode({
    onInvoke: function(params) {
      var parentName = this.path.split('/')[1];
      var conn = context.accounts[parentName].conn;
      var data = JSON.parse(params.json);
      console.log(data);
      conn.sobject(params['object']).create(data, function(err, ret) {
        if (err || !ret.success) { return console.error(err, ret); }
        context.link.updateValue('/' + parentName + '/status', 'Created Record Id: ' + ret.id);
      });
    }
  }),

  Update: DS.createNode({
    onInvoke: function(params) {
      var parentName = this.path.split('/')[1];
      var conn = context.accounts[parentName].conn;
      var data = JSON.parse(params.json);
      console.log(data);
      conn.sobject(params['object']).update(data, function(err, ret) {
        if (err || !ret.success) { return console.error(err, ret); }
        context.link.updateValue('/' + parentName + '/status', 'Updated Record Id: ' + ret.id);
      });
    }
  })

};
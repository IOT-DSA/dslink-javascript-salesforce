var DS = require('dslink'),
    jsforce = require('jsforce'),
    context = require('./context');

module.exports = DS.createNode({
  onInvoke: function(params) {
    var columnReturned = false;
    var parentName = this.path.split('/')[1];
    var promise = context.accounts[parentName].promise;
    var conn = context.accounts[parentName].conn;

    var r = new DS.AsyncTableResult();
    var c = [];

    promise.then(function() {
      conn.query(params.sql).on('record', function(record) {
        if (!columnReturned) {
          for (var n in record) {
            if (n !== 'attributes') {
              c.push({
                name: n,
                type: 'dynamic'
              });
            }
          }
          r.columns = c;
          columnReturned = true;
        }

        var ret = [];
        var item = [];

        for (var nn = 0; nn < c.length; nn++) {
          item.push(record[c[nn].name]);
        }

        ret.push(item);
        r.update(ret);
      })
      .on('end', function(query) {
        r.close();
      })
      .on('error', function(err) {
        console.error(err);
      })
      .run({
        autoFetch : true
      });
    }.bind(this)).catch(function() {
      r.close();
    });

    return r;
  }
});

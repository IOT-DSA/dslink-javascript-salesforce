var DS = require('dslink'),
    jsforce = require('jsforce'),
    context = require('./context');




module.exports = DS.createNode({
  onInvoke: function(params) {
    var parentName = this.path.split('/')[1];
    var r = new DS.AsyncTableResult();
    // r.columns = ["name"];
    var conn = context.accounts[parentName].conn;
    conn.query(params.sql)
    .on("record", function(record) {
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
    })
    .on("end", function(query) {
      console.log(conn.limitInfo.apiUsage.limit, conn.limitInfo.apiUsage.used, '/salesforce/' + parentName + '/apiUsage/limit');
      context.link.updateValue('/salesforce/' + parentName + '/apiUsage/limit', conn.limitInfo.apiUsage.limit);
      context.link.updateValue('/salesforce/' + parentName + '/apiUsage/used', conn.limitInfo.apiUsage.used);
      r.close();
    })
    .on("error", function(err) {
      console.error(err);
    })
    .run({ autoFetch : true });
    
    return r;
  }
});
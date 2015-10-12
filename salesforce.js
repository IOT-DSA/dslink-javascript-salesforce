var DS = require('dslink'),
	jsforce = require('jsforce');

var context = require('./lib/context'),
	Account = require('./lib/account'),
	Query = require('./lib/query'),
  crud = require('./lib/crud');


var link = new DS.LinkProvider(process.argv.slice(2), 'salesforce-', {
  defaultNodes: {
    addAccount: {
      $name: 'Add Account',
      $is: 'addAccount',
      $invokable: 'write',
      $params: [
        {
          name: 'sandbox',
          type: 'bool',
          default: true
        },
      	{
          name: 'name',
          type: 'string',
          default: ''
        },
        {
          name: 'username',
          type: 'string',
          default: ''
        },
        {
          name: 'password',
          type: 'string',
          default: ''
        }
      ]
    }
  },
  profiles: {
    addAccount: function(path, provider) {
      return new Account(path);
    },
    querySF: function(path, provider) {
      return new Query(path);
    },
    retrieveObject: function(path, provider) {
      return new crud.Retrieve(path);
    },
    updateObject: function(path, provider) {
      return new crud.Update(path);
    },
    createObject: function(path, provider) {
      return new crud.Create(path);
    },
    deleteObject: function(path, provider) {
      return new crud.Delete(path);
    }
  }
});

link.connect().then(function() {
  context.link = link;
});

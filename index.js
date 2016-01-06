var DS = require('dslink');
var jsforce = require('jsforce');

var context = require('./lib/context');
var account = require('./lib/account');
var Query = require('./lib/query').Query;
var crud = require('./lib/crud');

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
    account: function(path, provider) {
      return new account.Account(path, provider);
    },
    addAccount: function(path, provider) {
      return new account.AddAccount(path, provider);
    },
    querySF: function(path, provider) {
      return new Query(path, provider);
    },
    retrieveObject: function(path, provider) {
      return new crud.Retrieve(path, provider);
    },
    updateObject: function(path, provider) {
      return new crud.Update(path, provider);
    },
    createObject: function(path, provider) {
      return new crud.Create(path, provider);
    },
    deleteObject: function(path, provider) {
      return new crud.Delete(path, provider);
    }
  }
});

link.init();

var saving = false;
link.connect().then(function() {
  if(!saving) {
    setInterval(function() {
      link.save();
    }, 1000 * 5);
  }
  saving = true;
});

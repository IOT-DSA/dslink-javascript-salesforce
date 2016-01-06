module.exports = {
  error: function(e) {
    console.log('error: ' + e);
  },
  accounts: {},
  accountStructure: function(name, sandbox, username, password) {
    return {
      $is: 'account',
      $$name: name,
      $$sandbox: sandbox,
      $$username: username,
      $$password: password,
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
      delete: {
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
    };
  }
};

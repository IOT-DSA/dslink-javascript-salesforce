# dslink-javascript-salesforce
DSLink for Salesforce


## INSTALLATION

```bash
npm install
```

## RUNNING

```bash
node salesforce.js --broker BROKER_URL --log LOG_LEVEL
```


#### Add Account `/salesforce/addAccount`

This action will create an Account Node under `/salesforce/` with the name given in the params

PARAMS
```json
[{
  "name": "sandbox",
  "type": "bool",
  "default": true
},
{
  "name": "name",
  "type": "string",
  "default": ""
},
{
  "name": "username",
  "type": "string",
  "default": ""
},
{
  "name": "password",
  "type": "string",
  "default": ""
}]
```


#### Account Node

##### ACTIONS

###### Query `/salesforce/[account-name]/query`

The query action takes an Salesforce SOQL string and returns a table with the resulting records

PARAMS
```json
{
  "name": "sql",
  "type": "string"
}
```

###### Create `/salesforce/[account-name]/create`

The create action takes an Object Type (ie: Account) string and a JSON String, if successfull it will create a record of type `object` with attributes from `json`

PARAMS
```json
{
  "name": "object",
  "type": "string"
},
{
  "name": "json",
  "type": "string"
}
```

###### Retrieve `/salesforce/[account-name]/retrieve`

The retrieve action takes an Object Type (ie: Account) string and a ID String, if successfull it will return a table with a matching record of type `object` with ID equal to `id`

PARAMS
```json
{
  "name": "object",
  "type": "string"
},
{
  "name": "id",
  "type": "string"
}
```

###### Update `/salesforce/[account-name]/update`

The update action takes an Object Type (ie: Account) string and a JSON String, if successfull it will update record of type `object` with attributes from `json`. `json.Id` is required

PARAMS
```json
{
  "name": "object",
  "type": "string"
},
{
  "name": "json",
  "type": "string"
}
```

###### Delete `/salesforce/[account-name]/delete`

The delete action takes an Object Type (ie: Account) string and a ID String, if successfull it will delete the record of type `object` matching `id`

PARAMS
```json
{
  "name": "object",
  "type": "string"
},
{
  "name": "id",
  "type": "string"
}
```

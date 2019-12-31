const newman = require('newman');

newman.run({
    collection:require('./StudioTesting.postman_collection'),
    reporters:'cli',
    globals:{
        "id": "ee75bab1-edec-4a8b-82dd-7ad87ef0f899",
        "values": [
            {
                "key": "res",
                "value": "{\"_id\":\"5df8693ed968a36664a757a5\",\"name\":\"Michael Walker\",\"studioName\":\"MyTest\",\"email\":\"Post@Jest.com\",\"password\":\"$2a$10$UFsq4nKHboyWakYzr9qrn./GERaKOdG3ad9ZMGsL9TIRAk/sIMtMC\",\"artists\":[],\"appointments\":[]}",
                "enabled": true
            },
            {
                "key": "id",
                "value": "5e0086cdc50db702860ba654",
                "enabled": true
            },
            {
                "key": "auth-token",
                "value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGZjMzNhYTE3YjE2ODAwMTc1ZWFiMTIiLCJpYXQiOjE1NzY4MDk0NTh9.Qc9U3HdryGjfpJAbouAzXucclGaPGHH9EIL90r4ILt0",
                "enabled": true
            },
            {
                "key": "artistId",
                "value": "5dfc33fa17b16800175eab13",
                "enabled": true
            },
            {
                "key": "projectId",
                "value": "5dfc33fd17b16800175eab15",
                "enabled": true
            },
            {
                "key": "sessionId",
                "value": "5dfc340017b16800175eab17",
                "enabled": true
            },
            {
                "key": "paymentId",
                "value": "5dfc340317b16800175eab19",
                "enabled": true
            },
            {
                "key": "appId",
                "value": "5dfc340617b16800175eab1b",
                "enabled": true
            }
        ],
        "name": "Studio Crm Globals",
        "_postman_variable_scope": "globals",
        "_postman_exported_at": "2019-12-31T08:44:19.378Z",
        "_postman_exported_using": "Postman/7.14.0"
    },
    environment:{
        "id": "6fbfc96d-babd-40f7-9c7b-419b215b11c0",
        "name": "local",
        "values": [
            {
                "key": "baseurl",
                "value": "http://localhost:5000",
                "enabled": true
            }
        ],
        "_postman_variable_scope": "environment",
        "_postman_exported_at": "2019-12-31T08:44:55.258Z",
        "_postman_exported_using": "Postman/7.14.0"
    }

},
    (err)=>{
    if(err){throw err;}
    console.log('Collection ran without a problem! Good Job!')
    });
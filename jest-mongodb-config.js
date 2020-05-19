module.exports {
    mongodbMemoryServerOptions: {
        instance: {
            dbName: 'jest'
        },
        binary: {
            version: ' 3.2.22', 
            skipMD5: true
        },
        autoStart: false
    }
}
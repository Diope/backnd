const config = {
    env: process.env.NODE_ENV || 'development' || 'test',
    port: process.env.PORT || '3000',
    jwtSecret: process.env.JWT_SECRET || "SECRET_HERE",
    mongoURI: process.env.MONGODB_URI || process.env.MONGO_HOST || 'mongodb://' + (process.env.IP || 'localhost') + ':' + (process.env.MONGO_PORT || '27017') + '/mernserver'
}

export default config
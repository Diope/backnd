import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser';
import compress from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import Template from './../template';

import authRoutes from './routes/auth.route'
import userRoutes from './routes/user.route'

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser())
app.use(compress())
app.use(helmet())
app.use(cors())

app.use('/', userRoutes)
app.use('/', authRoutes)

app.get('/', (req, res) => {
    res.status(200).send(Template())
})

app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({"error": err.name + ": " + err.message + ". You are not authorized to perform this action, please log in and try again."})
    } else if (err) {
        res.status(400).json({"error": err.name + ": " + err.message})
        console.table(err)
    }
})

export default app
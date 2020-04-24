import express from 'express'
import signupEndpoint from './endpoints/users/signupEndpoint'
import loginEndpoint from './endpoints/users/loginEndpoint'
import changePasswordEndpoint from './endpoints/users/changePasswordEndpoint'
import uploadVideoEndpoint from './endpoints/videos/uploadVideoEndpoint'
import getUserUploadsEndpoint from './endpoints/videos/getUserUploadsEndpoint'
import editVideoEndpoint from './endpoints/videos/editVideoEndpoint'
import deleteVideoEndpoint from './endpoints/videos/deleteVideoEndpoint'
import getAllVideosEndpoint from './endpoints/videos/getAllVideosEndpoint'
import getVideoByIdEndpoint from './endpoints/videos/getVideoByIdEndpoint'
import getUserByIdEndpoint from './endpoints/users/getUserByIdEndpoint'

const app = express()
const cors = require("cors")

app.use(express.json())
app.use(cors())

app.post('/users/signup', signupEndpoint)
app.post('/users/login', loginEndpoint)
app.post('/users/password', changePasswordEndpoint)
app.get('/users/:id', getUserByIdEndpoint)

app.get('/videos', getUserUploadsEndpoint)
app.get('/videos/all', getAllVideosEndpoint)
app.get('/videos/:id', getVideoByIdEndpoint)
app.post('/videos/upload', uploadVideoEndpoint)
app.put('/videos/edit', editVideoEndpoint)
app.delete('/videos/:videoId', deleteVideoEndpoint)


export default app
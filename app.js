const express           = require('express')
const app               = express()
const cors              = require('cors')

require('./config')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// import router
const appRouter         = require('./router')

app.use('/',appRouter)


// Start the server
const port = 5000
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
});

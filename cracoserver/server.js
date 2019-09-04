const express = require('express')
const app = express()

app.get('/',function(req,res){
    res.json({title:'hello world'})
})
app.use(express.static('public'))

app.listen(process.env.PORT || 8080, () => console.log('All is ok'))
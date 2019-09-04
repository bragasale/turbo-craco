const express = require('express')
const app = express()
const request = require('request')
const cheerio = require('cheerio')


let url = "http://www.arrowcast.net/fids/mco/fids.asp?sort=city&city=&number=&airline=&adi=A"
let items = []

request(url , function(err, response, html){
    if (!err){
        let $ = cheerio.load(html)
        var allItens = $("#tableGrid").find('tbody').children()
        allItens.each(function(index) {
            items.push({airline:$('#tableGrid').find('tbody').children().eq(index).children().eq(1).find('span').text(), 
                        flight:$('#tableGrid').find('tbody').children().eq(index).children().eq(2).find('span').text(),
                        from:$('#tableGrid').find('tbody').children().eq(index).children().eq(3).text(),
                        scheduletime:$('#tableGrid').find('tbody').children().eq(index).children().eq(4).text(),
                        atualtima:$('#tableGrid').find('tbody').children().eq(index).children().eq(5).text(),
                        status:$('#tableGrid').find('tbody').children().eq(index).children().eq(6).text()
        })
        })

        console.log(items)
    }
})

app.get('/',function(req,res){
    res.json({items})
})
app.use(express.static('public'))

app.listen(process.env.PORT || 8080, () => console.log('All is ok'))
var ObjectID = require('mongodb').ObjectID

module.exports = function(app, db){

    //for showing data with id
    app.get('/salehistory/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id)}
        db.db('pos').collection('salehistory').findOne(details, (err, item) => {
            if(err){
                res.send({'error': 'An error has occured'})
            }
            else{
                res.send(item)
            }
        })
    })
    //for showing all data
    app.get('/showsalehistory', (req, res) => {
        var items = db.db('pos').collection('salehistory').find({}).toArray(function(err, result) {
            if(err){
                res.send('error','An error has occured')
            }
            else{
                res.send(result)
            }
        })
    })

    //for deleting
    app.delete('/salehistory/:id', (req, res) => {
        const id = req.params.id;
        const details = {'_id': new ObjectID(id)}
        db.db('pos').collection('salehistory').remove(details, (err, item) => {
            if(err){
                res.send({'error':'An error has accured'});
            }else{
                res.send('Product History '+ id + ' deleted');
            }
        });
    })

    //for updating
    app.put('/salehistory/:id', (req, res) => {
        const id = req.params.id;
        const details = {'_id': new ObjectID(id)}
        const product = {
            saleMasterID:req.body.saleMasterID, 
            productName:req.body.productName,
            productQTY:req.body.productQTY,
            productPrice:req.body.productPrice
        }
        db.db('pos').collection('salehistory').update(details, product, (err, item) => {
            if(err){
                res.send({'error':'An error and accured'})
            }
            else{
                res.send(item)
            }
        })
    })


    //for inserting data
    //*Done */
    app.post('/salehistory', (req, res) => {
        const product= {
            saleMasterID:req.body.saleMasterID, 
            productName:req.body.productName,
            productQTY:req.body.productQTY,
            productPrice:req.body.productPrice
        }
        db.db('pos').collection('salehistory').insert(product, (err, result) => {
            if(err){
                res.send({'error': 'An error has occured'})
            }
            else {
                res.send(result.ops[0])
            }
        })
    })   
}

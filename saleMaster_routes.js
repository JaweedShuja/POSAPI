var ObjectID = require('mongodb').ObjectID

module.exports = function(app, db){

    //for showing data with id
    app.get('/salemaster/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id)}
        db.db('pos').collection('salemaster').findOne(details, (err, item) => {
            if(err){
                res.send({'error': 'An error has occured'})
            }
            else{
                res.send(item)
            }
        })
    })
    //for showing all data
    app.get('/showsalemaster', (req, res) => {
        var items = db.db('pos').collection('salemaster').find({}).toArray(function(err, result) {
            if(err){
                res.send('error','An error has occured')
            }
            else{
                res.send(result)
            }
        })
    })

    //for deleting
    app.delete('/salemaster/:id', (req, res) => {
        const id = req.params.id;
        const details = {'_id': new ObjectID(id)}
        db.db('pos').collection('salemaster').remove(details, (err, item) => {
            if(err){
                res.send({'error':'An error has accured'});
            }else{
                res.send('Sale '+ id + ' deleted');
            }
        });
    })

    //for updating
    app.put('/salemaster/:id', (req, res) => {
        const id = req.params.id;
        const details = {'_id': new ObjectID(id)}
        const saleMaster = {
            totalAmount:req.body.totalAmount,
            date:req.body.date
        }
        db.db('pos').collection('salemaster').update(details, saleMaster, (err, item) => {
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
    app.post('/salemaster', (req, res) => {
        const saleMaster= {
            totalAmount:req.body.totalAmount,
            date:req.body.date
        }
        db.db('pos').collection('salemaster').insert(saleMaster, (err, result) => {
            if(err){
                res.send({'error': 'An error has occured'})
            }
            else {
                res.send(result.ops[0])
            }
        })
    })   
}

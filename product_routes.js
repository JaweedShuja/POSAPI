var ObjectID = require('mongodb').ObjectID

module.exports = function(app, db){

    //for showing data with id
    app.get('/products/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id)}
        db.db('pos').collection('products').findOne(details, (err, item) => {
            if(err){
                res.send({'error': 'An error has occured'})
            }
            else{
                res.send(item)
            }
        })
    })
    //for showing all data
    app.get('/showproducts', (req, res) => {
        var items = db.db('pos').collection('products').find({}).toArray(function(err, result) {
            if(err){
                res.send('error','An error has occured')
            }
            else{
                res.send(result)
            }
        })
    })

    //for deleting
    app.delete('/products/:id', (req, res) => {
        const id = req.params.id;
        const details = {'_id': new ObjectID(id)}
        db.db('pos').collection('products').remove(details, (err, item) => {
            if(err){
                res.send({'error':'An error has accured'});
            }else{
                res.send('Product '+ id + ' deleted');
            }
        });
    })

    //for updating
    app.put('/products/:id', (req, res) => {
        const id = req.params.id;
        const details = {'_id': new ObjectID(id)}
        const product = {
            productName:req.body.productName, 
            productPrice:req.body.productPrice, 
            productCategoryName:req.body.productCategoryName
        }
        db.db('pos').collection('products').update(details, product, (err, item) => {
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
    app.post('/products', (req, res) => {
        const product= {
            productName:req.body.productName, 
            productPrice:req.body.productPrice, 
            productCategoryName:req.body.productCategoryName
        }
        db.db('pos').collection('products').insert(product, (err, result) => {
            if(err){
                res.send({'error': 'An error has occured'})
            }
            else {
                res.send(result.ops[0])
            }
        })
    })   
}

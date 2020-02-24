var ObjectID = require('mongodb').ObjectID

module.exports = function(app, db){

    //for showing data with id
    app.get('/productcategory/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id)}
        db.db('pos').collection('productcategory').findOne(details, (err, item) => {
            if(err){
                res.send({'error': 'An error has occured'})
            }
            else{
                res.send(item)
            }
        })
    })
    //for showing all data
    app.get('/showproductcategory', (req, res) => {
        var items = db.db('pos').collection('productcategory').find({}).toArray(function(err, result) {
            if(err){
                res.send('error','An error has occured')
            }
            else{
                res.send(result)
            }
        })
    })

    //for deleting
    app.delete('/productcategory/:id', (req, res) => {
        const id = req.params.id;
        const details = {'_id': new ObjectID(id)}
        db.db('pos').collection('productcategory').remove(details, (err, item) => {
            if(err){
                res.send({'error':'An error has accured'});
            }else{
                res.send('Category '+ id + ' deleted');
            }
        });
    })

    //for updating
    app.put('/productcategory/:id', (req, res) => {
        const id = req.params.id;
        const details = {'_id': new ObjectID(id)}
        const productCategory = {
            productCategoryName:req.body.productCategoryName 
        }
        db.db('pos').collection('productcategory').update(details, productCategory, (err, item) => {
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
    app.post('/productcategory', (req, res) => {
        const productCategory= {
            productCategoryName:req.body.productCategoryName
        }
        db.db('pos').collection('productcategory').insert(productCategory, (err, result) => {
            if(err){
                res.send({'error': 'An error has occured'})
            }
            else {
                res.send(result.ops[0])
            }
        })
    })   
}

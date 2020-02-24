const productRoutes = require('./product_routes.js');
const productCategoryRoutes = require('./productCategory_routes.js')
const saleMasterRoutes = require('./saleMaster_routes.js')
const saleHistoryRoutes = require('./salehistory_routes')

module.exports = function(app, db){
    productRoutes(app,db)
    productCategoryRoutes(app,db)
    saleMasterRoutes(app,db)
    saleHistoryRoutes(app,db)
}

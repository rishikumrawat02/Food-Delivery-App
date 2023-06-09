function cartController(){
    return{
        cart: function(req,res){
            res.render('cart');
        },
        
        updateCart: function(req,res){
            if(!req.session.cart){
                req.session.cart={
                    items:{},
                    totalQty: 0,
                    totalPrice: 0
                }
            }

            let cart = req.session.cart;

            // checking if items exist in cart or not
            if(!cart.items[req.body._id]){
                cart.items[req.body._id]={
                    item:req.body,
                    qty: 1
                }

                cart.totalQty = cart.totalQty+1;
                cart.totalPrice = cart.totalPrice + req.body.price;
            }else{
                cart.items[req.body._id].qty = cart.items[req.body._id].qty + 1;
                cart.totalPrice = cart.totalPrice + req.body.price;
                cart.totalQty = cart.totalQty + 1;
            }
            return res.json({totalQty: req.session.cart.totalQty});
        }
    }
}

module.exports=cartController;
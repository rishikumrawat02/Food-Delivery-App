const order = require('../models/orderModel');

function adminController(){
    return {
        adminPanel: async function(req,res){
            const allOrders = await order.find({status:{$ne:'completed'}},null, {sort:{'createdAt':-1}}).populate('customerId','-password');
            
            if(req.xhr){
                return res.json(allOrders);
            }
            return res.render('adminPanel');
        },

        updateOrderStatus: async function(req,res){
            const updateOrder = await order.updateOne({_id: req.body.orderId},{status: req.body.status});
            if(!updateOrder){
                console.log('Unable to update the order status');
            }

            //Emit event (sending message so that it can be receive anyWhere in the app)
            const eventEmitter = req.app.get('eventEmitter');
            eventEmitter.emit('orderUpdated',{id:req.body.orderId, status: req.body.status});

            return res.redirect('/adminPanel');
        }
    }
}

module.exports = adminController;
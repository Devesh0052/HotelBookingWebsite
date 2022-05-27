const express=require('express');
const  controller=require('../controller');

const router=express.Router();

//rendering index page
router.get('/',controller.index);

router.get('/form',controller.form);

router.get('/checkcancel',controller.checkcancel);
//find empty rooms
router.post('/search-vacant',controller.emptyroom);
// add a new booking to db
router.post('/bookings', controller.reserveroom);
//checkout
router.post('/checkout',controller.checkout);
//cancel
router.post('/cancel',controller.cancel);


module.exports=router;
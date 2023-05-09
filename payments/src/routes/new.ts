import { BadRequestError, NotAuthorized, NotFoundError, OrderStatus, requireAuth, validateRequest } from "@arshpackages/common"
import express, { Request, Response } from "express"
import { body } from "express-validator"
import { Order } from "../models/order"
import { Payment } from "../models/payment"
import { stripe } from "../stripe"

const router = express.Router()

router.post("/api/payments",requireAuth, [
    
        body("token")
        .not()
        .isEmpty(),
        body("orderId")
        .not()
        .isEmpty()
     
], validateRequest, async(req: Request, res: Response ) =>{

    const { token, orderId } = req.body

    const order = await Order.findById(orderId)

    if(!order){
        throw new NotFoundError()
    }

    if(order.userId !== req.currentUser?.id){
        throw new NotAuthorized()
    }

    if(order.status === OrderStatus.CANCELLED){
        throw new BadRequestError("Can not pay for cancelled ticket")
    }

    const charge = await stripe.charges.create({
        currency: "usd",
        amount: order.price * 100,
        source: token
    })

    const payment = await Payment.build({
        orderId,
        stripeId: charge.id
    })

    await payment.save()

    res.status(201).send({success:  true})
})

export { router as createChargeRouter }
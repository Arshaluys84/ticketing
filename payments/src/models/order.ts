import { OrderStatus } from "@arshpackages/common";
import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

interface OrderAttrs {
    id: string;
    version: number;
    price: number;
    status: OrderStatus;
    userId: string
}

interface OrderDoc extends mongoose.Document{
    version: number;
    price: number;
    status: OrderStatus;
    userId: string
}

interface OrderModel extends mongoose.Model<OrderDoc>{
    build(attr: OrderAttrs):OrderDoc
}

const orderSchema = new mongoose.Schema({
    price: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    }
},{
    toJSON:{
        transform(doc,ret){
            ret.id = ret._id;
            delete ret._id
        }
    }
})

orderSchema.set("versionKey", "version")
orderSchema.plugin(updateIfCurrentPlugin)

orderSchema.statics.build = (attr: OrderAttrs) =>{
    return new Order( {
        _id: attr.id,
        version: attr.version,
        price: attr.price,
        status: attr.status,
        userId: attr.userId
    })
}

const Order = mongoose.model<OrderDoc, OrderModel>("Order", orderSchema)

export { Order }
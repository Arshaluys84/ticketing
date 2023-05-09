import mongoose from "mongoose"

const createId = ()=>{
    return new mongoose.Types.ObjectId().toHexString()
}

export { createId }
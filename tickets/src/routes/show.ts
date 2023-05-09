import { NotFoundError } from "@arshpackages/common"
import express, { Request, Response } from "express"
import { Ticket } from "../models/ticket"

const router = express.Router()

router.get("/api/tickets/:id", async (req: Request, res: Response) => {
    const ticket = await Ticket.findById(req.params.id)

    if(!ticket){
        throw new NotFoundError()
    }else{
        res.status(200).send(ticket)
    }

})

export { router as showTicketRouter }
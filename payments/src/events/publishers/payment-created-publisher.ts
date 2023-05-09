import { PaymentCreatedEvent, Publisher, Subjects } from "@arshpackages/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent>{
    readonly subject = Subjects.PaymentCreated;
}
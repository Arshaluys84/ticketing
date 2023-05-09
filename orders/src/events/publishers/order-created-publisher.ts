import { Publisher, OrderCreatedEvent, Subjects } from "@arshpackages/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}

import { Subjects, Publisher, OrderCancelledEvent } from "@arshpackages/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}

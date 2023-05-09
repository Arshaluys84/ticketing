import { Publisher, Subjects, TicketUpdatedEvent } from '@arshpackages/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
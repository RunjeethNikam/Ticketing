import { Publisher, Subjects, TicketUpdatedEvent } from "@gittrix/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}

import { Message } from "node-nats-streaming";
import { Subjects, Listener, TicketCreatedEvent } from "@gittrix/common";

import { Ticket } from "../../models/ticket";
import { queueGroupName } from "./queue-group-name";

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
  queueGroupName: string = queueGroupName;

  async onMessage(
    data: { id: string; title: string; price: number; userId: string },
    message: Message
  ): Promise<void> {
    const { id, title, price } = data;
    const ticket = Ticket.build({
      id,
      title,
      price,
    });
    await ticket.save();
    message.ack();
  }
}

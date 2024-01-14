import { Subjects, Publisher, ExpirationCompleteEvent } from "@gittrix/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}

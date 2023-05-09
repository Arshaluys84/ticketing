import { ExpirationCompleteEvent, Publisher, Subjects } from "@arshpackages/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent>{
    readonly subject = Subjects.ExpirationComplete;
}
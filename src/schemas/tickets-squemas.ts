import { InputTicketBody } from "@/protocols";
import Joi from "joi";

export const ticketSquema = Joi.object<InputTicketBody>({
    ticketTypeId: Joi.number().required()
});
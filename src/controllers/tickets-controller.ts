import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import { ticketsRepository } from '@/repositories';
import { ticketService } from '@/services';
import { InputTicketBody } from '@/protocols';

export async function getTicketsTypes(req: AuthenticatedRequest, res: Response) {
  const ticketTypes = await ticketService.fingTicketTypes();
  return res.status(httpStatus.OK).send(ticketTypes);
}

export async function getTicket(req: AuthenticatedRequest, res: Response){
    const {userId} = req
    const ticket = await ticketService.getTicketByUserId(userId)
    res.status(httpStatus.OK).send(ticket)
}

export async function createTicket(req: AuthenticatedRequest, res: Response){
    const {userId} = req
    const {ticketTypeId} = req.body as InputTicketBody;

    const ticket =  await ticketService.createTicket(userId, ticketTypeId)
    return res.status(httpStatus.CREATED).send(ticket) 
}
import { invalidDataError, notFoundError } from '@/errors';
import { CreateTicketParams } from '@/protocols';
import { enrollmentRepository, ticketsRepository } from '@/repositories';
import { TicketStatus } from '@prisma/client';

async function fingTicketTypes() {
  const ticketTypes = await ticketsRepository.findTicketTypes();
  return ticketTypes;
}

async function getTicketByUserId(userId:number) {
    const enrollment = await enrollmentRepository.findWithAddressByUserId(userId)

    if(!enrollment) throw notFoundError()
    const ticket = await ticketsRepository.FindTicketByEnrollmentId(enrollment.id)

    if(!ticket) throw notFoundError()

    return ticket
}

async function createTicket(userId: number, ticketTypeId: number) {
    if(!ticketTypeId) throw invalidDataError('ticketTypeId')
    const enrollment = await enrollmentRepository.findWithAddressByUserId(userId)

    if(!enrollment) throw notFoundError()

    const ticketData: CreateTicketParams={
        enrollmentId: enrollment.id,
        ticketTypeId, //o nome do valor é o mesmo que a propriedade 
        status: TicketStatus.RESERVED

    }
    const ticket = await ticketsRepository.createTicket(ticketData)

    return ticket
}

export const ticketService = {
  fingTicketTypes,
  getTicketByUserId,
  createTicket
};

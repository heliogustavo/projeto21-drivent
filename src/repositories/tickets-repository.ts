import { prisma } from '@/config';
import { CreateTicketParams } from '@/protocols';

async function findTicketTypes() {
  const result = await prisma.ticketType.findMany();
  return result;
}

async function FindTicketByEnrollmentId(enrollmentId: number) {
    const result = await prisma.ticket.findUnique({
        where : { enrollmentId},
        include: {TicketType: true}  //responsavel pelo Joi(chave estrangeira)
    })

    return result;
}

async function createTicket(ticket:CreateTicketParams) {
    const result = await prisma.ticket.create({
        data: ticket,
        include: {TicketType: true}
    })
    return result
    
}

export const ticketsRepository = {
    findTicketTypes,
    FindTicketByEnrollmentId,
    createTicket
};

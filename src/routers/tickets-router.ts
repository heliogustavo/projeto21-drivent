import { Router } from 'express';
import { createTicket, getTicket, getTicketsTypes } from '@/controllers';
import { authenticateToken, validateBody } from '@/middlewares';
import { ticketSquema } from '@/schemas/tickets-squemas';

const ticketsRouter = Router();

ticketsRouter.all('/*', authenticateToken)
.get('/types', getTicketsTypes)
.get('/', getTicket)
.post('/', validateBody(ticketSquema), createTicket);

export { ticketsRouter };

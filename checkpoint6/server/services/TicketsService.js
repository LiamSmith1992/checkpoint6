import { BadRequest, Forbidden } from "@bcwdev/auth0provider/lib/Errors"
import { dbContext } from "../db/DbContext"
import { eventsService } from "./EventsService"



class TicketsService {
  async getMyTickets(accountId) {
    const tickets = await dbContext.Tickets.find({ accountId }).populate('event')
    return tickets
  }
  async getAllAttendees(eventId) {
    const attendee = await dbContext.Tickets.find({ eventId }).populate('profile')
    return attendee
  }

  async createTicket(body) {
    const event = await dbContext.Events.findById(body.eventId)
    // @ts-ignore
    if (event.isCanceled) {
      throw new Forbidden('this event has been canceled')
    }
    // @ts-ignore
    if (event.capacity == 0) {
      throw new BadRequest('no tickets')
    }
    const ticket = await dbContext.Tickets.create(body)
    await ticket.populate('profile', 'name picture')
    await ticket.populate('event')
    // @ts-ignore
    event.capacity -= 1
    // @ts-ignore
    await event.save()
    return ticket
  }


  async deleteTickets(ticketId, userId) {

    const ticket = await dbContext.Tickets.findById(ticketId).populate('event')
    if (!ticket) {
      throw new BadRequest('no tickets to delete')
    }
    if (ticket.accountId != userId) {
      throw new Forbidden('these are not your tickets')
    }
    const event = await eventsService.getOne(ticket.eventId)

    await ticket.delete()
    // @ts-ignore
    event.capacity += 1

    await event.save()
    return ' your tickets have been removed'

  }




}




export const ticketsService = new TicketsService()
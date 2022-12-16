import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { api } from "./AxiosService"



class TicketsService {


  async getTicket(body) {
    const res = await api.post('api/tickets', body)
    logger.log('getting tickets', res.data)
    AppState.ticketHolders.push(res.data)
    console.log(AppState.ticketHolders, '[TICKET HOLDERS]');
    AppState.myTickets.push(res.data)
    AppState.activeEvent.capacity--
  }

  async getTicketHolders(eventId) {
    const res = await api.get('api/events/' + eventId + '/tickets')
    logger.log('getting ticket holders', res.data)
    AppState.ticketHolders = res.data

  }

  async getMyTickets() {
    try {
      const res = await api.get('account/tickets')
      logger.log('getting my tickets', res.data)
      AppState.myTickets = res.data
    } catch (error) {
      logger.error(error)
      Pop.error(error.message)
    }
  }


  async deleteTickets(ticketId) {
    const res = await api.delete('api/tickets/' + ticketId)
    logger.log('deleting ticket', res.data)
    AppState.myTickets.filter(t => t.id != ticketId)
    this.getMyTickets()
    AppState.activeEvent = AppState.events.find(e => e.Id == ticketId)
    AppState.activeEvent.capacity++
  }

}


export const ticketsService = new TicketsService()
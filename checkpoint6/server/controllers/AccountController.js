import { Auth0Provider } from '@bcwdev/auth0provider'
import { accountService } from '../services/AccountService'
import { eventsService } from "../services/EventsService"
import { ticketsService } from "../services/TicketsService"
import BaseController from '../utils/BaseController'

export class AccountController extends BaseController {
  constructor() {
    super('account')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getUserAccount)
      .get('/tickets', this.getMyTickets)
    // .get('/events', this.getMyEvents)
  }

  async getUserAccount(req, res, next) {
    try {
      const account = await accountService.getAccount(req.userInfo)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }

  async getMyTickets(req, res, next) {
    try {
      const tickets = await ticketsService.getMyTickets(req.userInfo.id)
      return res.send(tickets)
    } catch (error) {
      next(error)
    }
  }

  // async getMyEvents(req, res, next) {
  //   try {
  //     const events = await eventsService.getMyEvents(req.userInfo.id)
  //     return res.send(events)
  //   } catch (error) {
  //     next(error)
  //   }
  // }

}

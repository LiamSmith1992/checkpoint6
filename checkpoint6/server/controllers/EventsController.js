import { Auth0Provider } from "@bcwdev/auth0provider"
import { dbContext } from "../db/DbContext"
import { commentsService } from "../services/CommentsService"
import { eventsService } from "../services/EventsService"
import { ticketsService } from "../services/TicketsService"
import BaseController from "../utils/BaseController"


export class EventsController extends BaseController {
  constructor() {
    super('api/events')
    this.router
      .get('', this.getAll)
      .get('/:id', this.getOne)
      .get('/:id/tickets', this.getAllAttendees)
      .get('/:id/comments', this.getCommentsForEvent)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .put('/:id', this.editEvent)
      .delete('/:id', this.removeEvent)
  }

  async getAll(req, res, next) {
    try {
      const events = await eventsService.getAll()
      return res.send(events)
    } catch (error) {
      next(error)
    }
  }

  async getOne(req, res, next) {
    try {
      const event = await eventsService.getOne(req.params.id)
      return res.send(event)
    } catch (error) {
      next(error)
    }
  }

  async getCommentsForEvent(req, res, next) {
    try {
      const comments = await commentsService.getCommentsForEvent(req.params.id)
      return res.send(comments)
    } catch (error) {
      next(error)
    }
  }

  async getAllAttendees(req, res, next) {
    try {
      let attendee = await ticketsService.getAllAttendees(req.params.id)
      return res.send(attendee)
    } catch (error) {
      next(error)
    }
  }



  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const event = await eventsService.create(req.body)
      return res.send(event)
    } catch (error) {
      next(error)
    }
  }

  async editEvent(req, res, next) {
    try {
      const updated = await eventsService.editEvent(req.params.id, req.body, req.userInfo.id)
      return res.send(updated)
    } catch (error) {
      next(error)
    }
  }


  async removeEvent(req, res, next) {
    try {
      const message = await eventsService.removeEvent(req.params.id, req.userInfo.id)
      return res.send(message)
    } catch (error) {
      next(error)
    }
  }


}
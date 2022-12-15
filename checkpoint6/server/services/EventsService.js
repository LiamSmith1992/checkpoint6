import { BadRequest, Forbidden } from "@bcwdev/auth0provider/lib/Errors"
import { dbContext } from "../db/DbContext"



class EventsService {

  async getAll() {
    const events = await dbContext.Events.find().populate('creator')
    return events
  }

  async getOne(id) {
    const event = await dbContext.Events.findById(id).populate('creator')
    if (!event) throw new BadRequest(`no event with ${id}`)
    return event
  }


  async create(body) {
    const event = await dbContext.Events.create(body)
    await event.populate('creator')
    return event
  }

  async editEvent(id, eventData, userId) {

    const origonal = await dbContext.Events.findById(id).populate('creator')

    if (origonal.creatorId != userId) {
      throw new Forbidden('no changin for you')

    }
    // @ts-ignore
    if (origonal.isCanceled == true) { throw new BadRequest('event is canceled') }
    // @ts-ignore
    origonal.name = eventData.name !== undefined ? eventData.name : origonal.name
    // @ts-ignore
    origonal.description = eventData.description !== undefined ? eventData.description : origonal.description
    origonal.coverImg = eventData.coverImg !== undefined ? eventData.coverImg : origonal.coverImg
    origonal.location = eventData.location !== undefined ? eventData.location : origonal.location
    origonal.capacity = eventData.capacity !== undefined ? eventData.capacity : origonal.capacity
    origonal.startDate = eventData.startDate !== undefined ? eventData.startDate : origonal.startDate
    await origonal.save()
    return origonal
  }

  async removeEvent(id, userId) {
    const event = await dbContext.Events.findById(id)
    if (!event) { throw new BadRequest('no event at event id' + id) }
    if (event.creatorId != userId) { throw new Forbidden('this event you cannot change') }
    if (event.isCanceled == true) { throw new BadRequest('event is already canceled') }
    event.isCanceled = true
    await event.save()
    return 'event was canceled'
  }


}


export const eventsService = new EventsService()
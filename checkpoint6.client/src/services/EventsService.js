import { AuthPlugin } from "@bcwdev/auth0provider-client"
import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"



class EventsService {

  async getAllEvents() {
    const res = await api.get('api/events')
    logger.log('Logging events getter', res.data)
    AppState.events = res.data

  }

  async getEventById(eventId) {
    const res = await api.get('api/events/' + eventId)
    logger.log("getting event by id", res.data)
    AppState.activeEvent = res.data
  }




  async createEvent(body) {
    const res = await api.post('api/events', body)
    logger.log('creating event', res.data)
    AppState.events.push(res.data)
    return res.data

  }



}






export const eventsService = new EventsService()
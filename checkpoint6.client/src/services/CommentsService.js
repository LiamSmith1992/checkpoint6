import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"


class CommentsService {


  async getCommentsByEventId(eventId) {
    const res = await api.get('api/events/' + eventId + '/comments')
    logger.log('getting event comments', res.data)
    AppState.comments = res.data
  }

  async createComment(body) {
    const res = await api.post('api/comments', body)
    logger.log('creating comment', res.data)
    AppState.comments.push(res.data)

  }






}



export const commentsService = new CommentsService()
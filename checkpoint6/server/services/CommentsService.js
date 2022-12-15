import { BadRequest, Forbidden } from "@bcwdev/auth0provider/lib/Errors"
import { dbContext } from "../db/DbContext"
import { eventsService } from "./EventsService"



class CommentsService {
  async getCommentsForEvent(eventId) {
    const comments = await dbContext.Comments.find({ eventId }).populate('creator')

    return comments
  }

  async createComment(body) {
    const event = await eventsService.getOne(body.eventId)
    if (!event) {
      throw new BadRequest('cannot find event')
    }
    const comment = await dbContext.Comments.create(body)
    await comment.populate('creator')
    return comment
  }


  async deleteComment(commentId, userId) {
    const comment = await dbContext.Comments.findById(commentId).populate('creator')
    if (!comment) {
      throw new BadRequest('no event with this comment')
    }
    if (comment.creatorId.toString() != userId) {
      throw new Forbidden('no delete if you are not creator')
    }
    const event = await eventsService.getOne(comment.eventId)
    if (event.isCanceled) {
      throw new Forbidden('cannot modify canceled events')
    }
    await comment.delete()
    // await event.save()
    return 'your comment has been deleted'
  }

}




export const commentsService = new CommentsService()
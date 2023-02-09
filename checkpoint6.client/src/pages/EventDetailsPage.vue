<template>
  <div class="container-fluid bg-dark">

    <!-- NOTE this is cover img and event name -->
    <section v-if="event" class="row ">
      <div class="col-12 mt-3">
        <div class="d-flex justify-content-center">
          <div v-if="event.isCanceled" class="text-danger">
            <h1>Event has been canceled 😭</h1>
          </div>
          <div v-else class="text-success">
            <H1>{{ event.name }}</H1>
          </div>
        </div>
        <img :src="event.coverImg" alt="" class="img-fluid poster-img rounded mb-3">
      </div>


      <!-- NOTE this is the event info -->
      <section class="row bg-info p-3 m-0 ">
        <div class="col-12 mt-3">
          <h4><span class="text-success">FUN</span> : {{ event.type }}</h4>
          <h4><span class="text-success">LOCATION</span> : {{ event.location }}</h4>
          <h4><span class="text-success">DATE</span> : {{ new Date(event.startDate).toDateString() }}</h4>
          <h4><span class="text-success">EVENT CREATOR</span> : {{ event.creator.name }}</h4>
          <h4> <span class="text-success">INFO</span>: {{ event.description }}</h4>
        </div>

        <div v-if="event.isCanceled || event.capacity <= 0 || isAttending" class="d-flex justify-content-end pb-3">
          <h4 class="p-2 text-danger">Tickets Left: {{ event.capacity }}</h4>
          <button disabled class="btn btn-danger">Get Tickets!</button>
        </div>

        <div v-else class="d-flex justify-content-end pb-3">
          <div v-if="event.capacity <= 0 || event.isCanceled">
            <h4 class="p-2 text-danger">Tickets Left: {{ event.capacity }}</h4>
          </div>
          <div v-else>
            <h4 class="p-2 text-success">Tickets Left: {{ event.capacity }}</h4>
          </div>
          <button @click="getTicket()" class="btn btn-success fw-bold">Get Tickets!</button>
        </div>
        <div v-if="!event.isCanceled">
          <button @click="cancelEvent(event.id)" v-if="event.creatorId == myAccount.id"
            class="btn btn-danger fw-bold">Cancel
            Event</button>
        </div>
      </section>

      <!-- NOTE this is ticket holders -->
      <section v-if="!event.isCanceled" class="row card m-0 bg-warning">
        <h2>Look who's going!</h2>
        <div class="col-12 d-flex m-2 ">
          <div v-for="t in ticketHolders" class="d-flex p-2 ">
            <div>
              <img :src="t.profile.picture" alt="" class="smaller-img rounded-circle" :title="t.profile.name">

            </div>
          </div>
        </div>
      </section>

      <!-- NOTE this is comments -->
      <section v-if="!event.isCanceled" class="row justify-content-center">

        <div class="col-10 d-flex  card ">
          <form @submit.prevent="createComment()">
            <h5 class="text-dark">What people are saying about <span class="text-info border-bottom">{{
                event.name
            }}</span>
            </h5>
            <div class="form-group">
              <label for="body">What do you think?</label>
              <textarea v-model="editable.body" placeholder="Tell us what you think" class="form-control"
                id="exampleFormControlTextarea1" rows="3"></textarea>
            </div>
            <div class="d-flex justify-content-end m-3">
              <button class="btn btn-success fw-bold ">submit</button>
            </div>
          </form>
          <div v-for="c in comments" class="text-dark d-flex p-3 ">
            <div class="d-flex">
              <button v-if="myAccount.id == c.creatorId" @click="deleteComment(c.id)"
                class="btn btn-danger mdi mdi-delete" title="delete your comment"></button>
              <div class="align-items-center d-flex me-3">
                <img :src="c.creator.picture" alt="" class="rounded-circle comment-img">
                <div v-if="c.isAttending">
                  <span class="text-success">Has Tickets</span>
                </div>
              </div>
              <div class="p-3 card elevation-5">
                <h5>{{ c.creator.name }}</h5>
                {{ c.body }}
              </div>
            </div>


          </div>


        </div>
      </section>

    </section>
  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted, ref } from 'vue';
import Pop from "../utils/Pop";
import { logger } from "../utils/Logger";
import { eventsService } from "../services/EventsService";
import { useRoute } from "vue-router";
import { ticketsService } from "../services/TicketsService";
import { commentsService } from "../services/CommentsService";


export default {



  setup() {
    const editable = ref({})
    const route = useRoute();
    onMounted(() => {
      getEventById()
      getCommentsByEventId()
      getTicketHolders()
    })


    async function getEventById() {
      try {
        await eventsService.getEventById(route.params.eventId)
      } catch (error) {
        Pop.error(error.message)
        logger.error(error)
      }
    }


    async function getTicketHolders() {
      try {
        await ticketsService.getTicketHolders(route.params.eventId)
      } catch (error) {
        Pop.error(error.message)
        logger.error(error)
      }
    }

    async function getCommentsByEventId() {
      try {
        await commentsService.getCommentsByEventId(route.params.eventId)
      } catch (error) {
        Pop.error(error.message)
        logger.error(error)
      }
    }

    async function createComment() {
      try {
        editable.value.eventId = route.params.eventId
        await commentsService.createComment(editable.value)
        editable.value = {}
        Pop.toast('Comment was posted')
      } catch (error) {
        Pop.error(error.message)
        logger.error(error)

      }
    }



    return {

      editable,
      createComment,
      myAccount: computed(() => AppState.account),
      event: computed(() => AppState.activeEvent),
      comments: computed(() => AppState.comments),
      ticketHolders: computed(() => AppState.ticketHolders),
      isAttending: computed(() => AppState.ticketHolders.find(i => i.accountId == AppState.account.id)),

      async cancelEvent(eventId) {
        try {
          if (await Pop.confirm('cancel event?')) {

            await eventsService.cancelEvent(eventId)
          }
        } catch (error) {
          Pop.error(error.message)
          logger.log(error)
        }
      },

      async getTicket() {
        try {
          await ticketsService.getTicket({ eventId: route.params.eventId })
        } catch (error) {
          Pop.error(error.message)
          logger.error.error
        }
      },

      async deleteComment(id) {
        try {
          if (await Pop.confirm('delete comment?')) {

            await commentsService.deleteComment(id)
          }
        } catch (error) {
          Pop.error(error.message)
          logger.log(error.message)
        }
      }

    }
  }
};
</script>


<style lang="scss" scoped>
.poster-img {
  height: 45vh;
  width: 100%;
  border: 2px solid;
}

.comment-img {
  width: 60px;
  height: 60px;
}

.smaller-img {
  height: 35px;
  width: 35px;
}
</style>
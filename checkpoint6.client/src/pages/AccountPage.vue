<template>
  <div class="container-fluid">
    <section class="row">
      <h1 class="text-center">My Events</h1>
      <div class="col-12 d-flex text-center">



        <div v-if="myEvents" class="d-flex">
          <div v-for="myEvent in myEvents" class="">

            <div v-if="!myEvent.isCanceled" class="card col-6 bg-dark p-2">
              <h2 class="text-success">
                {{ myEvent.name }}
              </h2>
              <!-- <router-link :to="{ name: 'Event', params: { eventId: event.id } }"> -->

              <img :src="myEvent.coverImg" alt="" class="event-img img-fluid">
              <!-- </router-link> -->
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="row">
      <div class="col-12  ">
        <section class="  row justify-content-center ">
          <h1 class="">My Tickets</h1>

          <div v-for="t in tickets" class="col-12 m-3 card bg-dark text-light d-flex  ">

            <div class="d-flex align-items-center mt-2 ">
              <!-- <router-link :to="{ name: 'Event', params: { eventId: event.id } }"> -->
              <div>

                <h3 class="p-2">{{ t.event.name }}</h3>
                <img :src="t.event.coverImg" alt="" class="ticket-img ">
              </div>
              <!-- </router-link> -->
              <h3 class="p-2">
                <h3 class="text-warning">Where: </h3>{{ t.event.location }}
              </h3>

              <h3 class="p-2">
                <h3 class="text-warning">When: </h3>{{ new Date(t.event.startDate).toLocaleString() }}
              </h3>

            </div>
            <div class="d-flex justify-content-end">
              <button @click="deleteTickets(t.id)" class="btn btn-danger mb-2 mdi mdi-delete">return tickets</button>
            </div>
          </div>
        </section>
      </div>
    </section>
  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import EventCard from "../components/EventCard.vue";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { ticketsService } from "../services/TicketsService";
import { useRouter } from "vue-router";
export default {
  setup() {
    // router = useRouter
    onMounted(() => {
    })



    return {
      account: computed(() => AppState.account),
      events: computed(() => AppState.events),
      tickets: computed(() => AppState.myTickets),
      myEvents: computed(() => AppState.events.filter(e => e.creatorId == AppState.account.id)),

      async deleteTickets(ticketId) {
        try {
          await Pop.confirm('you want to get rid of these tickets?')
          await ticketsService.deleteTickets(ticketId)
          Pop.toast('deleted tickets', "success")
        } catch (error) {
          logger.error(error.message)
          Pop.error(error)
        }
      }




    };
  },

};
</script>


<style lang="scss" scoped>
.ticket-img {
  height: 200px;
  width: 200px;
}

.event-img {
  height: 200px;
  width: 100%;
  object-fit: cover;
}
</style>
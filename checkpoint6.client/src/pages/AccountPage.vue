<template>
  <div class="container-fluid">
    <section>

      <div v-if="event">
        <h2>
          hello
          {{ event.name }}
        </h2>
      </div>
    </section>

    <section class="row">
      <div class="col-10  ">
        <section class="  row justify-content-center">

          <div v-for="t in tickets" class="col-12 m-3 card bg-dark text-light d-flex ">

            <div class="d-flex align-items-center ">
              <img :src="t.event.coverImg" alt="" class="ticket-img ">
              <h3 class="p-2">{{ t.event.name }}</h3>
              <h3 class="p-2">
                <h3 class="text-warning">Where: </h3>{{ t.event.location }}
              </h3>

              <h3 class="p-2">
                <h3 class="text-warning">When: </h3>{{ new Date(t.event.startDate).toLocaleString() }}
              </h3>

            </div>
            <div class="d-flex justify-content-end">
              <button @click="deleteTickets()" class="btn btn-danger mb-2 mdi mdi-delete">return tickets</button>
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
export default {
  setup() {
    onMounted(() => {
    })



    return {
      account: computed(() => AppState.account),
      events: computed(() => AppState.events),
      tickets: computed(() => AppState.myTickets),
      event: computed(() => AppState.events.find(e => e.creatorId == AppState.account.id)),

      async deleteTickets() {
        try {
          await ticketsService.deleteTickets(ticketId)
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
  height: 120px;
  width: 200px;
}
</style>
<template>
  <div class="container-fluid p-0 ">

    <section class="row big-img m-0  ">
      <div class="text-center ">

        <h2 class="fw-bold">Welcom To Tower</h2>
        <h3>The Best In Events</h3>
      </div>
    </section>





    <section class="row">
      <div class="col-12 bg-warning elevation-5 p-3 d-flex justify-content-around">
        <button @click="filterBy = ''" class="btn btn-info">All</button>
        <button @click="filterBy = 'concert'" class="btn btn-info">Concert</button>
        <button @click="filterBy = 'convention'" class="btn btn-info">Convention</button>
        <button @click="filterBy = 'sport'" class="btn btn-info">Sport</button>
        <button @click="filterBy = 'digital'" class="btn btn-info">Digital</button>


      </div>
    </section>
    <section class="row bg-dark ">
      <div v-for="e in event" class="col-md-3  p-3">
        <EventCard :event="e" />
      </div>
    </section>
  </div>
</template>




<script>
import { AppState } from "../AppState";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { eventsService } from "../services/EventsService.js";
import { onMounted, computed, ref } from "vue";
import EventCard from "../components/EventCard.vue";

export default {
  setup() {
    const filterBy = ref("");
    onMounted(() => {
      getAllEvents();
    });
    async function getAllEvents() {
      try {
        await eventsService.getAllEvents();
      }
      catch (error) {
        Pop.error(error.message);
        logger.error(error);
      }
    }
    return {
      filterBy,
      event: computed(() => {
        if (filterBy.value == "") {
          return AppState.events;
        } else {
          return AppState.events.filter(e => e.type == filterBy.value);
        }
      })
    };
  },
  components: { EventCard }
}
</script>

<style scoped lang="scss">
.big-img {
  background-image: url('https://twistedsifter.com/wp-content/uploads/2017/01/abandoned-cooling-towers-by-reginald-van-de-velde-2.jpg');
  width: 100%;
  height: 20vh;
  border: 5px solid black;
}

.elevation-7 {
  box-shadow: 7pt 7pt rgb(228, 220, 220);
}
</style>

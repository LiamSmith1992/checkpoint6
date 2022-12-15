<template>
  <div class="container-fluid">
    <section class="row">
      <div v-for="e in event" class="col-md-3 elevation-7 p-3">
        <div>
          <img :src="e.coverImg" alt="" class="img-fluid cover-img rounded">
          {{ e.name }}
        </div>
      </div>
    </section>






  </div>
</template>




<script>
import { AppState } from "../AppState";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { eventsService } from "../services/EventsService.js";
import { onMounted, computed } from "vue";

export default {
  setup() {
    onMounted(() => {
      getAllEvents()
    })




    async function getAllEvents() {
      try {
        await eventsService.getAllEvents()
      } catch (error) {
        Pop.error(error.message)
        logger.error(error)
      }
    }





    return {
      event: computed(() => AppState.events)
    }
  }
}
</script>

<style scoped lang="scss">
.cover-img {

  object-fit: cover;
  height: 30vh;
  width: 100%;
}

.elevation-7 {
  box-shadow: 7pt 7pt rgb(228, 220, 220);
}
</style>

<template>
  <form @submit.prevent="createEvent()" class="p-3">
    <div class="form-group">
      <label for="exampleFormControlInput1">Event Name</label>
      <input v-model="editable.name" type="text" class="form-control" id="exampleFormControlInput1"
        placeholder="What is the name of your event">
    </div>
    <div class="form-group">
      <label for="exampleFormControlInput1">Event Picture</label>
      <input v-model="editable.coverImg" type="imgUrl" class="form-control" id="exampleFormControlInput1"
        placeholder="Picture for event">
    </div>
    <div class="form-group">
      <label for="exampleFormControlInput1">Where is this event happening?</label>
      <input v-model="editable.location" type="text" class="form-control" id="exampleFormControlInput1"
        placeholder="location">
    </div>
    <div class="form-group">
      <label for="exampleFormControlInput1">How many people can attend this event?</label>
      <input v-model="editable.capacity" type="number" class="form-control" id="exampleFormControlInput1"
        placeholder="capacity">
    </div>
    <div class="form-group">
      <label for="exampleFormControlInput1">When is this event happening?</label>
      <input v-model="editable.startDate" type="date" class="form-control" id="exampleFormControlInput1"
        placeholder="date">
    </div>
    <div class="form-group">
      <label for="exampleFormControlSelect1">What type of event are you having?</label>
      <select v-model="editable.type" class="form-control" id="exampleFormControlSelect1">
        <option>concert</option>
        <option>convention</option>
        <option>sport</option>
        <option>digital</option>
      </select>
    </div>
    <div class="form-group">
      <label for="exampleFormControlTextarea1">Describe your event.</label>
      <textarea v-model="editable.description" class="form-control" id="exampleFormControlTextarea1"
        rows="3"></textarea>
    </div>
    <button class="btn btn-success">Create</button>
  </form>


</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted, ref } from 'vue';
import { useRouter } from "vue-router";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { eventsService } from "../services/EventsService";
export default {
  setup() {
    const editable = ref({})
    const router = useRouter()





    return {
      editable,
      async createEvent() {
        try {
          const event = await eventsService.createEvent(editable.value)
          editable.value = {}
          router.push({ name: 'Event', params: { eventId: event.id } })
        } catch (error) {
          logger.error(error)
          Pop.error(error.message)
        }
      }
    }
  }
};
</script>


<style lang="scss" scoped>

</style>
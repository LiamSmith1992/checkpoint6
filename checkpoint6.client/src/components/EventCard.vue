<template>
  <router-link :to="{ name: 'Event', params: { eventId: event.id } }">
    <div class="card">
      <div v-if="event.isCanceled" class="bg-danger ">Canceled 😭</div>
      <div class="text-danger" v-if="event.capacity == 0">Sold Out</div>
      <img :src="event.coverImg" alt="" class="img-fluid cover-img rounded">
      <h4 class="text-center">
        {{ event.name }}
      </h4>
    </div>
  </router-link>
</template>


<script>




export default {
  props: { event: { type: Object, required: true } },
  setup() {
    return {}
  }
};
</script>


<style lang="scss" scoped>
.cover-img {

  object-fit: cover;
  height: 30vh;
  width: 100%;
}
</style>
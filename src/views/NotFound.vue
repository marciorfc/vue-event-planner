<template>
  <div>
    <h1>Oops!</h1>
    <h3>
      The
      <template v-if="resource">{{ resource }}</template>
      page you're looking for is not here
    </h3>
    <router-link :to="{ name: 'event-list' }">Back to he home page</router-link>
  </div>
</template>
<script>
export default {
  props: {
    resource: {
      type: String,
      required: true
    }
  }
}
</script>

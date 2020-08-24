<template>
  <div>
    <h1>Create Event, {{ user.name }}</h1>
    <p>This event was created by {{ user.id }}</p>
    <form @submit.prevent="createEvent">
      <BaseSelect label="Select a category" v-model="event.category" :options="categories"></BaseSelect>
      <h3>Name & describe your event</h3>
      <BaseInput v-model="event.title" type="text" placeholder="Add an event title" class="field" />

      <BaseInput
        v-model="event.description"
        type="text"
        placeholder="Add an event description"
        class="field"
      />

      <h3>Where is your event?</h3>

      <BaseInput
        v-model="event.location"
        type="text"
        placeholder="Add an event location"
        class="field"
      />

      <h3>When is your event?</h3>
      <div class="field">
        <label>Date</label>
        <datepicker v-model="event.date" placeholder="Select a date" />
      </div>
      <BaseSelect label="Select a time" v-model="event.time" :options="times" class="field"></BaseSelect>
      <input type="submit" class="button -fill-gradient" value="Submit" />
    </form>
  </div>
</template>
<script>
import Datepicker from 'vuejs-datepicker'
import { mapState, mapGetters } from 'vuex'
import NProgress from 'nprogress'

export default {
  components: {
    Datepicker
  },
  data() {
    const times = []
    for (let i = 1; i <= 24; i++) {
      times.push(i + ':00')
    }
    return {
      event: this.createFreshEvent(),
      times
    }
  },
  computed: {
    ...mapState({
      user: state => state.user.user,
      categories: 'categories'
    }),
    ...mapGetters('event', ['getEventById']),
    catLength() {
      //return this.$store.state.categories.length
      return this.$store.getters.categoryLength
    },
    getEvent() {
      return this.$store.getters['event/getEventById']
    }
  },
  methods: {
    createEvent() {
      NProgress.start()
      this.$store
        .dispatch('event/createEvent', this.event)
        .then(() => {
          this.$router.push({
            name: 'event-show',
            params: { id: this.event.id }
          })
          this.event = this.createFreshEvent()
        })
        .catch(() => {
          console.log('There was a problem creating your event.')
          NProgress.done()
        })
    },
    createFreshEvent() {
      const id = Math.floor(Math.random() * 1000)
      return {
        id: id,
        user: this.user,
        category: '',
        organizer: this.user,
        title: '',
        description: '',
        location: '',
        date: '',
        time: '',
        attendees: []
      }
    }
  }
}
</script>
<style scoped>
.field {
  margin-bottom: 24px;
}
</style>

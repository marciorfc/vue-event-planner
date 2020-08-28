<template>
  <div>
    <h1>Create Event, {{ user.name }}</h1>
    <p>This event was created by {{ user.id }}</p>
    <form @submit.prevent="createEvent">
      <BaseSelect
        label="Select a category"
        v-model="event.category"
        :options="categories"
        :class="{ error: $v.event.category.$error }"
        @blur="$v.event.category.$touch()"
      ></BaseSelect>
      <template v-if="$v.event.category.$error">
        <p v-if="!$v.event.category.required" class="errorMessage">
          Category is required.
        </p>
      </template>
      <h3>Name & describe your event</h3>
      <BaseInput
        label="Title"
        v-model.trim="event.title"
        type="text"
        placeholder="Add an event title"
        class="field"
        @blur="$v.event.title.$touch()"
        :class="{ error: $v.event.title.$error }"
      />
      <template v-if="$v.event.title.$error">
        <p v-if="!$v.event.title.required" class="errorMessage">
          Title is required.
        </p>
      </template>

      <BaseInput
        label="Description"
        v-model.trim="event.description"
        type="text"
        placeholder="Add an event description"
        class="field"
        :class="{ error: $v.event.description.$error }"
        @blur="$v.event.description.$touch()"
      />
      <template v-if="$v.event.description.$error">
        <p v-if="!$v.event.description.required" class="errorMessage">
          description is required.
        </p>
      </template>

      <h3>Where is your event?</h3>

      <BaseInput
        label="Location"
        v-model.trim="event.location"
        type="text"
        placeholder="Add an event location"
        class="field"
        :class="{ error: $v.event.location.$error }"
        @blur="$v.event.location.$touch()"
      />
      <template v-if="$v.event.location.$error">
        <p v-if="!$v.event.location.required" class="errorMessage">
          Location is required.
        </p>
      </template>

      <h3>When is your event?</h3>
      <div class="field">
        <label>Date</label>
        <datepicker
          v-model="event.date"
          placeholder="Select a date"
          @opened="print"
          :input-class="{ error: $v.event.date.$error }"
        />
      </div>
      <template v-if="$v.event.date.$error">
        <p v-if="!$v.event.date.required" class="errorMessage">
          Date is required.
        </p>
      </template>
      <BaseSelect
        label="Select a time"
        v-model="event.time"
        :options="times"
        class="field"
        :class="{ error: $v.event.time.$error }"
        @blur="$v.event.time.$touch()"
      ></BaseSelect>
      <template v-if="$v.event.time.$error">
        <p v-if="!$v.event.time.required" class="errorMessage">
          Time is required.
        </p>
      </template>
      <!-- <input type="submit" class="button -fill-gradient" value="Submit" /> -->
      <BaseButton
        type="submit"
        buttonClass="-fill-gradient"
        :disabled="$v.$anyError"
        >Submit</BaseButton
      >

      <p v-if="$v.$anyError" class="errorMessage">
        Please fill out the required field(s)
      </p>
    </form>
  </div>
</template>
<script>
import Datepicker from 'vuejs-datepicker'
import { mapState, mapGetters } from 'vuex'
import NProgress from 'nprogress'
import { required } from 'vuelidate/lib/validators'

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
  validations: {
    event: {
      category: { required },
      title: { required },
      description: { required },
      location: { required },
      date: { required },
      time: { required }
    }
  },
  methods: {
    createEvent() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        return
      }
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
    },
    print() {
      console.log('opened called')
    }
  }
}
</script>
<style scoped>
.field {
  margin-bottom: 24px;
}
</style>

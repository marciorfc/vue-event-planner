<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <select :value="value" v-bind="$attrs" @change="updateValue" v-on="$listeners">
      <option
        v-for="option in options"
        :key="option"
        :selected="option === value"
        :value="option"
      >{{ option }}</option>
    </select>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    label: {
      type: String,
      default: ''
    },
    value: [String, Number],
    options: {
      type: Array,
      required: true
    }
  },
  methods: {
    updateValue(event) {
      this.$emit('input', event.target.value)
    }
  }
}
</script>

<style lang="scss" scoped></style>

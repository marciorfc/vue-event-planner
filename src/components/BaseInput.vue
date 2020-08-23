<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <input :id="label" :value="value" v-bind="$attrs" @input="updateValue" />
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
    value: [String, Number]
  },
  methods: {
    updateValue(event) {
      this.$emit('input', event.target.value)
    }
  }
}
</script>

<style lang="scss" scoped></style>

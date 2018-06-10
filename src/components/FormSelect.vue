<template>
  <div class="form-group">
    <label class='mb-0' :v-if="label" :for="'exampleInput' + label">{{label}}</label>
    <small :v-if="help" :id="name + 'Help'" class="mb-2 form-text text-muted">{{ help }}</small>
    <select ref="select" v-on:input="updateValue($event.target.value)" class="form-control" :id="'exampleInput' + label" :aria-describedby="name + 'Help'">
      <option v-for="opt in options" :value="opt.value">
        {{ opt.label }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'FormSelect',
  props: [ 'name', 'label', 'multiple', 'help', 'options' ],
  methods: {
    // Propagates the input event
    updateValue (value) {
      // TODO - handle different types of inputs
      // If the value was not already normalized,
      // manually override it to conform
      this.$refs.select.value = value
      // Emit the number value through the input event
      // TODO - handle Number input
      this.$emit('input', value)
    }
  }
}
</script>

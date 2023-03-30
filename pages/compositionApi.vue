<template>
  <div>
    {{ arrayProperty }}
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'

export default defineComponent({
  name: 'IndexWithArrayProps',
  props: {
    arrayProp: {
      type: Array as PropType<number[]>,
      default: []
    }
  },

  setup(props) {
    const arrayProperty = computed(() => props.arrayProp)

    return {
      arrayProperty
    }
  }
})
</script>

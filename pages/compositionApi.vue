<template>
  <div>
    {{ arrayProperty }}
  </div>
</template>

<script lang="ts">
import { defineComponent, useMeta, PropType, computed } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'IndexWithArrayProps',
  props: {
    arrayProp: {
      type: Array as PropType<number[]>,
      default: () => []
    }
  },

  setup (props) {
    useMeta({
      title: 'heyho',
      meta: [
        { name: 'robots', content: 'noindex', hid: 'abc' }
      ]
    })

    const arrayProperty = computed(() => props.arrayProp)

    return {
      arrayProperty
    }
  },

  head: {}
})
</script>

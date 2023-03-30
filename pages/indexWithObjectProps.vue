<template>
  <div>
    <button disabled></button>
    {{ arrayPropertyGetter }}
    {{ boolPropertyGetter }}
    {{ normalDataProperty }}
    {{ asyncDataProperty }}
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'IndexWithObjectProps.vue',
  props: {
    arrayProperty: {
      type: Array as PropType<number[]>,
      default: () => []
    },
    boolProperty: {
      type: Boolean,
      required: true
    },
  },
  asyncData (context) {
    return {
      asyncDataProperty: context.base
    }
  },
  data () {
    return {
      normalDataProperty: 123
    }
  },
  computed: {
    arrayPropertyGetter(): number[] {
      return this.arrayProperty
    },
    boolPropertyGetter(): boolean {
      return this.boolProperty
    },
    dataProperty (): number {
      return this.normalDataProperty
    },
    asyncProperty (): string {
      return this.asyncDataProperty
    }
  }
})
</script>

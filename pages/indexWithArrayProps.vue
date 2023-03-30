<template>
  <div>
    {{ boolProperty }}
    {{ normalDataProperty }}
    {{ asyncDataProperty }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'IndexWithArrayProps',
  props: ['boolProp'],
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
    asyncProperty (): string {
      return this.asyncDataProperty
    },
    dataProperty (): number {
      return this.normalDataProperty
    },
    boolProperty(): boolean {
      // Typed as "any"
      return this.boolProp
    }
  }
})
</script>

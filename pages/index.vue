<template>
  <div>
    <HeaderTest />
    <options :array-prop="[1]" />
    index
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'IndexPage',
  asyncData (/* context */) {
    return {
      asyncDataProperty: 'abc'
    }
  },
  data () {
    return {
      normalDataProperty: 123
    }
  },
  head () {
    return {
      title: 'test'
    }
  },
  created () {
    // console.info(this.asyncDataProperty)
    // console.info(this.normalDataProperty)
  }
})
</script>

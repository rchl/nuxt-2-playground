<template>
  <div>
    Foo
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'IndexPage',
  asyncData () {
    return {
      asyncDataProperty: 'abc'
    }
  },
  data () {
    return {
      normalDataProperty: 123
    }
  },
  created () {
    console.info(this.asyncDataProperty)
  }
})
</script>

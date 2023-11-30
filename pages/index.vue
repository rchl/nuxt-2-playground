<template>
    <div>
        <header-test :something="1" not-existant />
        <span key="x">xx</span>
        <options :array-prop="[1]" />
        <nuxt-link id="123" to="/indexJs">indexJs</nuxt-link>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'IndexPage',
    asyncData(/* context */) {
        return {
            asyncDataProperty: 'abc',
        }
    },
    data() {
        return {
            normalDataProperty: 123,
        }
    },
    head() {
        return {
            title: 'test',
        }
    },
    created() {
        // console.info(this.asyncDataProperty)
        // console.info(this.normalDataProperty)
    },
})
</script>

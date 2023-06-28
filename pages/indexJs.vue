<template>
    <div>
        <nuxt-link to="/indexWithArrayProps">indexWithArrayProps</nuxt-link>
        {{ asyncDataProperty }}
    </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'IndexPage',
    asyncData() {
        return {
            asyncDataProperty: 'abc',
        }
    },
    data() {
        return {
            normalDataProperty: 123,
        }
    },
    created() {
        // console.info(this.asyncDataProperty)
        // console.info(this.normalDataProperty)
    },
})
</script>

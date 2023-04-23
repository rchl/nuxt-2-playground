<template>
    <div>
        {{ asyncDataProperty }}
    </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'IndexPage',
    asyncData(context) {
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
        console.info(this.asyncDataProperty)
        console.info(this.normalDataProperty)
    },
})
</script>

<template>
    <div>
        <header-test key="abc" :something="1" />
        <span key="x">xx</span>
        <options :array-prop="[1]" />
        <nuxt-link to="/indexJs">indexJs</nuxt-link>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HeaderTest from '~/components/HeaderTest.vue'

export default defineComponent({
    name: 'IndexPage',
    components: {
        HeaderTest,
    },
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

<template>
    <div>
        <header-test key="abc" />
        Foo
        {{ normalDataProperty }}
    </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'IndexPage',
    asyncData(/* { $axios } */) {
        // const response = await $axios.get('http://tidal.com')
        // console.info(response.data)

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
    },
})
</script>

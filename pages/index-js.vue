<template>
    <div>
        Foo
        {{ normalDataProperty }}
    </div>
</template>

<script>
export default {
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
}
</script>

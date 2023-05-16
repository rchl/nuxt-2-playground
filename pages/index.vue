<template>
    <div>
        <header-test key="abc" />
        <span key="x">xx</span>
        <options :array-prop="[1]" />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HeaderTest from '~/components/HeaderTest.vue'

const CUSTOM_OBJ: MyCustomType = {
    foo: 'string',
    bar: null,
};

console.info(CUSTOM_OBJ)

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

<template>
    <div>
        {{ arrayProp }}
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
    name: 'IndexPage',
    props: {
        arrayProp: {
            type: Array as PropType<number[]>,
            default: () => [],
        },
    },
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
    computed: {
        arrayProperty(): number[] {
            return this.arrayProp
        },
    },
    created() {
        // console.info(this.asyncDataProperty)
        console.info(this.normalDataProperty)
    },
})
</script>

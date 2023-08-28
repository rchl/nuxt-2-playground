<template>
    <div></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        loading: {
            type: Boolean,
            default: false,
        },
    },
    emits: ['close'],
});
</script>

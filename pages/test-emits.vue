<template>
    <div>
        <emits @close="closed = true" />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    data() {
        return {
            closed: false,
        }
    },
})
</script>

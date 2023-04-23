<template>
    <div>
        <nuxt-link v-for="page in data.pages" :key="page.title" :to="page.to">
            {{ page.title }}
        </nuxt-link>
    </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
    props: {
        something: {
            type: Number,
            default: 1,
        },
    },
    setup() {
        return {
            data: {
                pages: [
                    { title: 'Title 1', to: 'To 1' },
                    { title: 'Title 2', to: 'To 2' },
                ],
            },
        }
    },
})
</script>

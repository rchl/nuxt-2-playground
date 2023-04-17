import { DefineComponent } from 'vue'
import { RouterLinkProps } from 'vue-router/types/router'

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    // NuxtLink: DefineComponent<RouterLinkProps>;
    // indexWithObjectProps: typeof import('pages/indexWithObjectProps.vue').default;
    // indexWithArrayProps: typeof import('pages/indexWithArrayProps.vue').default;
    // indexJs: typeof import('pages/indexJs.vue').default;
    // index: typeof import('pages/index.vue').default;
    // compositionApi: typeof import('pages/compositionApi.vue').default;
    // options: typeof import('components/options.vue').default;
    // HeaderTest: typeof import('./components/HeaderTest.vue').default;
    // LazyHeader: typeof import('components/Header.vue').default;
    // Lazyoptions: typeof import('components/options.vue').default;
    // LazycompositionApi: typeof import('pages/compositionApi.vue').default;
    // Lazyindex: typeof import('pages/index.vue').default;
    // LazyindexJs: typeof import('pages/indexJs.vue').default;
    // LazyindexWithArrayProps: typeof import('pages/indexWithArrayProps.vue').default;
    // LazyindexWithObjectProps: typeof import('pages/indexWithObjectProps.vue').default;
  }
}

import { Context } from '@nuxt/types'
import type { MetaInfo } from 'vue-meta'
import type { Data, HasDefined } from 'vue/types/common'
import type { ComponentOptionsMixin, ComputedOptions, ComponentOptionsBase, MethodOptions } from 'vue/types/v3-component-options'
import type { ComponentPropsOptions, ExtractDefaultPropTypes, ExtractPropTypes } from 'vue/types/v3-component-props'
import type { CreateComponentPublicInstance } from 'vue/types/v3-component-public-instance'
import type { DefineComponent } from 'vue/types/v3-define-component'
import type { EmitsOptions } from 'vue/types/v3-setup-context'

type DataDef<Data, Props, V> = Data | ((this: Readonly<Props> & V) => Data)
type Awaited<T> = T extends PromiseLike<infer U> ? Awaited<U> : T
type Merged<Data, AsyncData> = {
    [key in keyof Data | keyof AsyncData]: key extends keyof Data ? key extends keyof AsyncData ? NonNullable<Data[key]> | AsyncData[key] : Data[key] : key extends keyof AsyncData ? AsyncData[key] : never
}

// https://github.com/vuejs/vue/blob/dev/types/options.d.ts#L63-L66
type DefaultData<V> = object | ((this: V) => object)
type DefaultProps = Record<string, any>
type DefaultMethods<V> = { [key: string]: (this: V, ...args: any[]) => any }
type DefaultComputed = { [key: string]: any }
type DefaultAsyncData = ((context: Context) => Promise<object | void> | object | void)

declare module 'vue/types' {
    export interface ComponentCustomOptions {
        head?: MetaInfo | (() => MetaInfo);
    }

    /**
   * overload 1: object format with no props
   */
    export function defineComponent<
        RawBindings,
        D = {},
        C extends ComputedOptions = {},
        M extends MethodOptions = {},
        Mixin extends ComponentOptionsMixin = ComponentOptionsMixin,
        Extends extends ComponentOptionsMixin = ComponentOptionsMixin,
        Emits extends EmitsOptions = {},
        EmitsNames extends string = string,
        AsyncData extends DefaultAsyncData = DefaultAsyncData,
    >(
        options: { functional?: never } & ComponentOptionsWithoutPropsAndWithAsyncData<
        {},
        RawBindings,
        D,
        C,
        M,
        Mixin,
        Extends,
        Emits,
        EmitsNames,
        AsyncData
        >
    ): DefineComponent<
    {},
    RawBindings,
    Merged<D, Awaited<ReturnType<AsyncData>>>,
    C,
    M,
    Mixin,
    Extends,
    Emits
    >

    /**
   * overload 2: object format with array props declaration
   * props inferred as `{ [key in PropNames]?: any }`
   *
   * return type is for Vetur and TSX support
   */
    export function defineComponent<
        PropNames extends string,
        RawBindings = {},
        D = {},
        C extends ComputedOptions = {},
        M extends MethodOptions = {},
        Mixin extends ComponentOptionsMixin = ComponentOptionsMixin,
        Extends extends ComponentOptionsMixin = ComponentOptionsMixin,
        Emits extends EmitsOptions = {},
        EmitsNames extends string = string,
        PropsOptions extends ComponentPropsOptions = ComponentPropsOptions,
        AsyncData extends DefaultAsyncData = DefaultAsyncData,
    >(
        options: { functional?: never } & ComponentOptionsWithArrayPropsAndAsyncData<
        PropNames,
        RawBindings,
        D,
        C,
        M,
        Mixin,
        Extends,
        Emits,
        EmitsNames,
        Readonly<{ [key in PropNames]?: any }>,
        AsyncData
        >
    ): DefineComponent<
    Readonly<{ [key in PropNames]?: any }>,
    RawBindings,
    Merged<D, Awaited<ReturnType<AsyncData>>>,
    C,
    M,
    Mixin,
    Extends,
    Emits
    >

    /**
   * overload 3: object format with object props declaration
   *
   * see `ExtractPropTypes` in './componentProps.ts'
   */
    export function defineComponent<
        Props,
        RawBindings = {},
        D = {},
        C extends ComputedOptions = {},
        M extends MethodOptions = {},
        Mixin extends ComponentOptionsMixin = ComponentOptionsMixin,
        Extends extends ComponentOptionsMixin = ComponentOptionsMixin,
        Emits extends EmitsOptions = {},
        EmitsNames extends string = string,
        PropsOptions extends ComponentPropsOptions = ComponentPropsOptions,
        AsyncData extends DefaultAsyncData = DefaultAsyncData,
    >(
        options: HasDefined<Props> extends true
            ? { functional?: never } & ComponentOptionsWithPropsAndAsyncData<
            PropsOptions,
            RawBindings,
            D,
            C,
            M,
            Mixin,
            Extends,
            Emits,
            EmitsNames,
            Props,
            ExtractDefaultPropTypes<PropsOptions>,
            AsyncData
            >
            : { functional?: never } & ComponentOptionsWithPropsAndAsyncData<
            PropsOptions,
            RawBindings,
            D,
            C,
            M,
            Mixin,
            Extends,
            Emits,
            EmitsNames,
            ExtractPropTypes<PropsOptions>,
            AsyncData
            >
    ): DefineComponent<
    PropsOptions,
    RawBindings,
    Merged<D, Awaited<ReturnType<AsyncData>>>,
    C,
    M,
    Mixin,
    Extends,
    Emits
    >
}

export type ComponentOptionsWithPropsAndAsyncData<
    PropsOptions = ComponentPropsOptions,
    RawBindings = Data,
    D = Data,
    C extends ComputedOptions = {},
    M extends MethodOptions = {},
    Mixin extends ComponentOptionsMixin = ComponentOptionsMixin,
    Extends extends ComponentOptionsMixin = ComponentOptionsMixin,
    Emits extends EmitsOptions = {},
    EmitsNames extends string = string,
    Props = ExtractPropTypes<PropsOptions>,
    Defaults = ExtractDefaultPropTypes<PropsOptions>,
    AsyncData extends DefaultAsyncData = DefaultAsyncData,
> = ComponentOptionsBase<
Props,
RawBindings,
D,
C,
M,
Mixin,
Extends,
Emits,
EmitsNames,
Defaults
> & {
    props?: PropsOptions;
    asyncData: AsyncData;
} & ThisType<
CreateComponentPublicInstance<
Props,
RawBindings,
Merged<D, Awaited<ReturnType<AsyncData>>>,
C,
M,
Mixin,
Extends,
Emits
>
>

export type ComponentOptionsWithArrayPropsAndAsyncData<
    PropNames extends string = string,
    RawBindings = Data,
    D = Data,
    C extends ComputedOptions = {},
    M extends MethodOptions = {},
    Mixin extends ComponentOptionsMixin = ComponentOptionsMixin,
    Extends extends ComponentOptionsMixin = ComponentOptionsMixin,
    Emits extends EmitsOptions = {},
    EmitsNames extends string = string,
    Props = Readonly<{ [key in PropNames]?: any }>,
    AsyncData extends DefaultAsyncData = DefaultAsyncData,
> = ComponentOptionsBase<
Props,
RawBindings,
D,
C,
M,
Mixin,
Extends,
Emits,
EmitsNames,
{}
> & {
    props?: PropNames[];
    asyncData: AsyncData;
} & ThisType<
CreateComponentPublicInstance<
Props,
RawBindings,
Merged<D, Awaited<ReturnType<AsyncData>>>,
C,
M,
Mixin,
Extends,
Emits
>
>

export type ComponentOptionsWithoutPropsAndWithAsyncData<
    Props = {},
    RawBindings = Data,
    D = Data,
    C extends ComputedOptions = {},
    M extends MethodOptions = {},
    Mixin extends ComponentOptionsMixin = ComponentOptionsMixin,
    Extends extends ComponentOptionsMixin = ComponentOptionsMixin,
    Emits extends EmitsOptions = {},
    EmitsNames extends string = string,
    AsyncData extends DefaultAsyncData = DefaultAsyncData,
> = ComponentOptionsBase<
Props,
RawBindings,
D,
C,
M,
Mixin,
Extends,
Emits,
EmitsNames,
{}
> & {
    props?: undefined;
    asyncData: AsyncData;
} & ThisType<
CreateComponentPublicInstance<
Props,
RawBindings,
Merged<D, Awaited<ReturnType<AsyncData>>>,
C,
M,
Mixin,
Extends,
Emits
>
>

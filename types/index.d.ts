import './vue'

declare global {
    type MyCustomType = {
        foo: string;
        bar?: string;
    }
}

/// <reference types="svelte" />
/// <reference types="vite/client" />

declare namespace svelte.JSX {
    interface HTMLAttributes<T> {
        onfiledrop?: (e: any) => void,
        onclick_outside?: () => void
    }
}
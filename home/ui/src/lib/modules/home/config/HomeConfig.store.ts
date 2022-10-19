import { writable } from "svelte/store";
import type { HomeConfig } from "./models/HomeConfig.model";

const initialState: HomeConfig  = {
    bridgeState: "offline"
}

export const homeConfig = writable(initialState)

// Actions
export function fetchHomeConfig() {
    fetch("/api/config")
        .then(response => response.json())
        .then((config: HomeConfig) => homeConfig.set(config))
}
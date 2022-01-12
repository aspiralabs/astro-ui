// Generated with util/create-component.js
// Props for the Provider
export interface IAstroProvider {
    settings?: AstroConfig;
    children?: any;
}

// The Config a.k.a settings parameter
export interface AstroConfig {
    rounded: boolean;
}

// What is exposed to the app
export interface IAstroValue {
    AstroConfig?: AstroConfig;
}

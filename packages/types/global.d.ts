// Global definitions for developement
// ----------------------------------------------------------------------------
// tslint:disable interface-name

// Redux devtools extension
declare interface Window {
  devToolsExtension?(): (args?: any) => any
}

// Webpack extension

declare interface NodeModule {
  hot?: any
}

// tslint:disable-next-line:no-internal-module
declare namespace NodeJS {
  // tslint:disable-next-line:interface-name
  interface Global {
    document: any
    window: any
    navigator: any
  }
}

declare const __DEV__: boolean
declare const __PROD__: boolean
declare const __VERSION__: string
declare const __BUILD_DATE__: string
declare const __NODE_ENV__: string

declare interface IEnvGlobals {
  NODE_ENV?: string
  __DEV__?: boolean
  __PROD__?: boolean
  __VERSION__?: string
  __BUILD_DATE__?: string
  __TEST__?: boolean
  __COVERAGE__?: boolean
  __GITHASH__?: string
}

declare module 'react-native-config' {
  export interface NativeConfig {
    SERVER_GRAPHQL_APP_URL?: string;
  }
  export const SERVER_GRAPHQL_APP_URL: string;
  
  export const Config: NativeConfig
  export default Config
}
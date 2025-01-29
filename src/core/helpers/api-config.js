import { Platform } from 'react-native';

export const baseURL = Platform.select({
  ios: 'http://localhost:3000',
  android: 'http://192.168.1.63:3000'
});

import AsyncStorage from '@react-native-async-storage/async-storage';
import { JwtDto } from './auth';

const TOKEN_COOKIE = 'auth.token';
const ROLE = 'auth.role';
const ID = 'auth.uuid';

export async function createSessionCookies({ uuid, role, token }: JwtDto) {
  await AsyncStorage.setItem(ID, uuid);
  await AsyncStorage.setItem(ROLE, role);
  await AsyncStorage.setItem(TOKEN_COOKIE, token);
}

export async function getToken() {
  const res = await AsyncStorage.getItem(TOKEN_COOKIE);

  return res;
}
export async function getPatientId(): Promise<string> {
  const res = await AsyncStorage.getItem(ID);
  if (!res) throw Error('No patient id found');
  return res;
}
export async function removeSessionCokkies() {
  await AsyncStorage.removeItem(ID);
  await AsyncStorage.removeItem(ROLE);
  await AsyncStorage.removeItem(TOKEN_COOKIE);
}

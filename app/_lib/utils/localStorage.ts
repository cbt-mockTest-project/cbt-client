import { isServer } from './utils';

export class LocalStorage {
  get(key: string) {
    if (isServer()) return;
    const getItem = localStorage.getItem(key);
    return getItem !== null ? JSON.parse(getItem) : '';
  }
  set(key: string, value: any) {
    if (isServer()) return;
    localStorage.setItem(key, JSON.stringify(value));
  }
  remove(key: string) {
    if (isServer()) return;
    localStorage.removeItem(key);
  }
  clear() {
    if (isServer()) return;
    localStorage.clear();
  }
}

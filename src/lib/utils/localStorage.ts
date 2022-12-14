export class LocalStorage {
  get(key: string) {
    const getItem = localStorage.getItem(key);
    return getItem !== null ? JSON.parse(getItem) : '';
  }
  set(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }
  remove(key: string) {
    localStorage.removeItem(key);
  }
  clear() {
    localStorage.clear();
  }
}

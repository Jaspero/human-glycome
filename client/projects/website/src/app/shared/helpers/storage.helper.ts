/**
 * Service for interacting with local storage
 */
export class StorageHelper {
  constructor() {}

  /**
   * Adds a key to local storage
   */
  static set(name: string, value?: any): void {
    if (!value) {
      localStorage.removeItem(name);
    } else {
      if (typeof value !== 'string') {
        value = JSON.stringify(value);
      }

      localStorage.setItem(name, value);
    }
  }

  /**
   * Retrieves a key from local storage
   */
  static get(name: string): any {
    let item = localStorage.getItem(name);

    try {
      item = JSON.parse(item);
    } catch (err) {}

    return item;
  }

  /**
   * Updates a key in local storage. This method only checks an object one level deep.
   */
  static update(name: string, added: any): void {
    let current: any = localStorage.getItem(name);

    try {
      current = JSON.parse(current);
    } catch (err) {}

    if (!current) {
      current = {};
    }

    for (const key in added) {
      if (added.hasOwnProperty(key)) {
        current[key] = added[key];
      }
    }

    localStorage.setItem(name, JSON.stringify(current));
  }
}

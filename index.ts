import { PiniaPluginContext, Store } from 'pinia';
import 'pinia';
import { useStorage, get, set } from '@vueuse/core';
export interface StorageDeclaration {
  customStorageKey?: string;
  values: string[];
}

declare module 'pinia' {
  export interface DefineStoreOptionsBase<S, Store> {
    localStorage?: StorageDeclaration;
    sessionStorage?: StorageDeclaration;
  }
}

const handleStorage = (
  options: StorageDeclaration,
  store: Store,
  storageType: Storage
) => {
  options.values.forEach((option: string) => {
    let key = `${store.$id}-${option}`;
    if (options.customStorageKey !== undefined) {
      key = options.customStorageKey;
    }

    const storeValue = get(store.$state, option);
    const storageValue = useStorage(key, storeValue, storageType, {
      mergeDefaults: true,
    });

    set(store.$state, option, storageValue.value);
  });

  store.$subscribe(() => {
    options.values.forEach((option) => {
      let key = `${store.$id}-${option}`;
      if (options.customStorageKey !== undefined) {
        key = options.customStorageKey;
      }
      const storeValue = get(store.$state, option);
      const storageValue = useStorage(key, storeValue, storageType, {
        mergeDefaults: true,
      });

      storageValue.value = storeValue;
    });
  });
};

export function PiniaStoragePlugin({
  options,
  store,
}: PiniaPluginContext) {
  if (options.localStorage) {
    handleStorage(options.localStorage, store, localStorage);
  }
  if (options.sessionStorage) {
    handleStorage(options.sessionStorage, store, sessionStorage);
  }
}

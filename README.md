# PiniaStoragePlugin
Simple, 1 file, pinia plugin for local and session storage.

# Configuration

```import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import { PiniaStoragePlugin } from 'pinia-storage-plugin';

const pinia = createPinia();
pinia.use(PiniaStoragePlugin);
const app = createApp(App);

app.use(pinia);
app.mount('#app');
```

# Usage
```
import { defineStore } from 'pinia';

export const useStore = defineStore('root', {
  state: () => {
    return {
      countSessionStorage: 1,
      countLocalStorage: 2,
    };
  },
  localStorage: {
    customStorageKey: 'custom-storage-key',
    values: ['countLocalStorage'],
  },
  sessionStorage: {
    values: ['countSessionStorage'],
  },
});
```

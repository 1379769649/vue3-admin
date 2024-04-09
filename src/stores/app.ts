import { defineStore } from 'pinia';

export const useAppStore = defineStore('appStore', () => {
    const test = ref<number>(1);

    return {
        test
    }
})

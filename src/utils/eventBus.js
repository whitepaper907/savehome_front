import { ref } from 'vue';

export const eventBus = ref(null);

export const setEventBus = (bus) => {
  eventBus.value = bus;
};

const { createApp } = Vue

  createApp({
    data() {
      return {
        showModal: false,
        message: 'Hello Vue!'
      }
    },
    methods: {
        fnShowModal() {
            this.showModal = true;
        },

        fnCloseModal() {
            this.showModal = false;
        }
    }
  }).mount('#app');


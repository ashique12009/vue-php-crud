const { createApp } = Vue

  createApp({
    data() {
      return {
        showModal: false,
        showEditModal: false,
        showDeleteModal: false,
        message: 'Hello Vue!'
      }
    },
    methods: {
        fnShowModal() {
            this.showModal = true;
        },

        fnCloseModal() {
            this.showModal = false;
        },

        submitUser() {

            this.showModal = false;
        },
        
        fnShowEditModal() {
            this.showEditModal = true;
        },

        fnCloseEditModal() {
            this.showEditModal = false;
        },

        editUser() {

            this.showEditModal = false;
        },

        deleteUser() {

            this.showDeleteModal = false;
        },

        fnCloseDeleteModal() {
            this.showDeleteModal = false;
        }
    }
  }).mount('#app');


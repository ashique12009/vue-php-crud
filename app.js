const { createApp } = Vue;

const app = createApp({
    data() {
      return {
        showModal: false,
        showEditModal: false,
        showDeleteModal: false,
        errorMessage: '',
        successMessage: '',
        users: [],
      }
    },
    
    mounted() {
        this.getUsers();
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
        },

        getUsers() {
            axios.get('http://vue-php-crud.local/api.php?action=read')
            .then(function(response) {
                console.log('RES', response);
                app.users = response.data.users;
            });
        }
    }
  }).mount('#app');


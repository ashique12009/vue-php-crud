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
        newUser: {
          username: '',
          email: '',
          mobile: ''
        },
        selectedUserToEdit: {}
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
            let formData = app.toFormData(app.newUser);
            axios.post('http://vue-php-crud.local/api.php?action=create', formData)
            .then(function(response) {
                app.newUser = { username: '', email: '', mobile: '' };
                app.successMessage = response.data.message;
                app.getUsers();
            });

            this.showModal = false;
        },

        updateUser() {
            let formData = app.toFormData(app.selectedUserToEdit);
            axios.post('http://vue-php-crud.local/api.php?action=update', formData)
            .then(function(response) {
                app.selectedUserToEdit = {};
                app.successMessage = response.data.message;
                app.getUsers();
            });

            this.showEditModal = false;
        },

        deleteUser() {
            let formData = app.toFormData(app.selectedUserToEdit);
            axios.post('http://vue-php-crud.local/api.php?action=delete', formData)
            .then(function(response) {
                app.selectedUserToEdit = {};
                app.successMessage = response.data.message;
                app.getUsers();
            });

            this.showDeleteModal = false;
        },

        selectUserToEdit(user) {
            this.showEditModal = true;

            this.selectedUserToEdit = user;
        },

        selectUserToDelete(user) {
            this.showDeleteModal = true;

            this.selectedUserToEdit = user;
        },

        toFormData(obj) {
            const form_data = new FormData();
            for (let key in obj) {
                form_data.append(key, obj[key]);
            }

            return form_data;
        },

        clearMessage() {
            app.errorMessage = '';
            app.successMessage = '';
        },
        
        fnShowEditModal() {
            this.showEditModal = true;
        },

        fnCloseEditModal() {
            this.showEditModal = false;
        },

        fnCloseDeleteModal() {
            this.showDeleteModal = false;
        },

        getUsers() {
            axios.get('http://vue-php-crud.local/api.php?action=read')
            .then(function(response) {
                app.users = response.data.users;
            });
        }
    }
  }).mount('#app');


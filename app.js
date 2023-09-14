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
        }
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
                app.users = response.data.users;
            });
        }
    }
  }).mount('#app');


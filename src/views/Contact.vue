<template>
    <div>
      <h2>Contact Form</h2>
      <form @submit.prevent="submitForm">
        <div>
          <label for="name">Name:</label>
          <input type="text" id="name" v-model="form.name" required>
        </div>
        <div>
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="form.email" required>
        </div>
        <div>
          <label for="message">Message:</label>
          <textarea id="message" v-model="form.message" required></textarea>
        </div>
        <button type="submit">Submit</button>
      </form>
      <p v-if="status">{{ status }}</p>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        form: {
          name: '',
          email: '',
          message: ''
        },
        status: ''
      };
    },
    methods: {
      submitForm() {
        fetch('/api/send-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.form)
        })
          .then(response => {
            if (response.ok) {
              this.status = 'Email sent successfully.';
              this.clearForm();
            } else {
              this.status = 'Failed to send email. Please try again later.';
            }
          })
          .catch(error => {
            this.status = 'An error occurred. Please try again later.';
            console.error(error);
          });
      },
      clearForm() {
        this.form.name = '';
        this.form.email = '';
        this.form.message = '';
      }
    }
  };
  </script>
  
  <style scoped>
  form div {
    margin-bottom: 10px;
  }
  </style>
  
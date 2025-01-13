<script>
import UsersTable from '../components/UsersTable.vue';

export default {
  components: { 
    UsersTable
  },
  data() { 
    return {
      allUsers: [],
      newUser: {
        Username: '',
        Firstname: '',
        Lastname: '',
        Email: '',
        SecureLevel: 0,
        LevelKey: '',
      },
      userIdToEdit: null,
      userToEdit: {
        Username: '',
        Firstname: '',
        Lastname: '',
        Email: '',
        SecureLevel: 0,
        LevelKey: '',
      },
    };
  },
  async created() { 
    await this.fetchUsers(); // Fetch users when the component is created
  },
  methods: {
    // Fetch all users from the backend
    async fetchUsers() {
      try {
        const response = await fetch('http://localhost:8008/users'); // Send request to /users route
        if (!response.ok) throw new Error('Failed to fetch users');
        this.allUsers = await response.json(); // Set the fetched users to data
      } catch (error) {
        console.error(error);
      }
    },

    // Create a new user
    async createUser() {
      try {
        const response = await fetch('http://localhost:8008/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.newUser),
        });
        if (response.ok) {
          alert('User created successfully!');
          await this.fetchUsers(); // Refresh the users list
        } else {
          alert('Failed to create user');
        }
      } catch (error) {
        console.error(error);
        alert('An error occurred while creating the user');
      }
    },

    // Edit a user by ID
    async editUser() {
      if (this.userIdToEdit === null) {
        alert('Please provide a valid user ID to edit');
        return;
      }

      try {
        const response = await fetch(`http://localhost:8008/users/${this.userIdToEdit}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.userToEdit),
        });
        if (response.ok) {
          alert('User edited successfully!');
          await this.fetchUsers(); // Refresh the users list
        } else {
          alert('Failed to edit user');
        }
      } catch (error) {
        console.error(error);
        alert('An error occurred while editing the user');
      }
    },

    // Delete a user by ID
    async deleteUser(id) {
      try {
        const response = await fetch(`http://localhost:8008/users/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          alert('User deleted successfully!');
          await this.fetchUsers(); // Refresh the users list
        } else {
          alert('Failed to delete user');
        }
      } catch (error) {
        console.error(error);
        alert('An error occurred while deleting the user');
      }
    },
  },
};
</script>

<template>
  <main>
    <!-- Display Users Table -->
    <UsersTable :items="allUsers" />

    <!-- Form to create a new user -->
    <div>
      <h3>Create a New User</h3>
      <input v-model="newUser.Username" placeholder="Username" />
      <input v-model="newUser.Firstname" placeholder="Firstname" />
      <input v-model="newUser.Lastname" placeholder="Lastname" />
      <input v-model="newUser.Email" placeholder="Email" />
      <input v-model="newUser.SecureLevel" placeholder="Secure Level" />
      <input v-model="newUser.LevelKey" placeholder="Level Key" />
      <button @click="createUser">Create User</button>
    </div>

    <!-- Form to edit a user -->
    <div>
      <h3>Edit User</h3>
      <input v-model="userIdToEdit" placeholder="User ID to Edit" />
      <input v-model="userToEdit.Username" placeholder="New Username" />
      <input v-model="userToEdit.Firstname" placeholder="New Firstname" />
      <input v-model="userToEdit.Lastname" placeholder="New Lastname" />
      <input v-model="userToEdit.Email" placeholder="New Email" />
      <input v-model="userToEdit.SecureLevel" placeholder="New Secure Level" />
      <input v-model="userToEdit.LevelKey" placeholder="New Level Key" />
      <button @click="editUser">Edit User</button>
    </div>

    <!-- Button to delete a user -->
    <div>
      <h3>Delete User</h3>
      <input v-model="userIdToEdit" placeholder="User ID to Delete" />
      <button @click="deleteUser(userIdToEdit)">Delete User</button>
    </div>

    <!-- Button to refresh users list -->
    <div>
      <button @click="fetchUsers">Refresh Users List</button>
    </div>
  </main>
</template>

<style scoped>
/* Add styles as needed */
</style>

<script>
import axios from 'axios';

export default {
data() {
    return {
    userID: '',
    filmID: '',
    message: '',
    success: false,
    };
},
methods: {
    async assignFilm() {
    try {
        const response = await axios.post('http://localhost:8008/assignFilm', {
        userID: this.userID,
        filmID: this.filmID,
        });
        this.message = 'Film successfully assigned to user!';
        this.success = true;
    } catch (error) {
        console.error(error);
        this.message = error.response?.data?.error || 'Failed to assign film.';
        this.success = false;
    }
    },
},
};
</script>

<style scoped>
.success {
color: green;
}
.error {
color: red;
}
</style>

<template>
<div>
    <h1>Assign Film to User</h1>
    <form @submit.prevent="assignFilm">
    <div>
        <label for="userID">User ID:</label>
        <input v-model="userID" type="number" id="userID" required />
    </div>
    <div>
        <label for="filmID">Film ID:</label>
        <input v-model="filmID" type="number" id="filmID" required />
    </div>
    <button type="submit">Assign</button>
    </form>
    <p v-if="message" :class="{ success: success, error: !success }">{{ message }}</p>
</div>
</template>

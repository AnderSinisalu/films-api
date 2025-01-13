<script>
import FilmsTable from '@/components/FilmsTable.vue';

export default {
  components: {
    FilmsTable,
  },
  data() {
    return {
      allFilms: [],
      newFilm: {
        FilmTitle: '',
        ReleaseYear: '',
        FilmLength: '',
      },
      filmIdToEdit: null,
      filmToEdit: {
        FilmTitle: '',
        ReleaseYear: '',
        FilmLength: '',
      },
    };
  },
  async created() {
    await this.fetchFilms(); // Fetch films when the component is created
  },
  methods: {
    // Fetch all films from the backend
    async fetchFilms() {
      try {
        const response = await fetch('http://localhost:8008/films'); // Send request to /films route
        if (!response.ok) throw new Error('Failed to fetch films');
        this.allFilms = await response.json(); // Set the fetched films to data
      } catch (error) {
        console.error(error);
      }
    },

    // Create a new film
    async createFilm() {
      try {
        const response = await fetch('http://localhost:8008/films', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.newFilm),
        });
        if (response.ok) {
          alert('Film created successfully!');
          await this.fetchFilms(); // Refresh the films list
        } else {
          alert('Failed to create film');
        }
      } catch (error) {
        console.error(error);
        alert('An error occurred while creating the film');
      }
    },

    // Edit a film by ID
    async editFilm() {
      if (this.filmIdToEdit === null) {
        alert('Please provide a valid film ID to edit');
        return;
      }

      try {
        const response = await fetch(`http://localhost:8008/films/${this.filmIdToEdit}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.filmToEdit),
        });
        if (response.ok) {
          alert('Film edited successfully!');
          await this.fetchFilms(); // Refresh the films list
        } else {
          alert('Failed to edit film');
        }
      } catch (error) {
        console.error(error);
        alert('An error occurred while editing the film');
      }
    },

    // Delete a film by ID
    async deleteFilm(id) {
      try {
        const response = await fetch(`http://localhost:8008/films/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          alert('Film deleted successfully!');
          await this.fetchFilms(); // Refresh the films list
        } else {
          alert('Failed to delete film');
        }
      } catch (error) {
        console.error(error);
        alert('An error occurred while deleting the film');
      }
    },
  },
};
</script>

<template>
  <main>
    <!-- Display Films Table -->
    <FilmsTable :items="allFilms" />

    <!-- Form to create a new film -->
    <div>
      <h3>Create a New Film</h3>
      <input v-model="newFilm.FilmTitle" placeholder="Film Title" />
      <input v-model="newFilm.ReleaseYear" placeholder="Release Year" />
      <input v-model="newFilm.FilmLength" placeholder="Film Length" />
      <button @click="createFilm">Create Film</button>
    </div>

    <!-- Form to edit a film -->
    <div>
      <h3>Edit Film</h3>
      <input v-model="filmIdToEdit" placeholder="Film ID to Edit" />
      <input v-model="filmToEdit.FilmTitle" placeholder="New Film Title" />
      <input v-model="filmToEdit.ReleaseYear" placeholder="New Release Year" />
      <input v-model="filmToEdit.FilmLength" placeholder="New Film Length" />
      <button @click="editFilm">Edit Film</button>
    </div>

    <!-- Button to delete a film -->
    <div>
      <h3>Delete Film</h3>
      <input v-model="filmIdToEdit" placeholder="Film ID to Delete" />
      <button @click="deleteFilm(filmIdToEdit)">Delete Film</button>
    </div>

    <!-- Button to refresh films list -->
    <div>
      <button @click="fetchFilms">Refresh Films List</button>
    </div>
  </main>
</template>

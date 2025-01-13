<script>
export default {
    name: "FilmsTable",
    props: {
        items: Array
    }
}
</script>

<template>
    <table class="table table-striped">
        <thead class="table-dark">
            <tr>
                <th>FilmTitle</th>
                <th>FilmLength</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in items" :key="item.FilmID">
                <td>{{ item.FilmTitle }}</td>
                <td>{{ item.FilmLength }}</td>
            </tr>
        </tbody>
    </table>
</template>

<style scoped>
</style>
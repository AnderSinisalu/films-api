<script>
export default {
    name: ["FilmForm"],
    props: ['FilmID', 'FilmTitle', 'ReleaseYear', 'FilmLength'],
    emits: ['update:FilmTitle', 'update:ReleaseYear', 'update:FilmLength']
}
</script>
<template>
    <table class="table table-striped">

        <tr>
            <th>ID</th>
            <td>{{FilmID}}</td>
        </tr>

        <tr>
            <th>Film Title</th>
            <td><input :value="FilmTitle" @input="$emit('update:FilmTitle',$event.target.value)"></td>
        </tr>

        <tr>
            <th>Film release year</th>
            <td><input :value="ReleaseYear" @input="$emit('update:ReleaseYear',$event.target.value)"></td>
        </tr>

        <tr>
            <th>Total film length</th>
            <td>><input :value="FilmLength" @input="$emit('update:FilmLength',$event.target.value)"></td>
        </tr>

    </table>
</template>
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
            <td>{{GameID}}</td>
        </tr>

        <tr>
            <th>Game name</th>
            <td><input :value="GameName" @input="$emit('update:FilmTitle',$event.target.value)"></td>
        </tr>

        <tr>
            <th>European release date</th>
            <td><input :value="ReleaseDateEU" @input="$emit('update:ReleaseYear',$event.target.value)"></td>
        </tr>

        <tr>
            <th>Score of review at the time</th>
            <td>><input :value="ReviewScore" @input="$emit('update:FilmLength',$event.target.value)"></td>
        </tr>

    </table>
</template>
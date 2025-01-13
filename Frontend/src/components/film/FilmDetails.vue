<!-- FilmDetails.js refaktoreeritud vue kujule -->
<!-- refaktoreerige teised .js komponendid ümber .vue kujule selle eeskujul -->
<!-- nimelt, template tuleb eraldi välja html elemendiks, aga kõik muu, läheb skripti sisse -->


<script>
export default {
    name: ["FilmDetails"],
    props: ['filmInModal'],    
}
</script>

<template>
    <table class="table table-striped">

        <tr>
            <th>ID</th>
            <td>{{filmInModal.FilmID}}</td>
        </tr>

        <tr>
            <th>Film title</th>
            <td>{{filmInModal.FilmTitle}}</td>
        </tr>

        <tr>
            <th>Film release year</th>
            <td>{{filmInModal.ReleaseYear}}</td>
        </tr>

        <tr>
            <th>Film length</th>
            <td>{{filmInModal.FilmLength}}</td>
        </tr>

    </table>
</template>
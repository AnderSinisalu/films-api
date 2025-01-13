<script>
import confirmationModal from "./ConfirmationModal.js";
import FilmForm from "./FilmForm.js";
import FilmDetails from "./film/FilmDetails.js";
export default {
    
    components: {
        confirmationModal,
        FilmForm,
        FilmDetails
    },
    emits: ["filmUpdated"],
    props: {
        filmInModal: {}
    },
    data () {
        return {
            isEditing: false,
            modifiedFilm: {}
        }
    },
    methods: {
        startEditing() {
            this.modifiedFilm = { ...this.filmInModal}
            this.isEditing = true
        },
        cancelEditing() {
            this.isEditing = false
        },
        async saveModifiedFilm() {
            console.log("currently saving: ", this.modifiedFilm)
            const rawResponse = await fetch(this.API_URL + "/films/" + this.modifiedFilm.FilmID, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'   
                },
                body: JSON.stringify(this.modifiedFilm)
            });
            console.log(rawResponse);
            this.$emit("filmUpdated", this.modifiedFilm);
            this.isEditing = false
        },
        deleteFilm() {
            console.log("DELETE confirmed");
        }
    }
}
</script>


<template>
    <div id="filmInfoModal" class="modal" tabindex="-1">

        <div class="modal-dialog">

            <div class="modal-content">

                <div class="modal-header">

                    <h1 class="modal-title">Film Info</h1>

                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                    </button>

                </div>

                <div class="modal-body">

                    <film-form 
                    v-if="isEditing" 
                    v-model:id="modifiedFilm.id" 
                    v-model:FilmTitle="modifiedFilm.FilmTitle" 
                    v-model:ReleaseYear="modifiedFilm.ReleaseYear" 
                    v-model:FilmLength="modifiedFilm.FilmLength" >
                    </film-form>

                    <film-details v-else :filmInModal="filmInModal">
                    </film-details>

                </div>

                <div class="modal-footer">

                    <div class="container">

                        <div class="row">

                            <template v-if="isEditing">

                                <div class="col me-auto">

                                    <button type="button" 
                                    class="btn btn-danger" 
                                    data-bs-target="#confirmationModal" 
                                    data-bs-toggle="modal">
                                    Delete
                                    </button>

                                </div>

                                <div class="col-auto">

                                    <button type="button" 
                                    class="btn btn-success mx-2"
                                    @click="saveModifiedGame"
                                    >Save
                                    </button>

                                    <button type="button" 
                                    class="btn btn-success mx-2"
                                    @click="cancelEditing"
                                    >Cancel
                                    </button>

                                </div>

                            </template>

                            <template v-else>

                                <div class="col me-auto"></div>

                                <div class="col-auto">

                                    <button type="button" 
                                    class="btn btn-warning mx-2"
                                    @click="startEditing"
                                    >Save
                                    </button>

                                    <button type="button" 
                                    class="btn btn-secondary"
                                    data-bs-dismiss="modal"
                                    >Close ❌
                                    </button>

                                </div>

                            </template>

                        </div>

                    </div>

                </div>    

            </div>

        </div>

    </div>
    <confirmation-modal :target="'#filmInfoModal'" @confirmed="deleteFilm"></confirmation-modal>
</template>
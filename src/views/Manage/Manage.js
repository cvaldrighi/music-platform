import AppUpload from '@/components/Upload/Upload.vue';
import CompositionItem from '@/components/CompositionItem/CompositionItem.vue';
import { songsCollection, auth } from '@/includes/firebase';
export default {
    name: "manage",
    components: {
        AppUpload,
        CompositionItem
    },
    data() {
        return {
            songs: [],
            unsavedFlag: false,
        };
    },
    async created() {
        const snapshot = await songsCollection
            .where('uid', '==', auth.currentUser.uid)
            .get();

        snapshot.forEach(this.addSong);
    },
    methods: {
        updateSong(i, values) {
            this.songs[i].modified_name = values.modified_name;
            this.songs[i].genre = values.genre;
        },
        removeSong(i) {
            this.songs.splice(i, 1);
        },
        addSong(document) {
            const song = {
                ...document.data(),
                docID: document.id,
            };

            this.songs.push(song);
        },
        updateUnsavedFlag(value) {
            this.unsavedFlag = value;
        },
    },
    beforeRouteLeave(to, from, next) {
        if (!this.unsavedFlag) {
            next();
        } else {
            const leave = confirm('You have unsaved changes. Are you sure you want to leave?');
            next(leave);
        }
    }
}
import { songsCollection } from "@/includes/firebase";

export default {
    name: 'Song',
    data() {
        return {
            song: {},
        };
    },
    async created() {
        const docSnapshot = await songsCollection.doc(this.$route.params.id).get();
        if (!docSnapshot.exists) {
            this.$router.push({ name: 'home' });
            return;
        }
        this.song = docSnapshot.data();
    }
}
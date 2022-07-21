import { songsCollection } from "@/includes/firebase";
import AppSongItem from '@/components/SongItem/SongItem.vue';

export default {
    name: 'Home',
    components: {
        AppSongItem
    },
    data() {
        return {
            songs: [],
        }
    },
    async created() {
        const snapshots = await songsCollection.get();
        snapshots.forEach((document) => {
            this.songs.push({
                docID: document.id,
                ...document.data(),
            });
        })
    }
}
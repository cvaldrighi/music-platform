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
            maxPerPage: 3,
            pendingRequest: false,
        }
    },
    async created() {
        this.getSongs();
        window.addEventListener('scroll', this.handleScroll);
    },
    beforeUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    },
    methods: {
        async getSongs() {
            if (this.pendingRequest) {
                return;
            }

            this.pendingRequest = true;
            let snapshots;

            if (this.songs.length) {
                const lastDoc = await songsCollection.doc(this.songs[this.songs.length - 1].docID).get();
                snapshots = await songsCollection
                    .orderBy('modified_name')
                    .startAfter(lastDoc)
                    .limit(this.maxPerPage)
                    .get();
            } else {
                snapshots = await songsCollection
                    .orderBy('modified_name')
                    .limit(this.maxPerPage)
                    .get();
            }

            snapshots.forEach((document) => {
                this.songs.push({
                    docID: document.id,
                    ...document.data(),
                });
            });

            this.pendingRequest = false;
        },
        handleScroll() {
            const { scrollTop, offsetHeight } = document.documentElement;
            const { innerHeight } = window;
            const bottomOfWindow = Math.round(scrollTop) + innerHeight === offsetHeight;

            if (bottomOfWindow) {
                this.getSongs();
            }
        }
    }
}
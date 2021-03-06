import { mapActions, mapGetters, mapState } from "vuex";

export default {
    name: 'Player',
    computed: {
        ...mapGetters(['playing']),
        ...mapState(['seek', 'duration', 'playerProgress', 'currentSong']),
    },
    methods: {
        ...mapActions(['toggleAudio', 'updateSeek']),
    }
}
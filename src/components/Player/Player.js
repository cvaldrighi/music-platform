import { mapActions, mapGetters } from "vuex";

export default {
    name: 'Player',
    computed: {
        ...mapGetters(['playing'])
    },
    methods: {
        ...mapActions(['toggleAudio'])
    }
}
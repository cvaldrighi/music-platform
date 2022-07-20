import { mapMutations, mapState } from 'vuex';
export default {
    name: 'Header',
    computed: {
        ...mapState(['userLoggedIn'])
    },
    methods: {
        ...mapMutations(['toggleAuthModal']),
        signout() {
            this.$store.dispatch('signout');
            if (this.$route.meta.requiresAuth) {
                this.$router.push({ name: 'home' });
            }
        }
    },
};
import AppHeader from '../components/Header/Header.vue';
import AuthModal from '../components/Auth/Auth.vue';
import AppPlayer from '../components/Player/Player.vue';

export default {
    name: 'App',
    components: {
        AppHeader,
        AuthModal,
        AppPlayer
    },
    created() {
        this.$store.dispatch('init_login');
    }
};
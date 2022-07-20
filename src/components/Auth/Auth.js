import { mapMutations, mapState } from 'vuex';
import AppLoginForm from '../LoginForm/LoginForm.vue';
import AppRegisterForm from '../RegisterForm/RegisterForm.vue';

export default {
    name: 'Auth',
    data() {
        return {
            tab: 'login',
        }
    },
    components: {
        AppLoginForm, AppRegisterForm,
    },
    computed: {
        ...mapState(['authModalShow']),
    },
    methods: {
        ...mapMutations(['toggleAuthModal']),
    }
};
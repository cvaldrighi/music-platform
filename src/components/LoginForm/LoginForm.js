export default {
    name: 'LoginForm',
    data() {
        return {
            loginSchema: {
                email: 'required|email',
                password: 'required|min:3|max:32',
            },
            login_in_submission: false,
            login_show_alert: false,
            login_alert_variant: 'bg-blue-500',
            login_alert_msg: 'Please wait! We are logging you in.',
        };
    },
    methods: {
        async login(values) {
            this.login_in_submission = true;
            this.login_show_alert = true;
            this.login_alert_variant = 'bg-blue-500';
            this.login_alert_msg = 'Please wait! We are logging you in.';

            try {
                await this.$store.dispatch('login', values);
            } catch (error) {
                this.login_in_submission = false;
                this.login_alert_variant = 'bg-red-500';
                this.login_alert_msg = 'Invalid login data.';
                return;
            }

            this.login_alert_variant = 'bg-green-500';
            this.login_alert_msg = 'Success! You are logged in.';
            window.location.reload();
        },
    },
};
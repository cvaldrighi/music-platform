export default {
    name: 'RegisterForm',
    data() {
        return {
            schema: {
                name: 'required|min:3|max:100|alpha_spaces',
                email: 'required|min:3|max:100|email',
                age: 'required|min_value:18|max_value:100',
                password: 'required|min:3|max:100',
                confirm_password: 'passwords_mismatch:@password',
                country: 'required|country_excluded:Antarctica',
                tos: 'tos',
            },
            userData: {
                country: 'USA',
            },
            reg_in_submission: false,
            reg_show_alert: false,
            reg_alert_variant: 'bg-blue-500',
            reg_alert_msg: 'Please wait! Your account is being created.',
        }
    },
    methods: {
        async register(values) {
            this.reg_show_alert = true;
            this.reg_in_submission = true;
            this.reg_alert_variant = 'bg-blue-500';
            this.reg_alert_msg = 'Please wait! Your account is being created.';

            try {
                await this.$store.dispatch('register', values);
            } catch (error) {
                console.log(error);
                this.reg_in_submission = false;
                this.reg_alert_variant = 'bg-red-500';
                this.reg_alert_msg = 'An unexpected error ocurred. Please try again later.';
                return;
            }

            this.reg_alert_variant = 'bg-green-500';
            this.reg_alert_msg = 'Success! Your account has been created.';
            window.location.reload();
        },
    }
}
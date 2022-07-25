import { songsCollection, auth, commentsCollection } from "@/includes/firebase";
import { mapState } from "vuex";

export default {
    name: 'Song',
    data() {
        return {
            song: {},
            schema: {
                comment: 'required|min:3',
            },
            comment_in_submission: false,
            comment_show_alert: false,
            comment_alert_variant: 'bg-blue-500',
            comment_alert_message: 'Please wait! Your comment is being submitted',
            comments: [],
            sort: '1',
        };
    },
    computed: {
        ...mapState(['userLoggedIn']),
        sortedComments() {
            return this.comments.slice().sort((a, b) => {
                if (this.sort === '1') {
                    return new Date(b.datePosted) - new Date(a.datePosted);
                }

                return new Date(a.datePosted) - new Date(b.datePosted);
            });
        },
    },
    async created() {
        const docSnapshot = await songsCollection.doc(this.$route.params.id).get();
        if (!docSnapshot.exists) {
            this.$router.push({ name: 'home' });
            return;
        }

        const { sort } = this.$route.query;
        this.sort = sort === '1' || sort === '2' ? sort : '1';
        this.song = docSnapshot.data();
        this.getComments();
    },
    methods: {
        async addComment(values, { resetForm }) {
            this.comment_in_submission = true;
            this.comment_show_alert = true;
            this.comment_alert_variant = 'bg-blue-500';
            this.comment_alert_message = 'Please wait! Your comment is being submitted';

            const comment = {
                content: values.comment,
                datePosted: new Date().toString(),
                sid: this.$route.params.id,
                name: auth.currentUser.displayName,
                uid: auth.currentUser.uid,
            };

            await commentsCollection.add(comment);

            this.getComments();
            this.comment_in_submission = false;
            this.comment_alert_variant = 'bg-green-500';
            this.comment_alert_message = 'Comment added!';
            resetForm();
        },
        async getComments() {
            const snapshots = await commentsCollection.where('sid', '==', this.$route.params.id).get();
            this.comments = [];
            snapshots.forEach((doc) => [
                this.comments.push({
                    docID: doc.id,
                    ...doc.data(),
                }),
            ]);
        },
    },
    watch: {
        sort(newValue) {
            if (newValue === this.$route.query.sort) {
                return;
            }

            this.$router.push({
                query: {
                    sort: newValue,
                },
            });
        }
    }
}
import { songsCollection, storage } from "@/includes/firebase";

export default {
    name: 'CompositionItem',
    props: {
        song: {
            type: Object,
            required: true,
        },
        updateSong: {
            type: Function,
            required: true,
        },
        index: {
            type: Number,
            required: true,
        },
        removeSong: {
            type: Function,
            required: true,
        },
        updateUnsavedFlag: {
            type: Function,
        }
    },
    data() {
        return {
            showForm: false,
            schema: {
                modified_name: 'required',
                genre: 'alpha_spaces',
            },
            in_submission: false,
            show_alert: false,
            alert_variant: 'bg-blue-500',
            alert_message: 'Please wait! Updating song info.',
        };
    },
    methods: {
        async edit(values) {
            this.in_submission = true;
            this.show_alert = true;
            this.alert_variant = 'bg-blue-500';
            this.alert_message = 'Please wait! Updating song info.';

            try {
                await songsCollection.doc(this.song.docID).update(values);
            } catch (error) {
                this.in_submission = false;
                this.alert_variant = 'bg-red-500';
                this.alert_message = 'Something went wrong! Try again later';
                return;
            }

            this.updateSong(this.index, values);
            this.updateUnsaveFlag(false);

            this.in_submission = false;
            this.alert_variant = 'bg-green-500';
            this.alert_message = 'Success!';
        },
        async deleteSong() {
            const storageRef = storage.ref();
            const songRef = storageRef.child(`songs/${this.song.original_name}`);

            await songRef.delete();
            await songsCollection.doc(this.song.docID).delete();
            this.removeSong(this.index);
        }
    }
};
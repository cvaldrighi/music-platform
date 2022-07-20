import { storage } from '@/includes/firebase';
export default {
    name: 'Upload',
    data() {
        return {
            is_dragover: false,
        };
    },
    methods: {
        upload($event) {
            this.is_dragover = false;
            const files = [...$event.dataTransfer.files];

            files.forEach((file) => {
                if (file.type !== 'audio/mpeg') {
                    return;
                }

                const storageRef = storage.ref();
                const songsRef = storageRef.child(`songs/${file.name}`);
                songsRef.put(file);
            });
            console.log(files);
        }
    }
}
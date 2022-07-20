import { storage, auth, songsCollection } from '@/includes/firebase';
export default {
    name: 'Upload',
    data() {
        return {
            is_dragover: false,
            uploads: [],
        };
    },
    props: ['addSong'],
    methods: {
        upload($event) {
            this.is_dragover = false;
            const files = $event.dataTransfer ? [...$event.dataTransfer.files] : [...$event.target.files];

            files.forEach((file) => {
                if (file.type !== 'audio/mpeg') {
                    return;
                }

                const storageRef = storage.ref();
                const songsRef = storageRef.child(`songs/${file.name}`);
                const task = songsRef.put(file);

                const uploadIndex = this.uploads.push({
                    task,
                    current_progress: 0,
                    name: file.name,
                    variant: 'bg-blue-400',
                    icon: 'fas fa-spinner fa-spin',
                    text_class: '',
                }) - 1;

                task.on('state_changed', (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    this.uploads[uploadIndex].current_progress = progress;
                }, (error) => {
                    this.uploads[uploadIndex].variant = 'bg-red-400';
                    this.uploads[uploadIndex].icon = 'fas fa-times';
                    this.uploads[uploadIndex].text_class = 'text-red-400';
                    console.log(error);
                }, async () => {
                    const song = {
                        uid: auth.currentUser.uid,
                        display_name: auth.currentUser.displayName,
                        original_name: task.snapshot.ref.name,
                        modified_name: task.snapshot.ref.name,
                        genre: '',
                        comment_count: 0,
                    };

                    song.url = await task.snapshot.ref.getDownloadURL();
                    const songRef = await songsCollection.add(song);
                    const songSnapshot = await songRef.get();

                    this.addSong(songSnapshot);

                    this.uploads[uploadIndex].variant = 'bg-green-400';
                    this.uploads[uploadIndex].icon = 'fas fa-check';
                    this.uploads[uploadIndex].text_class = 'text-green-400';
                });
            });
            console.log(files);
        },
        cancelUploads() {
            this.uploads.forEach((upload) => {
                upload.task.cancel();
            })
        }
    },
    beforeUnmount() {
        this.uploads.forEach((upload) => {
            upload.task.cancel();
        })
    }
}
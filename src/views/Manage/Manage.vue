<template>
    <!-- Main Content -->
    <section class="container mx-auto mt-6">
        <div class="md:grid md:grid-cols-3 md:gap-4">
            <div class="col-span-1">
                <app-upload ref="upload" :addSong="addSong" />
            </div>
            <div class="col-span-2">
                <div class="bg-white rounded border border-gray-200 relative flex flex-col">
                    <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
                        <span class="card-title">My Songs</span>
                        <i class="fa fa-compact-disc float-right text-green-400 text-2xl"></i>
                    </div>
                    <div class="p-6">
                        <!-- Composition Items -->
                        <composition-item v-for="(song, i) in songs" :key="song.docID" :song="song"
                            :updateSong="updateSong" :index="i" :removeSong="removeSong"
                            :updateUnsavedFlag="updateUnsavedFlag" />
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script src="./Manage.js">
</script>
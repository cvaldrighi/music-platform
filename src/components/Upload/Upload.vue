<template>
    <div class="bg-white rounded border border-gray-200 relative flex flex-col">
        <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
            <span class="card-title">Upload</span>
            <i class="fas fa-upload float-right text-green-400 text-2xl"></i>
        </div>
        <div class="p-6">
            <!-- Upload Dropbox -->
            <div class="w-full px-10 py-20 rounded text-center cursor-pointer border border-dashed
                border-gray-400 text-gray-400 transition duration-500 hover:text-white
                hover:bg-green-400 hover:border-green-400 hover:border-solid"
                :class="{ 'bg-green-400 border-green-400 border-solid': is_dragover }" @drag.prevent.stop=""
                @dragstart.prevent.stop="" @dragend.prevent.stop="is_dragover = false"
                @dragover.prevent.stop="is_dragover = true" @dragenter.prevent.stop="is_dragover = true"
                @dragleave.prevent.stop="is_dragover = false" @drop.prevent.stop="upload($event)">
                <h5>Drop your files here</h5>
            </div>
            <input type="file" multiple @change="upload($event)" />
            <hr class="my-6" />
            <!-- Progess Bars -->
            <div class="mb-4" v-for="upload in uploads" :key="upload.name">
                <!-- File Name -->
                <div class="font-bold text-sm" :class="upload.text_class">
                    <i :class="upload.icon"></i>
                    {{ upload.name }}
                </div>
                <div class="flex h-4 overflow-hidden bg-gray-200 rounded">
                    <!-- Inner Progress Bar -->
                    <div class="transition-all progress-bar" :class="upload.variant"
                        :style="{ width: upload.current_progress + '%' }"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script src="./Upload.js">
</script>
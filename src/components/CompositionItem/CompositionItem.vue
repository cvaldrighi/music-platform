<template>
    <div class="border border-gray-200 p-3 mb-4 rounded">
        <div v-show="!showForm">
            <h4 class="inline-block text-2xl font-bold">{{ song.modified_name }}</h4>
            <button class="ml-1 py-1 px-2 text-sm rounded text-white bg-red-600 float-right"
                @click.prevent="deleteSong">
                <i class="fa fa-times"></i>
            </button>
            <button class="ml-1 py-1 px-2 text-sm rounded text-white bg-blue-600 float-right"
                @click.prevent="showForm = !showForm">
                <i class="fa fa-pencil-alt"></i>
            </button>
        </div>
        <div v-show="showForm">
            <vee-form :validation-schema="schema" :initial-values="song" @submit="edit">
                <div class="text-white text-center font-bold p-4 mb-4" v-if="show_alert" :class="alert_variant">
                    {{ alert_message }}
                </div>
                <div class="mb-3">
                    <label class="inline-block mb-2">Song Title</label>
                    <vee-field type="text" name="modified_name" class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300
                    transition duration-500 focus:outline-none focus:border-black rounded"
                        placeholder="Enter Song Title" @input="updateUnsavedFlag(true)" />
                    <ErrorMessage class="text-red-600" name="modified_name" />
                </div>
                <div class="mb-3">
                    <label class="inline-block mb-2">Genre</label>
                    <vee-field type="text" name="genre" class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300
                    transition duration-500 focus:outline-none focus:border-black rounded" placeholder="Enter Genre"
                        @input="updateUnsavedFlag(true)" />
                    <ErrorMessage class="text-red-600" name="genre" />
                </div>
                <button type="submit" class="py-1.5 px-3 rounded text-white bg-green-600" :disabled="in_submission">
                    Submit
                </button>
                <button type="button" class="py-1.5 px-3 rounded text-white bg-gray-600" :disabled="in_submission"
                    @click.prevent="showForm = false">
                    Go Back
                </button>
            </vee-form>
        </div>
    </div>
</template>
<script src="./CompositionItem.js">
</script>
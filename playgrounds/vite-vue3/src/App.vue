<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { imageClipboard, imagePaste } from 'image-clipboard'

const { isSupported, getImage } = imageClipboard({
    accepts: ['png', 'jpeg'],
    success(file) {
        console.log(file)
    }
})
const handleGetImage = () => {
    getImage().then(res => {
        console.log(res)
    })
}
const { addEvent, removeEvent } = imagePaste({
    accepts: ['png', 'jpeg'],
    success(file) {
        console.log(file)
    }
})

onMounted(() => {
    addEvent()
})

onUnmounted(() => {
    removeEvent()
})
</script>

<template>
    <div class="app">
        <img src="/logo.png" alt="" />
        <div>navigator.clipboard is supported: {{ isSupported }}</div>
        <button @click="handleGetImage" class="image-clipboard">paste</button>
        <div class="image-upload">
            <input type="file" />
        </div>
    </div>
</template>

<style>
* {
    box-sizing: border-box;
    padding: 0;
    border: 0;
    margin: 0;
}

.app {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
    color-scheme: light dark;
}

button {
    border-radius: 8px;
    border: 1px solid transparent;
    padding: 0.6em 1.2em;
    font-size: 1em;
    font-weight: 500;
    font-family: inherit;
    background-color: #f9f9f9;
    cursor: pointer;
    transition: border-color 0.25s;
}
button:hover {
    border-color: #646cff;
}
button:focus,
button:focus-visible {
    outline: 4px auto -webkit-focus-ring-color;
}
</style>

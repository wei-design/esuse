<script setup lang="ts">
import {onMounted, onUnmounted, ref} from 'vue'
import {useImageClipboard, useImagePaste} from 'image-clipboard'
import {type FileItem, Message} from "@arco-design/web-vue";

const {isSupported, getImage} = useImageClipboard({
    accepts: ['png', 'jpeg'],
    // success(file) {
    //     console.log(file)
    // }
})

const imageClipboard = ref<string>('')
const imagePaste = ref<string>('')
const handleGetImage = () => {
    getImage().then(async file => {
        imageClipboard.value = await getFileBase64(file?.[0])
    })
}
const {addEvent, removeEvent} = useImagePaste({
    accepts: ['png', 'jpeg'],
    // async success(file) {
    //     console.log(file)
    //     imagePaste.value = await getFileBase64(file?.[0])
    // }
})

const getFileBase64 = (file: File | undefined): Promise<string> => {
    if (!file) {
        Message.error('no image')
        return Promise.resolve('')
    }
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
            resolve(reader.result as string)
        }
        reader.onerror = (error) => {
            reject(error)
        }
    })
}

const handleChange = async (fileList: FileItem[], file: FileItem) => {
    try {
        console.log(fileList, file)
        imagePaste.value = await getFileBase64(file.file)
    } catch (e) {
        console.log(e)
    }
}

onMounted(() => {
    addEvent()
})

onUnmounted(() => {
    removeEvent()
})
</script>

<template>
    <a-layout>
        <a-layout-sider :width="80">
            <div class="layout-header">
                <img src="/logo.png" alt="" class="logo"/>
                <a href="https://github.com/wei-design/image-clipboard" target="_blank">
                    <icon-github size="24" color="#000"/>
                </a>
            </div>
        </a-layout-sider>
        <a-layout>
            <a-layout-content>
                <div class="upload-demo">
                    <a-card title="useImageClipboard">
                        <a-typography-paragraph>
                            get image from clipboard
                        </a-typography-paragraph>
                        <a-tag :color="isSupported ? 'green' : 'orangered'">
                            navigator.clipboard is {{ isSupported ? 'supported' : 'not supported' }}
                        </a-tag>
                        <a-divider/>
                        <a-button type="primary" @click="handleGetImage" class="image-clipboard">paste</a-button>
                        <a-divider/>
                        <a-image :src="imageClipboard" v-show="imageClipboard"/>
                    </a-card>
                    <a-card title="useImagePaste">
                        <a-typography-paragraph>
                            get image from paste event
                        </a-typography-paragraph>
                        <div class="image-upload">
                            <a-upload draggable :auto-upload="false" @change="handleChange">
                            </a-upload>
                        </div>
                        <a-divider/>
                        <a-image :src="imagePaste" v-show="imagePaste"/>
                    </a-card>
                </div>
            </a-layout-content>
        </a-layout>
    </a-layout>
</template>

<style>
* {
    box-sizing: border-box;
    padding: 0;
    border: 0;
    margin: 0;
}

#app {
    width: 100%;
    height: 100vh;
}

.arco-layout {
    width: 100%;
    height: 100%;
}

.layout-header {
    height: 100%;
    padding: 24px 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    .logo {
        width: 48px;
        height: 48px;
    }
}

.upload-demo {
    width: 100%;
    height: 100%;
    padding: 48px 120px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 24px;

    .arco-card {
        width: 100%;
        height: 100%;
    }

    .arco-image-img {
        width: 100%;
        border: 1px solid #efefef;
        border-radius: 6px;
        cursor: pointer;
    }
}
</style>

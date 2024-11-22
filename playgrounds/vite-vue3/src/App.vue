<script setup lang="ts">
import * as tool from '@wei-design/es-toolkit'

console.log(tool)

</script>

<template>
    <a-layout>
        <a-layout>
            <a-layout-content>
                <a-card>
                    test
                </a-card>
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
}
</style>

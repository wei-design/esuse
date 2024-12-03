<script setup lang="ts">
import { version } from 'esuse'

console.log(
    `%c Version %c ${version}`,
    'padding: 1px; border-radius: 3px 0 0 3px; color: #fff; background: #606060;',
    'padding: 1px 5px 1px 1px; border-radius: 0 3px 3px 0; color: #fff; background: #1475b2;'
)
</script>

<template>
    <a-layout>
        <a-layout>
            <a-layout-header class="layout-header">
                <a-badge :text="version">
                    <code style="padding-right: 26px">esuse</code>
                </a-badge>
            </a-layout-header>
            <a-layout-content>test</a-layout-content>
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

html,
body,
#app {
    width: 100%;
    height: 100vh;
    overflow: hidden;
}

.arco-layout {
    width: 100%;
    height: 100%;
}

.layout-header {
    height: 60px;
    padding: 24px 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
}
</style>

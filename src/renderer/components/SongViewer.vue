<template>
    <div>
        <a-layout>
            <!-- <a-breadcrumb :style="{marginBottom: '16px'}">
                <a-breadcrumb-item>Home</a-breadcrumb-item>
                <a-breadcrumb-item>List</a-breadcrumb-item>
                <a-breadcrumb-item>App</a-breadcrumb-item>
            </a-breadcrumb>-->
            <a-layout-content :style="{background: 'white', padding: '24px'}">
                <a-table
                    :dataSource="dataSource"
                    size="small"
                    :pagination="false"
                    :customRow="customRow"
                >
                    <a-table-column title="音乐标题" data-index="title" key="title"></a-table-column>
                    <a-table-column title="歌手" data-index="singer" key="singer"></a-table-column>
                    <a-table-column title="专辑" data-index="album" key="album"></a-table-column>
                    <a-table-column title="时长" data-index="length" key="length"></a-table-column>
                    <a-table-column title="大小" data-index="size" key="size"></a-table-column>
                </a-table>
            </a-layout-content>
        </a-layout>
    </div>
</template>

<script>
// import Vue from 'vue'

const { Menu, MenuItem } = this.$electron

const dataSource = [
    {
        title: "Lemon",
        singer: "米津玄师",
        album: "Lemon",
        length: "3:03",
        size: "0.5MB",
        key: "1"
    }
];

export default {
    name: "SongViewer",
    data() {
        return {
            dataSource
        };
    },
    methods: {
        customRow(record, index) {
            const that = this;
            return {
                on: {
                    contextmenu(event) {

                        event, index;
                    }
                }
            };
        }
    }
};
</script>

<style>
</style>

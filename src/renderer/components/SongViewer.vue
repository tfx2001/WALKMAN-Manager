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
                    :columns="columns"
                    :dataSource="dataSource"
                    size="small"
                    :pagination="false"
                >
                    <span slot="contextMenu" slot-scope="record, text">
                        <a-dropdown :trigger="['contextmenu']">
                            <span style="user-select: none, ">{{text}}</span>
                            <a-menu slot="overlay">
                                <a-menu-item key="1">1st menu item</a-menu-item>
                                <a-menu-item key="2">2nd menu item</a-menu-item>
                                <a-menu-item key="3">3rd menu item</a-menu-item>
                            </a-menu>
                        </a-dropdown>
                    </span>
                </a-table>
            </a-layout-content>
        </a-layout>
    </div>
</template>

<script>
const columns = [
    {
        title: "音乐标题",
        key: "title",
        dataIndex: "title",
        scopedSlots: {
            customRender: "contextMenu"
        }
    },
    {
        title: "歌手",
        ket: "singer",
        dataIndex: "singer",
        scopedSlots: {
            customRender: "contextMenu"
        }
    },
    {
        title: "专辑",
        key: "album",
        dataIndex: "album",
        scopedSlots: {
            customRender: "contextMenu"
        }
    },
    {
        title: "时长",
        key: "length",
        dataIndex: "length",
        scopedSlots: {
            customRender: "contextMenu"
        }
    },
    {
        title: "大小",
        key: "size",
        dataIndex: "size",
        scopedSlots: {
            customRender: "contextMenu"
        }
    }
];
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
            columns,
            dataSource
        };
    },
    methods: {
        onContextMenu(event) {
            this.$message.info(event);
        }
    }
};
</script>

<style>
</style>

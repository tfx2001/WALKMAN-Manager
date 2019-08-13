<template>
    <div>
        <a-layout>
            <a-layout-content :style="{background: 'white', padding: '24px'}">
                <!-- TODO: 多选  -->
                <a-table
                    :dataSource="dataSource"
                    size="small"
                    :pagination="false"
                    :customRow="customRow"
                >
                    <a-table-column title="音乐标题" data-index="title" key="title">
                        <template slot-scope="title">
                            <span :title="title">{{title}}</span>
                        </template>
                    </a-table-column>
                    <a-table-column title="歌手" data-index="singer" key="singer">
                        <template slot-scope="singer">
                            <span :title="singer">{{singer}}</span>
                        </template>
                    </a-table-column>
                    <a-table-column title="专辑" data-index="album" key="album">
                        <template slot-scope="album">
                            <span :title="album">{{album}}</span>
                        </template>
                    </a-table-column>
                    <a-table-column title="时长" data-index="length" key="length">
                        <template slot-scope="length">
                            <span :title="length">{{length}}</span>
                        </template>
                    </a-table-column>
                    <a-table-column title="大小" data-index="size" key="size">
                        <template slot-scope="size">
                            <span :title="size">{{size}}</span>
                        </template>
                    </a-table-column>
                </a-table>
            </a-layout-content>
        </a-layout>
    </div>
</template>

<script>
import { message } from "ant-design-vue";

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
                    contextmenu() {
                        const { Menu, MenuItem } = that.$electron.remote;

                        const menu = new Menu();
                        menu.append(
                            new MenuItem({
                                label: "从本地磁盘中删除",
                                click() {
                                    message.info(`歌曲"${record.title}"已删除`);
                                    that.dataSource.splice(index, 1);
                                }
                            })
                        );
                        menu.popup();
                    }
                }
            };
        }
    }
};
</script>

<style>
td {
    width: 100%;
    word-break: keep-all;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
table {
    table-layout: fixed;
}
</style>

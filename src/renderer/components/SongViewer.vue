<template>
  <div :style="{background: 'white', padding: '24px'}">
    <a-table
      :dataSource="dataSource"
      size="small"
      :customRow="customRow"
      :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
    >
      <a-table-column title="音乐标题" data-index="title" key="title">
        <template slot-scope="title">
          <span :title="title">{{title}}</span>
        </template>
      </a-table-column>
      <a-table-column title="歌手" data-index="artist" key="artist">
        <template slot-scope="artist">
          <span :title="artist">{{artist}}</span>
        </template>
      </a-table-column>
      <a-table-column title="专辑" data-index="album" key="album">
        <template slot-scope="album">
          <span :title="album">{{album}}</span>
        </template>
      </a-table-column>
      <a-table-column title="大小" data-index="size" key="size">
        <template slot-scope="size">
          <span :title="size">{{(size / 1048576).toFixed(1)}}MB</span>
        </template>
      </a-table-column>
    </a-table>
  </div>
</template>

<script>
// import { message } from "ant-design-vue";

export default {
  name: "SongViewer",
  data() {
    return {
      selectedRowKeys: []
    };
  },
  props: {
    dataSource: Array
  },
  methods: {
    customRow(record) {
      const that = this;
      return {
        on: {
          contextmenu() {
            const { Menu, MenuItem } = that.$electron.remote;
            const menu = new Menu();

            that.selectedRowKeys.push(record.key);

            menu.on("menu-will-close", () => {
              that.selectedRowKeys.splice(
                that.selectedRowKeys.indexOf(record.key),
                1
              );
            });
            menu.append(
              new MenuItem({
                label: "从本地磁盘中删除",
                click() {
                  that.selectedRowKeys.push(record.key);
                  that.$store.commit("deleteFiles", that.selectedRowKeys);
                  that.selectedRowKeys.splice(0, that.selectedRowKeys.length);
                }
              })
            );
            menu.popup();
          }
        },
        props: {
          style: {
            cursor: "pointer"
          }
        }
      };
    },
    onSelectChange(selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys;
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

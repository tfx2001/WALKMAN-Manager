<template>
  <div :style="{background: 'white', padding: '24px 24px 48px 24px', overflowY: 'auto'}">
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
    <a-modal v-model="modalVisiable" title="新建播放列表" @ok="newPlayList">
      <a-input placeholder="请输入播放列表名称" v-model="newPlayListName" />
    </a-modal>
  </div>
</template>

<script>
import { mapState } from "vuex";
import {
  appendToPlayList,
  removeFromPlayList
} from "./SongViewer/PlayListEditor";
import fs from "fs";

export default {
  name: "SongViewer",
  data() {
    return {
      selectedRowKeys: [],
      selectedRecords: [],
      modalVisiable: false,
      newPlayListName: ""
    };
  },
  model: {
    prop: "dataSource",
    event: "change"
  },
  props: {
    dataSource: Array,
    playList: Boolean
  },
  computed: mapState(["playListFiles", "currentPlayListFile", "openFolder"]),
  methods: {
    customRow(record) {
      const that = this;
      return {
        on: {
          dblclick() {
            that.$store.commit("setCurrentPlayMusic", record);
          },
          contextmenu() {
            const { Menu, MenuItem } = that.$electron.remote;
            const menu = new Menu();

            //之前是否已选择
            let isChangeIndex = that.selectedRowKeys.indexOf(record.key) == -1;
            if (isChangeIndex) {
              that.selectedRowKeys.push(record.key);
              that.selectedRecords.push(record);
            }

            menu.append(
              new MenuItem({
                label: "从磁盘中删除",
                click() {
                  if (isChangeIndex) that.selectedRowKeys.push(record.key);
                  that.$confirm({
                    title: "确定要删除这些歌曲吗？",
                    content: that.$createElement(
                      "ul",
                      that.selectedRowKeys.map(val => {
                        return that.$createElement("li", val);
                      })
                    ),
                    okType: "danger",
                    onOk() {
                      try {
                        that.$store.commit(
                          "deleteMusicFiles",
                          that.selectedRowKeys
                        );
                        that.$message.success("成功从磁盘中删除");
                      } catch (error) {
                        that.$message.error("删除失败");
                      }
                      that.selectedRowKeys.splice(
                        0,
                        that.selectedRowKeys.length
                      );
                      that.selectedRecords.splice(
                        0,
                        that.selectedRecords.length
                      );
                    },
                    onCancel() {
                      that.selectedRowKeys.splice(
                        0,
                        that.selectedRowKeys.length
                      );
                      that.selectedRecords.splice(
                        0,
                        that.selectedRecords.length
                      );
                    }
                  });
                }
              })
            );

            //父组件是否是播放列表菜单查看器
            const playListMenu = new Menu();

            // 生成添加到播放列表子菜单

            playListMenu.append(
              new MenuItem({
                label: "新建播放列表",
                click() {
                  if (isChangeIndex) {
                    that.selectedRecords.push(record);
                    that.selectedRowKeys.push(record.key);
                  }
                  that.newPlayListName = "";
                  that.modalVisiable = true;
                }
              })
            );

            playListMenu.append(
              new MenuItem({
                type: "separator"
              })
            );

            for (const i of that.playListFiles) {
              playListMenu.append(
                new MenuItem({
                  label: i.name,
                  click() {
                    if (isChangeIndex) that.selectedRecords.push(record);
                    appendToPlayList(i.file, that.selectedRecords);
                    that.$message.success("成功添加到播放列表");
                    that.selectedRowKeys.splice(0, that.selectedRowKeys.length);
                    that.selectedRecords.splice(0, that.selectedRecords.length);
                  }
                })
              );
            }

            menu.append(
              new MenuItem({
                label: "添加到播放列表",
                submenu: playListMenu
              })
            );
            if (that.playList) {
              menu.append(
                new MenuItem({
                  label: "从播放列表中删除",
                  click() {
                    if (isChangeIndex) {
                      that.selectedRecords.push(record);
                      that.selectedRowKeys.push(record.key);
                    }
                    removeFromPlayList(
                      that.currentPlayListFile,
                      that.selectedRecords
                    );
                    that.$message.success("成功从播放列表中删除");
                    that.$emit(
                      "change",
                      that.dataSource.filter(val => {
                        return that.selectedRowKeys.indexOf(val.key) == -1;
                      })
                    );
                    that.selectedRowKeys.splice(0, that.selectedRowKeys.length);
                    that.selectedRecords.splice(0, that.selectedRecords.length);
                  }
                })
              );
            }

            menu.on("menu-will-close", () => {
              if (isChangeIndex) {
                that.selectedRowKeys.splice(
                  that.selectedRowKeys.indexOf(record.key),
                  1
                );
                that.selectedRecords.splice(
                  that.selectedRecords.indexOf(record),
                  1
                );
              }
            });

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
    onSelectChange(selectedRowKeys, selectedRecords) {
      this.selectedRowKeys = selectedRowKeys;
      this.selectedRecords = selectedRecords;
    },
    newPlayList() {
      for (const val of this.playListFiles) {
        if (val.name == this.newPlayListName) {
          this.$message.error("播放列表已存在");
          return;
        }
      }
      fs.writeFileSync(
        this.openFolder + `MUSIC\\${this.newPlayListName}.m3u8`,
        "#EXTM3U"
      );
      this.$store.commit("appendPlayListFiles", {
        name: this.newPlayListName,
        file: this.openFolder + `MUSIC\\${this.newPlayListName}.m3u8`
      });
      appendToPlayList(
        this.openFolder + `MUSIC\\${this.newPlayListName}.m3u8`,
        this.selectedRecords
      );
      this.modalVisiable = false;
      this.$message.success("成功新建播放列表");
    }
  },
  watch: {
    modalVisiable(newVal) {
      if (!newVal) {
        this.selectedRowKeys.splice(0, this.selectedRowKeys.length);
        this.selectedRecords.splice(0, this.selectedRecords.length);
      }
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
  -webkit-user-select: text;
}
table td span {
  cursor: text;
}
table {
  table-layout: fixed;
}
tbody tr {
  cursor: pointer;
}
</style>

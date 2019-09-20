<template>
  <a-button block type="primary" @click="onClick">
    <a-icon type="folder-open" />
    <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
      <span v-show="!this.collapsed">
        <slot></slot>
      </span>
    </transition>
  </a-button>
</template>

<script>
export default {
  name: "button-open-folder",
  props: {
    collapsed: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onClick() {
      this.$emit("click");
    }
  }
};
</script>
<style scoped>
@import "~animate.css";

.animated {
  animation-duration: 200ms;
  animation-delay: 100ms;
}

button {
  overflow: hidden;
}
</style>

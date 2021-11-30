<template>
  <button
      class="ImageCropper-AspectChanger__button"
      data-bordered="1"
      v-on:click="onRotationClick"
  >
      <span class="ImageCropper-AspectChanger__button__inner">
          <img src="@/assets/icons/rotate.png" alt=""/>
      </span>
  </button>
</template>

<script lang="ts">
import {Vue} from "vue-property-decorator";
import Component from "vue-class-component";

@Component
export default class RotateButton extends Vue {
  lastRotation = Date.now() / 1000 | 0

  onRotationClick() {
    const now = Date.now() / 1000 | 0
    if (now - this.lastRotation >= 1) {
      this.lastRotation = now
      this.$emit("click")
    }
  }

}
</script>
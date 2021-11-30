<template>
  <button
    class="ImageCropper-AspectChanger__button"
    data-save="1"
    data-bordered="1"
    v-on:click="onSaveClick">
      <span class="ImageCropper-AspectChanger__button__inner">Сохранить</span>
  </button>
</template>

<script lang="ts">
import {Vue} from "vue-property-decorator";
import Component from "vue-class-component";

@Component
export default class RotateButton extends Vue {
  onSaveClick() {
    this.$emit("click")
  }

}
</script>
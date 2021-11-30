<template>
  <div class="ImageCropper-Loader">
    <div class="ImageCropper-Loader__inner">
      <div class="ImageCropper-Loader__title">
        {{text.title}}
      </div>
      <div class="ImageCropper-Loader__line">
        <div class="ImageCropper-Loader__line__inner" v-bind:style="percentStyle" />
      </div>
      <div class="ImageCropper-Loader__description">
        {{text.description}}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Prop, Vue} from "vue-property-decorator";
import Component from "vue-class-component";
import "./styles/Loader.scss"
import ru from "@/ImageCropper/langs/ru";

@Component
export default class Heading extends Vue {
  @Prop() texts?: {title: string, description: string}
  @Prop() percent?: number

  get percentStyle () {
    return {width: this.percent + "%"}
  }

  get text () {
    if (this.texts) {
      return this.texts
    }
    return {
      title: ru.loading,
      description: ru.loading_description
    }
  }
}
</script>
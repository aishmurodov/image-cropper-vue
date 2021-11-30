<template>
  <div id="app">
    <div style="padding: 20px; display: flex; gap: 10px;">
      <button @click="onClickToPhotoButton">
        Обрезать фотографию
      </button>
      <button @click="onClickToAvatarButton">
        Обрезать аватарку
      </button>
      <ImageCropper
          v-if="show"
          v-on:onClose="onModalClose"
          v-bind:image="image"
          v-bind:mode="mode"
          v-bind:freeze-actions="saving"
      >
        <Loader v-bind:percent="percent" />
      </ImageCropper>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import ImageCropper from "@/ImageCropper/ImageCropper.vue";
import Loader from "@/ImageCropper/components/Loader/index.vue";

import "./index.scss"
import { ImageCropperMode } from '@/ImageCropper/interfaces/ImageCropperInterface';
import ImageCropperCloseEventInterface from "@/ImageCropper/interfaces/ImageCropperCloseEventInterface";

@Component({
  components: {
    ImageCropper,
    Loader
  },
})
export default class App extends Vue {

  show = false
  saving = false

  percent = 0
  mode: ImageCropperMode = "default"
  image = ""


  onClickToButton(mode: ImageCropperMode): void {
    this.mode = mode
    this.show = !this.show
  }

  onClickToPhotoButton(): void {
    this.image = require("@/assets/horizontal-image.jpg")
    this.onClickToButton("default")
  }

  onClickToAvatarButton(): void {
    this.image = require("@/assets/avatar.jpeg")
    this.onClickToButton("avatar")
  }

  onModalClose(e: ImageCropperCloseEventInterface): void {
    console.log(e)
    if (e.event === "exit") {
      this.show = false
      return
    }
    this.saving = true
    let fakePercent = 0
    let intervalToFake = setInterval(() => {
      if (fakePercent >= 100) {
        clearInterval(intervalToFake)
        this.saving = false
        this.percent = 0
        this.show = false
        const iframe = "<img alt='' style='box-shadow: 0 4px 20px 0 rgb(255 255 255 / 20%); max-width: 80vw; height: auto' src='" + e.data?.base64 + "' />"
        const NewWindow = window.open()
        if (NewWindow) {
          NewWindow.document.open()
          NewWindow.document.write(iframe)
          NewWindow.document.body.style.margin = "0px"
          NewWindow.document.body.style.display = "flex"
          NewWindow.document.body.style.justifyContent = "center"
          NewWindow.document.body.style.alignItems = "center"
          NewWindow.document.body.style.background = "#0e0e0e"
          NewWindow.document.close()
        }
      } else {
        this.percent = fakePercent++
      }
    }, 100)
  }
}
</script>
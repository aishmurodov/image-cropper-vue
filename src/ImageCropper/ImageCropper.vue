<template>
  <Container v-bind:has-mount="hasMounted" v-bind:image-sizes="imageSizes">

    <Closer
        v-bind:freeze-actions="freezeActions"
        @onClose="onClose"
    />
    <Heading v-bind:text="currentLanguage.heading" />
    <ImageContainer
        v-bind:image="currentImage"
        v-bind:image-sizes="imageSizes"
        v-bind:ratio="CalculatedRatio"
        v-bind:toggleAngle="toggleAngle"
        v-bind:toggleClose="toggleClose"
        v-bind:freeze-actions="freezeActions"
        v-on:save-image="onSave"
    >
      <slot />
    </ImageContainer>
    <div class="ImageCropper-Container__inner__bottom">
      <AspectChanger
        v-on:rotate="onRotate"
        v-on:ratio="onChangeRatio"
        v-on:image="onChangeImage"
        v-on:save="onSaveTrigger"
        v-bind:mode="mode"
        v-bind:ratios="ratios"
        v-bind:inited-ratio="CalculatedRatio"
        v-bind:freeze-actions="freezeActions"
      />
    </div>
  </Container>
</template>

<script lang="ts">
import {Prop, Vue, Watch} from "vue-property-decorator";
import Component from "vue-class-component";

import defaultLang from "@/ImageCropper/langs/ru"

import "@/ImageCropper/themes/default.scss"

import Container from "@/ImageCropper/components/Container/index.vue";
import Closer from "@/ImageCropper/components/Closer/index.vue";
import Heading from "@/ImageCropper/components/Heading/index.vue";
import ImageContainer from "@/ImageCropper/components/ImageContainer/index.vue";
import AspectChanger from "@/ImageCropper/components/AspectChanger/index.vue";

import ImageCropperCloseEventInterface from "./interfaces/ImageCropperCloseEventInterface";
import ImageCropperLanguagesInterface from "@/ImageCropper/interfaces/ImageCropperLanguagesInterface";
import {ImageCropperMode} from "@/ImageCropper/interfaces/ImageCropperInterface";
import ToggleActionsDelay from "@/ImageCropper/constants/ToggleActionsDelay";
import Ratios from "@/ImageCropper/constants/Ratios";

@Component({
  components: {
    Container,
    Closer,
    Heading,
    ImageContainer,
    AspectChanger
  }
})
export default class ImageCropper extends Vue {

  @Prop() image!: string
  @Prop() language: ImageCropperLanguagesInterface|undefined
  @Prop() mode!: ImageCropperMode
  @Prop() freezeActions: boolean|undefined

  currentImage = ""
  hasMounted = false
  imageSizes = {width: 0, height: 0}
  ratio = 16/9

  toggleAngle = false
  toggleClose = false

  ratios = Ratios

  get CalculatedRatio () {
    return this.mode === 'avatar' ? 1 : this.ratio
  }

  beforeMount() {
    this.changeImage(this.image)
  }

  @Watch("image")
  imageChanged(value: string) {
    this.changeImage(value)
  }

  onChangeImage(value: string) {
    this.changeImage(value)
  }

  changeImage(newImage: string) {
    this.currentImage = newImage
    this.setImageSizes(this.currentImage)
  }

  mounted(): void {
    setTimeout(() => {
      this.hasMounted = true
    })
  }

  get currentLanguage(): ImageCropperLanguagesInterface {
    return this.language ?? defaultLang
  }


  setImageSizes(imageSource: string) {
    let img = new Image()
    img.src = imageSource

    img.onload = () => {
      const div = document.createElement("div")
      div.innerHTML = `<div class="ImageCropper-Image-Checker" data-orientation="${img.width > img.height ? "horizontal" : "vertical"}"></div>`
      div.querySelector(".ImageCropper-Image-Checker")?.append(img)
      document.body.append(div)
      let createdImage = (div.querySelector(".ImageCropper-Image-Checker img") as HTMLImageElement)

      this.imageSizes = {
        width: createdImage.width,
        height: createdImage.height
      }
      div.remove()
    }
  }


  onRotate() {
    this.toggleAngle = true
    setTimeout(() => {
      this.toggleAngle = false
    }, ToggleActionsDelay)
  }

  onChangeRatio(newRatio: number) {
    this.ratio = newRatio
  }


  onSaveTrigger() {
    this.toggleClose = true
    setTimeout(() => {
      this.toggleClose = false
    }, ToggleActionsDelay)
  }

  onSave(event: ImageCropperCloseEventInterface) {
    this.$emit("onClose", event)
  }

  onClose() {
    this.hasMounted = false

    setTimeout(() => {
      let event: ImageCropperCloseEventInterface = {
        event: "exit"
      }
      this.$emit("onClose", event)
    }, 250)
  }

}
</script>
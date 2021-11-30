<template>
  <div class="ImageCropper-Image-Container">
    <div class="ImageCropper-Image-Container__inner" v-bind:style="WidthHeightStyles">
      <VueCropper
          v-if="render && !freezeActions"
          ref="cropper"
          v-bind:style="WidthHeightStyles"
          v-bind:image-sizes="imageSizes"
          :guides="false"
          :center="false"
          :zoomable="false"
          :aspect-ratio="ratio"
          :view-mode="1"
          :responsive="true"
          v-bind:src="image"/>
      <slot v-else-if="render && freezeActions" />
    </div>
  </div>
</template>

<script lang="ts">
import {Prop, Vue, Watch} from "vue-property-decorator";
import Component from "vue-class-component";

import "./styles/ImageContainer.scss"

import VueCropper from "./components/VueCropper.vue"
import DefaultRotateAngle from "@/ImageCropper/constants/DefaultRotateAngle";

@Component({
  components: {
    VueCropper
  }
})
export default class ImageContainer extends Vue {
  @Prop() ratio!: number
  @Prop() toggleAngle!: boolean
  @Prop() toggleClose!: boolean
  @Prop() image!: string
  @Prop() freezeActions: boolean|undefined
  @Prop() imageSizes!: {
    width: number,
    height: number
  }

  render = false

  get WidthHeightStyles () {
    return !this.freezeActions ? {width: this.imageSizes.width + 'px', height: this.imageSizes.height + 'px'}: {}
  }

  @Watch("imageSizes")
  imageChanged() {
    this.render = false
    setTimeout(() => {
      this.render = true
    })
  }

  @Watch("toggleAngle")
  rotateImage(value: boolean) {
    if (value) {
      (this.$refs.cropper as VueCropper).rotate(-DefaultRotateAngle)
    }
  }

  @Watch("toggleClose")
  saveImage (value: boolean) {
    if (value) {
      const croppedCanvas = (this.$refs.cropper as VueCropper).getCroppedCanvas()
      croppedCanvas?.toBlob((blob) => {
        this.$emit("save-image", {
          event: "save",
          data: {
            blob: blob,
            base64: croppedCanvas?.toDataURL()
          }
        })
      })
    }
  }

  @Watch("ratio")
  changedRatio(value: number) {
    (this.$refs.cropper as VueCropper).setAspectRatio(value)
  }

}
</script>
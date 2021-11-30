<template>

  <div v-bind:style="containerStyle">
    <img
        ref="img"
        v-bind:src="src"
        alt="Image"
        v-bind:style='{maxWidth: "100%"}'
    >
  </div>

</template>

<script lang="ts">
import {Prop, Vue} from "vue-property-decorator";
import Component from "vue-class-component";
import Cropper from "cropperjs"


@Component
export default class VueCropper extends Vue {
  @Prop() src!: string
  @Prop() guides!: boolean
  @Prop() center!: boolean
  @Prop() zoomable!: boolean
  @Prop() aspectRatio!: number
  @Prop() viewMode!: 0 | 2 | 1 | 3 | undefined
  @Prop() responsive!: boolean
  @Prop() crossorigin!: boolean
  @Prop() containerStyle!: any
  @Prop() imageSizes!: {
    width: number,
    height: number
  }

  cropper: Cropper|undefined

  mounted() {
    this.setCropper()
  }

  beforeDestroy() {
    this.cropper?.destroy()
  }

  setCropper() {
    this.cropper = new Cropper(this.$refs['img'] as HTMLImageElement, {
      guides: this.guides,
      aspectRatio: this.aspectRatio,
      center: this.center,
      zoomable: this.center,
      viewMode: this.viewMode,
      responsive: this.responsive,
      checkCrossOrigin: this.crossorigin,
      minContainerHeight: this.imageSizes.height,
      minContainerWidth: this.imageSizes.width
    })
  }


  getCroppedCanvas(options?: Cropper.GetCroppedCanvasOptions): HTMLCanvasElement|undefined {
    return this.cropper?.getCroppedCanvas(options);
  }

  rotate(angle: number): Cropper|undefined {
    return this.cropper?.rotate(angle);
  }

  setAspectRatio(aspectRatio: number): Cropper|undefined {
    return this.cropper?.setAspectRatio(aspectRatio);
  }
}


</script>
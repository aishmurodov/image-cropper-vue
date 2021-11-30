<template>
  <div class="ImageCropper-AspectChanger">
    <RotateButton v-on:click="onRotationClick"/>

    <div
        v-if="mode !== 'avatar'"
        class="ImageCropper-AspectChanger__ratios">
        <AspectChangerButton
            v-for="ratio of ratios"
            v-bind:key="ratio.ratio"
            v-bind:ratio="ratio.ratio"
            v-bind:active="initedRatio === ratio.ratio"
            v-on:ratio="onChangeRatio">
            {{ratio.title}}
        </AspectChangerButton>
    </div>

    <div class="ImageCropper-AspectChanger__right">
      <ImageChangerButton
          v-bind:freeze-actions="freezeActions"
          v-on:image="onImageChange"
      />
      <SaveButton
          v-on:click="onSaveClick"
      />
    </div>
  </div>
</template>

<script lang="ts">
import {Prop, Vue} from "vue-property-decorator";
import Component from "vue-class-component";
import ImageCropperRatioInterface from "@/ImageCropper/interfaces/ImageCropperRatioInterface";
import {ImageCropperMode} from "@/ImageCropper/interfaces/ImageCropperInterface";


import RotateButton from "./components/RotateButton.vue"

import "./styles/AspectChanger.scss"
import AspectChangerButton from "@/ImageCropper/components/AspectChanger/components/AspectChangerButton.vue";
import ImageChangerButton from "@/ImageCropper/components/AspectChanger/components/ImageChangerButton.vue";
import SaveButton from "@/ImageCropper/components/AspectChanger/components/SaveButton.vue";

@Component({
  components: {
    SaveButton,
    ImageChangerButton,
    AspectChangerButton,
    RotateButton
  }
})

export default class AspectChanger extends Vue {
  @Prop() ratios!: Array<ImageCropperRatioInterface>
  @Prop() mode!: ImageCropperMode
  @Prop() initedRatio!: number
  @Prop() freezeActions: boolean|undefined

  onRotationClick() {
    if (!this.freezeActions) {
      this.$emit("rotate")
    }
  }

  onChangeRatio(ratio: number) {
    if (!this.freezeActions) {
      this.$emit("ratio", ratio)
    }
  }

  onImageChange(image: string) {
    if (!this.freezeActions) {
      this.$emit("image", image)
    }
  }

  onSaveClick() {
    if (!this.freezeActions) {
      this.$emit("save")
    }
  }
}
</script>
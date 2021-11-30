<template>
  <button
      v-bind:class="{'ImageCropper-AspectChanger__button': true, 'active': active}"
      v-on:click="onClick">
    <span class="ImageCropper-AspectChanger__button__inner">
        <slot />
    </span>
  </button>
</template>

<script lang="ts">
import {Prop, Vue} from "vue-property-decorator";
import Component from "vue-class-component";

@Component
export default class AspectChangerButton extends Vue {
  @Prop() active: boolean|undefined
  @Prop() ratio!: number

  onClick() {
   this.$emit("ratio", this.ratio)
  }

}
</script>
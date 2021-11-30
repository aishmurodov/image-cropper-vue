<template>
  <div class="ImageCropper-Container" :data-mounted="hasMount">
    <div class="ImageCropper-Container__inner" v-bind:data-orientation="imageSizes.height >= imageSizes.width ? 'vertical' : 'horizontal'">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import {Prop, Vue} from "vue-property-decorator"
  import "./styles/Container.scss"
  import Component from "vue-class-component";

  @Component
  export default class Container extends Vue {
    @Prop() hasMount!: boolean
    @Prop() imageSizes!: {width: number, height: number}
  }
</script>
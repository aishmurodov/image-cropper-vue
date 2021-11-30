<template>
  <div class="ImageCropper-Heading">{{ text }}</div>
</template>

<script lang="ts">
  import {Prop, Vue} from "vue-property-decorator";
  import Component from "vue-class-component";
  import "./styles/Heading.scss"
  @Component
  export default class Heading extends Vue {
    @Prop() text!: string
  }
</script>
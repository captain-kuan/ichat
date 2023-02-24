<template>
  <button @click="face">face</button>
  <iframe v-if="show" :src="src"></iframe>
</template>

<script>
import {ref} from "vue"

export default {
  name: "Face",
  setup() {
    const show = ref(false)
    const src = ref(`${location.origin}/AuthResult.html?success=true`)
    const face = () => {
      show.value = true
    }
    return {show, src, face}
  }
}
</script>

<style scoped>
iframe {
  width: 100vw;
  height: 100vh;
}
</style>

<template>
  <div>
    <img :src="NotFound" alt="NotFound" height="500px">
  </div>
</template>

<script>
import NotFound from '@/assets/NotFound.png'
export default {
  name: 'NotFoundView',
  data() {
        return {
            NotFound
        };
    }

}
</script>

<style>

</style>
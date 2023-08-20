<script lang="ts">
import Navigation from "@/components/Navigation.vue";
export default {
  components: {
    navigation: Navigation,
  },
};
</script>

<template>
  <navigation />
  <div class="container">
    <router-view v-slot="{ Component }">
      <transition name="slide" mode="out-in">
        <component :is="Component" :key="$route.path"></component>
      </transition>
    </router-view>
  </div>
</template>

<style>
.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.5s;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  /* transform: translateX(-30%); */
}
</style>

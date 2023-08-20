<template>
  <div>
    <section class="destination">
      <div v-if="destination">
        <h1>{{ destination?.name }}</h1>
        <go-back></go-back>
        <div class="destination-details">
          <img
            :src="`/images/${destination?.image}`"
            :alt="destination?.name"
          />
          <p>{{ destination?.description }}</p>
        </div>
      </div>
    </section>
    <section class="experiences">
      <h2>Top Experiences in {{ destination.name }}</h2>
      <div class="cards">
        <router-link
          v-for="experience in destination.experiences"
          :key="experience.slug"
          :to="{
            name: 'experience.show',
            params: { experienceSlug: experience.slug },
          }"
        >
          <experience-card :experience="experience" />
        </router-link>
      </div>
      <router-view></router-view>
    </section>
  </div>
</template>

<script lang="ts">
import sourceData from "@/data.json";
import ExperienceCard from "@/components/ExperienceCard.vue";
import GoBack from "@/components/GoBack.vue";
export default {
  components: {
    "experience-card": ExperienceCard,
    "go-back": GoBack,
  },
  props: {
    id: { type: Number, required: true },
  },
  data() {
    return {
      destination: sourceData.destinations,
    };
  },
  computed: {
    destination(): any {
      return sourceData.destinations.find(
        (destination) => destination.id === this.id
      );
    },
  },
};
</script>

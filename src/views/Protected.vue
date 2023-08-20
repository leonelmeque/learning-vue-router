<template>
  <div>
    <h1>Greetings, {{ username }}</h1>
    <button @click="logout">Logout</button>
    <router-link :to="{ name: 'invoices' }">
      <button>invoices</button>
    </router-link>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      //@ts-ignore
      username: window?.user,
    };
  },
  methods: {
    logout() {
      //@ts-ignore
      window.user = null;
      //@ts-ignore
      this.$router.push({ name: "Home" });
    },
  },
};
</script>

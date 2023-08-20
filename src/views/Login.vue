<template>
  <div class="login">
    <form class="form" @submit.prevent="login">
      <h1>Login</h1>
      <label for="username">Username</label>
      <input v-model="username" type="text" name="username" class="input" />
      <label for="password">Password</label>
      <input v-model="password" type="text" name="password" class="input" />
      <button class="btn">Login</button>
    </form>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    login() {
      // @ts-ignore
      const redirectPath = this.$route.query.redirect || "/protected";
      // @ts-ignore
      window.user = this.username;
      // @ts-ignore
      this.$router.push(redirectPath);
    },
  },
};
</script>

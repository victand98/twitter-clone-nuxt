<template>
  <div>
    <div class="pt-5 space-y-6">
      <UIInput
        v-model="data.username"
        label="Username"
        placeholder="@username"
      />
      <UIInput
        v-model="data.password"
        label="Password"
        placeholder="*********"
        type="password"
      />

      <div>
        <button @click="handleLogin">Login</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { login } = useAuth();

const data = reactive({
  password: "",
  username: "",
  loading: false,
});

const handleLogin = async () => {
  data.loading = true;
  try {
    await login({ username: data.username, password: data.password });
  } catch (error) {
    console.log("error", error);
  } finally {
    data.loading = false;
  }
};
</script>

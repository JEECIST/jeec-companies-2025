<template>
  <div class="login-container">
   
    <img src="../../../assets/jeec-logo.svg" alt="JEEC Logo" class="logo" />

  
    <h1 class="title">PARTNERS LOGIN</h1>

  
    <!--form @submit.prevent="handleLogin"-->
      <form>
      <div class="input-group">
        <input 
          type="text" 
          v-model="username" 
          placeholder="Enter Username" 
          class="input-field"
          required 
        />
      </div>

      <div class="input-group password-group">
        <input 
          :type="showPassword ? 'text' : 'password'"
          v-model="password" 
          placeholder="Enter Password" 
          class="input-field"
          required 
        />
        <span class="eye-icon" @click="togglePassword">
          <img src="../../../assets/eye.svg">
        </span>
      </div>

   
      <!-- <button type="submit" class="login-button"> -->
        <router-link to="/menu">
        <button class="login-button"> LOGIN</button>
      </router-link>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const username = ref('');
const password = ref('');
const showPassword = ref(false);

const togglePassword = () => {
  showPassword.value = !showPassword.value;
};

</script>

<style scoped>

.login-container {
  background-color: #1e1e1e;
  color: white;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-family: 'Poppins', sans-serif;
}


.logo {
  width: 150px;
  margin-bottom: 20px;
}


.title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 20px;
  letter-spacing: 1px;
  border-top: 2px solid #279EFF;
  padding-top: 10px;
}


.input-group {
  position: relative;
  width: 300px;
  margin-bottom: 15px;
}

.input-field {
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  background: transparent;
  border: none;
  border-bottom: 2px solid #279EFF;
  outline: none;
  color: white;
}

.input-field::placeholder {
  color: #aaa;
}


.password-group {
  display: flex;
  align-items: center;
}

.eye-icon {
  position: absolute;
  right: 10px;
  cursor: pointer;
  color: #279EFF;
}


.login-button {
  width: 320px;
  padding: 10px;
  font-size: 1rem;
  font-weight: bold;
  color: white;
  background: transparent;
  border: 2px solid #279EFF;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s;
}

.login-button:hover {
  background: #279EFF;
  color: black;
}
</style>

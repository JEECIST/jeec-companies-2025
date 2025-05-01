<template>
  <div class="login-container">
   
    <img src="../../../assets/jeec-logo.svg" alt="JEEC Logo" class="logo" />

  
    <h1 class="title">Partners Login</h1>

  
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
          <img :src="showPassword ? eyeOff : eye" alt="Toggle Password Visibility" class="eyeImage">
          <!-- <img src="../../../assets/eye.svg"> -->
        </span>
      </div>

   
      <!-- <button type="submit" class="login-button"> -->
        <router-link to="/menu">
        <button @click="login_company" class="login-button"> Login</button>
      </router-link>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import eye from '../../../assets/eye.svg';
import eyeOff from '../../../assets/hide-eye.svg';
import { useUserStore } from "../../../stores/user";
import { useRouter } from "vue-router"

const router = useRouter();

const username = ref('');
const password = ref('');
const showPassword = ref(false);
const userStore = useUserStore();

const togglePassword = () => {
  showPassword.value = !showPassword.value;
};

async function login_company(){
    let login_result = await userStore.getAccess(username.value, password.value);
    
    if(login_result){
        router.push({path: "/menu"})
    }
    else{
        router.push({path: "/login"})
    }
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
}


.logo {
  width: 12rem;
  height: 7rem;
 
}


.title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 20px;
  letter-spacing: 1px;
  padding-top: 10px;
  border-bottom: 2px solid transparent;
      border-image: linear-gradient(to right,
          rgba(39, 158, 255, 0) 0%, 
          rgba(39, 158, 255, 1) 20%,
          rgba(39, 158, 255, 1) 80%,
          rgba(39, 158, 255, 0) 100%
        ) 1; 
      border-image-slice: 1;
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
.eyeImage{
  width: 2rem; /* or any size you want */
  height: 2rem;
}

.login-button {
  width: 300px;
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

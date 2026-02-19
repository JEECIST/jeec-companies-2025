<template>
  <header class="header">
      <router-link to="/menu">
        <img src="../../../assets/jeec-logo.svg" alt="JEEC Logo" class="logo" />
      </router-link>
    
      <div class="menu-icon" @click="toggleMenu">&#9776;</div>
    </header>
    <div v-if="showMenu" class="popup-menu" @click="toggleMenu">
      <ul>
        
        <li @click="router.push('/activities')"><img src="../../../assets/activities.svg" class="menuicon-activities">Activities</li>
        <li @click="router.push('/meals')"><img src="../../../assets/meals.svg" class="menuicon-meals">Meals</li>
        <li @click="router.push('/parking')"><img src="../../../assets/car.png" class="menuicon-parking">Parking</li>
        <li @click="router.push('/changePw')"><img src="../../../assets/lock-icon.svg" class="menuicon-lock">Change password</li>
        <li @click="logout_company"><img src="../../../assets/logout-icon.svg" class="menuicon-logout">  Logout  </li>
      </ul>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import axios from 'axios'
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();

const showMenu = ref(false)
const router = useRouter()

function toggleMenu() {
  showMenu.value = !showMenu.value
}

function logout_company() {
  userStore.logoutUser(); // Reset the user state
  router.push('/login');
  
}
</script>

<style scoped>

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0.5rem;
}

.logo {
    height: 50px;

}
.menu-icon {
    font-size: 30px;
    padding-bottom: 1rem;
    cursor: pointer;
}

.popup-menu {
  position: absolute;
  top: 60px;
  right: 20px;
  background-color: #333;
  border-radius: 10px;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  box-shadow: 0px 4px 10px rgba(0,0,0,0.5);
  z-index: 1000;
  text-align: left;
}

.popup-menu ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.popup-menu li {
  padding: 0.5rem 1rem;
  color: white;
  cursor: pointer;
  transition: background-color 0.2s;
}

.popup-menu li:hover {
  background-color: #444;
}

.menuicon-activities, .menuicon-meals, .menuicon-parking{
  width: 1.5rem;
  height: 1rem;
  margin-right: 0.3rem;
}
.menuicon-lock{
  width: 1.5rem;
  height: 1.1rem;
  margin-right: 0.3rem;
}
.menuicon-logout{
  width: 1.5rem;
  height: 0.9rem;
  margin-right: 0.2rem;
}
</style>

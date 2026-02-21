<template>
  <div class="landing-container">
    <appHeader />

    <main class="main-content">
      <div v-if="userStore.isLoggedIn">
        <h1 class="company-name">{{userStore.company_name}}</h1>
  
        <div class="options">
          <div class="option" @click="goToActivities">
            <img src="../../../assets/activities.svg" alt="Activities" class="icon" />
            <p class="label">Activities</p>
          </div>
          <div class="option" @click="goToMeals">
            <img src="../../../assets/meals.svg" alt="Meals" class="icon" />
            <p class="label">Meals</p>
          </div>
          <div class="option" @click="goToParking">
            <img src="../../../assets/car.png" alt="Parking" class="icon" />
            <p class="label">Parking</p>
          </div>
          <div v-if="userStore.cvs_access" class="option" @click="downloadResumes">
            <img src="../../../assets/download.svg" alt="Download" class="icon" />
            <p class="label">Download CV</p>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import axios from 'axios'
import { useUserStore } from "@/stores/user";

import appHeader from '@/views/LandingPage/components/appHeader.vue'

const userStore = useUserStore();


function logout_company() {
  userStore.logoutUser(); // Reset the user state
  router.push('/login');
}


const showMenu = ref(false)

const toggleMenu = () => {
  showMenu.value = !showMenu.value
}

const router = useRouter()

const goToActivities = () => {
  router.push('/activities')
}

const goToMeals = () => {
  router.push('/meals')
}

const goToParking = () => {
  router.push('/parking')
}

const downloadResumes = async () => {
  try {
    const response = await axios.get(import.meta.env.VITE_APP_JEEC_BRAIN_URL + '/resumes/download_vue', {
      responseType: 'blob',
      auth: {
        username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME,
        password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY
      }
    })

    const url = window.URL.createObjectURL(new Blob([response.data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'curriculos_JEEC26.zip')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  } catch (error) {
    alert("Failed to dowload CVs. Please contact JEEC staff!")
  }
}

</script>

<style scoped>
.landing-container {
    background-color: #1e1e1e;
    color: white;
    min-height: 100vh;
    padding: 1rem;
    text-align: center;
}

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
.company-name {
    font-size: 2rem;
    margin: 2rem 0;
    font-weight: bold;
    border-bottom: 2px solid transparent;
    border-image: linear-gradient(to right,
        rgba(39, 158, 255, 0) 0%, 
        rgba(39, 158, 255, 1) 20%,
        rgba(39, 158, 255, 1) 80%,
        rgba(39, 158, 255, 0) 100%
      ) 1; 
    border-image-slice: 1;
}

.options {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
  padding-top: 2rem; 
}


.icon {
    width: 100px;
    height: 100px;
    margin-bottom: 0.5rem;
    cursor: pointer;
    filter: brightness(0) saturate(100%) invert(45%) sepia(91%) saturate(1342%) hue-rotate(178deg) brightness(102%) contrast(104%);
}

.label {
    font-size: 1.3rem;
    font-weight: 600;
    
    padding-top: 0.3rem;
    border-bottom: 2px solid transparent;
    border-image: linear-gradient(to right,
        rgba(39, 158, 255, 0) 0%, 
        rgba(39, 158, 255, 1) 20%,
        rgba(39, 158, 255, 1) 80%,
        rgba(39, 158, 255, 0) 100%
      ) 1; 
    border-image-slice: 1;
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

.menuicon-activities, .menuicon-meals{
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
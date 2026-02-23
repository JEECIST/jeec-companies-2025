<template>
    <AppHeader></AppHeader>
  <div class="landing-container">
    

    <main class="main-content">
      <div v-if="userStore.isLoggedIn">
        <div class="company-container">
          <div v-if="userStore.company_image != null" class="item">
            <img :src="userStore.company_image" :alt="userStore.company_name" />
          </div>
          <h1 class="company-name">{{userStore.company_name}}</h1>
        </div>
        <div class="gradient-line"></div>

  
        <div class="options">
          <div class="option" @click="router.push('/activities')">
            <img src="../../../assets/activities.svg" alt="Activities" class="icon" />
            <p class="label">Activities</p>
          </div>
          <!-- <div class="option" @click="goToMeals">
            <img src="../../../assets/meals.svg" alt="Meals" class="icon" />
            <p class="label">Meals</p>
          </div> -->
          <div class="option" @click="router.push('/connections')">
            <img src="/src/assets/connections.png" alt="Connections" class="game-img">
            <p class="label">JEEConnections</p>
          </div>

          <div class="option" @click="router.push('/wordle')">
            <img src="/src/assets/wordle.png" alt="Wordle" class="game-img">
            <p class="label">JEECdle</p>
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
import axios from 'axios'
import { useUserStore } from "@/stores/user";
import AppHeader from '../components/AppHeader.vue';

const userStore = useUserStore();

const router = useRouter()

const goToActivities = () => {
  router.push('/activities')
}

const goToMeals = () => {
  router.push('/meals')
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
    link.setAttribute('download', 'curriculos_JEEC25.zip')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  } catch (error) {
    console.error('Failed to download resumes:', error)
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
.company-name {
    font-size: 2rem;
    margin: 1rem 0;
    font-weight: bold;
}

.company-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.item {
  max-height: 300px;
  height: 15vh;
  background: #efeeee;
  border-radius: 20px;
  aspect-ratio: 1.7 / 1;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  transition:
    transform 0.2s ease-in-out,
    box-shadow 0.2s ease-in-out,
    border-color 0.2s ease-in-out; 

  border: 4px solid rgba(39, 158, 255, 1);

  box-shadow: 
    0 4px 8px rgba(0, 0, 0, 0.15),
    0 0 15px rgba(39, 158, 255, 0.6),
    inset 0 0 10px rgba(39, 158, 255, 0.3);
}

.item a img {
  display: block; /* Remove o espaço extra na base de elementos inline */
}

.item img {
  max-width: 90%;
  max-height: 90%;
  scale: 0.99;
  object-fit: contain;
}

.gradient-line {
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
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  column-gap: 1rem;
  padding-top: 5vh;
  margin: 0 auto;
  justify-items: center;
}

.option {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.game-img {
  width: 25vw;
  height: 25vw;
  max-width: 150px;
  max-height: 150px;
  margin-bottom: 0.5rem;
  cursor: pointer;
}

.icon {
    width: 25vw;
    height: 25vw;
    max-width: 150px;
    max-height: 150px;
    margin-bottom: 0.5rem;
    cursor: pointer;
    filter: brightness(0) saturate(100%) invert(45%) sepia(91%) saturate(1342%) hue-rotate(178deg) brightness(102%) contrast(104%);
}

.label {
    font-size: 1.1rem;
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
</style>
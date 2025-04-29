<template>
  <div class="landing-container">
    <header class="header">
      <router-link to="/menu">
          <img src="../../../assets/jeec-logo.svg" alt="JEEC Logo" class="logo" />
      </router-link>

      <div class="menu-icon">
        &#9776;
      </div>
    </header>

    <main class="main-content">
      <div v-if="companyStore.companyData">
        <h1 class="company-name">{{companyStore.companyData.name}}</h1>
  
        <div class="options">
          <div class="option" @click="goToActivities">
            <img src="../../../assets/activities.svg" alt="Activities" class="icon" />
            <p class="label">Activities</p>
          </div>
          <div class="option" @click="goToMeals">
            <img src="../../../assets/meals.svg" alt="Meals" class="icon" />
            <p class="label">Meals</p>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useCompanyStore } from '@/stores/company'

const companyStore = useCompanyStore()
    
onMounted(async () => {
  await companyStore.fetchCompany()
  console.log('Company:', companyStore.companyData)
})
  
const router = useRouter()

const goToActivities = () => {
  router.push('/activities')
}

const goToMeals = () => {
  router.push('/meals')
}





</script>

<style scoped>
  .landing-container {
      background-color: #1e1e1e;
      color: white;
      min-height: 100vh;
      font-family: 'Poppins', sans-serif;
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
      letter-spacing: 1px;
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
      border-top: 2px solid #279EFF;
      padding-top: 0.3rem;
  }
</style>
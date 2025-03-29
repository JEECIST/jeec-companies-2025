<template>
    <div class="landing-container">
      <header class="header">
        <img src="../../../assets/jeec-logo.svg" alt="JEEC Logo" class="logo" />
        <div class="language-switch">
          <span @click="setLang('en')">EN</span> |
          <span @click="setLang('pt')">PT</span>
        </div>
        <div class="menu-icon">
          &#9776;
        </div>
      </header>
  
      <main class="main-content">
        <h1 class="company-name">PLACE HOLDER COMPANY NAME</h1>
  
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
      </main>
    </div>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router'
  import i18n from '@/i18n'
  
  const router = useRouter()
  
  const goToActivities = () => {
    router.push('/activities')
  }
  
  const goToMeals = () => {
    router.push('/meals')
  }
  
  const setLang = (lang) => {
    i18n.global.locale.value = lang
    localStorage.setItem('locale', lang)
    // reload current route with new lang param if necessary
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
        height: 30px;
    }

    .language-switch {
        font-size: 0.9rem;
        cursor: pointer;
    }

    .menu-icon {
        font-size: 1.5rem;
        cursor: pointer;
    }

    .company-name {
        font-size: 1.5rem;
        margin: 2rem 0;
        font-weight: bold;
        letter-spacing: 1px;
    }

    .options {
        display: flex;
        justify-content: center;
        gap: 3rem;
        flex-wrap: wrap;
    }

    .icon {
        width: 70px;
        height: 70px;
        margin-bottom: 0.5rem;
        filter: brightness(0) saturate(100%) invert(45%) sepia(91%) saturate(1342%) hue-rotate(178deg) brightness(102%) contrast(104%);
    }

    .label {
        font-size: 1.1rem;
        font-weight: 600;
        border-top: 2px solid #279EFF;
        padding-top: 0.3rem;
    }
</style>
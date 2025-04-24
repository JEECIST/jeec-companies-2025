<template>
    <div class="landing-container">

        <header class="header">
      <router-link to="/login">
        <img src="../../../assets/jeec-logo.svg" alt="JEEC Logo" class="logo" />
      </router-link>
      
      <div class="language-switch">
        <span @click="setLang('en')">EN</span> |
        <span @click="setLang('pt')">PT</span>
      </div>
      <div class="menu-icon">&#9776;</div>
    </header>

    <div class="meals-container">
        <h1 class="titleh1">Activities</h1>
   
    <jobFairCard @scan-qr="handleScanEvent" />
    </div>


    </div>
</template>
<script setup>
import i18n from '@/i18n'
import jobFairCard from '../components/jobFairCard.vue'; 

const handleScanEvent = (eventId) => {
  alert(`Scanning QR for event ID: ${eventId}`);
  // Add QR scanning logic here
};
const setLang = (lang) => {
    i18n.global.locale.value = lang
    localStorage.setItem('locale', lang)
    
}
</script>
<style>
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
  font-size: 1rem;
  cursor: pointer;
}

.menu-icon {
  font-size: 1.5rem;
  cursor: pointer;
}


.titleh1 {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 20px;
  color: white;
  text-shadow: 0 0 10px #279EFF;
}


</style>
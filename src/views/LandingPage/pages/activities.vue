<template>
  <div class="landing-container">
    <appHeader />
    
    <div>
      <h1 class="titleh1">Activities</h1>
    </div>

    <div v-if="!QR_enable" class="jobFairdiv">
      <template v-for="activity in activities" :key="activity.activity_ex_id">
        <jobFairCard 
          :date="activity.day" 
          :id="activity.activity_ex_id" 
          @scan-qr="activateReader"
        />
      </template>
      <div v-if="activities.length == 0" class="text-gray-500 text-center mt-4">
        No activities available.
      </div>
    </div>
    <div v-if="QR_enable" class="camDiv">
      <div class="dim-overlay"></div>

        <div class="scanner">
          <button @click="deactivateReader" class="closeQR-button">
            <img src="../../../assets/CloseQR.png">
          </button>

          <div v-if="scanned_flag" class="scanned-pop-up">
            <p>Successfully added points to {{ student_username }}</p>
            <button @click="scannedPopUp">
              <img src="../../../assets/check.svg">
            </button> 
          </div>

          <div v-if="error_flag" class="scanned-pop-up">
            <p>Failed to add points</p>
            <button @click="errorPopUp">
              <img src="../../../assets/check.svg">
            </button> 
          </div>

          <QrcodeStream @decode="onDecode" @init="onInit" @error="onError" />
        </div>
    </div>
  </div>

  
</template>


<script setup>
import { useRouter } from 'vue-router'
import jobFairCard from '../components/jobFairCard.vue'; 
import { QrcodeStream } from 'vue3-qrcode-reader';
import { onMounted, ref } from 'vue';
import axios from 'axios'
import { useUserStore } from "@/stores/user";

import appHeader from '@/views/LandingPage/components/appHeader.vue'


const router = useRouter()
const activities = ref([]);
const student_username = ref('');
const QR_enable = ref(false);
const scanned_flag = ref(false);
const error_flag = ref(false);
const userStore = useUserStore()
    

const selectedActivity = ref(null);





function logout_company() {
  userStore.logoutUser(); // Reset the user state
  router.push('/login');
}


function activateReader() {
  QR_enable.value = true;
};

function deactivateReader() {
  QR_enable.value = false;
}

function scannedPopUp() {
  scanned_flag.value = false;
  student_username.value = "";
}

function errorPopUp() {
  error_flag.value = false;
}


function onDecode(student_external_id) {
  axios.post(import.meta.env.VITE_APP_JEEC_BRAIN_URL + '/jobfair_scan',
    {
      student_external_id: student_external_id,  
      activity_external_id: selectedActivity.value.activity_ex_id
    },
    {auth: {
      username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME,
      password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY
    }
  })
    .then(response => {
      if (response.data.errorQR == "") {
        scanned_flag.value = true;
        student_username.value = response.data.student_username;
      }else{
        error_flag.value = true;
      }
    })
    .catch(error => {
      console.error("Error scanning QR Code:", error);
      error_flag.value = true;
    });
  }


  function onInit(promise) {
    promise.catch(error => {
      console.error("Could not initialize the QR scanner:", error);
    });
  }

  function onError(error) {
    console.error("QR  Scanner Error:", error);
  }

  function fetchData() {
    const company_id = userStore.getCompanyID;
    
    axios.post(import.meta.env.VITE_APP_JEEC_BRAIN_URL+'/dashboard_vue/activitiesdashboard_vue',
      { company_id: company_id },
      { auth: {
          username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME, 
          password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY
        }
      }
    ).then(response => {
      activities.value = response.data.activities;
      activities.value = response.data.activities;
      selectedActivity.value = activities.value[0]; 
    });
  }

onMounted(fetchData);
const showMenu = ref(false)
const toggleMenu = () => {
  showMenu.value = !showMenu.value
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
.scanner video {
  width: 100%;
  height: auto;
  border-radius: 10px;
  object-fit: cover;
  margin-top: 0; 
}
.camDiv {
  display: flex;
  justify-content: center;
}
.dim-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6); 
  z-index: 900;
  backdrop-filter: blur(10px); 

}

.scanner {
  position: relative;
  z-index: 1000; 
  width: 90%;
  max-width: 500px;
}

.closeQR-button {
  position: absolute;
  margin-top: 0.5rem;
  margin-left: 9rem;
  z-index: 1000;
  border: none;
  background: transparent;
  width: 40px;
  height: 40px;
  cursor: pointer;
}

.closeQR-button img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.scanned-pop-up {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  position: absolute;
  z-index: 1000;
  margin-top: 30vh;
  left: 0; 
  right: 0; 
  margin-inline: auto; 
  width: fit-content;
  background-color: var(--c-bg-light);
  border-radius: 10px;
  height: 10%;
  width: 50%;
  opacity: 80%;
}

.scanned-pop-up > button {
  border: none;
  border-radius: 10px;
  height: 2.5rem;
  width: 2.5rem;
  background-color: var(--c-select);
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



.titleh1 {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 20px;
  color: white;
  text-shadow: 0 0 10px #279EFF;
}

.jobFairdiv{
  display: flex;
  justify-content: center;
  align-items: center; 
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
  margin-right: 0.1rem;
}
</style>
<template>
  <div class="landing-container">
    <header class="header">
      <router-link to="/menu">
        <img src="../../../assets/jeec-logo.svg" alt="JEEC Logo" class="logo" />
      </router-link>
      
      <div class="menu-icon" @click="toggleMenu">&#9776;</div>
    </header>
    <div v-if="showMenu" class="popup-menu">
      <ul>
        
        <li @click="router.push('/activities')"><img src="../../../assets/activities.svg"class="menuicon-activities">Activities</li>
        <li @click="router.push('/meals')"><img src="../../../assets/meals.svg" class="menuicon-meals">Meals</li>
        <li @click="router.push('/changePw')"><img src="../../../assets/lock-icon.svg" class="menuicon-lock">Change password</li>
        <li @click="router.push('/login')"><img src="../../../assets/logout-icon.svg" class="menuicon-logout">  Logout  </li>
      </ul>
    </div>

    <div class="meals-container">
        <h1 class="titleh1">Activities</h1>
        <div class="jobFairdiv">
          <template v-for="activity in activities" :key="activity.activity_ex_id">
            <jobFairCard 
              :date="activity.day" 
              :id="activity.activity_ex_id" 
              @scan-qr="activateReader"
            />
          </template>
        </div>

          

    </div>
    <div class="scanner" v-if="QR_enable">
          <button @click="deactivateReader" class="closeQR-button">
            <img src="../../../assets/CloseQR.png">
          </button>
          <div v-if="scanned_flag" class="scanned-pop-up">
            <p>Successfully added points to {{ student_username }}</p>
            <button @click="scannedPopUp">
              <img src="../../assets/check.svg">
            </button> 
          </div>
          <div v-if="error_flag" class="scanned-pop-up">
            <p>Failed to add points</p>
            <button @click="errorPopUp">
              <img src="../../assets/check.svg">
            </button> 
          </div>
          <QrcodeStream @decode="onDecode" @init="onInit" @error="onError"></QrcodeStream>
        </div>
  </div>
</template>


<script setup>
import { useRouter } from 'vue-router'
import jobFairCard from '../components/jobFairCard.vue'; 
import { QrcodeStream } from 'vue3-qrcode-reader';
import { onMounted, ref } from 'vue';
import axios from 'axios'
import { useCompanyStore } from '@/stores/company'

const router = useRouter()
const activities = ref([]);
const QR_enable = ref(false);
const scanned_flag = ref(false);
const error_flag = ref(false);
const companyStore = useCompanyStore();
const selectedActivity = ref(null);
function activateReader() {
  console.log("Activating QR Reader");
  QR_enable.value = true;
};

function deactivateReader() {
  console.log("Deactivating QR Reader");
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
  console.log("id: ",selectedActivity.value.activity_ex_id);
  console.log("QR Code Content:", student_external_id);
 
  // console.log("Activity:", selectedRow.value.external_id);
  // let debug = "28a0b7f0-bb3a-4b91-b230-adce4e729eb8"; 
  axios.post(import.meta.env.VITE_APP_JEEC_BRAIN_URL + '/company/jobfair_scan',
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
      console.log('what',response.data);
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
    const company_id = 3; // debug
    console.log('Fetching activities...');
    axios.post(import.meta.env.VITE_APP_JEEC_BRAIN_URL+'/dashboard_vue/activitiesdashboard_vue',
      { company_id: company_id },
      { auth: {
          username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME, 
          password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY
        }
      }
    ).then(response => {
      console.log('Response data:', response.data);
      activities.value = response.data.activities;

      // Log the day of each activity
      activities.value.forEach(activity => { //useless array?
        // console.log('Activity day:', activity.day);
        // console.log(activity.activity_ex_id);
      });
      activities.value = response.data.activities;
      selectedActivity.value = activities.value[0]; // there's only 1 jobfair per day per company?

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
  margin-top: 60px; 
}



.closeQR-button {
  position: absolute;
  margin-top: 0.7rem;
  margin-left: 10rem;
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
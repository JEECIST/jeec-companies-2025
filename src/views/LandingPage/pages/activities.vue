<template>
  <AppHeader></AppHeader>

  <div class="landing-container">
    <div class="camDiv">
      <div class="dim-overlay"></div>

      <div class="scanner">
        <button @click="deactivateReader" class="closeQR-button">
          <img src="../../../assets/CloseQR.png">
        </button>
        <QrcodeStream @decode="onDecode" @init="onInit" @error="onError" />
      </div>

      <div v-if="scanned_flag" class="scanned-pop-up">
        <p>Successfully added points to {{ student_name }}</p>
        <button @click="scannedPopUp">
          <img src="../../../assets/check.svg">
        </button>
      </div>

      <div v-if="error_flag" class="error-pop-up">
        <p v-if="!camera_error_flag">Failed to add points!</p>
        <p>Error: {{ error_msg }}</p>
        <button @click="errorPopUp">
          X
        </button>
      </div>
    </div>
  </div>


</template>


<script setup>
import { useRouter } from 'vue-router'
import { QrcodeStream } from 'vue3-qrcode-reader';
import { defineEmits, ref } from 'vue';
import axios from 'axios'
import { useUserStore } from "@/stores/user";
import AppHeader from '../components/AppHeader.vue';

const emit = defineEmits(['home']);

const router = useRouter()
const student_name = ref('');
const scanned_flag = ref(false);
const error_flag = ref(false);
const error_msg = ref("");
const userStore = useUserStore()
const camera_error_flag = ref(false)

function deactivateReader() {
  router.push('/menu');
}

function scannedPopUp() {
  scanned_flag.value = false;
  student_name.value = "";
}

function errorPopUp() {
  camera_error_flag.value = false;
  error_flag.value = false;
  error_msg.value = "";
}


// function onDecode(student_external_id) {
//   axios.post(import.meta.env.VITE_APP_JEEC_BRAIN_URL + '/jobfair_scan',
//     {
//       student_external_id: student_external_id,

//     },
//     {
//       auth: {
//         username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME,
//         password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY
//       }
//     })
//     .then(response => {
//       if (response.data.errorQR == "") {
//         scanned_flag.value = true;
//         student_name.value = response.data.student_name;
//       } else {
//         error_flag.value = true;
//       }
//     })
//     .catch(error => {
//       console.error("Error scanning QR Code:", error);
//       error_flag.value = true;
//     });
// }

async function onDecode(student_external_id) {
  error_flag.value = false;
  scanned_flag.value = false;
  const response = await axios.post(import.meta.env.VITE_APP_JEEC_BRAIN_URL + '/jobfair_scan',
    {
      student_external_id: student_external_id,
      company_id: userStore.company_id
    },
    {
      auth: {
        username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME,
        password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY
      }
    });

  if (response.data.errorQR !== "") {
    error_flag.value = true;
    error_msg.value = response.data.errorQR;
  } else {
    scanned_flag.value = true;
    student_name.value = response.data.student_name
  }
}


async function onInit() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });

  } catch (error) {
    camera_error_flag.value = true;
    error_flag.value = true;
    if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
      error_msg.value = "Denied camera access";
    } else if (error.name === 'NotFoundError') {
      error_msg.value = "No camera device found."
    } else {
      error_msg.value = "Unknown error occurred."
    }
  }
}

function onError(error) {
  error_flag.value = true;
  error_msg.value = error;
}

// function fetchData() {
//   const company_id = userStore.getCompanyID;

//   axios.post(import.meta.env.VITE_APP_JEEC_BRAIN_URL + '/dashboard_vue/activitiesdashboard_vue',
//     { company_id: company_id },
//     {
//       auth: {
//         username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME,
//         password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY
//       }
//     }
//   ).then(response => {
//     activities.value = response.data.activities;
//     activities.value = response.data.activities;
//     selectedActivity.value = activities.value[0];
//   });
// }

// onMounted(fetchData);

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
  margin-top: 60vh;
  left: 0;
  right: 0;
  margin-inline: auto;
  width: 60%;
  border-radius: 10px;
  height: fit-content;
  padding: 1rem;
  opacity: 80%;

  background-color: #1a9cff9a;
}

.scanned-pop-up>button {
  margin-top: 0.5rem;
  border: none;
  border-radius: 10px;
  height: 2.5rem;
  width: 2.5rem;
  background-color: #0091ffc5;
}

.error-pop-up {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  position: absolute;
  z-index: 1000;
  margin-top: 60vh;
  left: 0;
  right: 0;
  margin-inline: auto;
  width: 60%;
  border-radius: 10px;
  height: fit-content;
  padding: 1rem;
  opacity: 80%;

  background-color: rgba(255, 0, 0, 0.466);
}

.error-pop-up>button {
  margin-top: 0.5rem;
  border: none;
  border-radius: 10px;
  height: 2.5rem;
  width: 2.5rem;
  background-color: rgba(255, 0, 0, 0.596);
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

.jobFairdiv {
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
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5);
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

.menuicon-activities,
.menuicon-meals {
  width: 1.5rem;
  height: 1rem;
  margin-right: 0.3rem;
}

.menuicon-lock {
  width: 1.5rem;
  height: 1.1rem;
  margin-right: 0.3rem;
}

.menuicon-logout {
  width: 1.5rem;
  height: 0.9rem;
  margin-right: 0.1rem;
}
</style>
<template>
  <div class="landing-container">
    <header class="header">
      <router-link to="/login">
        <img src="../../../assets/jeec-logo.svg" alt="JEEC Logo" class="logo" />
      </router-link>
      
      <div class="menu-icon">&#9776;</div>
    </header>

    <div class="meals-container">
        <h1 class="titleh1">Activities</h1>
        <div class="jobFairdiv">
          <jobFairCard @scan-qr="activateReader" />
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
  import jobFairCard from '../components/jobFairCard.vue'; 
  import { QrcodeStream } from 'vue3-qrcode-reader';
  import { ref } from 'vue';


const QR_enable = ref(false);
const scanned_flag = ref(false);
const error_flag = ref(false);


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
    console.log("QR Code Content:", student_external_id);
    // console.log("Activity:", selectedRow.value.external_id);
    // let debug = "28a0b7f0-bb3a-4b91-b230-adce4e729eb8"; 
    axios.post(import.meta.env.VITE_APP_JEEC_BRAIN_URL + '/company/jobfair_scan', {
      student_external_id: student_external_id,  
      activity_external_id: selectedRow.value.external_id},
      {auth: {
        username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME,
        password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY
      }
    })
    .then(response => {
      console.log(response.data);
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
.scanner {
  max-width: 800px;
  height: 100%;
}

.closeQR-button {
  position: absolute;
  z-index: 1000;
  margin-top: 10px;
  margin-left: 10px;
  border: none;
  background: transparent;
  width: 10px;
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
      font-size: 25px;
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
</style>
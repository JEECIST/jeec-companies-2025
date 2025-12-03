<template>
    <div class="change-password-container">
        
      <appHeader />
  
      <main class="content">
        <h1 class="title">Change Password</h1>
  
        <form @submit.prevent="handleChangePassword" class="password-form" autocomplete="off">
          <div class="input-group">
            <div class="input-wrapper">
              <input
                :type="showOldPassword ? 'text' : 'password'"
                id="old-password"
                v-model="oldPassword"
                placeholder="Old Password"
                autocomplete="new-password"
                required
              />
              <span class="eye-icon" @click="toggleOldPasswordVisibility">
                <img
                  :src="showOldPassword ? eyeOffIcon : eyeIcon"
                  alt="Toggle Old Password Visibility"
                  class="eye-image"
                />
              </span>
            </div>
          </div>
  
          <div class="input-group">
            <div class="input-wrapper">
              <input
                :type="showNewPassword ? 'text' : 'password'"
                id="new-password"
                v-model="newPassword"
                placeholder="New Password"
                autocomplete="new-password"
                required
              />
              <span class="eye-icon" @click="toggleNewPasswordVisibility">
                <img
                  :src="showNewPassword ? eyeOffIcon : eyeIcon"
                  alt="Toggle New Password Visibility"
                  class="eye-image"
                />
              </span>
            </div>
          </div>
  
          <div class="input-group">
            <div class="input-wrapper">
              <input
                :type="showConfirmPassword ? 'text' : 'password'"
                id="confirm-password"
                v-model="confirmPassword"
                placeholder="New Password Confirmation"
                autocomplete="new-password"
                required
              />
              <span class="eye-icon" @click="toggleConfirmPasswordVisibility">
                <img
                  :src="showConfirmPassword ? eyeOffIcon : eyeIcon"
                  alt="Toggle Confirm Password Visibility"
                  class="eye-image"
                />
              </span>
            </div>
          </div>
  
          <button @click="changePassword" type="submit" class="submit-button">Update Password</button>
        </form>
      </main>
    </div>
  </template>
  
  <script setup>
  import { onMounted, ref } from 'vue';
  import { useRouter } from 'vue-router';
  import eyeIcon from '../../../assets/eye.svg';
  import eyeOffIcon from '../../../assets/hide-eye.svg';
  import { useUserStore } from "../../../stores/user";
  import axios from "axios"
  import CryptoJS from 'crypto-js';

  import appHeader from '@/views/LandingPage/components/appHeader.vue'

  const userStore = useUserStore();


  function logout_company() {
    userStore.logoutUser(); // Reset the user state
    router.push('/login');
  }
  
  const router = useRouter();
  const showMenu = ref(false);
  const oldPassword = ref('');
  const newPassword = ref('');
  const confirmPassword = ref('');
  const showOldPassword = ref(false);
  const showNewPassword = ref(false);
  const showConfirmPassword = ref(false);
  const decrypted = ref('')
  
  const toggleMenu = () => {
    showMenu.value = !showMenu.value;
  };
  
  const toggleOldPasswordVisibility = () => {
    showOldPassword.value = !showOldPassword.value;
  };
  
  const toggleNewPasswordVisibility = () => {
    showNewPassword.value = !showNewPassword.value;
  };
  
  const toggleConfirmPasswordVisibility = () => {
    showConfirmPassword.value = !showConfirmPassword.value;
  };
  
  const handleChangePassword = () => {
    if (newPassword.value !== confirmPassword.value) {
      alert('New passwords do not match!');
      return;
    }
  };

  function getPassword(){
    let username = userStore.getUsername
    axios.post(import.meta.env.VITE_APP_JEEC_BRAIN_URL + '/getpassword',
    {
      username: username
    },
    {auth: {
      username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME,
      password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY
    }
  })
    .then(response => {
      let encrypted = response.data.password;
      decrypted.value = CryptoJS.DES.decrypt(encrypted, import.meta.env.VITE_APP_API_KEY).toString(CryptoJS.enc.Utf8);
    });
  }

  function changePassword(){
    if(oldPassword.value != decrypted.value){
      alert("Old password is incorrect")
      return
    }

    if(newPassword.value == decrypted.value){
      alert("New password can't be the same as the old password")
      return
    }

    if(newPassword.value != confirmPassword.value){
      alert("Confirmation password doesn't match new password")
      return
    }

    let new_password_encrypted = CryptoJS.DES.encrypt(newPassword.value, import.meta.env.VITE_APP_API_KEY).toString();
    let username = userStore.getUsername
    axios.post(import.meta.env.VITE_APP_JEEC_BRAIN_URL + '/changepassword',
    {
      username: username,
      new_password: new_password_encrypted
    },
    {auth: {
      username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME,
      password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY
    }
    })
    .then(response => {
        if(response.data != ''){
          alert("Change password failed!")
        }else{
          alert("Password changed successfully!")
          router.push("/menu")
        }
    });
  }


  onMounted(getPassword)
  </script>
  
  <style scoped>
  
  .change-password-container {
    background-color: #1e1e1e;
    color: white;
    min-height: 100vh;
    font-family: 'Poppins', sans-serif;
    padding: 1rem;
    display: flex;
    flex-direction: column;
  }
  
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0.5rem;
    flex-shrink: 0;
  }
  
  .logo {
    height: 50px;
    cursor: pointer;
  }
  
  .menu-icon {
    font-size: 30px;
    cursor: pointer;
    padding-bottom: 1rem;
  }
  
  .popup-menu {
    position: absolute;
    top: 60px;
    right: 20px;
    background-color: #333;
    border-radius: 10px;
    
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5);
    z-index: 1000;
    width: max-content;
  }
  
  .popup-menu ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .popup-menu li {
    padding: 0.75rem 1.5rem;
    color: white;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;
    display: flex;
    align-items: center;
    gap: 0.8rem;
    font-size: 0.9rem;
  }
  
  .popup-menu li:hover {
    background-color: #444;
  }
  
  .content {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 3rem;
  }
  
  .title {
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  display: inline-block;
  position: relative; 

  border-bottom: 2px solid transparent;
  border-image: linear-gradient(to right,
      rgba(39, 158, 255, 0) 0%, 
      rgba(39, 158, 255, 1) 20%,
      rgba(39, 158, 255, 1) 80%,
      rgba(39, 158, 255, 0) 100%
    ) 1; 
  border-image-slice: 1;
}
  
  .password-form {
    width: 100%;
    max-width: 450px;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    margin-top: 2rem;
    align-items: center;
  }
  
  .input-group {
    width: 100%;
  }
  
  .input-wrapper {
    position: relative;
    width: 100%;
    border-bottom: 2px solid #279eff;
    padding-bottom: 0.3rem;
    display: flex;
    align-items: center;
  }
  
  .input-wrapper input {
    flex-grow: 1;
    background-color: transparent;
    border: none;
    color: white;
    font-size: 1rem;
    padding: 0.5rem 0;
    outline: none;
    margin-right: 5px;
  }
  
  .input-wrapper input::placeholder {
    color: #ccc;
    opacity: 1;
    font-size: 0.9rem;
  }
  
  .eye-icon {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 5px;
    flex-shrink: 0;
  }
  
  .eye-image {
    width: 20px;
    height: auto;
    display: block;
  }
  
  .submit-button {
    padding: 10px 20px;
    font-size: 1rem;
    
    font-weight: bold;
    color: white;
    background: transparent;
    border: 2px solid #279EFF;
    border-radius: 5px;
    cursor: pointer;
    transition: 0.3s;
  }
  
  .submit-button:hover {
    background: #279EFF;
    color: black;
    }
  
  .submit-button:active {
    transform: scale(0.98);
  }
  
  @media (max-width: 768px) {
    .title {
      font-size: 1.6rem;
    }
  
    .password-form {
      max-width: 90%;
    }
  
    .submit-button {
      
      max-width: 300px;
    }
  }
  
  @media (max-width: 480px) {
      .header {
          padding: 0 0.2rem;
      }
      .logo {
          height: 50px;
      }
      .menu-icon {
          font-size: 30px;
      }
      .title {
          font-size: 1.4rem;
      }
      .input-wrapper input {
          font-size: 0.9rem;
      }
      .input-wrapper input::placeholder {
          font-size: 0.8rem;
      }
       .eye-image {
          width: 18px;
      }
      .submit-button {
          font-size: 0.9rem;
          padding: 0.7rem 1.2rem;
      }
      .popup-menu {
          right: 10px;
          top: 55px;
      }
      .popup-menu li {
          padding: 0.6rem 1.2rem;
      }
  }
  </style>
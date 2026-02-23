import { defineStore } from "pinia";
import { useRouter } from "vue-router";
import CryptoJS from 'crypto-js'
import axios from 'axios'
import {ref} from 'vue'

const router = useRouter();
const companyData = ref(null);

export const useUserStore = defineStore("user", {
  state: () => ({
    username: "",
    company_id: "",
    company_name: "",
    company_external_id: "",
    company_image: null,
    cvs_access: false,
    loggedIn: false,
    loggedInState: false,
  }),
  getters: {
    getUsername: (state) => state.username,
    getCompanyID: (state) => state.company_id,
    getCompanyName: (state) => state.company_name,
    getCompanyExternalID: (state) => state.company_external_id,
    getCvAccess: (state) => state.cvs_access,
    isLoggedIn: (state) => state.loggedIn,

  },
  actions: {
    testUserStore(username,password){
      console.log(username);
      console.log(password);
    },
    async getAccess(username, password) {
      try {
        const response = await axios.post(
          import.meta.env.VITE_APP_JEEC_BRAIN_URL + '/login_company',
          { username },
          {
            auth: {
              username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME,
              password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY,
            },
          }
        );
    
        const { password: password_received,
                company_id: company_id_received,
                company_name: company_name_received,
                company_external_id: company_external_id_received,
                cvs_access: cvs_access_received, 
                company_image: company_image} = response.data;
    
        if (password_received !== "") {
          const password_decrypted = CryptoJS.DES.decrypt(password_received, import.meta.env.VITE_APP_API_KEY).toString(CryptoJS.enc.Utf8);
    
          if (password.normalize() === password_decrypted.normalize()) {
            this.loginUser(username, company_id_received, company_name_received, company_external_id_received, cvs_access_received, company_image);
            console.log("Login success");
            return true;
          } else {
            this.logoutUser();
            console.log("Login Failed");
            return false;
          }
        }
        companyData.value = response.data
        this.logoutUser();
        return false;
      } catch (error) {
        console.error("Login error:", error);
        this.logoutUser();
        return false;
      }
    },
    loginUser(username, company_id, company_name, company_external_id, cvs_access, company_image){
      this.username = username;
      this.company_id = company_id;
      this.company_name = company_name;
      this.company_external_id = company_external_id;
      this.loggedIn = true;
      this.cvs_access = cvs_access;
      this.company_image = company_image;
    },
    logoutUser(){
      this.$reset();
      this.loggedInState = false;
      this.loggedIn = false;
      localStorage.removeItem("user");
    },
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: "user",
        storage: localStorage,
      },
    ],
  },
});

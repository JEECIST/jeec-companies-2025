import { defineStore } from "pinia";
import { useRouter } from "vue-router";
import CryptoJS from 'crypto-js'
import axios from 'axios'


const router = useRouter();

export const useUserStore = defineStore("user", {
  state: () => ({
    username: "",
    company_id: "",
    company_name: "",
    company_external_id: "",
    loggedIn: false,
    loggedInState: false,
  }),
  getters: {
    getUsername: (state) => state.username,
    getCompanyID: (state) => state.company_id,
    getCompanyName: (state) => state.company_name,
    getCompanyExternalID: (state) => state.company_external_id,
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
    
        const { password: password_received, company_id: company_id_received, company_name: company_name_received, company_external_id: company_external_id_received} = response.data;
    
        if (password_received !== "") {
          const password_decrypted = CryptoJS.DES.decrypt(password_received, import.meta.env.VITE_APP_API_KEY).toString(CryptoJS.enc.Utf8);
    
          if (password.normalize() === password_decrypted.normalize()) {
            this.loginUser(username, company_id_received, company_name_received, company_external_id_received);
            console.log("Login success");
            return true;
          } else {
            this.logoutUser();
            console.log("Login Failed");
            return false;
          }
        }
    
        this.logoutUser();
        return false;
      } catch (error) {
        console.error("Login error:", error);
        this.logoutUser();
        return false;
      }
    },
    loginUser(username, company_id, company_name, company_external_id){
      this.username = username;
      this.company_id = company_id;
      this.company_name = company_name;
      this.company_external_id = company_external_id;
      this.loggedIn = true;
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

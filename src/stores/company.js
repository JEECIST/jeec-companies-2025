import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useCompanyStore = defineStore('company', () => {
  const companyData = ref(null)

  const fetchCompany = async () => {
    try {
      const response = await axios.get(import.meta.env.VITE_APP_JEEC_BRAIN_URL + '/company/static', {
        auth: {
          username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME,
          password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY
        }
      })
      companyData.value = response.data
    } catch (error) {
      console.error('Error fetching company:', error)
    }
  }

  return {
    companyData,
    fetchCompany
  }
})

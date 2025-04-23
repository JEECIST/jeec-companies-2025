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
        <div class="menu-icon">
          &#9776;
        </div>
      </header>
      <div class="meals-container">
        <h1 class="title">Meals</h1>
    
        <!-- Meals Table -->
        <table class="meals-table">
          <thead>
            <tr>
              <th>Meal</th>
              <th>Day</th>
              <th>Time</th>
              <th>Location</th>
              <th>Dish</th>
            </tr>
          </thead>
          <tbody>
            <tr 
              v-for="meal in meals" 
              :key="meal.date" 
              @click="selectMeal(meal)"
              :class="['meal-row', selectedMeal === meal ? 'selected' : '']"
            >
              <td>{{ meal.type }}</td>
              <td>{{ meal.date }}</td>
              <td>{{ meal.time }}</td>
              <td>{{ meal.location }}</td>
              <td>{{ meal.dish }}</td>
            </tr>
          </tbody>
        </table>
    
        <!-- Add Meal Button -->
        <button class="add-meal-btn" @click="showAddMealModal = true">
          Add a Meal <span class="plus-icon">+</span>
        </button>
    
        <!-- Add Meal Modal -->
        <div v-if="showAddMealModal" class="modal">
          <div class="modal-content">
            <h2>NEW MEAL</h2>
            <p>Choose your dish:</p>

              <!-- EVENTUALLY CHANGE THIS TO A CROSS TOP RIGHT CORNER -->
            <button @click="showAddMealModal = false" class="close-btn">Close</button> 
            
          </div>
        </div>
      </div>
    </div>

  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import { useCompanyStore } from '@/stores/company'
  import axios from 'axios'

  const selectedMeal = ref(null)
  
  const meals = ref([]);
  const showAddMealModal = ref(false);
  const companyStore = useCompanyStore()
  const fetchDishes = async (eventDayId) => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_APP_JEEC_BRAIN_URL + '/get_dish_ids',
        {
          params: { event_day_id: eventDayId },
          auth: {
            username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME,
            password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY
          }
        }
      )
      return response.data.dishes
    } catch (error) {
      console.error('Error fetching dishes for day', eventDayId, error)
      return []
    }
  }




  onMounted(async () => {
  await companyStore.fetchCompany()

  if (Array.isArray(companyStore.companyData.days)) {
    const fetchedMeals = await Promise.all(
      companyStore.companyData.days.map(async (dateStr, index) => {
        const dateObj = new Date(dateStr)
        const dayAbbrev = dateObj.toLocaleDateString('en-US', { weekday: 'short' }) 
        const day = String(dateObj.getDate()).padStart(2, '0')
        const month = String(dateObj.getMonth() + 1).padStart(2, '0') 
        const formattedDate = `${dayAbbrev} - ${day}/${month}`

        const dishes = await fetchDishes(index + 1) // event_day_id = 1 (Mon) to 5 (Fri)
        const dishNames = dishes.map(d => d.name).join(', ') || '—'

        return {
          date: formattedDate,
          type: 'Lunch',
          time: '12h00',
          location: 'TIC',
          dish: dishNames
        }
      })
    )

    meals.value = fetchedMeals
  }
})
  const selectMeal = (meal) => {
    selectedMeal.value = meal
    console.log('Selected meal:', meal)
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


    
  .meals-container {
    background-color: #1e1e1e;
    color: white;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    font-family: 'Poppins', sans-serif;
  }
  

  .title {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 20px;
    color: white;
    text-shadow: 0 0 10px #279EFF;
  }
  
 
  .meals-table {
    width: 80%;
    border-collapse: collapse;
    margin-bottom: 20px;
  }
  
  .meals-table th, .meals-table td {
    padding: 10px;
    text-align: center;
    border-bottom: 2px solid #279EFF;
  }
  
  
  .add-meal-btn {
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
  
  .add-meal-btn:hover {
    background: #279EFF;
    color: black;
  }
  
  .plus-icon {
    font-size: 1.2rem;
  }
  
  
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .modal-content {
    background: #222;
    padding: 20px;
    border-radius: 10px;
    text-align: center;
    color: white;
  }
  
  .modal-content input {
    display: block;
    margin: 10px auto;
    padding: 8px;
    width: 80%;
    background: transparent;
    border: 2px solid #279EFF;
    color: white;
  }
  
  .close-btn {
    background:transparent;
    color: white;
   
    padding: 10px;
    margin-top: 10px;
    cursor: pointer;
  }

.meal-row {
  cursor: pointer;
  transition: background 0.2s;
}
.meal-row:hover {
  background-color: rgba(255, 255, 255, 0.1);
}
.meal-row.selected {
  background-color: #279EFF;
  color: black;
}
  </style>
  
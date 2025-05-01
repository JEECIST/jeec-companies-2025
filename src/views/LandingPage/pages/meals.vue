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
        
        <li @click="router.push('/activities')"><img src="../../../assets/activities.svg" class="menuicon-activities">Activities</li>
        <li @click="router.push('/meals')"><img src="../../../assets/meals.svg" class="menuicon-meals">Meals</li>
        <li @click="router.push('/changePw')"><img src="../../../assets/lock-icon.svg" class="menuicon-lock">Change password</li>
        <li @click="logout_company"><img src="../../../assets/logout-icon.svg" class="menuicon-logout">  Logout  </li>
      </ul>
    </div>

    <div class="meals-container">
      <h1 class="title">Meals</h1>
      <table class="meals-table">
        <thead>
          <tr>
            <th>Meal</th>
            <th>Day</th>
            <th>Time</th>
            <!-- <th>Location</th> -->
            <th>Dishes</th>
          </tr>
        </thead>
        <tbody>
          <tr 
            v-for="meal in meals" 
            :key="meal.date" 
            @click="selectMeal(meal)"
            :class= "['meal-row', selectedMeal === meal ? 'selected' : '']"
          >
            <td>{{ meal.type }}</td>
            <td>{{ meal.date }}</td>
            <td>{{ meal.time }}</td>
            <!-- <td>{{ meal.location }}</td> -->
            <td v-html="meal.dish"></td>
          </tr>
        </tbody>
      </table>

      <button class="add-meal-btn" @click="openAddMealModal">
        Add a Meal <span class="plus-icon">+</span>
      </button>
      <div v-if="showAlert" :class="['message-box', messageType]">
        {{ message }}
      </div>
    </div>
    
    <div v-if="showAddMealModal" class="modal">
      <div class="modal-content">
        <h2>New Meal</h2>
        <p>Choose no more than 3 dishes:</p>

        <div class="dish-options">
          <div v-for="dish in dishesForSelectedDay" :key="dish.id" class="dish-option">
            <label class="quantity-container">
              <span class="dish-name">{{ dish.name }}</span>
              <!-- <span class="dish-type">({{ dish.description }})</span> -->
              <input
                type="number"
                min="0"
                :max="dish.max || 3"
                :value="dishQuantities[dish.id]"
                @input="updateQuantity(dish.id, $event.target.value)"
                class="quantity-input"
                placeholder="0"
              />
            </label>
          </div>
        </div>
        <button @click="showAddMealModal = false" class="close-btn">Close</button>
        <button @click="submitMeal" class="add-meal-btn" :disabled="totalQuantity > 3">Submit</button>
        
      </div>
    </div>
 

  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ref, onMounted, watch, computed } from "vue";
import { useCompanyStore } from '@/stores/company'
import axios from 'axios'
const message = ref('')
const messageType = ref('')
const showAlert = ref(false)
const meals = ref([])
const showAddMealModal = ref(false)
const showMenu = ref(false)
const router = useRouter()
const selectedMeal = ref(null)
const dishesForSelectedDay = ref([])
const selectedDishIds = ref([])
const dishQuantities = ref({}) 
const totalQuantity = computed(() =>
 Object.values(dishQuantities.value).reduce((sum, q) => sum + q, 0)
);
const companyStore = useCompanyStore()

import { useUserStore } from "../../../stores/user";

const userStore = useUserStore();


function logout_company() {
  userStore.logoutUser(); // Reset the user state
  router.push('/login');
}

const fetchDishes = async (eventDayId) => {
  try {
    const response = await axios.get(
      import.meta.env.VITE_APP_JEEC_BRAIN_URL + '/get_dishes_with_quantities',
      {
        params: {
          event_day_id: eventDayId,
          company_id: companyStore.companyData.id
        },
        auth: {
          username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME,
          password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY
        }
      }
    )
    return response.data.dishes
  } catch (error) {
    console.error('Error fetching dishes with quantities:', error)
    return []
  }
}


const fetchDishQuantities = async (companyId) => {
  try {
    const response = await axios.get(
      import.meta.env.VITE_APP_JEEC_BRAIN_URL + '/get_dish_quantities',
      {
        params: { company_id: companyId },
        auth: {
          username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME,
          password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY
        }
      }
    )
    return response.data.quantities
  } catch (error) {
    console.error('Error fetching dish quantities:', error)
    return {}
  }
}

const openAddMealModal = async () => {
  if (!selectedMeal.value) {
    showAlertMessage('Please select a Day first.','error')
    return
  }

  const dishes = await fetchDishes(selectedMeal.value.eventDayId)
  dishesForSelectedDay.value = dishes
  
  selectedDishIds.value = []

  const quantities = await fetchDishQuantities(companyStore.companyData.id)

  dishQuantities.value = {}
  dishes.forEach(dish => {
    dishQuantities.value[dish.id] = quantities[dish.id] ?? 0 // get existing or default to 0
  })

  showAddMealModal.value = true
}


const selectMeal = (meal) => {
  selectedMeal.value = meal
  // console.log('Selected meal:', meal)
}
onMounted(async () => {
  await companyStore.fetchCompany()
  await fetchMeals();
  // if (Array.isArray(companyStore.companyData.days)) {
  //   const fetchedMeals = await Promise.all(
  //     companyStore.companyData.days.map(async (dateStr) => {
  //       const dateObj = new Date(dateStr)

  //       const weekday = dateObj.getDay() // 0 (Sun) to 6 (Sat)
  //       const eventDayId = weekday === 0 ? null : weekday // 1 (Mon) to 5 (Fri)

  //       if (eventDayId < 1 || eventDayId > 5) {
  //         return null // Skip if not Mon–Fri
  //       }

  //       const dayAbbrev = dateObj.toLocaleDateString('en-US', { weekday: 'short' }) 
  //       const day = String(dateObj.getDate()).padStart(2, '0')
  //       const month = String(dateObj.getMonth() + 1).padStart(2, '0') 
  //       const formattedDate = `${dayAbbrev} - ${day}/${month}`

  //       const dishes = await fetchDishes(eventDayId)
  //       const dishNames = dishes
  //         .filter(d => d.quantity > 0)
  //         .map(d => `${d.quantity} ${d.description}`)
  //         .join(', ') || '—'
  //       return {
  //         date: formattedDate,
  //         type: 'Lunch',
  //         time: '12h00',
  //         location: 'TIC',
  //         dish: dishNames,
  //         eventDayId
  //       }
  //     })
  //   )

  //   meals.value = fetchedMeals.filter(Boolean) // remove nulls
  // }
  
})


const submitMeal = async () => {
  if (totalQuantity.value > 3) {
    message.value = "You can only choose a total of 3 dishes.";
    messageType.value = 'error';
    showAlert.value = true;
    return;
  }

  const companyId = companyStore.companyData.id;
  const payloads = Object.entries(dishQuantities.value)
    .filter(([_, quantity]) => quantity >= 0)
    .map(([dishId, quantity]) => ({
      company_id: companyId,
      dish_id: parseInt(dishId),
      dish_quantity: quantity,
    }));

  try {
    await Promise.all(
      
      payloads.map((payload) =>
        axios.post(
          import.meta.env.VITE_APP_JEEC_BRAIN_URL + '/create_update_meal',
          payload,
          {
            auth: {
              username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME,
              password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY,
            },
          }
        )
      )
    );
    showAlertMessage('Meals submitted successfully!', 'success')
    await fetchMeals();
    showAddMealModal.value = false;
  } catch (error) {
    console.error("Error submitting meals:", error);
    showAlertMessage('Error submitting meals.', 'error')
  }
};

const fetchMeals = async () => {
  try {
    const fetchedMeals = await Promise.all(
      companyStore.companyData.days.map(async (dateStr) => {
        const dateObj = new Date(dateStr);
        const weekday = dateObj.getDay();
        const eventDayId = weekday === 0 ? null : weekday; 

        if (eventDayId < 1 || eventDayId > 5) {
          return null; // Skip if not Mon–Fri
        }

        const dayAbbrev = dateObj.toLocaleDateString('en-US', { weekday: 'short' });
        const day = String(dateObj.getDate()).padStart(2, '0');
        const month = String(dateObj.getMonth() + 1).padStart(2, '0');
        const formattedDate = `${dayAbbrev} - ${day}/${month}`;

        const dishes = await fetchDishes(eventDayId);
        const dishNames = dishes
          .filter(d => d.quantity > 0)
          .map(d => `<span class="highlight">${d.quantity}</span> ${d.name}`)
          .join(', ') || '—';

        return {
          date: formattedDate,
          type: 'Lunch',
          time: '12h00',
          // location: 'TIC',
          dish: dishNames,
          eventDayId
        };
      })
    );

    meals.value = fetchedMeals.filter(Boolean); // Remove nulls
  } catch (error) {
    console.error("Error fetching meals:", error);
  }
};


const updateQuantity = (dishId, value) => {
  const number = parseInt(value, 10)
  dishQuantities.value[dishId] = isNaN(number) || number < 0 ? 0 : number
}

const toggleMenu = () => {
  showMenu.value = !showMenu.value
}

const showAlertMessage = (text, type, duration = 3000) => {
  message.value = text
  messageType.value = type
  showAlert.value = true

  setTimeout(() => {
    showAlert.value = false
  }, duration)
}
</script>

<style scoped>
.landing-container {
  background-color: #1e1e1e;
  color: white;
  min-height: 100vh;
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
  height: 50px;
}

.language-switch {
  font-size: 1rem;
  cursor: pointer;
}

.menu-icon {
      font-size: 30px;
      padding-bottom: 1rem;
      cursor: pointer;
  }
.meals-container {
  background-color: #1e1e1e;
  color: white;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
}

.title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 20px;
  color: white;
  text-shadow: 0 0 10px #279EFF;
}

.meals-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.meals-table th, .meals-table td {
  padding: 10px;
 
  text-align: center;
  border-bottom: 2px solid #279EFF;
}

.add-meal-btn, .close-btn{
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

.add-meal-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}



.plus-icon {
  font-size: 1.2rem;
}

h2 {
  color: #279EFF;
  margin-bottom: 15px;
}

.checkbox-container {
  display: flex;
  align-items: center;
  position: relative;
  padding-left: 35px;
  cursor: pointer;
  font-size: 16px;
  user-select: none;
}

.checkbox-container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 20px;
  width: 20px;
  background-color: #333;
  border: 2px solid #279EFF;
  border-radius: 4px;
}

.checkbox-container:hover input ~ .checkmark {
  background-color: #3a3a3a;
}

.checkbox-container input:checked ~ .checkmark {
  background-color: #279EFF;
}

.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

.checkbox-container input:checked ~ .checkmark:after {
  display: block;
}

.checkbox-container .checkmark:after {
  left: 6px;
  top: 2px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
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

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7); 
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(10px); 
}

.modal-content {
  background: #121212;
  padding: 25px;
  border-radius: 6px; 
  max-width: 400px;
  width: 80%;
  color: #f0f0f0; 
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
}

h2 {
  font-size: 1.6em;
  font-weight: bold; 
  margin-bottom: 15px;
  color: #ddd;
}

p {
  color: #aaa;
  font-size: 1em;
  margin-bottom: 20px;
}

.dish-options {
  text-align: left;
  margin-top: 15px;
}

.dish-option {
  margin-bottom: 10px; 
  display: flex;
  align-items: center;
}


.dish-name {
  padding-top: 0.95rem;
  margin-left: 12%;
  font-weight: 200;
  max-width: 50%;
}

.dish-type {
  padding-top: 0.95rem;
  margin-left: 5px;
  color: #666;
  font-size: 1em;
}

.quantity-input {
  margin-left:auto;
  margin-right: 16%;
  width: 40px;
  padding: 6px 0; 
  border: none; 
  border-bottom: 1px solid #666; 
  border-radius: 0; 
  text-align: center;
  background-color: transparent;
  color: #f0f0f0;
  font-size: 1em;
  outline: none; 
  appearance: textfield;
}

button {
  background-color: transparent;
  color: #88bdff;
  padding: 10px 15px;
  border: 1px solid #88bdff;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 20px;
  margin-right: 10px;
  font-size: 1em;
  transition: background-color 0.3s ease, color 0.3s ease;
}

button:hover {
  background-color: rgba(136, 189, 255, 0.1);
  color: #ccddff;
}

button:disabled {
  color: #555;
  border-color: #555;
  cursor: not-allowed;
}

.quantity-container {
  display: flex;
  align-items: center; 
  width: 100%;
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
  margin-right: 0.2rem;
}

::v-deep .highlight {
  color: #6310d1;
  font-weight: bold;
}

.message-box {
  z-index: 100000;
  padding: 1rem;
  margin-top: 2rem;
  border-radius: 5px;
  text-align: center;
}
.message-box.success {
  background-color: #d4edda;
  color: #155724;
}
.message-box.error {
  background-color: #f8d7da;
  color: #721c24;
}

</style>

<template>
  <div class="landing-container">
    <appHeader />
    
    <div>
      <h1 class="titleh1">Parking</h1>
    </div>
    <div class="cars-list">
      <div v-for="(car, index) in company_cars" :key="index" class="car-item">
        <div class="day-card">
          <h3>{{ car.day }}</h3>
          <div class="button_div">
            <template v-if="car.plate">
          <!-- Se já houver matrícula -->
              <input
                type="text"
                v-model="new_plate[car.day]"
                class="car-input"
              />
              <button @click="editCar(car)" class="add-car-btn">Edit</button>
            </template>

            <template v-else>
              <!-- Se ainda não houver matrícula -->
              <input
                type="text"
                placeholder="XX-XX-XX"
                class="car-input"
                v-model="new_plate[car.day]"
              />
              <button @click="addCar(car)" class="add-car-btn">Add Car</button>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { useRouter } from 'vue-router'
import { onMounted, ref } from 'vue';
import axios from 'axios'
import { useUserStore } from "@/stores/user";

import appHeader from '@/views/LandingPage/components/appHeader.vue'

const router = useRouter()
const userStore = useUserStore()

const company_id = userStore.getCompanyID;

const new_plate = ref([]);

const company_cars = ref([])

async function fetchCars() {
  try {
    const response = await axios.get(
      import.meta.env.VITE_APP_JEEC_BRAIN_URL + '/get_cars',
      { 
        params: { company_id: company_id },
        auth: {
          username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME, 
          password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY
        }
      }
    );

    company_cars.value = response.data.company_cars;

    console.log("Fetched cars for company ID:", company_id);
    console.log("Company cars:", company_cars);

    new_plate.value = [];

    for (const car of company_cars.value) {
      new_plate.value[car.day] = car.plate;
    }

  } catch (err) {
    console.error("Erro ao buscar carros:", err);
  }
}

// regex que aceita apenas ASCII A-Z e 0-9, com traço ASCII
const plateRegex = /^[A-Z0-9]{2}-[A-Z0-9]{2}-[A-Z0-9]{2}$/;

function validatePlate(plate) {
  console.log("Validating plate:", plate);

  // força string, remove espaços à volta e normaliza para maiúsculas
  const raw = (plate === null || plate === undefined) ? "" : String(plate);

  // substituir quaisquer traços Unicode por hífen ASCII
  const normalized = raw.trim()

  if (!normalized || !plateRegex.test(normalized)) {
    return false;
  }

  return true;
}


async function addCar(car) {

  console.log("Adding car for day:", car.day, "with plate:", new_plate.value[car.day]);

  var plate = new_plate.value[car.day];

  if (!validatePlate(plate)) {
    alert("Formato inválido! Use XX-XX-XX");
    return;
  }

  try {
    const response = await axios.post(import.meta.env.VITE_APP_JEEC_BRAIN_URL + '/add_car',
      { company_id: company_id, plate: plate, day: car.day },
      { auth: {
          username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME,
          password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY
        }
      }
    );

    if (response.data.error) {
      alert("Erro: " + response.data.error);
    } else {
      new_plate[car.day] = '';
    }

  } catch (err) {
    console.error(err);
    alert("Erro ao adicionar carro");
  }

  fetchCars();
}

async function editCar(car) {

  var plate = new_plate.value[car.day];

  if (!validatePlate(plate) && plate != "") {
    alert("Formato inválido! Use XX-XX-XX");
    return;
  }

  try {
    const response = await axios.post(import.meta.env.VITE_APP_JEEC_BRAIN_URL + '/edit_car',
      { company_id: company_id, car_id: car.id, plate: plate, day: car.day },
      { auth: {
          username: import.meta.env.VITE_APP_JEEC_WEBSITE_USERNAME,
          password: import.meta.env.VITE_APP_JEEC_WEBSITE_KEY
        }
      }
    );

    if (response.data.error) {
      alert("Erro: " + response.data.error);
    }
    
  } catch (err) {
    console.error(err);
    alert("Erro ao atualizar carro");
  }

  fetchCars();
}

onMounted(() => {
  fetchCars();
});
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

.titleh1 {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 20px;
  color: white;
  text-shadow: 0 0 10px #279EFF;
}

.add-car-btn, .close-btn{
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

.add-car-btn:hover {
  background: #279EFF;
  color: black;
}

.add-car-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.plus-icon {
  font-size: 1.2rem;
}

.plate-input {
  text-align: center;
}

.cars-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
}

.day-card {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #1a2a3a;
  color: #e0e0e0;
  padding: 5px 15px;
  border-radius: 8px;
  font-family: sans-serif;
  border: 1px solid #279EFF;
  box-shadow: 0 0 8px rgba(39, 158, 255, 0.5);
  max-width: 400px;
  min-height: 120px;
  box-sizing: border-box;
  gap: 2rem;
  width: 400px;
  margin-bottom: 1rem;
}

.button_div {
  display: flex;
  flex-direction: column; /* organiza em coluna */
  gap: 8px;               /* espaço entre elementos */
  align-items: stretch;   /* faz input e botão terem mesma largura */
}

.button_div input {
  padding: 10px 20px;
  font-size: 0.75rem;
  font-weight: bold;
  color: white;
  background: transparent;
  border: 2px solid #279EFF;
  border-radius: 5px;
  text-align: center;
}

.actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
}


</style>
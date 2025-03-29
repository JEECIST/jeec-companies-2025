<template>
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
          <tr v-for="meal in meals" :key="meal.id">
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
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import axios from "axios";
  
  // State
  const meals = ref([]);
  const showAddMealModal = ref(false);

  </script>
  
  <style scoped>

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
    color: #279EFF;
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
  </style>
  
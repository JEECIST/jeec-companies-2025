<template>
    <div class="whole-header">
        <header class="header">
            <router-link to="/menu">
                <img src="../../../assets/jeec-logo.svg" alt="JEEC Logo" class="logo" />
            </router-link>

            <div class="menu-icon" @click="toggleMenu">
                &#9776;
            </div>
        </header>
        <div v-if="showMenu" class="popup-menu">
            <ul>
                <li @click="router.push('/menu')"><img src="../../../assets/home.svg"
                        class="menuicon">Menu</li>
                <li @click="router.push('/activities')"><img src="../../../assets/activities.svg"
                        class="menuicon">Activities</li>
                <li @click="router.push('/connections')"><img :src="ConnectionsLogo"
                        class="menuicon">JEEConnections</li>
                <li @click="router.push('/wordle')"><img :src="WordleLogo"
                        class="menuicon">JEECdle</li>
                <!-- <li @click="router.push('/meals')"><img src="../../../assets/meals.svg" class="menuicon">Meals</li> -->
                <li @click="router.push('/changePw')"><img src="../../../assets/lock-icon.svg" style="width: 1.2rem;"
                        class="menuicon">Change password</li>
                <li @click="logout_company"><img src="../../../assets/logout-icon.svg" class="menuicon"> Logout
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { useUserStore } from "@/stores/user";
import ConnectionsLogo from "@/assets/connections.png"
import WordleLogo from "@/assets/wordle.png"

const userStore = useUserStore();


function logout_company() {
    userStore.logoutUser(); // Reset the user state
    router.push('/login');
}


const showMenu = ref(false)

const toggleMenu = () => {
    showMenu.value = !showMenu.value
}

const router = useRouter()
</script>

<style scoped>
.whole-header {
    background-color: #1e1e1e;
    color: white;
    padding: 1rem;
    padding-bottom: 0;
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

.menu-icon {
    font-size: 30px;
    padding-bottom: 1rem;
    cursor: pointer;
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
    display: flex;
    flex-direction: row;
    align-items: center;
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
    height: auto;
    margin-right: 0.3rem;
}

.menuicon-games {
    width: 1.5rem;
    height: auto;
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
    margin-right: 0.2rem;
}

.menuicon{
    height: 1.2rem;
    width: auto;
    margin-right: 0.7rem;
    min-width: 1rem;
    max-width: 1.2rem;
}
</style>
<template>
  <div class="job-fair-card">
    <div class="card-info">
      <div class="info-title">

        <h2 class="title">{{ title }}</h2>
        <img
          src="../../../assets/house.svg"
          alt="X"
          class="icon building-icon"
        />
      </div>
      <p class="date"><strong> {{ formattedDate }}</strong></p>
      <p class="id" v-html="'ID: ' + formattedId"></p>

    </div>

    <button class="card-action" @click="handleScanClick">
      <div class="action-text-container">
          <span class="action-text">Press to Scan<br>QR codes</span>
          <img
              src="../../../assets/arrow.svg"
              alt="arrow "
              class= "arrow-icon"
          />
      </div>
      <img
          src="../../../assets/qrcode.svg"
          alt="QR "
          class="icon scanner-icon"
          />
    </button>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, computed} from 'vue';

const props = defineProps({
  title: {
    type: String,
    default: 'Job Fair',
  },
  date: {
    type: String,
    default: 'Monday, 5 May',
  },
  id: {
    type: [String, Number],
    default: '199999',
  },
});

const emit = defineEmits(['scan-qr']);

const handleScanClick = () => {
  console.log('Scan QR action triggered');
  emit('scan-qr', props.id);
};

const formattedDate = computed(() => {
  const date = new Date(props.date);
  console.log('newdate ',date)
  if (isNaN(date)) return props.date; // if invalid date, show as-is

  const weekday = date.toLocaleDateString('en-US', { weekday: 'long' });
  const day = date.getDate();
  const month = date.toLocaleDateString('en-US', { month: 'long' });

  return `${weekday}, ${day} ${month}`;
});

const formattedId = computed(() => {
  const str = String(props.id);
  const maxLength = 20;
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength) + '<br>' + str.slice(maxLength);
});

</script>

<style scoped>
.job-fair-card {
  display: flex;
  justify-content: space-between;
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
}

.card-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2px;
}

.info-title {
  display: flex;
  align-items: center;
  gap: 8px;
}

.title {
  
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
  color: #ffffff;
}

.date {
  font-size: 1rem;
  margin: 0;
  margin-top: 0.2rem;
  margin-right: auto;
  color: white;
  max-width: 150px;
  text-align: left;
}
.id {
  font-size: 0.8rem;
  margin-top: 1.2rem;
  padding-top: 0.7rem;
  margin-right: auto;
  color: white;
  max-width: 200px;
  text-align: left;
  word-break: break-word;
}

.icon {
  display: inline-block;
  vertical-align: middle;
}

.building-icon {
  width: 20px;
  height: 20px;
  filter: brightness(0) invert(1);
}

.card-action {
  display: flex;
  align-items: center;
  gap: 10px;
  background: none;
  border: none;
  padding: 5px;
  cursor: pointer;
  color: inherit;
  border-radius: 4px;
  transition: background-color 0.2s ease;
}

.card-action:hover,
.card-action:focus {
    background-color: rgba(255, 255, 255, 0.1);
    outline: none;
}

.action-text-container {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    text-align: right;
    margin-right: 5px;
}

.action-text {
  padding-top: 0%;
  font-size: 0.8rem;
  color: #8abcdf;
  line-height: 1.2;
}

.action-arrow {
    font-size: 1.2rem;
    color: #279EFF;
    line-height: 1;
}

.scanner-icon {
  width: 90px;
  height: 85px;
  border: none;
  border-radius: 4px;
  padding: 2px;
  box-sizing: border-box;
}

.arrow-icon {
  width: 20px;
  height: 20px;
}
</style>
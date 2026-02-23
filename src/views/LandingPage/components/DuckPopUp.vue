<template>
    <div class="qrcode-wrapper">
        <div class="qrcode-backdrop" @click="exitPopUp()"></div>
        <div id="qrcode" class="qrcode-card">
            <button @click="exitPopUp()" aria-label="Close the QR Code">
                <div></div>
                <div></div>
            </button>
            <h2 v-if="duckState == 'happy'">Pure skill, zero luck, 100% duck!</h2>
            <h2 v-if="duckState == 'sad'" style="font-style: italic;">*Sad quack*</h2>
            <div class="scan">
                <div class="gif-container">
                    <img v-if="duckState == 'happy'" :src="DuckGif" alt="Pato Duck Dance Sticker" class="pato-gif" />
                    <img v-if="duckState == 'sad'" :src="SadDuckGif" alt="Pato Duck Dance Sticker" class="pato-gif" />
                </div>
            </div>

        </div>
    </div>
</template>

<script setup>
import DuckGif from "@/assets/pato-duck.gif"
import SadDuckGif from "@/assets/sad-shuba-shuba.gif"

const emit = defineEmits(['close'])

const props = defineProps({
    duckState: {
        type: String,
        default: '',
    },
    points: {
        type: Number,
        default: null,
    }
})

function exitPopUp() {
    emit("close")
}

</script>

<style scoped>
.points_duck {
    height: auto;
    width: 2em;
}

.gif-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    /* Garante que o contentor não tem fundo */
    background-color: transparent;
}

.pato-gif {
    /* Podes ajustar o tamanho aqui se necessário */
    max-width: 100%;
    height: auto;
    /* Garante que a própria imagem não ganha fundo */
    background: transparent;
}


.qrcode-wrapper {
    position: fixed;
    z-index: 200;
    inset: 0;
    width: 100%;
    height: 100svh;
}


.qrcode-backdrop {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.75);
}

.qrcode-card {
    position: absolute;
    left: 50%;
    top: 50%;
    translate: -50% -50%;

    width: min(92vw, 520px);
    height: auto;

    padding: 22px 22px 26px;
    border-radius: 34px;

    /* dark glass panel */
    background: linear-gradient(180deg,
            rgba(8, 14, 22, 0.96) 0%,
            rgba(5, 10, 16, 0.96) 100%);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);

    /* blue outline */
    border: 2px solid rgba(25, 156, 255, 0.95);

    box-shadow:
        0 26px 70px rgba(0, 0, 0, 0.65),
        inset 0 1px 0 rgba(255, 255, 255, 0.08);

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;

    color: white;
}

.qrcode-card>button {
    position: absolute;
    top: 18px;
    right: 18px;

    border: none;
    background: transparent;
    cursor: pointer;

    width: 34px;
    height: 34px;
    border-radius: 10px;

    display: grid;
    place-items: center;

    opacity: 0.9;
}

.qrcode-card>button:hover {
    opacity: 1;
    transform: scale(1.05);
}

.qrcode-card>button>div {
    height: 3px;
    width: 70%;
    background-color: rgba(255, 255, 255, 0.9);
    position: absolute;
    border-radius: 3px;
    left: 50%;
    top: 50%;
    translate: -50% -50%;
}

.qrcode-card>button>div:first-child {
    rotate: 45deg;
}

.qrcode-card>button>div:last-child {
    rotate: -45deg;
}

.qrcode-card>button:hover {
    scale: 1.1;
}

.qrcode-card>h2 {
    width: 100%;
    margin: 0;
    padding: 18px 52px 0 32px;
    /* left space for accent, right for close button */

    text-transform: none;
    font-size: 1.8rem;
    font-weight: 700;
    letter-spacing: 0.03em;
    color: rgba(255, 255, 255, 0.95);
    text-align: center;
}

.scan {
    width: min(320px, 74vw);
    aspect-ratio: 1;
    margin: 0;

    display: grid;
    place-items: center;

    border-radius: 22px;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.08);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06);
}

.qrcode {
    position: relative;
    top: 1.35px;
    scale: 1;
}
</style>

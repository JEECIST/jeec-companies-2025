<template>
  <footer>
    <div class="footer__left">
      <h2>Instituto Superior Técnico</h2>
      <p>Av. Rovisco Pais, 1049-001 Lisbon</p>
    </div>
    <div class="footer__right">
      <div class="footer__socials">
        <a href="https://www.facebook.com/JEECIST/"><img src="/src/assets/socials/facebook-logo.svg" alt="jeec's facebook page"></a>
        <a href="https://www.instagram.com/jeec.ist/"><img src="/src/assets/socials/instagram-logo.svg" alt="jeec's instagram account"></a>
        <a href="https://www.youtube.com/@JEECvideos"><img src="/src/assets/socials/youtube-logo.svg" alt="jeec's youtube channel"></a>
        <a href="https://pt.linkedin.com/company/jeecist"><img src="/src/assets/socials/linkedin-logo.svg" alt="jeec's linkedin page"></a>
      </div>
      
      <a href="mailto:jeecist@gmail.com" target="_blank" class="footer__email"><img src="/src/assets/socials/email.svg" alt="email"><p>jeecist@gmail.com</p></a>
    </div>

  </footer>
</template>

<style>
footer {
  color: var(--c-ft-light);
  background-color: var(--c-bg-lighter);
  border-radius: 5px 5px 0 0;
  box-shadow: 0px -5px 15px 0px rgba(0, 0, 0, 0.27);
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: row;
  text-align: center;
  padding: 2rem 0;
}

.footer__left > p {
  padding-top: 1.2rem;
}

.footer__right {
  display: flex;
  gap: 3rem;
}

.footer__socials {
  display: flex;
  gap: 1ch;
  align-items: center;
  padding: 2rem 0;
  flex-wrap: wrap;
}

.footer__socials a > img {
  width: 3ch;
} 

.footer__email {
  background: none;
  border: none;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  cursor: pointer;
  gap: 1ch;
}

.footer__email > img {
  height: 1.3rem;
}

.footer__email > p {
  text-decoration: underline;
}

@media screen and (max-width: 1200px){
  footer {
    flex-direction: column;
    justify-content: center;
  }

  .footer__socials {
    padding: 2rem 0 1rem 0;
  }

  .footer__left {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .footer__right {
    flex-direction: column;
    align-items: center;
    gap: 0;
  }
}
</style>

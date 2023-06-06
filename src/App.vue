<template>
  <header class="text-bg-dark">
    <div class="container">
      <nav>
        
        <div class="d-flex flex-wrap align-items-center justify-content-center ">
          
          <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            <li  class="ms-2 me-5"><router-link to="/" class="nav-link px-2 text-white"><img src="./assets/logo-no-background.png"  height="32" alt="..."> </router-link> </li>
            <li class="mt-1"><router-link to="/" class="nav-link px-2 text-white">Acceuil</router-link> </li>
            <li class="mt-1"><router-link to="/page" class="nav-link px-2 text-white">Factures</router-link></li>
            <li class="mt-1"><router-link to="/about" class="nav-link px-2 text-white">Ajouter</router-link></li>

          </ul>


        </div>
      </nav>
    </div>
  </header>








  <router-view />




</template>
<script>
import AOS from "aos";
import "animate.css";
export default{
  name:'app',
  mounted(){
    AOS.init();
  },
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;

}



nav {
  padding: 5px;
  align-items: center;
}

nav a{
  font-weight: bold;
  color: #4636b6;
}

nav a.router-link-exact-active {
  color: #fda803!important;
}
</style>

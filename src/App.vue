<template>
  <div id="app">
    <nav>
      <router-link to="/">Dashboard</router-link> |
      <router-link to="/equipos">Equipos</router-link> |
      <router-link to="/clientes">Clientes</router-link>
    </nav>

    <div class="container">
      <div class="sidebar">
        <Sidebar></Sidebar>
      </div>

      <div class="view">
        <router-view />
      </div>
    </div>

    <div class="footer">
      <Footer></Footer>
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/General/SidebarComponent.vue'
import Footer from '@/components/General/FooterComponent.vue'

export default {
  components: {
    Sidebar,
    Footer
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #001429;;
  display: flex;
  flex-direction: column; /* Coloca los elementos en columna */
  height: 100vh; /* Altura completa de la ventana */
  background: #ffffff;
}

nav {
  padding: 15px;
  background-color: #272729; /* Color de fondo para el navbar */
}

nav a {
  font-weight: bold;
  color: #435969;
}

nav a.router-link-exact-active {
  color: white;
}

.container {
  display: flex; /* Usar flexbox para el contenedor principal */
  flex: 1; /* Ocupa el espacio restante */
  margin-top: 0; /* Asegura que no haya margen superior */
}

.sidebar {
  width: 250px; /* Ancho fijo para la sidebar */
  background-color: #272729; /* Color de fondo para la sidebar */
  position: fixed; /* Fija la sidebar a la izquierda */
  height: 100%; /* Altura completa */
  top: 0; /* Alinea al principio de la página */
  left: 0; /* Alinea a la izquierda */
  overflow-y: auto; /* Permite desplazamiento si el contenido es más alto que la pantalla */
}

.view {
  flex: 1; /* Ocupa el espacio restante */
  padding: 20px; /* Espaciado interno */
  margin-left: 250px; /* Deja espacio para la sidebar */
  background-color: #ffffff; /* Color de fondo para la vista */
}
</style>
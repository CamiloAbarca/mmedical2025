<template>
    <div class="sidebar">
        <div class="title">
            <img :src="logo" alt="logo" height="70px">
        </div>
        <br>
        <div class="line"></div>
        <br>
        <br>
        <div class="menu">
                <b-button class="btnMenu" to="/">
                    <b-icon icon="clipboard-data" scale="1" variant="danger" style="margin-right: 8px;"></b-icon>
                    Dashboard
                </b-button>
                <br>
                <b-button class="btnMenu" to="/equipos">
                    <b-icon icon="display" scale="1" variant="warning" style="margin-right: 8px;"></b-icon>
                    Equipos
                </b-button>
                <br>
                <b-button class="btnMenu" to="/clientes">
                    <b-icon icon="person" scale="1" variant="info" style="margin-right: 8px;"></b-icon>
                    Clientes
                </b-button>
                <br>
                <b-button class="btnMenu" to="/configuracion">
                    <b-icon icon="gear-wide" scale="1" variant="success" style="margin-right: 8px;"></b-icon>
                    Configuración
                </b-button>
        </div>
    </div>
</template>

<script>
import logo from '@/assets/logomm.png'
export default {
    name: 'SidebarComponent',
    data() {
        return {
            logo
        };
    }
}
</script>

<style scoped>
.sidebar {
    /* Color de fondo gris */
    width: 300px;
    /* Ancho del div */
    height: 100vh;
    /* Alto del div */
    display: flex;
    /* Usar flexbox para el contenedor */
    flex-direction: column;
    /* Organizar los elementos en columna */
    padding: 20px;
    /* Espaciado interno */
    color: white;
    /* Color del texto */
    font-size: 20px;
    /* Tamaño de la fuente */
}

.title {
    margin-bottom: 10px;
    /* Espacio debajo del título */
}

.line {
    height: 2px;
    /* Altura de la línea divisoria */
    background-color: white;
    /* Color de la línea */
    margin-bottom: 10px;
    /* Espacio debajo de la línea */
}

.menu {
    display: flex;
    /* Usar flexbox para el menú */
    flex-direction: column;
    /* Organizar los elementos del menú en columna */
    font-size: 18px;
    /* Tamaño de la fuente del menú */

}

.btnMenu{
    background: #afeffa;
    color: #001429;
    border-radius: 20px; /* Bordes redondeados */
}
</style>
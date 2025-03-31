<template>
  <div class="footer">
    <div class="line"></div>
    <div class="dev">
      <p>Desarrollado por CabarcaDev para Mmedical</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FooterComponent',
}
</script>

<style scoped>
.footer {
  display: flex; /* Usar flexbox para centrar el contenido */
  flex-direction: column; /* Organizar los elementos en columna */
  align-items: center; /* Centrar horizontalmente */
  justify-content: center; /* Centrar verticalmente (si es necesario) */
  text-align: center; /* Alinear el texto al centro */
  margin-bottom: 20px;
}

.line {
  height: 1px; /* Altura de la línea */
  background-color: #001429; /* Color de la línea */
  width: 100%; /* Ancho de la línea (puedes ajustar esto) */
  margin-bottom: 10px; /* Espaciado arriba y abajo de la línea */
}

.dev p {
  margin: 0; /* Eliminar margen del párrafo */
}
</style>
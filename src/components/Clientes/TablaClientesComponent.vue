<template>
    <div>
        <b-table :items="items" :fields="fields" striped bordered hover responsive>
            <template #cell(name)="data">
                <b>{{ data.item.name }}</b>
            </template>
            <template #cell(age)="data">
                <b>{{ data.item.age }}</b>
            </template>
            <template #cell(email)="data">
                <b>{{ data.item.email }}</b>
            </template>
        </b-table>
    </div>
</template>

<script>
export default {
    name: 'TablaClientesComponent',
    data() {
        return {
            fields: [
                { key: 'name', label: 'Nombre' },
                { key: 'age', label: 'Edad' },
                { key: 'email', label: 'Correo Electrónico' }
            ],
            items: [
                { name: 'Juan Pérez', age: 30, email: 'juan.perez@example.com' },
                { name: 'María López', age: 25, email: 'maria.lopez@example.com' },
                { name: 'Carlos García', age: 35, email: 'carlos.garcia@example.com' }
            ]
        };
    }
};
</script>

<style scoped>
/* Puedes agregar estilos personalizados aquí si es necesario */
</style>
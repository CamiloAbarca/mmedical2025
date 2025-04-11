import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    items: [
      {
        id: 1,
        marca: 'Suntech Medical',
        modelo: 'Oscar2',
        nro_serie: '113626',
        fecha_ingreso: '2021-08-13',
        fecha_entrega: '2021-08-13',
        fecha_mantencion: '2022-08-12',
        estado: 'Despachado',
        detalle: 'Funciona correctamente',
        otroDetalle: 'Sin problemas',
        accesorios: 'Cargador, otros cables',
        id_cliente: 101
      },
    ],
    clientes: [
      {
        id: '101',
        razonSocial: 'Vidaintegra',
        rut: '96.617.350-5',
        centroMedico: 'Alameda',
        contacto: 'Cristobal Jaques',
        fono: '996560489',
        email: 'cjaques@vidaintegra.cl',
      },
      {
        id: '102',
        razonSocial: 'Vidaintegra',
        rut: '96.617.350-5',
        centroMedico: 'Puente Alto',
        contacto: 'Ana María Ossandón',
        fono: '923456791',
        email: 'iprecarchile@gmail.com',
      }
    ]
  },
  getters: {
    getItems(state) {
      return state.items;
    },
    getClientes(state) {
      return state.clientes; // Getter para obtener los clientes
    },
    getEquipos(state) {
      return state.items; // Getter para obtener los equipos
    }
  },
  mutations: {
    ADD_ITEM(state, item) {
      state.items.push(item); // Agrega el nuevo item al estado
    },
    UPDATE_ITEM(state, updatedItem) {
      const index = state.items.findIndex(item => item.id === updatedItem.id);
      if (index !== -1) {
        Vue.set(state.items, index, updatedItem); // Usar Vue.set para asegurar la reactividad
      }
    },
    DELETE_ITEM(state, itemId) {
      state.items = state.items.filter(item => item.id !== itemId); // Filtra el item a eliminar
    },
    ADD_CLIENTE(state, cliente) {
      state.clientes.push(cliente); // Agrega el nuevo cliente al estado
    },
    UPDATE_CLIENTE(state, updatedCliente) {
      const index = state.clientes.findIndex(cliente => cliente.id === updatedCliente.id);
      if (index !== -1) {
        Vue.set(state.clientes, index, updatedCliente); // Usar Vue.set para asegurar la reactividad
      }
    },
    DELETE_CLIENTE(state, clienteId) {
      state.clientes = state.clientes.filter(cliente => cliente.id !== clienteId); // Filtra el cliente a eliminar
    }
  },
  actions: {
    addItem({ commit }, item) {
      commit('ADD_ITEM', item); // Llama a la mutación para agregar el item
    },
    updateItem({ commit }, item) {
      commit('UPDATE_ITEM', item); // Llama a la mutación para actualizar el item
    },
    deleteItem({ commit }, itemId) {
      commit('DELETE_ITEM', itemId); // Llama a la mutación para eliminar el item
    },
    addCliente({ commit }, cliente) {
      commit('ADD_CLIENTE', cliente); // Llama a la mutación para agregar el cliente
    },
    updateCliente({ commit }, cliente) {
      commit('UPDATE_CLIENTE', cliente); // Llama a la mutación para actualizar el cliente
    },
    async deleteCliente({ commit }, clienteId) {
      commit('DELETE_CLIENTE', clienteId); // Llama a la mutación para eliminar el cliente
    }
  },
  modules: {
  }
});
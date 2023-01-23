<script setup></script>

<template>
  <select name="genere" id="genere">
    <option value="" disabled>--Selecciona la opcion--</option>
    <option v-for="genere in generes" :value="genere.id">{{ genere.nombre }}</option>
  </select>

  <table class="table table-striped table-hover table-responsive">
    <thead class="bg-dark">
      <tr class="text-white text-center">
        <th>Id</th>
        <th>ISBN</th>
        <th>Titulo</th>
        <th>Tema</th>
        <th>Autor</th>
        <th>Descripción</th>
        <th>Imagen</th>
      </tr>
    </thead>
    <tbody id="tableProducts">
      <!-- AQUI INSERTAMOS -->
      <tr class="text-success text-center" v-for="element in books" >
        <ElementBook :key="element" :book="element"></ElementBook>
      </tr>
      <tr class="text-success text-center" v-for="element in books">
        <ElementBook :key="element" :book="element"></ElementBook>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { useCounterStore } from "../stores/counter";
import ElementBook from "../components/ElementBook.vue";
import { mapState, mapActions } from "pinia";
export default {
  components: {
    ElementBook,
  },
  props: {
    id: String,
  },
  computed: {
    ...mapState(useCounterStore, {
      books: "books",
      generes: "generes",
    }),
  },
};
</script>

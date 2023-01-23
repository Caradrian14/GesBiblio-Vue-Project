<script setup>
</script>

<template>
 <table class="table table-striped table-hover table-responsive">
    <thead class="bg-dark">
      <tr class="text-white text-center">
        <th>Id</th>
        <th>Nombre</th>
        <th>Apellidos</th>
        <th>Nacionalidad</th>
        <th></th>
        <th>Datos del Autor</th>
        <th>Filtrar por Autor</th>
      </tr>
    </thead>
    <tbody id="tableProducts">
      <!-- AQUI INSERTAMOS -->

      <ElementAuthor
        v-for="element in authors"
        :key="element"
        :author="element"
        class="text-success"
      ></ElementAuthor>
    </tbody>
  </table>
  <span>Autores totales {{ authors.length }}</span>
</template>

<script>
import { useCounterStore } from "../stores/counter";
import ElementAuthor from "../components/ElementAuthor.vue";
import { mapState, mapActions } from "pinia";
export default {
  components: {
    ElementAuthor,
  },
  computed: {
    ...mapState(useCounterStore, {
      authors: "authors",
    }),
  },
};
</script>
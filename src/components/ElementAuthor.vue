<template>
  <tr class="text-success text-center">
    <td class="text-success">{{ author.id }}</td>
    <td class="text-success">{{ author.nombre }}</td>
    <td class="text-success">{{ author.apellidos }}</td>
    <td class="text-success">{{ author.nacionalidad }}</td>
    <td class="text-success">
      <img :src="'/src/assets/img/' + author.img" alt="imagen-autor" />
    </td>
    <td>
      <button class='btn btn-secondary edit'> <span class='material-icons' @click="$router.push(`/author-data/${author.id}`)">Datos del Autor</span></button>
    </td>
    <td>
      <button class='btn btn-secondary edit'> <span class='material-icons' @click="$router.push(`/books-filtered/${author.id}`)">Filtrar sus obras</span></button>
    </td>
  </tr>
</template>

<script>
import { useCounterStore } from "../stores/counter";
import { mapState, mapActions } from "pinia";
export default {
  props: {
    author: Object,
  },
  methods: {
    ...mapActions(useCounterStore, ["finishTodo", "openTodo", "deleteTodo"]),
    rediretToAuthor() {
      this.$router.push({ name: "AuthorData", params: { id: this.author.id } });
    },
    openThisTodo() {},
  },
};
</script>

<style></style>

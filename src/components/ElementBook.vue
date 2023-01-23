<template>
  <td class="text-success">{{ book.id }}</td>
  <td class="text-success">{{ book.ISBN }}</td>
  <td class="text-success">{{ book.nombre }}</td>
  <td class="text-success">{{ genere.nombre }}</td>
  <td class="text-success">{{ author.nombre }} {{ author.apellidos }}</td>
  <td class="text-success">{{ book.desc }}</td>
  <td class="text-success">
    <img :src="'/src/assets/img/' + book.img" alt="imagen-libro" />
  </td>
  <td>
    <button class="btn btn-secondary delete">
      <span class="material-icons" @click="$router.push(`/edit-book/${book.id}`)"
        >Editar</span
      >
    </button>
  </td>
  <td>
    <button class="btn btn-secondary open">
      <span class="material-icons" @click="deleteThisBook">Borrar</span>
    </button>
  </td>
  <td>
    <button class="btn btn-secondary finish">
      <span class="material-icons" @click="$router.push(`/author-data/${book.autor}`)"
        >Autor</span
      >
    </button>
  </td>
</template>

<script>
import { useCounterStore } from "../stores/counter";
import { mapState, mapActions } from "pinia";
export default {
  props: {
    book: Object,
  },
  methods: {
    ...mapActions(useCounterStore, ["deleteBook", "getAuthorById", "getGenereById"]),
    deleteThisBook() {
      this.deleteBook(this.book);
    },
  },
  async mounted() {
      this.author = (await this.getAuthorById(this.book.autor));
      this.genere = (this.getGenereById(this.book.tema));
  },
  data() {
    return {
      author: {},
      genere: {},
    };
  },
};
</script>

<style></style>

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
import axios from 'axios'

const url = 'http://localhost:3000';

export default {
  data() {
    return {
      books: {},
    };
  },
  components: {
    ElementBook,
  },
  props: {
    id: String,
  },
  methods: {
    ...mapActions(useCounterStore, ['getBooksByAuthor']),
    loadBooksAuthor(id){
      axios.get(url + '/libros?autor=' + id)
        .then(response => { this.books = response.data })

        .catch(response => {
          if (!response.status) {// Si el servidor no responde 'response' no es un objeto sino texto
            alert('Error: el servidor no responde');
          } else {
            alert('Error ' + response.status + ': ' + response.message);
          }
        })
    },
    loadAllBooks(){
      axios.get(url + '/libros')
        .then(response => { this.books = response.data })

        .catch(response => {
          if (!response.status) {// Si el servidor no responde 'response' no es un objeto sino texto
            alert('Error: el servidor no responde');
            console.log(response);
          } else {
            alert('Error ' + response.status + ': ' + response.message);
          }
        })
    }
  },
  computed: {
    ...mapState(useCounterStore, {
      generes: "generes",
    }),
  },
  async mounted() {
    if (this.id) {
      this.loadBooksAuthor(this.id)
    }else{
      this.loadAllBooks();
    }
  },
  watch: {
    id(newValue, oldValue) {
      this.books = useCounterStore.books;
    },
  },
};
</script>

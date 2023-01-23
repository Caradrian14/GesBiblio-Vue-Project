<template>
  <div>
    <h1>Formulario para insertar libros</h1>
    <div class="row">
      <div class="col-sm-6 col-md-4 col-lg-4 hideElement">
        <form id="new-prod">
          <fieldset>
            <legend class="bg-dark text-white text-center" v-if="id">Editar Libro</legend>
            <legend class="bg-dark text-white text-center" v-else>Añadir Libro</legend>
          </fieldset>
          <div class="form-group">
            <label for="newprod-id">ID:</label>
            <input
              type="text"
              id="newprod-id"
              class="form-control"
              v-model="book.id"
              disabled
            />
            <span class="error"></span>
          </div>

          <div class="form-group">
            <label for="newprod-name">Nombre:</label>
            <input
              type="text"
              id="newprod-name"
              class="form-control"
              minlength="2"
              maxlength="50"
              v-model="book.nombre"
              required
            />
            <span class="error"></span>
          </div>

          <div class="form-group">
            <label for="newprod-name">ISBN:</label>
            <input
              type="text"
              id="newprod-name"
              class="form-control"
              minlength="10"
              maxlength="10"
              v-model="book.ISBN"
              required
            />
            <span class="error"></span>
          </div>

          <div class="form-group">
            <label for="newprod-name">Genero:</label>
            <select name="genere" id="genere" v-model="book.tema">
              <option value="" disabled>--Selecciona el genero--</option>
              <option v-for="genere in generes" :value="genere.id">
                {{ genere.nombre }}
              </option>
            </select>

            <span class="error"></span>
          </div>

          <div class="form-group">
            <label for="newprod-name">Autor:</label>
            <select name="author" id="author" v-model="book.autor" required>
              <option value="" disabled>--Selecciona el/la autor--</option>
              <option v-for="author in authors" :value="author.id">
                {{ author.nombre }}
              </option>
            </select>

            <span class="error"></span>
          </div>

          <div class="form-group">
            <label for="newprod-name">Descripcion:</label>
            <textarea
              id="newprod-name"
              class="form-control"
              v-model="book.desc"
            ></textarea>
            <span class="error"></span>
          </div>

          <div class="form-group">
            <label for="newprod-name">Imagen:</label>
            <input
              type="text"
              id="newprod-name"
              class="form-control"
              v-model="book.img"
            />
            <span class="error"></span>
          </div>
          <button type="submit" class="btn btn-default btn-dark" v-if="id" @click="editNewBook">
            Editar
          </button>
          <button type="submit" class="btn btn-default btn-dark" v-else @click="addNewBook">
            Enviar
          </button>
          <button type="reset" class="btn btn-danger">Reset</button>
          <router-link to="/" class="button nav-link active">Cancelar</router-link>
        </form>
      </div>
    </div>
  </div>
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
  data() {
    return {
      book: {},
    };
  },
  computed: {
    ...mapState(
      useCounterStore,
      {
        generes: "generes",
        authors: "authors",
      },
    ),
    addNewBook() {
      if (this.book.nombre && this.book.ISBN && this.book.autor) {
        this.addBook(this.book);
      }
    },
    editNewBook() {
      if (this.book.nombre && this.book.ISBN && this.book.autor) {
        this.editBook(this.book);
      }
    },
  },
  methods: {
    ...mapActions(useCounterStore, ['addBook', 'getBookById', 'editBook'])
  },
  async mounted() {
    if (this.id) {
      this.book = (await this.getBookById(this.id)) || {};
    }
  },
  watch: {
    id(newValue, oldValue) {
      this.data.book = {};
    },
  },
};
</script>

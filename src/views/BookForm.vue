<template>
  <div>
    <h1>Formulario para insertar libros</h1>
    <div v-if="errores.length > 0">
      <p><b>Por favor, solucina los siguientes errores:</b></p>
      <ul>
        <li v-for="error in errores">{{ error }}</li>
      </ul>
    </div>
    <div class="row">
      <div class="col-sm-6 col-md-4 col-lg-4 hideElement">
        <form id="new-prod" @submit.prevent>
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
              minlength="8"
              maxlength="12"
              v-model="book.ISBN"
              required
            />
            <span class="error"></span>
          </div>

          <div class="form-group">
            <label for="newprod-name">Genero:</label>
            <select name="genere" id="genere" v-model="book.tema" required>
              <option value="" disabled>--Selecciona el genero--</option>
              <option v-for="genere in generes" :key="genere.id" :value="genere.id">
                {{ genere.nombre }}
              </option>
            </select>

            <span class="error"></span>
          </div>

          <div class="form-group">
            <label for="newprod-name">Autor:</label>
            <select name="author" id="author" v-model="book.autor" required>
              <option value="" disabled>--Selecciona el/la autor--</option>
              <option v-for="author in authors" :key="author.id" :value="author.id">
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
              required
            />
            <span class="error"></span>
          </div>
          <button
            type="submit"
            class="btn btn-default btn-dark"
            v-if="id"
            @click="checkForm"
          >
            Editar
          </button>
          <button
            type="submit"
            class="btn btn-default btn-dark"
            v-else
            @click="checkForm"
          >
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
      errores: [],
    };
  },
  computed: {
    ...mapState(useCounterStore, {
      generes: "generes",
      authors: "authors",
    }),
    
    
  },
  methods: {
    ...mapActions(useCounterStore, ["addBook", "getBookById", "editBook"]),
    checkForm() {
      this.errores = []; // borramos los errores anteriores

      //nombre
      if (!this.book.nombre) {
        this.errores.push("El nombre es obligatorio");
      } else if (this.book.nombre.length < 2 || this.book.nombre.length > 50) {
        this.errores.push("La longitud del nombre debe estar entre 2 y 50 caracteres");
      }

      if (!this.book.ISBN) {
        this.errores.push("El ISBN es obligatorio");
      } else if (this.book.ISBN.length < 8 || 16 < this.book.ISBN.length) {
        this.errores.push("La longitud del ISBN debe ser de 10");
      }

      if (!this.book.tema) {
        this.errores.push("Debes escoger el genero");
      }

      if (!this.book.autor) {
        this.errores.push("Debes escoger el autor");
      }
      if (this.errores.length == 0 && this.id) {
        this.editBook(this.book);
      }else if(this.errores.length == 0 && !this.id){
        this.addBook(this.book);
      }
    },
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

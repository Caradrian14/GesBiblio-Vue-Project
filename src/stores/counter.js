import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

const url = 'http://localhost:3000';


export const useCounterStore = defineStore('counter', {
  state() {
    return {
      generes: [],
      authors: [],
      books: []
    }
  },
  getters: {
    // reciben como primer parámetro el 'state'
    getGenereById: (state) => (id) => {
      return state.generes.find((genere) => genere.id === id)
    },
  },
  actions: {
    addBook(book) {
      axios.post(url + '/libros',
        {
          ISBN: book.ISBN,
          nombre: book.nombre,
          tema: book.genere,
          autor: book.autor,
          desc: book.desc,
          img: book.img
        }
      )
        .then(response => {
          this.books.push(response.data)
          alert("Libro añadido");
        })
        .catch(response => alert('Error: no se ha añadido el registro. ' + response.message))
    },

    editBook(book) {
      axios.patch(url + '/libros/' + book.id, {
        ISBN: book.ISBN,
        nombre: book.nombre,
        tema: book.tema,
        autor: book.autor,
        desc: book.desc,
        img: book.img,
      }).then(response => {
        this.books.splice(this.books.findIndex(editToFind => editToFind.id === book.id), 1, response.data)
        alert("Libro editado");
      }).catch(response => alert('Error: no se ha añadido el registro. ' + response.message));
    },

    deleteBook(bookObject) {
      if (confirm("Quieres borrar el libro " + bookObject.nombre + " ?")) {
        axios.delete(url + '/libros/' + bookObject.id)
          .then(
            response => {
              var indexArray = this.books.findIndex(element => element.id === bookObject.id)
              this.books.splice(indexArray, 1);
            }
          )

          .catch(response => alert('Error: no se ha borrado el registro. ' + response.message))
      }
    },

    changeSourceImg() {
      this
    },

    async getBookById(id) {
      try {
        const response = await axios.get(url + '/libros/' + id)
        return response.data
      } catch (err) {
        if (!response.status) {// Si el servidor no responde 'response' no es un objeto sino texto
          this.state.errors.push('Error: el servidor no responde');
          console.log(response);
        } else {
          this.state.errors.push('Error ' + response.status + ': ' + response.message);
        }
      }
    },

    async getAuthorById(id) {
      try {
        const response = await axios.get(url + '/autores/' + id)
        return response.data
      } catch (err) {
        if (!response.status) {// Si el servidor no responde 'response' no es un objeto sino texto
          this.state.errors.push('Error: el servidor no responde');
          console.log(response);
        } else {
          this.state.errors.push('Error ' + response.status + ': ' + response.message);
        }
      }
    },

    async getBooksByAuthor(id) {
      try {
        id = parseInt(id);
        const response = await axios.get(url + '/libros')
        var data = response.data;
        var dataFilter = data.filter(book => book.autor === id)
        return dataFilter;
      } catch (err) {
        if (!response.status) {// Si el servidor no responde 'response' no es un objeto sino texto
          this.state.errors.push('Error: el servidor no responde');
          console.log(response);
        } else {
          this.state.errors.push('Error ' + response.status + ': ' + response.message);
        }
      }
    },

    loadData() {
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
      axios.get(url + '/autores')
        .then(response => { this.authors = response.data })

        .catch(response => {
          if (!response.status) {// Si el servidor no responde 'response' no es un objeto sino texto
            alert('Error: el servidor no responde');
            console.log(response);
          } else {
            alert('Error ' + response.status + ': ' + response.message);
          }
        })
      axios.get(url + '/temas')
        .then(response => { this.generes = response.data })

        .catch(response => {
          if (!response.status) {// Si el servidor no responde 'response' no es un objeto sino texto
            alert('Error: el servidor no responde');
            console.log(response);
          } else {
            alert('Error ' + response.status + ': ' + response.message);
          }
        })
    },

  }
})

/*
export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})*/

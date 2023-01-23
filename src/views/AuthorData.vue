<script></script>

<template>
  <div class="col-4">
    <div class="card mb-3" style="max-width: 540px">
      <div class="row g-0">
        <div class="col-md-4">
          <img
            :src="'/src/assets/img/' + author.img"
            class="card-img-top foto"
            :alt="author.nombre"
          />
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">{{ author.nombre }} {{ author.apellidos }}</h5>
            <h6 class="card-subtitle mb-2 text-muted">{{ author.nacionalidad }}</h6>
            <button class="btn btn-secondary finish">
      <span class="material-icons" @click="$router.push(`/books-filtered/${author.id}`)"
        >Ver libros del Autor</span
      >
    </button>
            
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useCounterStore } from "../stores/counter";
import { mapState, mapActions } from "pinia";
export default {
  props: {
    id: String,
  },
  data() {
    return {
      author: {},
    };
  },
  methods: {
    ...mapActions(useCounterStore, ['getAuthorById'])
  },
  ...mapState(
      useCounterStore,
      {
        generes: "generes",
      },
    ),
  async mounted() {
    if (this.$props.id) {
      this.$data.author = (await this.getAuthorById(this.id)) || {};
    }
  },
};
</script>

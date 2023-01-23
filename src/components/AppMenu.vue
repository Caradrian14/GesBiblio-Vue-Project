<template>
   <nav  class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
        
            <span class="navbar-brand" href="#">GesBiblio</span>
		    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div class="navbar-nav">
                    <router-link to="/" class="nav-link active">Home</router-link>
                    <router-link to="/author-list" class="nav-link active">Autores</router-link>
                    <router-link to="/books-list" class="nav-link active">Libros</router-link>
                    <router-link to="/books-form" class="nav-link active">Añadir Libros</router-link>
                    <router-link to="/about" class="nav-link active">Sobre nosotros</router-link>
                </div>
            </div>
        </div>
    </nav>
        <!-- Zona para mostrar mensajes al usuario -->
    <div class="row" id="messages">
	
    </div>
</template>
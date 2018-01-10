<template>
	<nav class="navbar navbar-expand-lg navbar-dark bg-dark">

    <a class="navbar-brand" href="/#/">
      <img class='logo mr-3' src="/static/icon_white.svg">
      <strong>Astro</strong>Key
    </a>

	  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
	    <span class="navbar-toggler-icon"></span>
	  </button>

	  <div class="collapse navbar-collapse" id="navbarSupportedContent">
	    <ul class="navbar-nav mr-auto">

        <li class="nav-item">
          <a class="nav-link" href="/#/devices">Devices</a>
        </li>

        <li class="nav-item">
          <a class="nav-link" href="/#/workflows">Workflows</a>
        </li>

	    </ul>

	    <ul class="navbar-nav ml-auto">
	      <li class="nav-item">
	        <a class="nav-link" href="/#/auth/register">Register</a>
	      </li>
	      <li class="nav-item">
	        <a class="nav-link" href="/#/auth/login">Login</a>
	      </li>
	    </ul>
	  </div>
	</nav>
</template>

<script>
// TODO - this should be split into a series of smaller components
export default {
  name: 'Navbar'
}
</script>

<style lang="sass">

  .navbar-brand
    letter-spacing: .25rem !important
    font-family: sans-serif
    text-transform: uppercase
    font-weight: 100
    letter-spacing: 0.1rem

    strong
      font-weight: 400

    img.logo
      float: left
      margin-right: 0.4rem
      height: 2rem
      display: flex

</style>

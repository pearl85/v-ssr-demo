<template>
  <section id="section_parent">
   <section class="col-lg-12
      col-md-12 col-sm-12 col-xs-12 pt10 p0" >
      <article class="col-lg-3 col-md-4 col-sm-4 col-xs-12 film-width_b" v-for="film in films">
         
      </article>
      <hr class="col-xs-12 col-md-12 col-sm-12 col-lg-12 p0 mt0">
   	</section>
	</section>
</template>
<script>
export default {
  props: [ 'films' ],
  replace: false,
};
</script>
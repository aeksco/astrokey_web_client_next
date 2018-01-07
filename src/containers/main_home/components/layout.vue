<!-- <template>
    <div class="container">
        <div class="row mt-3">

          <div class="col-lg-12 text-center">
            <h2>Welcome to AstroKey</h2>
            <hr>
          </div>

          <div class="col-lg-12 text-center">
            <p class="lead"><a href="https://github.com/AstroKey" target="_blank"> AstroKey</a> is an open-source platform for re-programmable USB keyboards.</p>
            <p>AstroKey provides an intuitive interface anybody can use to automate basic keyboard actions.</p>
            <p>Simply drag and drop keyboard keys to construct your desired sequence - AstroKey does the rest.</p>
            <p>It's that easy.</p>
          </div>

          <div class="col-lg-12 text-center">
            <p>Built by&nbsp;<a href="https://github.com/AaronPerl" target="_blank">Aaron Perl</a>&nbsp;and&nbsp;<a href="http://aeks.co" target="_blank">Alexander Schwartzberg</a>&nbsp;for&nbsp;<a href="https://rcos.io/" target="_blank">RCOS.</a></p>
          </div>

        </div>
    </div>
</template>
 -->

<template lang='pug'>
.row.h-100.align-items-center
  .col-lg-12

    .row.my-4
      .col-lg-12.text-center
        img.welcome-logo(src='/static/icon_white.svg')

    .row.my-4
      .col-lg-12.text-center
        p.welcome-text WELCOME


    .row.my-4
      .col-lg-12.text-center
        p.lead
          a(href='https://github.com/AstroKey', target='_blank')  AstroKey
          //- |  is an open-source platform for re-programmable USB keyboards.
          |  is an open-source platform for automating keyboard workflows.

        //- p AstroKey provides an intuitive interface anybody can use to automate basic keyboard actions.


    .row.py-2
      .col-lg-12.text-center
        p.lead Drag and drop keyboard keys to construct your desired workflow - AstroKey does the rest.

        //- p It's that easy.

    //- .row.py-4
    //-   .col-lg-12.d-flex.flex-row.align-items-center.justify-content-center
    //-     //- i.d-flex.fa.fa-fw.fa-2x.mr-1
    //-     //- p.d-flex.lead.m-0(style='letter-spacing: 0.25rem; font-weight: 200;') Click a key to get started

    //- .row
    //-   .col-lg-12.text-center
    //-     p
    //-       | Built with
    //-       i.fa.fa-heart-o.ml-1
    //-       | &nbsp;by&nbsp;
    //-       a(href='https://github.com/AaronPerl', target='_blank') Aaron Perl
    //-       | &nbsp;and&nbsp;
    //-       a(href='http://aeks.co', target='_blank') Alexander Schwartzberg
    //-       | &nbsp;@&nbsp;
    //-       a(href='https://rcos.io/', target='_blank') RCOS.

</template>

<script>
  export default {
    name: 'main_home'
  }
</script>

<style lang="sass">
  img.welcome-logo
    height: 4rem
    width: 4rem

  .welcome-text
    letter-spacing: .6rem
    font-weight: 300
    font-size: 2rem
</style>

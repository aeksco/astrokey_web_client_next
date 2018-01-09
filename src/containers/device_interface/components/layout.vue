
<template>
  <div class="container">
    <a href="/#/devices">Back</a>
    <h2>Device Interface</h2>
  	<hr>

    <div class="row">
      <div class="col-lg-6">

        <div class="row">
          <div class="px-3 py-3 d-flex align-items-center">
            <div class="key--list--wrapper px-3 pb-2 d-flex">
              <!-- <img class="logo" src="/static/icon_white.svg"></img> -->
              <small class='pt-3 pl-2'>AstroKey</small>
              <ul class="list-unstyled key--list d-flex">
                <li class="btn btn-outline-light key--child d-flex justify-content-center align-items-center mx-2 my-2"></li>
                <li class="btn btn-outline-light key--child d-flex justify-content-center align-items-center mx-2 my-2"></li>
                <li class="btn btn-outline-light key--child d-flex justify-content-center align-items-center mx-2 my-2"></li>
                <li class="btn btn-outline-light key--child d-flex justify-content-center align-items-center mx-2 my-2"></li>
                <li class="btn btn-outline-light key--child d-flex justify-content-center align-items-center mx-2 my-2"></li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<!-- // // // //  -->

<script>

export default {
  props: ['device']
}
</script>

<style lang="sass" scoped>
@import '../../../sass/vendor.sass'

// AstroKey Selector Styles
$astrokey_child_size: 3rem

.key-selector-wrapper
  height: 100%
  justify-content: center

.key--list--wrapper
  display: flex
  flex-direction: column
  border: 2px solid theme-color('light')
  border-radius: .25rem
  // border-top-left-radius: 1.5rem
  // border-top-right-radius: 0.25rem
  // border-bottom-left-radius: 0.25rem
  // border-bottom-right-radius: 1.5rem

  img.logo
    margin: 0rem 1rem
    height: 2rem
    display: flex

    &.side
      display: none

  ul.list-unstyled.key--list
    justify-content: space-between
    align-items: center
    flex-direction: row

    margin: 0

    li.key--child
      height: $astrokey_child_size
      width: $astrokey_child_size
      cursor: pointer
      border-width: 2px

      span
        font-size: 0.75rem
        position: relative
        bottom: 0
        left: 0

    &.active
      color: $gray-800
</style>



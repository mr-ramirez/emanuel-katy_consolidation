<template>
  <div class="modal fade" id="memberInformation" tabindex="-1"
    role="dialog" aria-labelledby="memberInformationLabel"
    aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header bg-dark">
          <h5 class="modal-title text-light" id="exampleModalLabel">Seleccione un color</h5>
          <button type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close">
            <span class="text-white" aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-12">
              <h4 class="text-center">{{ getName() }}</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ChangeColor',
  }
</script>

<style>

</style>

<template>
  <tr class="table-row">
    <td class="table-col" data-title="Position">
      <span class="text">{{ position }}</span>
    </td>
    <td class="table-col is-only-desktop" data-title="Car">
      <div class="text">#{{ carNumber }}</div>
      <div class="heading-level-7 u-break-word">{{ car }}</div>
    </td>
    <td class="table-col" data-title="Driver">
      <span class="heading-level-7">{{ driver }}</span>
    </td>
    <td class="table-col is-only-desktop" data-title="Duration">
      <span class="text">{{ duration }}</span>
    </td>
    <td class="table-col u-overflow-visible">
      <button
        class="button is-text is-only-icon"
        aria-label="more options"
        @click="showDialog"
      >
        <span class="icon-dots-horizontal" aria-hidden="true"></span>
      </button>
      <dialog class="modal" id="dialog" ref="dialog">
        <form class="modal-form">
          <!-- Modal form header -->
          <header class="modal-header">
            <div class="u-flex u-main-space-between u-cross-center u-gap-16">
              <h4>{{ driver }}</h4>
              <button type="button" @click="closeDialog">close</button>
            </div>
          </header>

          <!-- Modal form content -->
          <div class="modal-content">
            <input type="number" name="hours" id="hours" placeholder="hours" />
            <input
              type="number"
              name="minutes"
              id="minutes"
              placeholder="minutes"
            />
            <input
              type="number"
              name="seconds"
              id="seconds"
              placeholder="seconds"
            />
          </div>

          <!-- Modal form footer -->
          <footer class="modal-footer">
            <button type="submit">update time</button>
          </footer>
        </form>
      </dialog>
    </td>
  </tr>
</template>

<script setup>
const { position, car, carNumber, driver, duration } = defineProps([
  'car',
  'carNumber',
  'driver',
  'duration',
  'position',
]);

const dialog = ref(null);

function showDialog() {
  dialog.value.showModal();
}

function closeDialog() {
  dialog.value.close();
}
</script>

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
        <form class="modal-form" @submit="handleSubmit">
          <!-- Modal form header -->
          <header class="modal-header">
            <div class="u-flex u-main-space-between u-cross-center u-gap-16">
              <h4>{{ driver }}</h4>
              <button type="button" @click="closeDialog">
                <span class="icon-x" aria-hidden="true"></span>
              </button>
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
            <button class="button" type="submit" @click="closeDialog">
              update time
            </button>
          </footer>
        </form>
      </dialog>
    </td>
  </tr>
</template>

<script setup>
const config = useRuntimeConfig();

const { database } = useAppwrite();

const { position, car, carNumber, driver, duration, documentId } = defineProps([
  'car',
  'carNumber',
  'driver',
  'duration',
  'position',
  'documentId',
]);

const dialog = ref(null);

function showDialog() {
  dialog.value.showModal();
}

function closeDialog() {
  dialog.value.close();
}

function handleSubmit(e) {
  e.preventDefault();

  const { hours, minutes, seconds } = e.target;
  const updatedTime =
    Number(hours.value) * 3600 +
    Number(minutes.value) * 60 +
    Number(seconds.value);

  database
    .updateDocument(config.database, config.collection, documentId, {
      duration: updatedTime,
    })
    .then(() => console.log('Updated successfully!'))
    .catch((error) => console.log(error));

  hours.value = '';
  minutes.value = '';
  seconds.value = '';
}
</script>

<template>
  <NuxtLayout>
    <RacingLeaderboard :data="racingData" />
  </NuxtLayout>
</template>

<script setup>
import '@appwrite.io/pink';
import '@appwrite.io/pink-icons';

const config = useRuntimeConfig();

const { account, client, database } = useAppwrite();

// Create an anonymous session if it doesn't already exist
if (account.getSession === null) {
  await account.createAnonymousSession();
}

// Get initial data from the database
const { documents } = await database.listDocuments(
  config.database,
  config.collection
);

// Add racing data to state
const { value: racingData } = useState('racingData', () => sortData(documents));

// Subscribe to realtime updates from the database
onMounted(() => {
  try {
    client.subscribe(
      `databases.${config.database}.collections.${config.collection}.documents`,
      (res) => updateState(racingData, res.payload)
    );
  } catch (error) {
    console.log(error);
  }
});
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap');

* {
  font-family: 'Montserrat';
}
</style>

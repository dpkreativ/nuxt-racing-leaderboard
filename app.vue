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
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap');

* {
  font-family: 'Montserrat';
}
</style>

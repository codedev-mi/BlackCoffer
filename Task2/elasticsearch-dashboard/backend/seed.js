const { checkConnection, seedDocuments } = require('./elasticsearch');

async function runSeed() {
  console.log('--- Initializing Elasticsearch Seeding ---');
  await checkConnection();
  const result = await seedDocuments();
  console.log('Seeding result:', result);
  process.exit(0);
}

runSeed().catch(err => {
  console.error('Seeding process failed:', err);
  process.exit(1);
});

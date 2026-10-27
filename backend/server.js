// Forwarding module to maintain backward compatibility with any scripts pointing to backend/server.js
const app = require('../api/index');

const PORT = process.env.PORT || 5000;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🚀 Watchlist Server running on http://localhost:${PORT}`);
  });
}

module.exports = app;

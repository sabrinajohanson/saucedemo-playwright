// Converts Playwright's native JSON reporter output into the common
// results.json format shared across all portfolio repositories.

const fs = require('fs');

const REPO_NAME = 'saucedemo-playwright';

function main() {
  const report = JSON.parse(fs.readFileSync('playwright-report.json', 'utf-8'));
  const stats = report.stats || {};

  const passed = stats.expected || 0;
  const failed = stats.unexpected || 0;
  const skipped = stats.skipped || 0;
  const flaky = stats.flaky || 0;

  const result = {
    repo: REPO_NAME,
    total: passed + failed + skipped + flaky,
    passed,
    failed,
    skipped,
    duration_seconds: Math.round((stats.duration || 0) / 1000),
    timestamp: new Date().toISOString(),
  };

  fs.writeFileSync('results.json', JSON.stringify(result, null, 2));
  console.log(`results.json generated for ${REPO_NAME}:`, result);
}

main();
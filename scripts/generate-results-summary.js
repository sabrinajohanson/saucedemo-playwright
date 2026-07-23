// Converts Playwright's native JSON reporter output into the common
// results.json format shared across all portfolio repositories.

const fs = require('fs');

const REPO_NAME = 'saucedemo-playwright';

function walkSuites(suites, failures) {
  for (const suite of suites || []) {
    for (const spec of suite.specs || []) {
      for (const test of spec.tests || []) {
        const lastResult = test.results[test.results.length - 1];
        if (lastResult && (lastResult.status === 'failed' || lastResult.status === 'timedOut')) {
          failures.push({
            name: spec.title,
            error_message: ((lastResult.error && lastResult.error.message) || '').slice(0, 300),
          });
        }
      }
    }
    walkSuites(suite.suites, failures);
  }
}

function main() {
  const report = JSON.parse(fs.readFileSync('playwright-report.json', 'utf-8'));
  const stats = report.stats || {};

  const passed = stats.expected || 0;
  const failed = stats.unexpected || 0;
  const skipped = stats.skipped || 0;
  const flaky = stats.flaky || 0;

  const failures = [];
  walkSuites(report.suites, failures);

  const result = {
    repo: REPO_NAME,
    total: passed + failed + skipped + flaky,
    passed,
    failed,
    skipped,
    duration_seconds: Math.round((stats.duration || 0) / 1000),
    timestamp: new Date().toISOString(),
    failures,
  };

  fs.writeFileSync('results.json', JSON.stringify(result, null, 2));
  console.log(`results.json generated for ${REPO_NAME}: ${result.passed}/${result.total} passed, ${failures.length} failure(s) recorded`);
}

main();
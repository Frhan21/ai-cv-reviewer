// Run the TypeScript regression without adding a test-runtime dependency.
const ts = require('typescript');
const fs = require('node:fs');
require.extensions['.ts'] = (module, filename) => {
  const source = fs.readFileSync(filename, 'utf8');
  module._compile(ts.transpile(source, {
    module: ts.ModuleKind.CommonJS,
    target: ts.ScriptTarget.ES2022,
    esModuleInterop: true,
  }), filename);
};
require('./repro-section-feedback.ts');

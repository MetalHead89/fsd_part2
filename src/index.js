require.context('@/scss', true, /\.scss$/);
require.context('@/pages', true, /\.scss$/);

const scripts = require.context('@/common.blocks', true, /\.js$/);
scripts.keys().forEach((script) => {
  scripts(script);
});

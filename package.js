Package.describe({
  name: 'lerayj:filterizer',
  version: '0.0.2',
  // Brief, one-line summary of the package.
  summary: 'Generic Filter handler package for Meteor',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/lerayj/filterizer.git',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.3');
  api.use('underscore');
  api.use('minimongo');
  api.addFiles('filterizer.js', 'client');
  api.export("Filterizer", 'client');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('lerayj:filterizer');
  api.addFiles('filterizer-tests.js');
});

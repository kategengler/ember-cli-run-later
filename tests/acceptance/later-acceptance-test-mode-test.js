import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';
import laterQueue from '../run-test-mode';

let application;

module('An Integration test', {
  beforeEach: function() {
    application = startApp();
    laterQueue.empty();
  },
  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test('can execute code which was scheduled for later', function(assert) {
  visit('/');

  andThen(function() {
    assert.equal(find('.later-text').text().trim(), "Still waiting...");
  });

  andThen(function() {
    laterQueue.execAll();
  });

  andThen(function() {
    assert.equal(find('.later-text').text().trim(), "Initialized");
  });
});

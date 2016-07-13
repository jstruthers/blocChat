import React from 'react';
import { render } from 'react-dom';
import router from '../imports/router';
import '../imports/startup/accounts-config.js';

Meteor.startup(() => {
  render(router, document.getElementById('root'));
})

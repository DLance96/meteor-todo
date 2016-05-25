import { Template } from 'meteor/templating';
import { Tasks } from '../api/tasks.js';
import './body.html';
import './tasks.js';

Template.body.helpers({
  tasks() {
    return Tasks.find({}, { sort: { createdAt: -1 } });
  },
});

Template.body.events({
  'submit .new-task'(event) {
    // Prevent default value from being added to the db
    event.preventDefault();

    // get value from the form element
    const target = event.target;
    const text = target.text.value;

    // insert task into the db
    Tasks.insert({
      text,
      createdAt: new Date(), //current time
      checked: false,
    });

    // Clear form
    target.text.value = '';
  },
});

import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Meteor.subscribe("listings");

Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
});

Template.hello.helpers({
  counter() {
    return Template.instance().counter.get();
  },
});

Template.hello.events({
  'click button'(event, instance) {
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);
  },
});

Template.login.events({
    'click #trademe-login': function(event) {
        Meteor.loginWithTradeMe({}, function(err){
            if (err) {
                throw new Meteor.Error("TradeMe login failed");
            }
        });
    },

    'click #logout': function(event) {
        Meteor.logout(function(err){
            if (err) {
                throw new Meteor.Error("Logout failed");
            }
        })
    },
    'click #fetchWatchlist': function(event) {
      callType = "watchList";
      Meteor.call('fetchWatchlist', callType, function(error,result){
      if (!error){
        console.log(result.data.List);
      }
      else
        console.log(error);
    });
    }
});

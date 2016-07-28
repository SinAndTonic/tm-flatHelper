import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Meteor.subscribe("listings");

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

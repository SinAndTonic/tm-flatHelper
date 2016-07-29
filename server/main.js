import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
});

Meteor.publish("listings", function () {
    return Listings.find({owner: this.userId });
  });

Meteor.methods({
  fetchWatchlist: function (callType) {

        var tradeMeConf = ServiceConfiguration.configurations.find({service: 'trademe'}).fetch()[0];
  			var theParams = {category: 2975};
				var	urlEnd = 'MyTradeMe/Watchlist/All.json';
        var conKey = tradeMeConf.consumerKey;
        var token = Meteor.user().services.trademe.accessToken;
        var signature = tradeMeConf.secret + '&' + Meteor.user().services.trademe.accessTokenSecret;
		options = {
			headers : {
				Authorization: 'OAuth oauth_consumer_key=' + conKey + ', oauth_token=' + token + ', oauth_signature_method=PLAINTEXT, oauth_signature=' + signature

			},
			params: theParams

		};



    var theTest = HTTP.get('https://api.tmsandbox.co.nz/v1/' + urlEnd,options);
    Listings.remove({owner: Meteor.user()._id});
    for (var key in theTest.data.List){
      theTest.data.List[key].owner = Meteor.user()._id;
			Listings.insert(theTest.data.List[key]);
  }
  return theTest;
}

});

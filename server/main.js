import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
});

Meteor.publish("listings", function () {
    return Listings.find({owner: this.userId });
  });

Meteor.methods({
  fetchWatchlist: function (callType) {

  			var theParams = {category: 2975};
				var	urlEnd = 'MyTradeMe/Watchlist/All.json';

		options = {
			headers : {
				Authorization: 'OAuth oauth_consumer_key=F75C21EEA48E00A600EC65660121DE52, oauth_token=5ADB54E96F44D8B059E766C76BC8975A, oauth_signature_method=PLAINTEXT, oauth_signature=3A5F583AB5C366C7DB27378AF5C68B78&8B9C8D4B7A64C5B00D036CF8EB137D3F'

			},
			params: theParams

		};



    var theTest = HTTP.get('https://api.tmsandbox.co.nz/v1/' + urlEnd,options);

    for (var key in theTest.data.List){
      theTest.data.List[key].owner = Meteor.user()._id;
			Listings.insert(theTest.data.List[key]);
  }
  return theTest;
}

});

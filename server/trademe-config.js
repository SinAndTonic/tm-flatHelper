ServiceConfiguration.configurations.remove({
  service: 'trademe'
});

ServiceConfiguration.configurations.insert({
  service: 'trademe',
  sandbox: true,  // Optional parameter
  consumerKey: 'F75C21EEA48E00A600EC65660121DE52',
  secret: '3A5F583AB5C366C7DB27378AF5C68B78'
});

function oc(a){
  var o = {};
  for(var i = 0; i < a.length; i++) {
    o[a[i]] = '';
  }
  return o;
}


chrome.extension.onRequest.addListener( function(request, sender, sendResponse) {
  var domain = sender.tab.url.split('/')[2];
  var path = sender.tab.url.split(domain)[1];

  // Only deal with the t.co for now
  if ( domain in oc(['t.co'])  || domain in oc(['twitter.com']) ) {
    // Only if there's a legit path
    if (typeof path != 'undefined') {
      var new_path = path.replace(')', '').replace('.', '').replace(',', '')
      console.log("URL to fix: " + sender.tab.url)
      // Now send us off to the corrected URL
      var new_url = "http://" + domain + new_path
      console.log("Sending you off to... " + new_url)
      chrome.tabs.update(sender.tab.id, {url: new_url});
    }
  }

});

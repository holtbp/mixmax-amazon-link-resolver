var synchronize = require('synchronize');
var request = require('request');
var _ = require('underscore');
var cheerio = require('cheerio');

// The API that returns the in-email representation.
module.exports = function(req, res) {
  var url = req.query.url.trim();

  // Amazon products have the following format:
  // http://www.amazon.com/dp/B00137QS28/
  var matches = url.match(/dp\/([A-Z0-9]+)\//);
  if (!matches) {
    res.status(400).send('Invalid URL format');
    return;
  }

  var productId = matches[1];

  var response;
  try {
    response = synchronize.await(request({
      url: 'http://www.amazon.com/dp/' + encodeURIComponent(productId),
      gzip: true,
      json: true,
      timeout: 15 * 1000
    }, synchronize.defer()));
  } catch (e) {
    res.status(500).send('Error');
    return;
  }

  var $ = cheerio.load(response.body);

  var coverArt = $('#landingImage')[0];

  //Lots of H1 elements include more than just the title...
  var header = $('h1');
  if (header.length > 1) {
    header = $('h1#title');
  }

  // Departments have entirely different DOM structures, IDs, and classes
  if (coverArt == null) {
    if ($('body').hasClass('PrimeMusic')) {
      coverArt = $('#coverArt_feature_div > img')[0];
    } else if ($('body').hasClass('main-movie')) {
      coverArt = $('.dp-img-bracket img')[0];
      header = $('#aiv-content-title');
    }
  }

  var productTitle = $(header).text().trim().split('\n')[0];

  var html = '<div>' + productTitle + '</div><img style="max-width:100%;" src="' + $(coverArt).attr('src') + '" width="400"/>';
  res.json({
    body: html
    // Add raw:true if you're returning content that you want the user to be able to edit
  });
};

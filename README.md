# Amazon Preview for Mixmax

This is an open source Mixmax Link Resolver. It makes an HTTP request to the URL provided and returns a JSON response. The JSON response includes HTML under the "body" key with the product title and the product image.

I decided against signing up to become an "Associate" to use Amazon's API, so this link resolver does some scraping. Scraping is a hacky solution, but I have made  somewhat reliable. I have noticed a lot of differences in page markup and JavaScript libraries throughout their site. I decided against showing pricing because of the vast variety of ways in they exist, from differences in markup and different options for purchase/rental.

## Test Cases
I tested links from several different departments. I found that many departments have a completely different DOM structure.

Some of the links tested:
* https://www.amazon.com/dp/B00137QS28/
* https://www.amazon.com/dp/B00U3FPN4U/
* https://www.amazon.com/dp/B00OQVZDJM/
* https://www.amazon.com/dp/B00KHP6EIK/
* https://www.amazon.com/dp/B01CIPPCXY/
* https://www.amazon.com/dp/B00X4WHP5E/
* https://www.amazon.com/dp/B00OVBXJ5M/

## Running locally

1. Install using `npm install`
2. Run using `npm start`

To simulate locally how Mixmax calls the resolver URL (to return HTML that goes into the email), run:

```
$ curl http://localhost:9146/resolver?url=http%3A%2F%2Famazon.com%2Fdp%2FB00137QS28%2F
{"body":"<div>Amazon Fire TV</div><img style=\"max-width:100%;\" src=\"https://images-na.ssl-images-amazon.com/images/I/517-EMPBCDL._SY300_.jpg\" width=\"400\"/>"}
```

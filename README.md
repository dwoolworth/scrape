# Scrape
So I originally started this to piece together a skeleton app for scraping data from sites.  However, I got into writing the code for this and decided to go a different route.  Using `NLP` to parse content from sites and single page applications, it just seemed natural to want to add that data into Apache Solr and to work on an algorithm that finds content on the web quickly.

This could be used to scrape content from sites and then work on an algorithm to organize that data into some meaningful structure.

### TODO: 
* Figure out a way to seed the database with some sites to start indexing.
* `npm install natural` and implement tokenization, stemming, and lemmatizing the raw text content, as well as title, keywords, and description meta-tags.
* Store this resultant info within Apache Solr (create schema for the data that includes the url and any other statistics needed).
* Implement algorithm that uses memcache to track accesses of a specific domain and limit requests over time to that domain.  Use memcache to store counters and timers for this process.
* Probably need to figure out a different name.

### P.S.
Yes, I know this is a feeble effort at most of these tasks and that [Nutch](https://nutch.apache.org/) is a much better solution.  I'm trying to try compete with that.  I'm just playing around.

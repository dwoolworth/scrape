# Scrape

## Summary
I originally started this to throw together a skeleton app for scraping data.  After decing to go a different route, I implemented `NLP` to parse content from sites and single page applications, it just seemed natural to want to add that data into Apache Solr and to work on an algorithm that finds content on the web quickly.  This was a bit of a pet project just to see how easily it could be done and launched with `docker compose`.

Now, this could still be used to scrape content from sites, or to work on an algorithm to organize web data into some meaningful structure.  I know Google can be used for providing search results for one's website.  Possibly, if documentation is behind a paywall or it's all implemented within a SPA, it might be difficult to use Google.

[Nutch](https://nutch.apache.org/) is a great solution, if you want to deal with the learning curve or need to write a plugin.  Here's some simple free code to toss at that problem as well.

My goal here is to provide a solution you can clone or fork and run `docker compose up` and it'll just work.  However, given the seed files are static, you'll surely want to adjust those.  If you want the crawler to stay on your site, you'll need to modify the code a bit for that.

Otherwise, note that I launch this from a Ubuntu WSL environment, but it should possibly work from Windows as well.  Make sure to configure the volumes correctly in the docker-compose.yml, and be sure to set the dot.env to .env and fix up the configuration settings - as well as the dot.docker-compose.env to .docker-compose.env file.
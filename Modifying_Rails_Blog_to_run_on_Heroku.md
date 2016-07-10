### Modifying Rails Blog to run on Heroku

What to change in the [Getting Started with Rails](http://guides.rubyonrails.org/getting_started.html) simple Blog project, to enable it to be hosted on [Heroku](https://www.heroku.com).

**TL;DR:** you need to change the database from **SQLite** to **PostgreSQL**.

This presumes you've completed the project, and have it up and running on your local machine.


**1. Quit Rails** `ctrl-C` on command line to quit rails server.

**2. Modify Gemfile**

- Delete or comment out `gem 'sqlite'` and add `gem 'pg'`
- Also useful to specify version of ruby, i.e. `ruby "2.3.0"` (or whatever version you're running).
- Lastly run `bundle install` from command line to update Gemfile.lock

**3. Modify database.yml**

Delete or comment out all the existing sqlite3 stuff. Add in the following:

```
default: &default
  adapter: postgresql
  encoding: utf8
  pool: <%= ENV.fetch("RAILS_MAX_THREADS") { 5 } %>

development:
  <<: *default
  database: blog_development

test:
  <<: *default
  database: blog_test

production:
  <<: *default
  database: blog_production
```

**4. Setup databases, re-launch Rails Server**

From command line, do the following:

`rake db:setup`  
`bin/rails db:migrate`  
`bin/rails server`

**5. Test it out locally.**

Make sure it all works. If so, then you're ready to follow the steps in the [Getting Started with Rails 5.x on Heroku](https://devcenter.heroku.com/articles/getting-started-with-rails5) guide to migrate it to Heroku.

That page didn't quite explain the `database.yml` changes; [How To Setup Ruby on Rails with Postgres](https://www.digitalocean.com/community/tutorials/how-to-setup-ruby-on-rails-with-postgres) had some examples I used as guide to setting up mine.

v. 1.0, 2016.07.10 - [Ed Mechem](https://github.com/edmechem)
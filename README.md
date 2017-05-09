# Pushing updates on server - 

After changes are done, do **'make stop'**.

**Create a binary**
- Then do, 'make package' on 'platform/'.
- This command will generate a folder named "dist" inside 'platform/'.
- Once done, go to 'dist/', you'll find a zip named 'mattermost-team-linux-amd64.tar.gz'.

**Put it on S3**
- Take this zip and put it on amazon s3 inside '1thing-logos/binary-images/production/' and add the version right before '.tar.gz'. For example - 
'mattermost-team-linux-amd64_v8.tar.gz'
- Give read permissions.
- Copy the link.

**Put the copied link in 'platform/docker/app/dockerfile'**

- You'll find a line like this-
"RUN curl https://s3.ap-south-1.amazonaws.com/1thing-logos/binary-images/production/mattermost-team-linux-amd64_v8.tar.gz | tar -xvz"

- Replace the S3 link in the above line.


**Push on Github**
- Do " Git add . "
- Do " Git commit -m 'write_details_of_the_commit' "
- Do " Git push origin master "

**Push on server**
- Login into Digital Ocean.
- Copy the url of the droplet named "workspace".
- In terminal, enter "ssh root@DROPLET_URL"
- Enter the password of root for the droplet.
- Once you're logged into the droplet, enter 'cd platform'.
- Enter ' git pull '
- Once pull is successful, enter 'cd docker'
- Do ' docker-compose build '
- Once the build is successful, do 'docker-compose up -d'.

Your changes will now start reflecting.


# Mattermost

Mattermost is an open source, self-hosted Slack-alternative from [https://mattermost.org](https://mattermost.org).

It's written in Golang and React and runs as a single Linux binary with MySQL or Postgres. Every month on the 16th [a new compiled version is released under an MIT license](https://www.mattermost.org/download/).

- [Review product documentation](http://docs.mattermost.com/).
- [Download compiled version](https://mattermost.org/download).

Try out Mattermost: 

- [Join the Mattermost Contributor's server](https://pre-release.mattermost.com/) (latest nightly builds, unstable)
- [Join the Mattermost Demo server](https://demo.mattermost.com) (latest stable version)

Deploy on Heroku 

[![Deploy a Preview](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/mattermost/mattermost-heroku)

_Note: Heroku preview does not include email or persistent storage_

Install on your own machine: 

- [One-line Docker Preview](http://docs.mattermost.com/install/docker-local-machine.html#one-line-docker-install) 
- [Developer Machine Setup](http://docs.mattermost.com/developer/developer-setup.html)
- [Production Install Guides using Linux Binary](http://www.mattermost.org/installation/)
- [Production Docker Install](https://docs.mattermost.com/install/prod-docker.html) 

Get Involved:

- [Contribute Code](http://docs.mattermost.com/developer/contribution-guide.html)
- [Find "Help Wanted" projects](https://mattermost.atlassian.net/issues/?filter=10101)
- [Join Developer Discussion on a Mattermost Server for contributors](https://pre-release.mattermost.com/signup_user_complete/?id=f1924a8db44ff3bb41c96424cdc20676)
- [File Bugs](http://www.mattermost.org/filing-issues/)
- [Share Feature Ideas](http://www.mattermost.org/feature-requests/)
- [Get Troubleshooting Help](https://forum.mattermost.org/t/how-to-use-the-troubleshooting-forum/150)

Learn More:

- [API Options - webhooks, slash commands, drivers and web service](http://docs.mattermost.com/developer/api.html)
- [Localization Guide](http://docs.mattermost.com/developer/localization.html#translation-process)

Get the Latest News:

- **Twitter** - Follow [MattermostHQ](https://twitter.com/mattermosthq)
- **Email** - Subscribe to our [newsletter](http://mattermost.us11.list-manage.com/subscribe?u=6cdba22349ae374e188e7ab8e&id=2add1c8034) (1 or 2 per month)
- **IRC** - Join us on #matterbridge (thanks to [matterircd](https://github.com/42wim/matterircd))

Any other questions, mail us at info@mattermost.com. We’d love to meet you!

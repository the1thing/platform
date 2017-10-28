**Mattermost Custom Docker Installation**
=================

## Requirements

* [docker]
* [docker-compose]

## Installation

### Instructions:

* Run ```make package``` from the root directory.
* Run ```init.sh``` from the ```docker``` directory.  This copies the new build into the ```app``` directory.
* Run ```docker-compose build``` from the ```docker``` directory.

## Starting/Stopping

### Start

    docker-compose start

### Stop

    docker-compose stop

## Removing

### Remove the containers

    docker-compose stop && docker-compose rm

### Remove the data and settings of your mattermost instance

    sudo rm -rf volumes

## Database Backup

When AWS S3 environment variables are specified on db docker container, it enables [Wel-E](https://github.com/wal-e/wal-e) backup to S3.

```bash
docker run -d --name mattermost-db \
    -e AWS_ACCESS_KEY_ID=XXXX \
    -e AWS_SECRET_ACCESS_KEY=XXXX \
    -e WALE_S3_PREFIX=s3://BUCKET_NAME/PATH \
    -e AWS_REGION=us-east-1
    -v ./volumes/db/var/lib/postgresql/data:/var/lib/postgresql/data
    -v /etc/localtime:/etc/localtime:ro
    db
```

All four environment variables are required. It will enable completed WAL segments sent to archive storage (S3). The base backup and clean up can be done through the following command:

```bash
# base backup
docker exec mattermost-db su - postgres sh -c "/usr/bin/envdir /etc/wal-e.d/env /usr/local/bin/wal-e backup-push /var/lib/postgresql/data"
# keep the most recent 7 base backups and remove the old ones
docker exec mattermost-db su - postgres sh -c "/usr/bin/envdir /etc/wal-e.d/env /usr/local/bin/wal-e delete --confirm retain 7"
```
Those tasks can be executed through a cron job or systemd timer.

For the server configurations, see [prod-ubuntu.rst] of mattermost.

[docker]: http://docs.docker.com/engine/installation/
[docker-compose]: https://docs.docker.com/compose/install/

## USING CLI Commands with Docker install

Hello there

```bash
    Go to platform/docker
    use : docker container ls

    You'll see "docker_app_1". This is mattermost app container.
    
    Do : docker exec -it docker_app_1 /bin/bash
    Do : cd /mattermost
    Do : cd /bin

    Now you can use all the CLI commands listed here https://docs.mattermost.com/administration/command-line-tools.html

    For example - 
    ./platform team delete gosocial => to delete a team

```
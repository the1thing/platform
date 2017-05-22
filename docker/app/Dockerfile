FROM ubuntu:14.04

RUN apt-get update && apt-get -y install curl netcat
RUN mkdir -p /mattermost/data

RUN curl https://s3.ap-south-1.amazonaws.com/1thing-logos/binary-images/production/mattermost-team-linux-amd64_v13.tar.gz | tar -xvz

COPY config.template.json /
COPY docker-entry.sh /

RUN chmod +x /docker-entry.sh
ENTRYPOINT ["/docker-entry.sh"]

EXPOSE 80

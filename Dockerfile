FROM qaregistry.yatra.com/yatra-node-npm:v18.6.0
MAINTAINER Linuxadmin@yatra.com
LABEL ProductName=trip-expense-manager
#ADD --chown=yatra:yatra . /data/yatra/
#USER root
#RUN npm install
#USER yatra

ADD --chown=yatra:yatra . /data/yatra/trip-expense-manager/
ADD --chown=yatra:yatra build.sh /usr/bin/build.sh

RUN chmod 755 /usr/bin/build.sh
RUN cd /data/yatra/trip-expense-manager && npm install && npm list -prod && npm run build
WORKDIR /data/yatra/trip-expense-manager
EXPOSE 3000
ENTRYPOINT ["/usr/bin/build.sh"]
CMD ["PROD"]

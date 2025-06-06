#!/bin/bash
set -m

# common function
setup()
{
 
    NODEIP=`ip -4 -f inet addr show | grep -oP '(?<=inet\s)\d+(\.\d+){3}' | grep -v 127.0.0.1`
    NAME1=`echo $NODEIP | awk -F"." '{print$3"-"$4}'`
    NAME="yatra-${NAME1}"
    sudo setfacl -R -m u:yatra:rwx /opt
    sudo setfacl -m u:yatra:rwx /etc/hosts

    #mkdir /data/yatra/logs/${NODEIP}/{YTLOG,logs} -p
    #ln -s /data/yatra/logs/${NODEIP}/logs /data/yatra/${PRODUCT}/logs
}

setupbuilddeploy()
{
	echo " -------------- Starting Deployment Process ------------------------ "	    
        npm run start:prod
	echo " ----- Application Deployment Process Complete ------- "
    echo " ----- Application Starting..... ------- "

}
# initilize script here
setup
setupbuilddeploy


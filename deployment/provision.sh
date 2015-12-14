#!/usr/bin/env bash

## Install basic development tools and nginx
sudo apt-get update
sudo apt-get install -y build-essential git nginx libkrb5-dev

## install Database
sudo apt-get install -y mongodb redis-server

##Install Node 4.x de las distribuciones Nodesource destributions
curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
sudo apt-get install -y nodejs

## copiar configuracion
cp /root/config/default /etc/nginx/sites-enable/default
cp /root/config/juegos1.conf /etc/init
cp /root/config/juegos2.conf /etc/init
cp /root/config/juegos3.conf /etc/init

##instal juegos-mmo
rm -rf /opt/juegos_mmo
mkdir -p /opt/juegos_mmo
tar xvfz /root/juegos_mmo-0.1.0.tgz -C /opt/juegos_mmo
cd /opt/juegos_mmo/package && npm install

##RUn Services
service nginx restart
service juegos1 restart
service juegos2 restart
service juegos3 restart
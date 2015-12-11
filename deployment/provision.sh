#!/usr/bin/env bash

## Install basic development tools and nginx
apt-get update
apt-get install -y build-essential git nginx libkrb5-dev

## install Database
apt-get install -y mongodb redis-server

##Install Node 4.x de las distribuciones Nodesource destributions
curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
sudo apt-get install -y nodejs

## copiar configuracion
cp /root/config/default /etc/nginx/sites-enable/default
cp /root/config/juegos1.conf /etc/init
cp /root/config/juegos2.conf /etc/init
cp /root/config/juegos3.conf /etc/init

##instal juegos-mmo
rm -rf /opt/juegos
mkdir -p /opt/juegos
tar xvfz /root/juegos-0.1.0.tgz -C /opt/juegos

##RUn Services
service nginx restart
service juegos1 restart
service juegos2 restart
service juegos3 restart
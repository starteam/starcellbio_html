#!/bin/bash

sudo apt-get update;
sudo apt-get install libmysqlclient-dev mysql-client mysql-server python-pip build-essential python-dev python-virtualenv libncurses5-dev -y
sudo service mysql start
sudo pip install virtualenvwrapper
source virtualenvwrapper.sh
mkvirtualenv starcellbio
cd /vagrant
pip install -r requirements.txt

echo "CREATE DATABASE starcellbio; GRANT ALL PRIVILEGES ON starcellbio.* TO 'starcellbio'@'localhost' IDENTIFIED BY '136a411ed9e8592089444b7164ffaf84';" | sudo mysql

python manage.py syncdb
python manage.py loaddata backend statuses courses assignments studentassignments


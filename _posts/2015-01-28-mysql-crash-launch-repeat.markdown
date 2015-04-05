---
layout: post
title:  "MySql crash launch repeat"
date:   2015-01-28 21:13:09
categories: sysadmin 
---
##Frugal Wordpress setup
When you want to setup a wordpress server with decent performance at a low cost, nothing beats digital ocean. This is of course my opinion, but $5/month is hard to beat! The only caveat is 512mb of memory.
<!--more-->

##512mb is like Raspberry Pi
To give some context, only having a 512mb droplet is like having a Rasberry Pi dedicated for your web server. Which there is nothing wrong with that if you do not expect heavy traffic or heavy processing. 

##MySql will die...
Eventually, MySql will simply quit. While it seems like the server can handle Wordpress no problem with great speed for such a small droplet, MySql running in parallel can't seem to take it.

##The consensus
As you might have guessed, I had an issue with MySql crashing on my server. I read through some of the community questions on Digital Ocean. Mainly these two articles, [MySql keeps crashing on 512mb droplet][do1] and [MySql on Ubuntu keeps crashing][do2]. The general consensus is to either create a swap or upgrade to a bigger server. Although it seemed like users were having issues with both solutions. When hope was almost lost, I saw a comment where one guy was manually restarting MySql server every time it crashed. Then thought came acrossed my mind... couldn't you just automate that?

##Automate it
Before you dish out more money to upgrade your perfectly good toy like server, let me help you automate this process of restarting the MySql server. So keep your money in your pockets. I admit this is probably not the most ideal of solutions, but it will work and keep your MySql server going. I also want to disclaim since this checks the status every minute, you could experience one minute of down time. So if you are okay with that, carry on!

Create a script file called `restart-mysql.sh` and place it in root directory on your server. You could call it whatever you want and place it where every you'd like, just keep in mind of both for the next step.

Add this code to that file:
{% highlight bash %}
#!/bin/bash
if [[ ! "$(/usr/sbin/service mysql status)" =~ "start/running" ]]
then
        /etc/init.d/mysql start
fi
{% endhighlight %}
~[solution source][do3]

Make sure the script is executable by running this: `chmod +x /restart-mysql.sh`

Add this to the cron tab by doing the following:

* `sudo crontab -e` to edit the root contab file
* Then add this line to the file: `*/1 * * * * /restart-mysql.sh`

##Results
What this will do is poll the status of MySql every minute. If the status is "start/running", it will start MySql again. This should be enough to keep your server going like the energizer bunny. 

[do1]:	https://www.digitalocean.com/community/questions/mysql-keeps-crashing-on-512mb-droplet	
[do2]:	https://www.digitalocean.com/community/questions/mysql-on-ubuntu-keeps-crashing	
[do3]:	http://askubuntu.com/questions/451839/shell-script-issue-cron-job-script-to-restart-mysql-server-when-it-stops-accide	

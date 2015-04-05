---
layout: post
title:  "Creating installfont"
date:   2015-02-13 21:13:09
categories: npm module
---
##Installing system fonts is trickier than you would think
At least that is the case for Windows OS. During early stage development of RenderEffects, I really did not put much thought into installing font on the system. At the time it seemed as trivial as copy/pasting into the font directory right? Nerp! Even if you give your Node program system privileges, it just will not work. It turns out the only way to do it is with Windows powershell scripting. That kind of turned me off from writing it myself, so I was hoping there would already be something available on npm or Github that I could use or at least modify. But, It appeared, I was the only person in need of a system font installation module.
<!--more-->

##System tasks
I feel like Node is well known for its capabilities with high i/o, which makes it a great candidate for web applications. You don't really read articles about Node being used for system tasks, at least on a regular basis. So I was actually pretty interested in open sourcing a module that was aimed at doing a system task. I like the idea of advocating more system task modules for Node.

##Open sourcing installfont
It didn't actually occur to me to open source the module and release it until I started looking for job in the full stack Javascript field. I was asked to provide a piece of work I had done in Node and be able to walk through the script. Originally, I was going to show some proprietary parts of the application, but I ended up never being able to get to that part of the technical interview, since we did not have enough time. I didn't want to part ways after that without showing the team some of my work, so I explored what parts of my code I would be comfortable sending away for review.  It was funny grooming my project, looking at some of my custom built modules, that it had never occured to me to open source my modules that were not particularily proprietary.


>New mantra, "If it is not proprietary, open source it".

Of course I had to do a bit of rewriting to do to make it ready for the 0.0.1 release, which was aimed only towards Windows.

##Getting on npm
Up until this point, I only installed from NPM, not so much the latter. Turns out that is pretty easy too. If you are curious about this area, I would recommend checking out the new [How to npm][hnpm] module to learn how to npm. Getting your module on npm is obviously nice so that users can properly install and package your module in their applications.

Now users can run, `npm install installfont --save`, and quickly get up and running with my module. 

##Cross platform compatibility
The reason I released it only for Windows at first, was because I felt It is actually pretty trivial to install font on OSX and Linux operating systems with Node. But there was still a lot of moving parts and wiring up that my module solved for that would be nice for other OS users. Ultimately assuming that other OS users would probably not want to use it and instead write their own solution for it is a terrible assumption. Even I was quick to look for a module instead of writing my own to keep my laziness intact.

No matter what OS you are on, this syntax just feels better.

{% highlight javascript linenos %}
var installfont = require('installfont');

installfont('path/to/your/font.ttf', function(err) {
	if(err) console.log(err, err.stack);;
	//handle callback tasks here
});
{% endhighlight %}

##Ends and benefits
[installfont][installfonturl] is available on [npm][installfonturl] as well as [Github][githuburl]. The most rewarding part is users are actually installing installfont as well as contributing to the repo. You would not get that if it was closed off deep in your application somewhere.

[hnpm]:            https://www.npmjs.com/package/how-to-npm
[installfonturl]:  https://www.npmjs.com/package/installfont
[githuburl]:       https://github.com/matsilva/installfont

---
layout: post
title: 'Diogo writes some pretty code'
description: "Diogo really likes pretty code"
---

I love writting pretty code. That is why I have this test page with a bunch of pretty code in various languages.

```bash
# docker run -t registry:5000/dolly
# export DOCKER_CONTENT_TRUST=1
# docker run -t registry:5000/dolly
# docker push registry:5000/dolly:latest
# docker run -t registry:5000/dolly
(go to registry)
# clean
# docker run --disable-content-trust -t registry:5000/dolly
# docker run -t registry:5000/dolly
(go to registry)
# clean
# docker run -t registry:5000/dolly
```

Another piece of code that would be cool would be some golang code in the house:

{% highlight go linenos %}
package main

import (
	"fmt"
	"log"

	"github.com/miekg/pkcs11"
)

func main() {

	// Assumes OpenSC is installed
	p := pkcs11.New("/usr/local/Cellar/opensc/0.14.0_1/lib/opensc-pkcs11.so")
	p.Initialize()
	defer p.Destroy()
	defer p.Finalize()
	slots, err := p.GetSlotList(true)

	log.Printf("Slots available: %s\n", slots)

	if err != nil {
		fmt.Println(err)
	}

	session, err := p.OpenSession(slots[0], pkcs11.CKF_SERIAL_SESSION|pkcs11.CKF_RW_SESSION)
	if err != nil {
		log.Printf("error while opening the session: %v", err)
	}

	// Inits the session with the Private key
	p.SignInit(session, []*pkcs11.Mechanism{pkcs11.NewMechanism(pkcs11.CKM_SHA256_RSA_PKCS, nil)}, priv)

	// Sign something with the private key.
	data := []byte("Lets sign this data")
	sig, err := p.Sign(session, data)
	if err != nil {
		log.Fatalf("error in signature: %v", err)
	}
	log.Println(sig)
}
{% endhighlight %}


WHat about some ruby code in the house yo:

{% highlight perl %}
use Irssi;

$VERSION = "0.1";
%IRSSI = (
    authors	=> "Diogo",
    contact	=> "diogo@hugs.com",
    name	=> "troll_blocker",
    description	=> "Only allow accounts registered with NickServ over 10 weeks ago to send private messages",
    license	=> "Apache2",
    changed	=> "2015-05-27",
);

Irssi::theme_register([
    'blocker_blocked_first', '%R>>%n %_Blocker:%_ first message from nickname %_$0%_ on $1.',
    'blocker_added', '%R>>%n %_Blocker:%_ added to whitelist: %_$0%_ on $1.',
    'blocker_rejected', '%R>>%n %_Blocker:%_ rejected %_$0%_ on $1 from being added to whitelist.',
    'file_open_error', '%R>>%n %_Blocker:%_ could not open whitelist nickname file: %_$0%_.',
]);


my $valid = {};
my $validating = "";

sub msg_private {
  my ($server, $msg, $nick, $address) = @_;

  if (exists $valid{ $nick }) {
    return;
  }

  $validating=$nick;
  Irssi::printformat(MSGLEVEL_CLIENTCRAP, 'blocker_blocked_first', $nick, $server->{tag});
  $server->command("msg NickServ INFO $nick");
  Irssi::signal_stop();
}
{% endhighlight %}

Oops, that was totally perl. Now for reals:

```ruby
#! /bin/env ruby
require 'socket'

if ARGV.length != 1
  puts "# Usage: #{$0} FILNAME.csv"
  exit(-1)
end

input_filename = ARGV.first
unless File.exist? input_filename
  puts "# File: #{filename} does not exist."
  puts "# Usage: #{$0} FILNAME.csv"
  exit(-1)  
end
```

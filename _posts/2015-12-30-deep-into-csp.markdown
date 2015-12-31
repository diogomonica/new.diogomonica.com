---
layout: post
title: 'Creating a CSP Policy from Scratch'
description: 'When I added the Content-Security-Policy security header to my website, I was more concerned about getting a good rating on securityheaders.io, than actually creating a good policy. In this post I go over how to create a least-privilege CSP policy from scratch.'
thumbnail: deep-into-csp/console.png
tags: [security headers, csp]
---

When I added the Content-Security-Policy (CSP) security header to my website, I was more concerned about [getting a good rating](https://diogomonica.com/2015/12/29/from-double-f-to-double-a/) on [securityheaders.io](https://securityheaders.io), than actually creating a good policy. In this post I'll show you how I created a new, better, CSP policy from scratch.

I'm going to assume some familiarity with the fundamentals of CSP. For a good introduction on CSP and the motivations behind it, read [this article](http://www.html5rocks.com/en/tutorials/security/content-security-policy/).

## Starting a policy from scratch

CSP follows a blacklist of whitelists model. If you include the header but don't include a specific directive, that is equivalent to specifying * as the valid source for that directive (i.e. everywhere). On the other hand, if you do include a directive, only the sources listed will be allowed.

There are a lot of directives that can be used to enforce policies for content types. You can see an exhaustive list of directives [here](https://developer.mozilla.org/en-US/docs/Web/Security/CSP/CSP_policy_directives). CSP also allows policies around particular circumstances, such as whether the browser should include referer headers when following links away from a page.

A good start for any CSP policy is the directive *default-src 'none'*. This directive does what you'd expect it to do: if a directive isn't explicitly set, it will default to this value.

{% highlight bash %}
Content-Security-Policy: default-src 'none'
{% endhighlight%}

Unfortunately, the directives in the following list don't use *default-src* as a fallback, which means that we will have to remember to set them explicitly, or they will default to allowing everything.

- frame-ancestors
- report-uri
- base-uri
- form-action
- sandbox

## Adding some sane defaults

First, we will start by allowing the current origin (*self*) to load most resource types. Second, we're going to instruct the browser to block [mixed content](https://developer.mozilla.org/en-US/docs/Security/MixedContent/How_to_fix_website_with_mixed_content), explicitly enable [reflected XSS](https://www.owasp.org/index.php/Cross-site_Scripting_(XSS)) protections, ensure we're not sending referrer headers when downgrading from HTTPS to HTTP (to avoid [referrer leaks](https://blog.mozilla.org/security/2015/01/21/meta-referrer/)), and access every HTTP URL via HTTPS instead<sup><a id="ffn1" href="#fn1" class="footnote">1</a></sup>.

{% highlight bash %}
Content-Security-Policy: 
	default-src 'none'; 
	script-src 'self'; style-src 'self'; 
	img-src 'self'; font-src 'self'; 
	upgrade-insecure-requests; block-all-mixed-content; 
	reflected-xss block; referrer no-referrer-when-downgrade;
{% endhighlight%}

Note that, by leaving *connect-src*, *media-src*, *object-src*, and *child-src* out of this policy, we're effectively disallowing XMLHttpRequest, WebSockets, audio, video, Flash, and iframes from being used with this website. Change it accordingly.

Even though generating CSP policies manually is incredibly instructive, it is also very typo prone. Feel free to use a [CSP headers generator](https://report-uri.io/home/generate/) to generate your base policy instead.

[<img src="/images/deep-into-csp/policy_generator.png"/>](https://report-uri.io/home/generate/)

## Testing the base policy

At this point we have a strong initial policy that will not allow loading anything external to your own domain. Instead of deploying it in enforce mode, which would most likely break your website, we can swap out *Content-Security-Policy* for *Content-Security-Policy-Report-Only*, and get a comprehensive list of everything that doesn't follow this base policy. This is a good way of finding the minimum set of resources we have to allow to turn it into enforce mode.



<img src="/images/deep-into-csp/chrome_developer_console.png"/>

The most common exceptions you will have to add are going to be external resources, such as javascript, images and fonts. For example, in order to allow the embedding of slideshare decks (see image above), I added the following directive:

{% highlight bash %}
frame-src 'self' https://www.slideshare.net;
{% endhighlight%}

To allow loading google fonts and google analytics, I added:

{% highlight bash %}
script-src 'self' https://www.google-analytics.com/;
img-src 'self' https://www.google-analytics.com; 
style-src 'self' https://fonts.googleapis.com; 
font-src 'self' https://fonts.googleapis.com https://fonts.gstatic.com;
{% endhighlight%}

Note the change to *img-src* directive. Google analytics uses a tracking pixel, which is technically an image.

### Inline Code

One of the reasons why CSP is such a big deal for web security, is the fact that it can largely eliminate XSS attacks. It does so by not allowing inline *script* tags and *javascript://* URLs. Unfortunately, developers use a lot of inline code. This is actually one of the most common roadblocks to creating a good CSP policy. 

There is a directive value that was created specifically to work around this issue: *unsafe-inline*, but you should never use it. Instead, you should [turn your inline javascript into an externally loaded script](http://stackoverflow.com/questions/21593051/converting-inline-javascript-to-external).

## Reporting Policy Violations

One of the coolest directives of CSP is *report-uri*, which specifies the URL to which browsers should report violations of the Content Security Policy. You can deploy your own application to receive these reports, or use a free online version, like [report-uri.io](https://report-uri.io).

In my case, I signed up for [report-uri.io](https://report-uri.io), configured my domain to be *diogomonica.com*, and added the following line to my policy:

{% highlight bash %}
report-uri https://report-uri.io/report/59e303e8e117668e8e166508913a6d1d;
{% endhighlight%}

This will be my own, unique URL, that browsers will send JSON reports to, concerning any violations on diogomonica.com. This is what a violation would look like:

<img src="/images/deep-into-csp/report.png"/>

And the corresponding JSON:

{% highlight json %}
{
    "csp-report": {
        "document-uri": "https://diogomonica.com/2015/12/29/from-double-f-to-double-a/",
        "referrer": "",
        "violated-directive": "img-src 'self' https://www.google-analytics.com",
        "effective-directive": "img-src",
        "original-policy": "default-src 'none'; script-src 'self' https://www.google-analytics.com/; img-src 'self' https://www.google-analytics.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.googleapis.com https://fonts.gstatic.com; frame-src 'self' https://www.slideshare.net; upgrade-insecure-requests; block-all-mixed-content; reflected-xss block; referrer no-referrer-when-downgrade; frame-ancestors 'none'; base-uri diogomonica.com www.diogomonica.com; form-action 'none'; report-uri https://report-uri.io/report/59e303e8e117668e8e166508913a6d1d;",
        "blocked-uri": "data",
        "status-code": 0
    }
}
{% endhighlight%}

## Adding the final directives

Remember the earlier directives that don't inherit the default behavior? Well, we should explicitly set those to some reasonable values.

- *frame-ancestors* specifies valid parents that may embed a page using the <frame> and <iframe> elements.
- *base-uri* defines the URIs that a user agent may use as the document base URL. 
- *form-action* specifies valid endpoints for <form> submissions.
- *sandbox* [places restrictions on actions the page can take](https://html.spec.whatwg.org/multipage/browsers.html#sandboxing), instead of restricting resources it can load. It will be the topic of a future blog post.

This is my final policy:

{% highlight bash %}
Content-Security-Policy 
	"default-src 'none'; 
	script-src 'self' https://www.google-analytics.com/; 
	img-src 'self' https://www.google-analytics.com; 
	style-src 'self' https://fonts.googleapis.com; 
	font-src 'self' https://fonts.googleapis.com https://fonts.gstatic.com; 
	frame-src 'self' https://www.slideshare.net; 
	upgrade-insecure-requests; block-all-mixed-content; 
	reflected-xss block; referrer no-referrer-when-downgrade; 
	frame-ancestors 'none'; form-action 'none'; 
	base-uri diogomonica.com www.diogomonica.com;
	report-uri https://report-uri.io/report/59e303e8e117668e8e166508913a6d1d;"
{% endhighlight%}

At this point we can use the [online CSP analyzer](https://report-uri.io/home/analyse), to make sure we're green across the board.

<img src="/images/deep-into-csp/green_across.png"/>

## Dealing with large CSP headers

Unfortunately, HTTP headers aren't compressed<sup><a id="ffn2" href="#fn2" class="footnote">2</a></sup>, which means that you will be injecting a potentially large CSP header into every HTTP response. 

To avoid that, you can set some or all of your policies directly in the page markup. You do that by using the meta tag with an http-equiv attribute:

{% highlight html %}
<meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'self' https://www.google-analytics.com/;"> 
{% endhighlight%}

There are three directives that can’t be set using meta tags: *frame-ancestors*, *report-uri*, and *sandbox*.

Another possible work-around is to take advantage of the conditional header injection features of your web server. If you're using nginx, you can create a map that will return different headers, based on the content-type of the page.

{% highlight bash %}
map $sent_http_content_type $csp_policies {
    "text/html"    "default-src 'none'; script-src 'self' https://www.google-analytics.com/; ...";
    default       "default-src 'none";
}

server {
    location / {
        add_header "Content-Security-Policy" $csp_policies;
    }
}
{% endhighlight%}

## Conclusion

By designing your CSP policies from scratch, you can achieve a least-privilege CSP deployment, and create a policy that allows exactly what you need. No more, no less.

If you start by enabling CSP in *Report-Only* mode, you can start knocking off all the necessary exceptions, with the help of the Chrome Developer Console, and easily change it to enforce mode later on.

If you care about the security of your users, you should care about CSP.

<ol id="footnotes">
  <li id="fn1">The upgrade-insecure-requests and referrer policies are still a "Working draft". <a href="#ffn1">↩</a></li>
  <li id="fn2">This might not be as big of a problem in the future, since both HTTP2 and SPDY support header compression. <a href="#ffn2">↩</a></li>
</ol>

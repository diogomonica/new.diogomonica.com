---
layout: post
title: 'Technical due dilligence at the low end of the spectrum'
description: ''
thumbnail: technical-due-diligence/image.png
tags: [security headers, csp]
---

- I've been doing a lot of due dilligence for VCs these days
- These are obviously different from heavy-handed due-dillience that you would do for a company acquisition, it's more lighweight. On the spectrum of due-dilligence, we can put this on the fast, one-hour opinion.
- The big objectives, as I see them: How good does the team seem to be, how technologically deep can they go on their idea. Is there a PoC (if early stage) and how good is it. The answer to: would I buy this product, and why. How compeling is this product. My opinion on the market (TAM).
- If this product heavily relies on machine learning or data-mining, I expect one of the co-founders or first engineers to be a SME in the topic. If you're building an IDS system, and one co-founder is business oriented and the other one an audtior by background, you're going to have a bad time.
(Slide with: "Let me get this straight: given the exact same data sources, and no domain knowledge on anomaly detection systems, you're expecting to build a better IDS than everyone else? Right...)b
- Very limited time-frames, I would say that one hour-long calls are very common.

- So what can we do in one hour, how do I think about this and what is the expected output.
- Usually people have they're slide deck. I prefer when the person doing the presentation is technical, and usually I try to listen through the whole presentation, but only if it is under 25 minutes. After that I really need time to dig in and start asking questions.
- I think the motivation is pretty easy for someone in security to grasp. I think it's incredibly important when doing a pitch to a VC, but if you're describing your product to me and I don't immediately see the value/problem space, we have a problem.
- I want to obviously hear about the long-term vision, but that sometimes reduces to "Solving this issue", so I'm really interested on the short-term deliverables, and the first iterations of the product. People always try to boil the ocean (picture of boil the ocean)
- I'll obviously ask questions about the technology stack, to try to understand what kind of team I'm dealing with. The unfortunate truth is that if you're building your FE with PHP, and all of your backend code is C, that is a pretty big negative sign. Both of these languages are hard to get right, and therefore, hard to hire good developers for them. Sure, you can get anyone to build a PoC w/ PHP in a couple of weeks, but I'm looking for sustainability, and how long will it take until you will have to do a GC pause to rewrite your infrastructure. Both twitter and square are good examples of a GC pause around migrating from the Monorail to something that actually scales.


Instead of focusing on your normal stuff, like finantial projections, business model, I always focus on the specific product, solution and implementation. One of the one's I usually get asked a lot is market size. I think it's to understand how many companies would have this problem, which is an insight that is easier to judge by someone that understands how diferent companies operate when it comes to security. An understanding of what kind of company would build VS buy, or what kind of company is solely looking to meet compliance requirments VS actually solving a security need.

- Product
 - Does it solve a problem
 - Are other technologies solving this problem better
 - Clear value proposition (can you demonstrate X amount of )
 - Focused on a specific problem (coming up with a solution that does everything is usually a recipe for disaster)
 - How easy is it to integrate into customers current workflows? Is the majority of the value on a new dashboard?
- Team
 - Subject Matter Expertise (is there someone that has a good feeling for where the industry is moving, and why this will be relevant in 5 years)
 - Technical Matter Expertise (is there someone that understands where the dragons are, and how to reduce the solution to a few, incredibly well digested points of control)
 - Prior shipped products (Shipping matters, what have they shipped before?)
- Customer
 - Right size of the market or segment
 - Access to costumers (Will the team able to deploy a PoC at )
- Attacker model
- Competition
 - Low Barriers to entry
 - Differentiable Position
 

 - Innovation
  - How unique is the idea is and how is it executed through technology and design.
- Scalability: How much traction has been achieved so far? How much is expected in the coming months? Is there a possibility to expand into new verticals and new locations?

- Solution: The problem being addressed and the effectiveness of the solution
- Market: Is the target market lucrative or significant? Is there a need for the product/service?
- Competitive Advantage:  What is the Unique Selling Proposition USP? What is the marketing strategy to gain and retain customers? What’s the product/service’s position relative to comparable alternatives and competitors?
- Team
Background: The experience and passion of your team,
any advisors/board members/investors involved
Size and Scope of the Founding Team.
- Quality of the PITCH
How well the company pitches on stage

- If you're simply forwarded a Deck, the amount of valuable information is obviously greatly reduced. At this point this is not due dilligence, and it is simply a filtering exercise.

- PCI-DSS (joke, left side outside of the spectrum)
- Investor Deck
- Architecture Deck
- Acquihire
- Vendor/Partnership
- Product Acquisition
Writing the due diligence report
The on-site discovery process
- Merger
- Core technology acquisition


FROM REAL ASESSEMNT

- Evaluate the team. Look for research, etc.
- Look at the premisse. If they say: are no solutions for Intrusion Detection, then we have a problem.
- How much Snake Oil is in here? Proprietary patent-pending technologies? I don't think that stuff is ok for VCs, but it's definitely not OK for technical dilligence.

<ol id="footnotes">
  <li id="fn1">The upgrade-insecure-requests and referrer policies are still a "Working draft". <a href="#ffn1">↩</a></li>
  <li id="fn2">This might not be as big of a problem in the future, since both HTTP2 and SPDY support header compression. <a href="#ffn2">↩</a></li>
</ol>

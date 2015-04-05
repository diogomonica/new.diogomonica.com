---
layout: post
title:  "Essential Git Habits"
date:   2015-01-27 21:13:09
categories: git
---
##Sink or swim
Sink or swim is usually the case when I join a team. Most recently I have been engaged with TwinTech developing full stack JavaScript for Under Armour. I have to say, the most initial friction was caused by my Git habits. Things like ugly Git history and weird commits sneaking into my branches. The good news is the team has been super helpful by helping me become more savvy with my Git habits. These habits are what I would like to share with you.
<!--more-->

##Branching
Create relevant branch names. This can be as simple as the feature, defect or improvement ticket name. Version numbers can also be appended to these names to track version releases. 

**Tracking upstream vs tracking origin.** This is crucial in order to make sure your branch is up to date with the latest upstream production branch. For those who do not know, upstream is the original repository you forked your working repository from.

If you have already created a local branch, run these commands:

* `git remote add upstream giturl@gihub.git`
* `git branch -u upstream/branch`

If not you can knock out two birds with one stone by running:

* `git checkout -b your_branch upstream/branch`

Fetch upstream changes regularily and rebase instead of merging. If your branch becomes behind your upstream, rebase against the upstream branch to keep a linear tree and possibly help mitigate conflicts.

##Pairing
Rebase against partner's branch or vice versa. Pairing with another developer on a feature can quickly lead to nasty Git merges and history. A good idea can be for one developer to rebase against the other developer's branch to keep things linear in the commit tree.

##Commit message
Create present tense commit messages. Don't ask me why, just do it.... But if you must know I believe it is because it mimics the tense of Git actions like Git add and Git rm. If there is a relevant ticket, it helps to include it in the message. 
Any additional details are best to include below the main brief message, starting on third line.
A sample format can look like this:

	Nav-877: Add store navigation to hamburger

	The actual store href was in the footer navigation database, so it was mapped to hamburger. Updates to footer will update hamburger.

##Commit and push
Make many commits during development, push to remote development branch. This gives you nice history to revert and/or cherry pick during development. It also allows your team lead to communicate to the higher ups progress and work status, which is nice to prove you really have been working and not just lol'ing on Facebook... slacker.

##Production bundling
Probably the most useful command I have learned is rebase -i. Essentially what this allows you to do is bundle up all your commits into a single commit for a clean pull request against production when the time comes.

To do this run:

* `git rebase -i`

This will start an interactive rebase session, where you can squash and/or pick your commits. When the dialog appears, just change 'pick' to 'squash' and vice versa to choose which commits you want to appear in the history.

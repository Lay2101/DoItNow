# PROMPTS.md - [Product name]
**Student:** MA Ma Lay · **Course:** MGMT 6110 · **Problem Set 1**
**User sentence:** A Student opens this screen to check the tasks how many she/he done or has to do, and knows it worked when there are different highlight.
**Live link:** https://doitnow-nine.vercel.app

---

## Prompt 1 - the master prompt
```
ROLE: You are a senior front-end developer building a React web app. 

GOAL: Build the front end of ‘DoItNow’, a web product for a undergraduate, master, PhD or any students who has job and studies to manage at the same time, and they need to manage not to miss one of the important work and studies. Their job on this product is [check the number of tasks they have to do and done, in their words, not in feature words]. Screens: 

1) [SCREEN 1: how many important tasks they have to do in this week, how much tasks they have done; write the tasks down and check the tasks; highlight the green if the tasks are done and remind if the tasks are important] 

2) [SCREEN 2, prepare for the next week tasks] 

3) [SCREEN 3, tips how to be productive next time] 

OUTPUT: A running app. Keep every invented value in ONE data file of its own, with 

at least [3] rows, so the screen looks real. One component per screen or section. 

Move between screens without reloading the page. Readable on a phone at arm's 

length. When you are done, list the files you created and what each one holds.


GUARDRAILS: Screens and invented data only. Do NOT call the Gemini API or any 

other model. Do NOT call any outside service or fetch from any URL. No database, 

no login, no user accounts, no analytics. No features I did not list. No real 

company's name, logo, or trademark. Invented names and numbers only, nothing 

confidential. 

  
CONTEXT: Individual Problem Set 1 for MGMT 6110 Human-AI Collaboration at SMU. 

Built in Google AI Studio, shared as a link, and opened on a phone by classmates 

in Week 3. I am not a programmer: when you make a choice I did not specify, say 

so in one line rather than burying it. 
```
**What came back:** A running app, 7 files, preview loaded. When I gave the prompt, the preview seems really perfect and it came out what I imagined.
**What I changed next and why:** Added "Tasks Scheduled for Next Week (4)" on "Next Week" screen to the Guardrails, but I did not change that part as it seems okay for me.
---

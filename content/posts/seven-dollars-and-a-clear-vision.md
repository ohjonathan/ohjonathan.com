---
title: "Seven Dollars and a Clear Vision"
date: 2026-02-17
description: "I made a one-minute cinematic history of Chicago for $7. The hard part wasn't the technology."
tags: ["ai", "creativity", "veo-3", "video"]
draft: false
---

For the first time, the bottleneck isn't your skillsets, but your intention. It's not about what you can or can't do; it's whether you know what you actually want to make.

I've been thinking about this a lot lately. The conversation around AI is dominated by productivity and coding, and for good reason. But there's a quieter shift happening in creative expression that I think deserves more attention. The tools to make things that used to require years of specialized training are now available to anyone who can clearly articulate what they want. The skill gap isn't gone, but it's narrowing fast, across every field.

I wanted to test this for myself. So I made a one-minute cinematic history of Chicago. It's not perfect, but it exists, and that's the point.

{{< youtube o-yfe-H5uow >}}

## Why Chicago

As a history nerd, I've always appreciated historically accurate media. Band of Brothers, Ken Burns documentaries, that kind of thing. There's something about seeing history rendered with care and precision that makes it feel real in a way that reading about it doesn't.

But beyond the history, I just love how Chicago looks. The lakefront, the parks, the way the skyline rises right out of the green — there's a weight to it that most cities don't have. It feels like a city that was built with intention.

![Aerial view of Chicago's lakefront and skyline](/images/posts/seven-dollars/chicago-aerial.jpg)
*The best city in the world = Chicago in May. Taken from McKinsey & Company's Chicago office.*

I've always wanted to see a cinematic aerial timelapse of Chicago evolving from prairie wetlands to a modern skyline. The kind of shot that would open a high-budget documentary. But I'm not a filmmaker. I don't have a VFX team. I've never touched After Effects.

What I do have is a clear picture of what I wanted to see.

## How I made it

I used Google's Veo 3 through Google Flow, which generates 8-second clips from text prompts. My job was to figure out the right prompts. I used Gemini to help.

The process was iterative. I started with one long prompt describing the full vision: a continuous aerial shot over Chicago from the 1700s to today. Gemini broke it into 6 chronological scenes with a shared "Universal Technical Header" to keep the camera angle and coordinates consistent across clips.

The first drafts were too generic. "Rapid urbanization" and "buildings appear" weren't going to cut it. I pushed Gemini to add specific landmarks to each era: Fort Dearborn's log stockade, the Water Tower surviving the Great Fire, Marina City's corncob towers rising floor by floor. The prompts got better as my direction got more specific.

I also realized 6 scenes wasn't enough. The video needed a real ending. So I asked for a Scene 7: a night-to-dawn cycle that mirrors the opening, with sunrise hitting the glass faces of the modern skyline. A creative decision only I could make.

{{< inline-svg "images/posts/seven-dollars/iteration-flow.svg" >}}

## What it cost

Here's where it gets interesting.

My video: 7 scenes at 100 Google AI credits each. 700 credits total. That's $7.

A traditional equivalent? A one-minute photorealistic CGI timelapse depicting seven distinct historical eras of a real city, with accurate architecture, fire simulation, and cinematic camera work? You'd need a VFX team, historical consultants, 3D modelers, and weeks of render time. Documentary-grade CGI runs $10,000 to $100,000+ per finished minute. Even a modest indie production would cost thousands.

Seven dollars. An afternoon. One person.

{{< inline-svg "images/posts/seven-dollars/cost-comparison.svg" >}}

Let me be honest: you can tell it's AI-generated. The physics aren't always right, some transitions feel uncanny, and a trained eye will spot the seams. It is not a Hollywood production, and it's not trying to be.

But that's kind of the point. Even at 70-80% of what a professional VFX team would produce, this was completely out of reach for an individual just a few years ago. The floor has risen dramatically, even if the ceiling still belongs to skilled professionals.

## What this actually means

I want to be careful here. This isn't a story about AI replacing skilled filmmakers or VFX artists. A professional would look at my video and see a dozen things wrong with it. They'd be right. People who have spent years mastering their craft produce fundamentally better work, and I have a lot of respect for that.

But something real has shifted. The barrier to creating something, even something imperfect, has dropped to near zero. The cost of turning an idea into a tangible draft is now trivial. What used to require a production team and a budget now requires intention and the ability to describe what you see in your head.

That matters. Not because the output is perfect, but because it exists at all. A year ago, my idea for this video would have stayed an idea. Now it's a thing I can show people, get feedback on, and iterate from. That's the shift I think people are sleeping on. Everyone's focused on AI for coding and productivity. But the same narrowing of the skill gap is happening across video, writing, music, design, and every other form of expression. The tools are right there. Most people just haven't tried them yet.

The hard part was never the rendering. It was knowing what I wanted to make.

---

## Production prompts

For anyone curious, here are the final prompts I used for each scene. These went through several rounds of iteration with Gemini before reaching this level of specificity.

<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin:1.5rem 0">
  <div style="text-align:center"><img src="/images/posts/seven-dollars/scene-1.jpg" alt="Scene 1" style="width:100%;border-radius:4px"><small>1700–1830</small></div>
  <div style="text-align:center"><img src="/images/posts/seven-dollars/scene-2.jpg" alt="Scene 2" style="width:100%;border-radius:4px"><small>1830–1870</small></div>
  <div style="text-align:center"><img src="/images/posts/seven-dollars/scene-3.jpg" alt="Scene 3" style="width:100%;border-radius:4px"><small>1871</small></div>
  <div style="text-align:center"><img src="/images/posts/seven-dollars/scene-4.jpg" alt="Scene 4" style="width:100%;border-radius:4px"><small>1880–1920</small></div>
  <div style="text-align:center"><img src="/images/posts/seven-dollars/scene-5.jpg" alt="Scene 5" style="width:100%;border-radius:4px"><small>1930–1990</small></div>
  <div style="text-align:center"><img src="/images/posts/seven-dollars/scene-6.jpg" alt="Scene 6" style="width:100%;border-radius:4px"><small>2000–2026</small></div>
  <div style="text-align:center"><img src="/images/posts/seven-dollars/scene-7.jpg" alt="Scene 7" style="width:100%;border-radius:4px"><small>2026 Sunrise</small></div>
</div>

### Scene 1: 1700s–1830 (The Swamp & The Fort)

![Scene 1: The Swamp & The Fort](/images/posts/seven-dollars/scene-1.jpg)

Ultra-realistic IMAX aerial timelapse over Chicago Loop coordinates (41.8781° N, 87.6298° W). Locked high-altitude bird's-eye perspective looking North-West. Slow, imperceptible forward push. Zero camera roll, zero lateral drift. Photorealistic lighting. Timeline 1700 to 1830. The scene begins with wild garlic plants and tall prairie grass dominating the marshy riverbanks. A large sandbar visibly blocks the mouth of the Chicago River at Lake Michigan. Timelapse evolution: Indigenous trails harden into dirt wagon roads. The log stockade structure of Fort Dearborn (1803) constructs rapidly on the south bank. The Kinzie House appears on the north bank. Small trading boats dock at Wolf Point (the river fork). Morning mist clears to reveal the first cluster of wooden cabins and small docks.

### Scene 2: 1830–1870 (The Raising of Chicago)

![Scene 2: The Raising of Chicago](/images/posts/seven-dollars/scene-2.jpg)

Ultra-realistic IMAX aerial timelapse over Chicago Loop coordinates (41.8781° N, 87.6298° W). Locked high-altitude bird's-eye perspective looking North-West. Slow, imperceptible forward push. Zero camera roll, zero lateral drift. Photorealistic lighting. Timeline 1830 to 1870. The sandbar at the river mouth is dredged and cut through. The Illinois and Michigan Canal connects. Rapid urbanization: Swing bridges span the river. Historical engineering event: The "Raising of Chicago" occurs visually—existing brick buildings like the Tremont House are visibly jacked up, and the street grade rises several feet to cover new sewers, creating a higher ground level. Grain elevators rise along the river. The Chicago Water Tower (1869) constructs in the distance. The shoreline pushes out as land is reclaimed for rail yards.

### Scene 3: 1871 (The Great Fire)

![Scene 3: The Great Fire](/images/posts/seven-dollars/scene-3.jpg)

Ultra-realistic IMAX aerial timelapse over Chicago Loop coordinates (41.8781° N, 87.6298° W). Locked high-altitude bird's-eye perspective looking North-West. Slow, imperceptible forward push. Zero camera roll, zero lateral drift. Photorealistic lighting. Timeline October 8-10, 1871. Nighttime. A small blaze starts southwest of the center and expands into a massive conflagration driven by strong winds. The fire jumps the river. Wooden districts incinerate instantly. The Court House bell tower collapses. A wall of fire sweeps north. Key detail: The yellow limestone Water Tower stands untouched while surrounding blocks turn to black ash. The city becomes a smoking, flattened wasteland by dawn, with only brick shells remaining.

### Scene 4: 1880–1920 (The First Sky-Scrapers)

![Scene 4: The First Sky-Scrapers](/images/posts/seven-dollars/scene-4.jpg)

Ultra-realistic IMAX aerial timelapse over Chicago Loop coordinates (41.8781° N, 87.6298° W). Locked high-altitude bird's-eye perspective looking North-West. Slow, imperceptible forward push. Zero camera roll, zero lateral drift. Photorealistic lighting. Timeline 1880 to 1920. Rapid vertical reconstruction. The world's first steel-frame skyscraper, the Home Insurance Building, assembles. The dark masonry bulk of the Monadnock Building rises. The Masonic Temple (tallest of its time) appears. Near the river, the gleaming white terracotta Wrigley Building (1920) constructs. Navy Pier extends into the lake. Engineering event: The Chicago Harbor Lock constructs at the river mouth, and the river current visually reverses direction, flowing away from the lake.

### Scene 5: 1930–1990 (Steel Giants)

![Scene 5: Steel Giants](/images/posts/seven-dollars/scene-5.jpg)

Ultra-realistic IMAX aerial timelapse over Chicago Loop coordinates (41.8781° N, 87.6298° W). Locked high-altitude bird's-eye perspective looking North-West. Slow, imperceptible forward push. Zero camera roll, zero lateral drift. Photorealistic lighting. Timeline 1930 to 1990. The massive Art Deco Merchandise Mart dominates the river bank. In the 1960s, the twin "corncob" towers of Marina City grow concrete floor by floor. The black X-braced obelisk of the John Hancock Center (1969) tops out. The massive black bundled-tube structure of the Sears Tower (Willis Tower) (1973) rises to dominate the skyline. The white vertical stone of the Aon Center appears. Lake Shore Drive is reconfigured into a superhighway.

### Scene 6: 2000–2026 (The Glass Millennium)

![Scene 6: The Glass Millennium](/images/posts/seven-dollars/scene-6.jpg)

Ultra-realistic IMAX aerial timelapse over Chicago Loop coordinates (41.8781° N, 87.6298° W). Locked high-altitude bird's-eye perspective looking North-West. Slow, imperceptible forward push. Zero camera roll, zero lateral drift. Photorealistic lighting. Timeline 2000 to 2026. The rail yards are covered to form Millennium Park; the reflective Cloud Gate (The Bean) appears. The curvilinear glass of Trump Tower (2009) reflects the river. The undulating white balconies of the Aqua Tower appear. The distinct tiered blow-through design of the St. Regis Chicago (2020) completes the skyline. Lighting transitions to twilight "Blue Hour"; the city grid lights up in amber and white LED. The Riverwalk bustles with tiny illuminated activity.

### Scene 7: 2026 (The Living Metropolis & Sunrise)

![Scene 7: The Living Metropolis & Sunrise](/images/posts/seven-dollars/scene-7.jpg)

Ultra-realistic IMAX aerial timelapse over Chicago Loop coordinates (41.8781° N, 87.6298° W). Locked high-altitude bird's-eye perspective looking North-West. Slow, imperceptible forward push. Zero camera roll, zero lateral drift. Photorealistic lighting. Timeline: Present Day (One full night-to-day cycle). The scene begins in deep night with the city grid blazing in gold and white LEDs. Traffic on I-90/I-94 flows as continuous streaks of light. Clouds streak rapidly over the moonlit lake. The horizon shifts to a violet pre-dawn. The Finale Moment: The sun rises (off-screen to the East), and brilliant golden morning light suddenly strikes the eastern glass faces of Willis Tower, Trump Tower, and St. Regis, setting them ablaze with reflection. The city gleams in the fresh morning light. Fade to black.

# Technical Post Grading Prompt

Paste this prompt into Claude (or equivalent) followed by the post content.

---

You are evaluating a technical post written by a software engineer for a personal site. The target reader is a senior engineer who works in or adjacent to this area. They are not looking for a tutorial. They are looking for evidence that the author actually understands something — a non-obvious tradeoff, a failure mode, a decision they had to make with incomplete information.

Grade the post on the following. For each criterion, give a pass, flag, or fail with one sentence of reasoning.

**1. Specific enough to be wrong**
Does the post make a claim that a knowledgeable reader could push back on? Or does it stay at a level of abstraction where everything is safely true? Safe truths are not worth reading.

**2. Shows evidence of direct contact with the material**
Does it reference specific tools, configurations, observed behavior, or numbers? Or does it describe how something works from documentation? A senior engineer can tell the difference between someone who profiled something and someone who read a blog post about profiling it.

**3. Explains a non-obvious tradeoff**
Does it show that two things are in tension and why the author chose one over the other? Or does it just explain what something does? Explanation without tension is documentation, not writing.

**4. Assumes appropriate knowledge**
Does it skip the basics? A post about KV-cache eviction should not explain what a cache is. Condescending to the reader is a form of dishonesty about who the post is for.

**5. Has a single clear thing the reader takes away**
What is the one sentence the reader would repeat to a colleague? If there isn't one, the post has no center.

**6. Tone**
Is it direct? Does it sound like a person who figured something out, not a person performing expertise? Flag any: hedging ("it's worth noting that"), false modesty ("I'm no expert but"), or unnecessary caveats that the reader already knows.

After grading each criterion, give an overall verdict: **publish**, **revise**, or **cut**. If revise, name the one change that would matter most.

---
name: "🤔 - Suggestions"
about: Create a report to help us improve
title: "[suggestion]"
labels: "suggestion"
assignees: trent-gezel, tommerty

---

**Describe your idea**
Please give us as much detail as possible. If something should work a certain way, look a certain way, act a certain way. The more detail you give us, the better we can build it!

body:
- type: checkboxes
  id: cat-preferences
  attributes:
    label: What kinds of cats do you like?
    description: You may select more than one.
    options:
      - label: Orange cat (required. Everyone likes orange cats.)
        required: true
      - label: **Black cat**

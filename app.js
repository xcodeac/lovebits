(() => {
  "use strict";

  const situationInput = document.getElementById("situation");
  const charCount = document.getElementById("char-count");
  const generateButton = document.getElementById("generate");
  const regenerateButton = document.getElementById("regenerate");
  const emptyState = document.getElementById("empty-state");
  const resultsContent = document.getElementById("results-content");
  const suggestionsContainer = document.getElementById("suggestions");
  const toneButtons = [...document.querySelectorAll(".tone-option")];
  const dailyIdea = document.getElementById("daily-idea");
  const ideaCounter = document.getElementById("idea-counter");
  let selectedTone = "warm";
  let lastSituation = "";

  const ideas = [
    "Notice one thing she did today that might usually go unmentioned. Tell her you noticed.",
    "Ask how her day actually went. Then listen without trying to fix every single thing.",
    "Take one task off her plate without announcing it like you've completed an Olympic event.",
    "Tell her one specific thing you admire about the way she handled something.",
    "Send a message just because. No request, no reminder, no 'while you're there…'",
    "Make her a cup of tea or coffee the way she likes it. Bonus points if you remember how.",
    "Give her your full attention for ten minutes. Phone down. Eyes up. Revolutionary stuff.",
    "Thank her for something she does so often that it may have become invisible.",
    "Tell her something she did recently that made you laugh or made your day better.",
    "Ask what would make tomorrow a little easier for her — and follow through."
  ];

  const toneCopy = {
    warm: {
      open: ["I just wanted to say", "I've been thinking", "I hope you know"],
      close: ["I really appreciate you.", "It means a lot to me.", "I'm lucky we're doing life together."]
    },
    playful: {
      open: ["Quick official announcement:", "I have a very important review to deliver:", "Not to be dramatic, but"],
      close: ["10/10. Would appreciate again.", "You make this whole team look good.", "Please accept this extremely sincere imaginary trophy."]
    },
    romantic: {
      open: ["Little moment of appreciation:", "I don't say this enough, but", "Just a reminder that"],
      close: ["I'm really glad I get to share life with you.", "You still make my heart do a little thing.", "I love the person you are, in all the everyday moments."]
    },
    proud: {
      open: ["I want you to know", "I hope you're giving yourself credit because", "I see the effort you've put in, and"],
      close: ["I'm genuinely proud of you.", "You deserve to feel good about this.", "I believe in you, always."]
    }
  };

  const phraseSets = [
    {
      keys: ["cook", "dinner", "food", "meal", "bake", "lunch"],
      warm: ["That was so thoughtful of you. You put care into the little things, and I don't take that for granted.", "That was lovely. Thank you for making our evening feel a bit more special.", "You made something delicious and made me feel looked after. I appreciate both."],
      playful: ["That dinner was excellent. I would like to renew my membership in this household.", "Chef, you have absolutely understood the assignment. Thank you.", "I was already hungry, and now I'm emotionally attached to this meal. You're brilliant."],
      romantic: ["It's not just the food. It's the care you put into it. I love that about you.", "You have a way of making ordinary evenings feel like home. Thank you, love.", "I love these little moments with you. And yes, I also love your cooking."],
      proud: ["You put real effort into that, and it showed. I hope you know how much I appreciate it.", "You made something wonderful, and you should absolutely take the credit.", "I see the thought and effort you put in. I'm proud of the care you bring to things."]
    },
    {
      keys: ["work", "job", "project", "achiev", "promotion", "exam", "passed", "finished", "goal", "success"],
      warm: ["I know how much effort went into this. I'm so happy for you, and I hope you feel proud of yourself.", "You kept going, even when it wasn't easy. I see that, and I admire you for it.", "You deserve this moment. I'm really happy I get to celebrate it with you."],
      playful: ["Look at you being all capable and impressive. Very inconvenient for the rest of us.", "I'd like to formally congratulate my favourite overachiever. Seriously, well done.", "Another day, another reason for me to brag about you. Nicely done."],
      romantic: ["Watching you go after something that matters to you makes me admire you even more.", "I love seeing you light up when something you've worked for comes together.", "Your determination is one of the many things I love about you."],
      proud: ["I'm genuinely proud of you. I know the work behind this, not just the result.", "You earned this. Please don't brush it off or minimise what you've achieved.", "You backed yourself and put in the work. That's something to be proud of."]
    },
    {
      keys: ["stress", "chaos", "busy", "tired", "long day", "hard day", "difficult", "handled", "manage"],
      warm: ["I saw how much you had on your plate today. Thank you for everything you did. I hope you get a chance to rest.", "Today looked like a lot, and you handled so much. I appreciate you.", "I know it wasn't an easy day. I see the effort you put in, and I'm here for you."],
      playful: ["Today's chaos had absolutely no chance against you. Still, you deserve a proper break now.", "You handled approximately seventeen things at once. I counted. Please clock off.", "If today were a group project, you'd have done all the work. Thank you — now sit down."],
      romantic: ["I wish I could take some of the weight off your shoulders. You matter more to me than any task on that list.", "Even on the messy days, I'm grateful I get to be on your team.", "I see how much you give to everyone. I hope you feel cared for too."],
      proud: ["You handled a difficult day with so much strength. I hope you give yourself credit.", "I know that took patience and energy. I'm proud of how you got through it.", "You did a lot today. Please don't measure the day only by what remains undone."]
    },
    {
      keys: ["support", "help", "encourage", "believe", "listen", "advice", "meeting", "interview"],
      warm: ["Thank you for being in my corner. Your support means more to me than I probably say.", "You made me feel less alone in that. I really appreciate you.", "You have a way of helping me find my feet again. Thank you for being you."],
      playful: ["Thank you for being my personal hype squad and occasional reality-check department.", "Your support: five stars. Would absolutely recommend to other husbands.", "You believed in me even when my confidence was buffering. I love you for that."],
      romantic: ["Having you beside me makes the hard things feel less heavy. Thank you, love.", "I feel so lucky to have someone who knows me and still chooses to cheer me on.", "Your belief in me stays with me. I hope you know how much I treasure that."],
      proud: ["The way you show up for people is something I deeply admire.", "You have such a generous way of supporting the people you love. I see it.", "Thank you for standing beside me. I don't take your strength or kindness for granted."]
    },
    {
      keys: ["beautiful", "dress", "look", "outfit", "hair", "pretty", "photo", "smile"],
      warm: ["You look lovely. I wanted to make sure I actually said it instead of just thinking it.", "You look really beautiful today. That's the whole message. No hidden agenda.", "I love seeing you smile. It makes the room feel different."],
      playful: ["Excuse me, who gave you permission to look this good on a regular day?", "That look deserves a little appreciation and possibly its own fan club.", "I was trying to concentrate, but then you walked in looking like that. Rude, honestly."],
      romantic: ["You are beautiful to me in the big moments and in the completely ordinary ones.", "I still get that little pause when I look at you. Just thought you should know.", "You look lovely, and I feel very lucky that I get to tell you in person."],
      proud: ["You carry yourself with such confidence. It's lovely to see you feeling good in yourself.", "I love the way you express yourself. You look wonderful.", "You deserve to feel as good as you look. Own it."]
    },
    {
      keys: ["laugh", "funny", "joke", "cheer", "happy", "smile", "fun"],
      warm: ["You made my day better just by being you. I love how easily you make me smile.", "I really needed that laugh. Thank you for bringing a bit of light into my day.", "I love the fun we have together. I never want to take that for granted."],
      playful: ["Your comedy department remains severely underfunded but wildly effective.", "Thank you for making me laugh. Annoyingly, you're still my favourite person.", "You are ridiculous. Please never change. (Within reason. We have standards.)"],
      romantic: ["One of my favourite things is being able to laugh with you about absolutely nothing.", "I love that we can be silly together. It feels like home.", "You make ordinary moments memorable. I love that about us."],
      proud: ["Your warmth lifts people up. I hope you know what a lovely quality that is.", "You bring so much joy into the everyday. That's a real gift.", "I admire how you can find a little light even on an ordinary day."]
    }
  ];

  const general = {
    warm: [
      "I noticed the effort you put into that. Thank you — it means more than you know.",
      "I don't want to let the moment pass without saying I appreciate you. I'm glad you're you.",
      "You did that with so much care. I see it, and I'm grateful."
    ],
    playful: [
      "A quick note from the husband appreciation department: excellent work. Five stars.",
      "I noticed that, and I would like to register my appreciation before my brain moves on to snacks.",
      "You make being on the same team a pretty great deal. Thanks for being my favourite teammate."
    ],
    romantic: [
      "It's these everyday things that make me love sharing life with you. Thank you, sweetheart.",
      "I hope you know how much I value you — not just for what you do, but for who you are.",
      "I'm grateful for you in the big moments and all the little ones in between."
    ],
    proud: [
      "I see the thought and effort you put into things. You should give yourself credit.",
      "You handled that in a way I really admire. I'm proud of you.",
      "You bring so much of yourself to the things you care about. I hope you know that matters."
    ]
  };

  function chooseSet(text) {
    const lower = text.toLowerCase();
    return phraseSets.find(set => set.keys.some(key => lower.includes(key)));
  }

  function makeSuggestions(text, tone) {
    const set = chooseSet(text);
    const options = set ? set[tone] : general[tone];
    const cleaned = text.trim().replace(/[.!?]+$/, "");
    // Keep the user's own detail present in one of the options, without pretending to know more.
    const first = `${toneCopy[tone].open[0]} ${cleaned.toLowerCase()}. ${toneCopy[tone].close[0]}`;
    const second = options[0];
    const third = options[1];
    return [first, second, third];
  }

  function renderSuggestions(text, tone) {
    suggestionsContainer.innerHTML = "";
    const messages = makeSuggestions(text, tone);
    messages.forEach((message, index) => {
      const card = document.createElement("article");
      card.className = "suggestion-card";
      const label = document.createElement("div");
      label.className = "suggestion-number";
      label.textContent = `OPTION 0${index + 1}`;
      const paragraph = document.createElement("p");
      paragraph.textContent = message;
      const copy = document.createElement("button");
      copy.type = "button";
      copy.className = "copy-button";
      copy.textContent = "Copy message ↗";
      copy.setAttribute("aria-label", `Copy option ${index + 1}`);
      copy.addEventListener("click", async () => {
        try {
          await navigator.clipboard.writeText(message);
          copy.textContent = "Copied ✓";
        } catch {
          copy.textContent = "Select and copy";
          paragraph.tabIndex = 0;
          paragraph.focus();
        }
      });
      card.append(label, paragraph, copy);
      suggestionsContainer.append(card);
    });
    emptyState.hidden = true;
    resultsContent.hidden = false;
  }

  function generate() {
    const text = situationInput.value.trim();
    if (!text) {
      situationInput.focus();
      situationInput.setCustomValidity("Add a little detail first — even a few words will do.");
      situationInput.reportValidity();
      situationInput.addEventListener("input", () => situationInput.setCustomValidity(""), { once: true });
      return;
    }
    lastSituation = text;
    renderSuggestions(text, selectedTone);
  }

  situationInput.addEventListener("input", () => {
    charCount.textContent = situationInput.value.length;
  });
  toneButtons.forEach(button => {
    button.addEventListener("click", () => {
      selectedTone = button.dataset.tone;
      toneButtons.forEach(item => {
        const active = item === button;
        item.classList.toggle("is-selected", active);
        item.setAttribute("aria-pressed", String(active));
      });
      if (lastSituation) renderSuggestions(lastSituation, selectedTone);
    });
  });
  document.querySelectorAll(".text-chip").forEach(button => {
    button.addEventListener("click", () => {
      situationInput.value = button.dataset.prompt;
      charCount.textContent = situationInput.value.length;
      situationInput.focus();
    });
  });
  generateButton.addEventListener("click", generate);
  regenerateButton.addEventListener("click", () => {
    if (lastSituation) renderSuggestions(lastSituation, selectedTone);
  });

  document.getElementById("random-idea").addEventListener("click", () => {
    const current = dailyIdea.textContent;
    let next = current;
    while (next === current) next = ideas[Math.floor(Math.random() * ideas.length)];
    dailyIdea.textContent = next;
    ideaCounter.textContent = "A small thing. A big difference. ♥";
  });

  // Share the site when supported; otherwise copy the current page URL.
  const shareButton = document.createElement("button");
  shareButton.type = "button";
  shareButton.className = "text-chip";
  shareButton.textContent = "Share this little club ↗";
  shareButton.style.marginTop = "12px";
  shareButton.addEventListener("click", async () => {
    const shareData = { title: "The Appreciation Club", text: "A tiny, funny reminder to appreciate your favourite person.", url: window.location.href };
    if (navigator.share) {
      try { await navigator.share(shareData); } catch (error) { if (error.name !== "AbortError") console.warn(error); }
    } else {
      try { await navigator.clipboard.writeText(window.location.href); shareButton.textContent = "Link copied ✓"; }
      catch { shareButton.textContent = "Copy the URL from your address bar"; }
    }
  });
  document.querySelector(".footer-bottom").append(shareButton);
})();

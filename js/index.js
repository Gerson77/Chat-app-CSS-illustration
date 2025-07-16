const typingIndicator = document.querySelector('.typing-indicator');

function showTypingBeforeMessage(selector, delayAfter = 600) {
  return new Promise((resolve) => {
    typingIndicator.style.display = 'flex';
    
    setTimeout(() => {
      typingIndicator.style.display = 'none';

      const el = document.querySelector(selector);
      el.style.display = 'flex';
      gsap.from(el, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        onComplete: () => setTimeout(resolve, delayAfter),
      });
    }, 2000);
  });
}

function simulateTyping(text, elementId) {
  return new Promise((resolve) => {
    const el = document.getElementById(elementId);
    el.textContent = "";
    el.classList.add("typing");

    let i = 0;

    function typeLetter() {
      if (i < text.length) {
        el.textContent += text[i];
        i++;
        setTimeout(typeLetter, 40);
      } else {
        setTimeout(() => {
          resolve();
        }, 600);
      }
    }

    typeLetter();
  });
}


function showSentMessage(selector) {
  const el = document.querySelector(selector);
  el.style.display = "flex";
  gsap.from(el, { opacity: 0, y: 30, duration: 0.8 });

  document.getElementById("typing-text").textContent = "";
}

async function runChatSequence() {
  const typingEl = document.getElementById("typing-text");
  typingEl.textContent = "Type a message...";

  await showTypingBeforeMessage(".message-1");
  await showTypingBeforeMessage(".message-2");
  
  showSentMessage(".message-3");


  await simulateTyping("Here are a few pictures. She’s a happy girl!", "typing-text");
  showSentMessage(".message-4");

  await simulateTyping("Can you make it?", "typing-text");
  showSentMessage(".message-5");

  
  await showTypingBeforeMessage(".message-6");
  
  showSentMessage(".price-1");
  showSentMessage(".price-2");
}

runChatSequence();

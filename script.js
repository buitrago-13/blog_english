document.addEventListener("DOMContentLoaded", () => {

    /* ------------------------------------------------------
       SCROLL REVEAL ANIMATION
    ------------------------------------------------------ */
    const revealElements = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                }
            });
        }, { threshold: 0.15 });

        revealElements.forEach(el => observer.observe(el));
    } else {
        revealElements.forEach(el => el.classList.add("visible"));
    }

    /* ------------------------------------------------------
       HERO TYPING EFFECT (Home Page)
    ------------------------------------------------------ */
    const heroTitle = document.getElementById("hero-title");
    if (heroTitle) {
        const fullText = (heroTitle.getAttribute("data-text") || heroTitle.textContent || "").trim();
        heroTitle.textContent = "";
        let index = 0;

        const typeNext = () => {
            if (index <= fullText.length) {
                heroTitle.textContent = fullText.slice(0, index);
                index += 1;
                const delay = index < fullText.length ? 45 : 200;
                setTimeout(typeNext, delay);
            }
        };

        setTimeout(typeNext, 400);
    }

    /* ------------------------------------------------------
       PARTICLE BACKGROUND LAYER (All pages)
    ------------------------------------------------------ */
    const particleLayer = document.createElement("div");
    particleLayer.className = "particle-layer";
    document.body.appendChild(particleLayer);

    /* ------------------------------------------------------
       CARD TILT EFFECT (Cards and Solution Boxes)
    ------------------------------------------------------ */
    const tiltTargets = document.querySelectorAll(".card, .solution-box");

    tiltTargets.forEach(card => {
        card.addEventListener("mousemove", (event) => {
            const rect = card.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * 4;
            const rotateY = ((centerX - x) / centerX) * 4;

            card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
            card.style.transition = "transform 0.05s ease-out";
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = "";
            card.style.transition = "transform 0.3s ease-out";
        });
    });

    /* ------------------------------------------------------
       POLL SUBMISSION (Home Page Only)
    ------------------------------------------------------ */
    const pollForm = document.getElementById("poll-form");
    const pollResponse = document.getElementById("poll-response");

    if (pollForm && pollResponse) {
        pollForm.addEventListener("submit", (event) => {
            event.preventDefault();

            const selected = document.querySelector("input[name='impact']:checked");

            if (!selected) {
                pollResponse.textContent = "Please choose an option before submitting.";
                pollResponse.style.color = "#F97316";
                return;
            }

            const value = selected.value;
            let message = "";

            if (value === "helpful") {
                message = "Thank you. Your experience shows how AI can support learning and work.";
            } else if (value === "stress") {
                message = "Thank you for sharing. Many people feel uncertain about rapid changes with AI.";
            } else if (value === "both") {
                message = "You are not alone. AI feels helpful and stressful for many people.";
            } else if (value === "none") {
                message = "Even if AI has not affected you yet, it will likely shape future jobs. Thank you for your response.";
            }

            pollResponse.textContent = message;
            pollResponse.style.color = "#FACC15";
        });
    }

    /* ------------------------------------------------------
       COMMENTS SECTION (Home Page Only)
    ------------------------------------------------------ */
    const commentForm = document.getElementById("comment-form");
    const commentInput = document.getElementById("comment-input");
    const commentList = document.getElementById("comment-list");

    if (commentForm && commentInput && commentList) {
        commentForm.addEventListener("submit", (event) => {
            event.preventDefault();

            const text = commentInput.value.trim();
            if (text === "") return;

            const li = document.createElement("li");
            li.textContent = text;

            commentList.prepend(li);
            commentInput.value = "";
        });
    }

    /* ------------------------------------------------------
       85 PERCENT JOB IMPACT ANIMATION (Why AI Page Only)
    ------------------------------------------------------ */
    const percentText = document.getElementById("percent-num");
    const statFill = document.getElementById("stat-fill");

    if (percentText && statFill) {
        let animated = false;

        const animateBar = () => {
            statFill.style.width = "85%";
        };

        const animatePercentage = () => {
            let current = 0;
            const target = 85;

            const count = () => {
                current += 1;
                percentText.textContent = String(current);

                if (current < target) {
                    requestAnimationFrame(count);
                }
            };

            requestAnimationFrame(count);
        };

        const startAnimation = () => {
            if (!animated) {
                animated = true;
                animateBar();
                animatePercentage();
            }
        };

        const impactObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    startAnimation();
                }
            });
        }, { threshold: 0.3 });

        impactObserver.observe(statFill);
    }

});

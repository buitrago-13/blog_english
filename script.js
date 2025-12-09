document.addEventListener("DOMContentLoaded", () => {
    const pollForm = document.getElementById("poll-form");
    const pollResponse = document.getElementById("poll-response");
    const commentForm = document.getElementById("comment-form");
    const commentInput = document.getElementById("comment-input");
    const commentList = document.getElementById("comment-list");
    const jobsPercent = document.getElementById("jobs-percent");
    const statFill = document.getElementById("stat-fill");
    const backToTop = document.getElementById("back-to-top");

    /* ----- Poll Submission ----- */
    if (pollForm && pollResponse) {
        pollForm.addEventListener("submit", (event) => {
            event.preventDefault();
            const selected = pollForm.querySelector("input[name='ai-impact']:checked");

            if (!selected) {
                pollResponse.textContent = "Please select an option before submitting.";
                return;
            }

            let message = "";
            switch (selected.value) {
                case "helped":
                    message = "Thanks for sharing! Your experience shows how AI can support learning and work.";
                    break;
                case "worried":
                    message = "Thank you for being honest. Your concerns about AI and stability are exactly why training matters.";
                    break;
                case "both":
                    message = "You’re not alone. Many people feel that AI is both helpful and stressful at the same time.";
                    break;
                case "none":
                    message = "Even if AI hasn’t affected you yet, it likely will. Your awareness is already a powerful first step.";
                    break;
            }

            pollResponse.textContent = message;
        });
    }

    /* ----- Comment Submission ----- */
    if (commentForm && commentInput && commentList) {
        commentForm.addEventListener("submit", (event) => {
            event.preventDefault();
            const text = commentInput.value.trim();

            if (!text) return;

            const li = document.createElement("li");
            li.textContent = text;
            commentList.prepend(li);
            commentInput.value = "";
        });
    }

    /* ----- Animated Percentage (85%) ----- */
    let percentAnimated = false;
    function animatePercent() {
        if (!jobsPercent || percentAnimated) return;
        percentAnimated = true;
        const target = 85;
        let current = 0;
        const step = () => {
            current += 2;
            if (current > target) current = target;
            jobsPercent.textContent = current.toString();
            if (current < target) {
                requestAnimationFrame(step);
            }
        };
        requestAnimationFrame(step);
    }

    /* ----- Scroll Reveal (IntersectionObserver) ----- */
    const revealElements = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window && revealElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");

                    // Trigger 85% bar when relevant section appears
                    if (entry.target.contains(statFill) && statFill) {
                        statFill.style.width = "85%";
                        animatePercent();
                    }
                }
            });
        }, {
            threshold: 0.2
        });

        revealElements.forEach((el) => observer.observe(el));
    } else {
        // Fallback: show all if IntersectionObserver not supported
        revealElements.forEach((el) => el.classList.add("visible"));
        if (statFill) statFill.style.width = "85%";
        animatePercent();
    }

    /* ----- Smooth Scrolling for In-Page Links ----- */
    const scrollLinks = document.querySelectorAll("a.scroll-link, .hero-button");
    scrollLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
            const href = link.getAttribute("href");
            if (href && href.startsWith("#")) {
                event.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 70,
                        behavior: "smooth"
                    });
                }
            }
        });
    });

    /* ----- Back-to-Top Button ----- */
    if (backToTop) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 300) {
                backToTop.style.display = "flex";
            } else {
                backToTop.style.display = "none";
            }
        });

        backToTop.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }
});

const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('animate-visible');
                    }, index * 100);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.animate-on-scroll, .animate-item').forEach(el => {
            observer.observe(el);
        });
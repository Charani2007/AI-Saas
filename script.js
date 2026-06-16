document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. Sticky Header Navigation Blur
       ========================================================================== */
    const header = document.getElementById('main-header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    /* ==========================================================================
       2. Mobile Responsive Navigation Menu
       ========================================================================== */
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    mobileToggle.addEventListener('click', () => {
        mobileToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile nav when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    /* ==========================================================================
       3. Dynamic Prompt Simulator Engine
       ========================================================================== */
    const promptInput = document.getElementById('prompt-input');
    const charCount = document.getElementById('char-count');
    const btnGenerate = document.getElementById('btn-generate');
    const presetBtns = document.querySelectorAll('.preset-btn');
    
    const previewLoader = document.getElementById('preview-loader');
    const loaderPercent = document.getElementById('loader-percent');
    const loaderStatus = document.getElementById('loader-status');
    const previewResultImg = document.getElementById('preview-result-img');
    const previewOverlay = document.getElementById('preview-overlay');
    const consoleLogs = document.getElementById('console-logs');
    
    const btnCopyPromptSim = document.getElementById('btn-copy-prompt-sim');
    const btnDownloadSim = document.getElementById('btn-download-sim');

    // Keep track of characters count
    promptInput.addEventListener('input', () => {
        charCount.textContent = promptInput.value.length;
    });

    // Presets button click listener
    presetBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            presetBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const promptText = btn.getAttribute('data-prompt');
            promptInput.value = promptText;
            charCount.textContent = promptText.length;
        });
    });

    // Simulated log sequences
    const simulationLogs = [
        { progress: 5, status: "Initializing weights...", text: "> Connecting to H100 GPU cluster (node-east-48)..." },
        { progress: 15, status: "Connecting cluster...", text: "> Connection verified. Latency: 14ms." },
        { progress: 28, status: "Tokenizing prompt...", text: "> Tokenizing input string. Found 28 semantic tokens." },
        { progress: 42, status: "Running denoiser...", text: "> Injecting negative embedding arrays (low_quality, blurry, distorted)..." },
        { progress: 55, status: "Sampling steps...", text: "> Starting latent diffusion sampling (Euler-A scheduler)..." },
        { progress: 68, status: "Diffusion steps...", text: "> Iteration step 15/35: generating high frequency details..." },
        { progress: 80, status: "Reconstructing RGB...", text: "> Iteration step 30/35: resolving chroma structures..." },
        { progress: 92, status: "Upscaling assets...", text: "> Rendering complete. Initializing 4K Real-ESRGAN upscaling pass..." },
        { progress: 100, status: "Complete!", text: "> Synthesis finished. Output mapped to local buffers." }
    ];

    let isGenerating = false;

    btnGenerate.addEventListener('click', () => {
        if (isGenerating) return;
        isGenerating = true;
        
        const promptValue = promptInput.value.trim().toLowerCase();
        
        // Decide which image to load based on keywords in user prompt
        let targetImg = "assets/art-fantasy.png";
        if (promptValue.includes('astronaut') || promptValue.includes('character') || promptValue.includes('cyber') || promptValue.includes('visor')) {
            targetImg = "assets/art-character.png";
        } else if (promptValue.includes('spaceship') || promptValue.includes('nebula') || promptValue.includes('scifi') || promptValue.includes('cosmic') || promptValue.includes('stars')) {
            targetImg = "assets/art-scifi.png";
        } else if (promptValue.includes('forest') || promptValue.includes('mushrooms') || promptValue.includes('magical') || promptValue.includes('tree')) {
            targetImg = "assets/art-fantasy.png";
        } else {
            // Fallback random distribution
            const images = ["assets/art-fantasy.png", "assets/art-character.png", "assets/art-scifi.png"];
            targetImg = images[Math.floor(Math.random() * images.length)];
        }

        // Setup paths on download and copy buttons
        btnDownloadSim.setAttribute('href', targetImg);
        btnCopyPromptSim.setAttribute('data-prompt', promptInput.value);

        // UI Reset
        previewOverlay.style.opacity = '0';
        previewLoader.classList.add('active');
        consoleLogs.innerHTML = "";
        btnGenerate.disabled = true;
        btnGenerate.style.opacity = '0.7';

        let currentStepIndex = 0;

        function runSimStep() {
            if (currentStepIndex >= simulationLogs.length) {
                // Done simulation
                setTimeout(() => {
                    previewResultImg.setAttribute('src', targetImg);
                    previewLoader.classList.remove('active');
                    previewOverlay.style.opacity = '1';
                    
                    btnGenerate.disabled = false;
                    btnGenerate.style.opacity = '1';
                    isGenerating = false;
                    
                    // Add final success marker in logs
                    const finalLine = document.createElement('div');
                    finalLine.className = 'log-line text-cyan';
                    finalLine.textContent = `> Inference Success! File size: ${(Math.random() * 2 + 1).toFixed(2)} MB. Ratio: 1:1`;
                    consoleLogs.appendChild(finalLine);
                    consoleLogs.scrollTop = consoleLogs.scrollHeight;
                }, 400);
                return;
            }

            const currentLog = simulationLogs[currentStepIndex];
            
            // Update percentage and text status
            loaderPercent.textContent = `${currentLog.progress}%`;
            loaderStatus.textContent = currentLog.status;
            
            // Append line log
            const logLine = document.createElement('div');
            logLine.className = `log-line ${currentStepIndex % 3 === 0 ? 'text-violet' : 'text-dim'}`;
            logLine.textContent = currentLog.text;
            consoleLogs.appendChild(logLine);
            consoleLogs.scrollTop = consoleLogs.scrollHeight;

            currentStepIndex++;
            
            // Random jitter timing to simulate server responses
            const delay = Math.random() * 200 + 250;
            setTimeout(runSimStep, delay);
        }

        runSimStep();
    });

    // Copy action in simulator preview
    btnCopyPromptSim.addEventListener('click', () => {
        const textToCopy = btnCopyPromptSim.getAttribute('data-prompt');
        copyToClipboard(textToCopy);
    });

    /* ==========================================================================
       4. Clipboard Copy & Toast Notifications
       ========================================================================== */
    const toastContainer = document.getElementById('toast-container');
    const copyBtns = document.querySelectorAll('.btn-copy-prompt');

    copyBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const promptText = btn.getAttribute('data-prompt');
            copyToClipboard(promptText);
        });
    });

    function copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(() => {
            showToast("Copied prompt to clipboard! ⚡");
        }).catch(err => {
            console.error('Failed to copy: ', err);
            // Fallback copy
            const textArea = document.createElement("textarea");
            textArea.value = text;
            textArea.style.position = "fixed";
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            try {
                document.execCommand('copy');
                showToast("Copied prompt to clipboard! ⚡");
            } catch (err) {
                console.error('Fallback failed', err);
            }
            document.body.removeChild(textArea);
        });
    }

    function showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = `
            <span class="toast-success-icon">✓</span>
            <span class="toast-text">${message}</span>
        `;
        
        toastContainer.appendChild(toast);
        
        // Remove toast after duration
        setTimeout(() => {
            toast.classList.add('removing');
            setTimeout(() => {
                toastContainer.removeChild(toast);
            }, 400);
        }, 2500);
    }

    /* ==========================================================================
       5. Pricing Toggle Mechanics
       ========================================================================== */
    const billingToggle = document.getElementById('billing-toggle');
    const labelMonthly = document.getElementById('label-monthly');
    const labelYearly = document.getElementById('label-yearly');
    
    const priceStarter = document.getElementById('price-starter');
    const pricePro = document.getElementById('price-pro');
    const priceEnterprise = document.getElementById('price-enterprise');
    
    const periodStarter = document.getElementById('period-starter');
    const periodPro = document.getElementById('period-pro');
    const periodEnterprise = document.getElementById('period-enterprise');

    let isYearly = false;

    billingToggle.addEventListener('click', () => {
        isYearly = !isYearly;
        billingToggle.classList.toggle('yearly', isYearly);
        
        if (isYearly) {
            labelMonthly.classList.remove('active');
            labelYearly.classList.add('active');
            
            // Set yearly prices with 20% discount (Starter 0, Pro 19->15, Enterprise 99->79)
            animatePrice(pricePro, 15);
            animatePrice(priceEnterprise, 79);
            
            periodStarter.textContent = '/mo, billed yearly';
            periodPro.textContent = '/mo, billed yearly';
            periodEnterprise.textContent = '/mo, billed yearly';
        } else {
            labelMonthly.classList.add('active');
            labelYearly.classList.remove('active');
            
            // Restore monthly pricing
            animatePrice(pricePro, 19);
            animatePrice(priceEnterprise, 99);
            
            periodStarter.textContent = '/mo';
            periodPro.textContent = '/mo';
            periodEnterprise.textContent = '/mo';
        }
    });

    // Fun count animation helper for numbers
    function animatePrice(element, targetVal) {
        const currentVal = parseInt(element.textContent);
        if (currentVal === targetVal) return;
        
        let val = currentVal;
        const speed = 20; // ms per step
        const increment = targetVal > currentVal ? 1 : -1;
        
        const timer = setInterval(() => {
            val += increment;
            element.textContent = val;
            if (val === targetVal) {
                clearInterval(timer);
            }
        }, speed);
    }

    /* ==========================================================================
       6. FAQ Accordion Mechanics
       ========================================================================== */
    const faqBtns = document.querySelectorAll('.faq-question-btn');

    faqBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const faqItem = btn.parentElement;
            const isOpen = faqItem.classList.contains('open');
            
            // Close all items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('open');
                item.querySelector('.faq-question-btn').setAttribute('aria-expanded', 'false');
            });
            
            // Toggle clicked item
            if (!isOpen) {
                faqItem.classList.add('open');
                btn.setAttribute('aria-expanded', 'true');
            }
        });
    });

});

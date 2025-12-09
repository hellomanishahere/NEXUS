document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.contact-form');
    const nameInput = form.querySelector('input[type="text"]');
    const emailInput = form.querySelector('input[type="email"]');
    const messageInput = form.querySelector('textarea');
    const submitBtn = form.querySelector('.contact-btn');

    function createErrorElement(message) {
        const error = document.createElement('span');
        error.className = 'error-message';
        error.style.color = '#ff4655';
        error.style.fontSize = '0.85rem';
        error.style.marginTop = '-10px';
        error.style.display = 'block';
        error.textContent = message;
        return error;
    }

    function clearErrors() {
        const errors = form.querySelectorAll('.error-message');
        errors.forEach(error => error.remove());
        
        [nameInput, emailInput, messageInput].forEach(input => {
            input.style.borderColor = '#2A2C36';
        });
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function showError(input, message) {
        input.style.borderColor = '#ff4655';
        const errorElement = createErrorElement(message);
        input.parentElement.insertBefore(errorElement, input.nextSibling);
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        clearErrors();

        let isValid = true;
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const message = messageInput.value.trim();

        if (!name) {
            showError(nameInput, 'Please enter your name');
            isValid = false;
        }

        if (!email) {
            showError(emailInput, 'Please provide an email address');
            isValid = false;
        } else if (!isValidEmail(email)) {
            showError(emailInput, 'Please provide a valid email address');
            isValid = false;
        }

        if (!message) {
            showError(messageInput, 'Please write a message');
            isValid = false;
        }

        if (isValid) {
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            setTimeout(() => {
                alert('Thank you! Your message has been sent successfully.');
                form.reset();
                submitBtn.textContent = 'Submit';
                submitBtn.disabled = false;
            }, 1500);
        }
    });

    emailInput.addEventListener('blur', function() {
        const email = this.value.trim();
        const existingError = this.nextElementSibling;
        
        if (existingError && existingError.classList.contains('error-message')) {
            existingError.remove();
            this.style.borderColor = '#2A2C36';
        }

        if (email && !isValidEmail(email)) {
            showError(this, 'Please provide a valid email address');
        }
    });

    [nameInput, emailInput, messageInput].forEach(input => {
        input.addEventListener('input', function() {
            const nextElement = this.nextElementSibling;
            if (nextElement && nextElement.classList.contains('error-message')) {
                nextElement.remove();
                this.style.borderColor = '#2A2C36';
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const gamesSection = document.getElementById('games');
    const gameGrid = document.querySelector('.game-grid');
    const sectionTitle = gamesSection.querySelector('.section-title');
    
    const filterContainer = document.createElement('div');
    filterContainer.className = 'filter-search-container';
    filterContainer.style.cssText = `
        margin-bottom: 30px;
        display: flex;
        flex-direction: column;
        gap: 20px;
    `;

    const searchContainer = document.createElement('div');
    searchContainer.className = 'search-container';
    searchContainer.style.cssText = `
        position: relative;
        max-width: 500px;
        width: 100%;
    `;
    
    searchContainer.innerHTML = `
        <input 
            type="text" 
            id="gameSearch" 
            placeholder="Search games by title..."
            style="
                width: 100%;
                padding: 14px 20px;
                background: var(--panel);
                border: 2px solid #2A2C36;
                border-radius: 10px;
                color: var(--text);
                font-size: 1rem;
                transition: 0.3s;
                outline: none;
            "
        >
    `;

    const filterButtonsContainer = document.createElement('div');
    filterButtonsContainer.className = 'filter-buttons';
    filterButtonsContainer.style.cssText = `
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
    `;
    
    const genres = ['All', 'RPG', 'Racing', 'Arcade', 'Strategy', 'Shooter', 'Horror'];
    
    genres.forEach(genre => {
        const btn = document.createElement('button');
        btn.className = 'filter-btn';
        btn.textContent = genre;
        btn.dataset.genre = genre;
        
        btn.style.cssText = `
            padding: 10px 24px;
            background: ${genre === 'All' ? 'var(--accent)' : 'var(--panel)'};
            color: var(--text);
            border: 2px solid ${genre === 'All' ? 'var(--accent)' : '#2A2C36'};
            border-radius: 8px;
            cursor: pointer;
            font-weight: 600;
            font-size: 0.95rem;
            transition: 0.3s;
            outline: none;
        `;
        
        if (genre === 'All') {
            btn.classList.add('active');
        }
        
        filterButtonsContainer.appendChild(btn);
    });
    
    filterContainer.appendChild(searchContainer);
    filterContainer.appendChild(filterButtonsContainer);
    sectionTitle.after(filterContainer);
    
    const gameCards = document.querySelectorAll('.game-card');
    gameCards.forEach(card => {
        const gameInfo = card.querySelector('.game-info').textContent;
        const genre = gameInfo.split('•')[0].trim();
        card.dataset.genre = genre;
        card.dataset.title = card.querySelector('.game-name').textContent.toLowerCase();
    });
    
    const filterButtons = document.querySelectorAll('.filter-btn');
    const searchInput = document.getElementById('gameSearch');
    
    let currentGenre = 'All';
    let currentSearchTerm = '';

    function filterGames() {
        let visibleCount = 0;
        
        gameCards.forEach(card => {
            const cardGenre = card.dataset.genre;
            const cardTitle = card.dataset.title;
            
            const matchesGenre = currentGenre === 'All' || cardGenre === currentGenre;
            const matchesSearch = cardTitle.includes(currentSearchTerm.toLowerCase());
            
            if (matchesGenre && matchesSearch) {
                card.style.display = '';
                card.style.animation = 'fadeIn 0.4s ease-out';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });

        let noResultsMsg = document.getElementById('noResultsMessage');
        
        if (visibleCount === 0) {
            if (!noResultsMsg) {
                noResultsMsg = document.createElement('div');
                noResultsMsg.id = 'noResultsMessage';
                noResultsMsg.style.cssText = `
                    grid-column: 1 / -1;
                    text-align: center;
                    padding: 60px 20px;
                    color: var(--muted);
                    font-size: 1.2rem;
                `;
                noResultsMsg.innerHTML = `
                    <div style="font-size: 4rem; margin-bottom: 16px;">🎮</div>
                    <h3 style="color: var(--text); margin-bottom: 8px;">No Games Found</h3>
                    <p>Try adjusting your search or filter criteria</p>
                `;
                gameGrid.appendChild(noResultsMsg);
            }
        } else {
            if (noResultsMsg) {
                noResultsMsg.remove();
            }
        }

        updateResultsCounter(visibleCount, gameCards.length);
    }
    
    const resultsCounter = document.createElement('div');
    resultsCounter.id = 'resultsCounter';
    resultsCounter.style.cssText = `
        color: var(--muted);
        font-size: 0.9rem;
        margin-top: -10px;
        margin-bottom: 20px;
    `;
    filterContainer.after(resultsCounter);
    
    function updateResultsCounter(visible, total) {
        resultsCounter.textContent = `Showing ${visible} of ${total} games`;
    }

    updateResultsCounter(gameCards.length, gameCards.length);

    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            filterButtons.forEach(b => {
                b.style.background = 'var(--panel)';
                b.style.borderColor = '#2A2C36';
                b.classList.remove('active');
            });

            this.style.background = 'var(--accent)';
            this.style.borderColor = 'var(--accent)';
            this.classList.add('active');
            
            currentGenre = this.dataset.genre;
            filterGames();
        });

        btn.addEventListener('mouseenter', function() {
            if (!this.classList.contains('active')) {
                this.style.background = 'var(--card)';
                this.style.borderColor = 'var(--accent)';
                this.style.transform = 'translateY(-2px)';
            }
        });
        
        btn.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.background = 'var(--panel)';
                this.style.borderColor = '#2A2C36';
                this.style.transform = 'translateY(0)';
            }
        });
    });

    searchInput.addEventListener('input', function() {
        currentSearchTerm = this.value.trim();
        filterGames();
    });

    searchInput.addEventListener('focus', function() {
        this.style.borderColor = 'var(--accent)';
        this.style.boxShadow = '0 0 0 3px rgba(179, 0, 0, 0.1)';
    });
    
    searchInput.addEventListener('blur', function() {
        this.style.borderColor = '#2A2C36';
        this.style.boxShadow = 'none';
    });

    const animationStyle = document.createElement('style');
    animationStyle.textContent = `
        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: scale(0.95);
            }
            to {
                opacity: 1;
                transform: scale(1);
            }
        }
        
        .game-card {
            transition: opacity 0.3s ease-out, transform 0.3s ease-out;
        }

        .game-grid {
            display: grid !important;
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)) !important;
            gap: 26px !important;
        }
        
        .game-card[style*="display: none"] {
            display: none !important;
        }
        
        .game-card:not([style*="display: none"]) {
            display: block !important;
        }
    `;
    document.head.appendChild(animationStyle);

    const clearButton = document.createElement('button');
    clearButton.innerHTML = '✕';
    clearButton.style.cssText = `
        position: absolute;
        right: 15px;
        top: 50%;
        transform: translateY(-50%);
        background: transparent;
        border: none;
        color: var(--muted);
        width: 24px;
        height: 24px;
        border-radius: 4px;
        cursor: pointer;
        font-size: 1.1rem;
        display: none;
        align-items: center;
        justify-content: center;
        transition: 0.3s;
        line-height: 1;
        padding: 0;
        font-weight: bold;
    `;
    
    clearButton.addEventListener('click', function() {
        searchInput.value = '';
        currentSearchTerm = '';
        filterGames();
        this.style.display = 'none';
        searchInput.focus();
    });
    
    clearButton.addEventListener('mouseenter', function() {
        this.style.background = 'rgba(179, 0, 0, 0.1)';
        this.style.color = 'var(--accent)';
    });
    
    clearButton.addEventListener('mouseleave', function() {
        this.style.background = 'transparent';
        this.style.color = 'var(--muted)';
    });
    
    searchContainer.appendChild(clearButton);

    searchInput.addEventListener('input', function() {
        if (this.value.length > 0) {
            clearButton.style.display = 'flex';
        } else {
            clearButton.style.display = 'none';
        }
    });

    const mediaQueryStyle = document.createElement('style');
    mediaQueryStyle.textContent = `
        @media (max-width: 768px) {
            .filter-buttons {
                justify-content: center;
            }
            
            .filter-btn {
                flex: 1;
                min-width: calc(33.333% - 8px);
            }
        }
    `;
    document.head.appendChild(mediaQueryStyle);
});


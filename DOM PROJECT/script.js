document.addEventListener('DOMContentLoaded', () => {
    const games = [
        {
            title: "Car Game",
            desc: "High-speed racing action. Dodge the obstacles and survive as long as possible!",
            icon: "🏎️",
            link: "./carGame/index.html",
            color: "#ff3366" // Neon Pink
        },
        {
            title: "Dice Game",
            desc: "Roll the dice, push your luck, and see who gets the highest score.",
            icon: "🎲",
            link: "./Dice/index.html",
            color: "#ffcc00" // Golden Yellow
        },
        {
            title: "Guess The Number",
            desc: "Can you correctly guess the secret number? Train your mind.",
            icon: "🔢",
            link: "./Guess The Number/index.html",
            color: "#33ccff" // Neon Cyan
        },
        {
            title: "Rock Paper Scissors",
            desc: "The classic game of hand signs. Beat the computer in this ultimate showdown!",
            icon: "✌️",
            link: "./rockPapperScissorGame/indeex.html",
            color: "#00ffcc" // Mint Green
        }
    ];

    const gameGrid = document.getElementById('gameGrid');

    games.forEach((game, index) => {
        const card = document.createElement('a');
        card.href = game.link;
        card.className = 'game-card';
        card.style.animationDelay = `${index * 0.1}s`;
        
        // Initial state for animation
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        
        card.innerHTML = `
            <div class="game-icon" style="text-shadow: 0 0 25px ${game.color}90">${game.icon}</div>
            <h2 class="game-title" style="color: ${game.color}">${game.title}</h2>
            <p class="game-desc">${game.desc}</p>
            <div class="play-btn" style="--accent: ${game.color}; --accent-glow: ${game.color}80">Play Now</div>
        `;

        gameGrid.appendChild(card);
        
        // Staggered Entrance Animation
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 150 + (index * 200));
        
        // Hover effects with dynamically assigned colors
        card.addEventListener('mouseenter', () => {
            card.style.borderColor = game.color;
            card.style.boxShadow = `0 10px 40px rgba(0, 0, 0, 0.4), 0 0 20px ${game.color}50`;
            const playBtn = card.querySelector('.play-btn');
            playBtn.style.background = game.color;
            playBtn.style.borderColor = game.color;
            playBtn.style.color = '#0d0f1a';
            playBtn.style.boxShadow = `0 0 15px ${game.color}80`;
        });
        
        card.addEventListener('mouseleave', () => {
             // Let css transitions handle the return state smoothly by resetting styles
             setTimeout(() => {
                 if (!card.matches(':hover')) {
                     card.style.borderColor = 'var(--border-color)';
                     card.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1)';
                     const playBtn = card.querySelector('.play-btn');
                     playBtn.style.background = 'transparent';
                     playBtn.style.borderColor = 'var(--text-secondary)';
                     playBtn.style.color = 'var(--text-primary)';
                     playBtn.style.boxShadow = 'none';
                 }
             }, 50);
        });
    });
});

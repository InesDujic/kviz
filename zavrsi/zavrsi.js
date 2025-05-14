document.addEventListener('DOMContentLoaded', () => {
    const score = localStorage.getItem('finalScore');  
    const scoreElement = document.querySelector('.bodovi2'); 
    const positionTextElement = document.querySelector('.board2'); 
    const token = localStorage.getItem("token"); 
  
    if (scoreElement && score !== null) {
      scoreElement.textContent = `${score} bodova`; 
    }
    async function updateScoreOnBackend(score) {
      try {
        const response = await fetch("https://quiz-be-zeta.vercel.app/auth/updateScore", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, 
          },
          body: JSON.stringify({
            score: score, 
          }),
        });
        if (response.ok) {
          console.log("Bodovi uspješno ažurirani!");
          fetchLeaderBoard();
        } else {
          console.error("Greška pri slanju bodova na server.");
        }
      } catch (e) {
        console.error("Greška pri slanju podataka na server:", e);
      }
    }
    async function fetchLeaderBoard() {
      try {
        const response = await fetch("https://quiz-be-zeta.vercel.app/leaderboard", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (!response.ok) {
          throw new Error("Greška pri dohvaćanju leaderboarda.");
        }
  
        const data = await response.json();
        const profileResponse = await fetch("https://quiz-be-zeta.vercel.app/auth/profile", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (!profileResponse.ok) {
          throw new Error("Greška pri dohvaćanju korisničkog profila.");
        }
  
        const currentUser = await profileResponse.json();
  
        const userPosition = getUserPosition(data, currentUser, score);
  
        if (positionTextElement) {
          positionTextElement.textContent = `Ti si na #${userPosition} mjestu!`;
        }
  
      } catch (e) {
        console.error("Greška pri dohvaćanju podataka:", e);
      }
    }
    function getUserPosition(data, currentUser, score) {
      const sortedData = [...data].sort((a, b) => b.bestScore - a.bestScore);
      const userPosition = sortedData.findIndex(user => user.username === currentUser.username && user.bestScore === parseInt(score));
      return userPosition + 1; 
    }
    if (score) {
      updateScoreOnBackend(score);
    }
    fetchLeaderBoard();
  });
  
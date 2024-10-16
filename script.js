document.addEventListener("DOMContentLoaded", () => {
  const introAnimation = document.getElementById('intro-animation');
  const welcomeScreen = document.getElementById('welcome-screen');
  const mainContent = document.getElementById('main-content');
  const startButton = document.getElementById('startButton');

  // Afficher l'animation d'introduction pendant 4 secondes
  setTimeout(() => {
    introAnimation.classList.add('hidden');
    welcomeScreen.classList.remove('hidden');
  }, 4000);

  let animationsStarted = false;

  // Gérer le clic sur le bouton "Bonjour"
  startButton.addEventListener('click', () => {
    if (!animationsStarted) {
      welcomeScreen.classList.add('hidden');
      mainContent.classList.remove('hidden');
      startAnimations(); // Lancer les animations originales
      animationsStarted = true;
    }
  });

  // Animation des textes
  const typewriterSound = new Audio('typewriter-sound.mp3');
  typewriterSound.volume = 0.5; // Ajustez le volume si nécessaire

  function animateText(element, text, delay, callback) {
    // Pré-remplir l'élément avec des espaces pour fixer sa taille
    element.textContent = text.replace(/./g, ' ');
    
    let index = 0;
    function animate() {
      if (index < text.length) {
        element.textContent = text.substring(0, index + 1) + element.textContent.substring(index + 1);
        
        if (text[index] !== ' ') {
          typewriterSound.currentTime = 0;
          typewriterSound.play().catch(error => console.log("Erreur de lecture audio :", error));
          
          if ('.,:;!?'.includes(text[index])) {
            setTimeout(animate, delay * 3);
          } else {
            setTimeout(animate, delay);
          }
        } else {
          setTimeout(animate, delay);
        }
        
        index++;
      } else if (callback) {
        callback();
      }
    }
    animate();
  }

  function startAnimations() {
    if (animationsStarted) return; // Empêche le démarrage multiple des animations

    const texte1 = document.getElementById("texte1");
    const texte2 = document.getElementById("texte2");
    const chat = document.getElementById("fenetre-dialogue");
    const audio = document.getElementById("myAudio");

    setTimeout(() => {
      texte1.classList.remove("hidden");
      animateText(texte1, "Bienvenue noble terrien !", 50, () => {
        setTimeout(() => {
          texte1.classList.add("hidden");
          setTimeout(() => {
            texte2.classList.remove("hidden");
            animateText(texte2,
              "Rien de plus simple pour me connaître, il suffit juste de parler sur le chat qui va apparaître, je te remercie par avance de ton interêt pour ce nouveau projet qui, j'espère, me servira de tremplin pour découvrir de nouveaux horizons et collaborer avec des personnes créatives, ouvertes et inspirées !",
              50,() => {
                setTimeout(() => {
                  texte2.classList.add("hidden");
                  setTimeout(() => {
                    chat.classList.remove("hidden");
                    chat.classList.add("fade-in");
                    audio.src = 'strauss.mp3';
                    playAudio();
                  }, 2000); // Délai avant d'afficher la fenêtre de dialogue
                }, 10000); // Délai après l'animation du texte2
              }
            );
          }, 2000); // Délai avant d'afficher le texte2
        }, 5000); // Délai après l'animation du texte1
      });
    }, 2000); // Délai avant d'afficher le texte1
  }

  // Supprimez ou commentez cette ligne
  // window.onload = startAnimations;

  // Gestion des interactions du chat
  const interactions = {
    welcome:
      "\nBonjour à vous, je suis heureux de pouvoir parler avec vous, je vous écris depuis le passé. Pour être exact, il est onze heures du matin et nous sommes samedi premier juin 2024. \n \nBref, revenons à l’essentiel : l’I.N.F.O.R.M.A.T.I.O.N. \n \nÀ travers ce chat, on pourra converser par le biais de mots clés que j’ai rédigé et qui vont vous donner des informations sur moi !\n \nVoici les mots-clés, rien de plus simple : clickez sur les mots clés :\n\nBio : une présentation express qui me présente.\nFormations : tout savoir sur mon parcours scolaire !\nExpériences : toutes mes expériences professionnelles.\nCompétences : pour connaître mes skills, mes stats !\nCool : mes projets pro perso, asso, radio et freelancing !\nPassions : ici, je vous dis qui je suis vraiment.\nContact : pour me parler au présent.\nAutres : des surprises et autres infos cool.",
    commands: {
      agence: "Brandie est une agence de communication basée à Montpellier, dans le sud de la France ! Chez Brandie depuis 2021, j’ai développé des connaissances solides de LinkedIn et je travaille avec des clients variés, autant dans le privé que dans le public, surtout dans l’ingénierie et la culture. Mes missions incluent l’écriture, la création de contenus audiovisuels, la publication de posts sur les réseaux sociaux, l'élaboration de stratégies digitales, le conseil et l’analyse de performances, entre autres. ",
      formations:  "Fac de sciences puis fac de lettres \n - 2011 : bac sciences \n - 2016 : licence sciences du langage \n - 2018 : master 1 humanités numériques",
      bio: "Né pendant le boom internet et issu de la génération Game boy, eMule, iPod et Skyblog, je suis un passionné de pop-culture, de sciences et des techs rétro. Aujourd'hui, fort de mes sept ans d’expérience en social media management et en relation public, je suis un fin connaisseur des TIC, un explorateur du pixel, un geek de l’info.",
      expériences: "Content-Manager & Social Media Manager chez Brandie, agence de communication à Montpellier de 2021 à aujourd'hui ! Pour en savoir plus sur mes missions, tape Brandie.\n \nSocial Media Manager, Chargé des Partenariats Médias & des Relations Presse au Festival Radio France Montpellier de 2017 à 2021 !\n \nPour en savoir plus sur mes missions, tape Festival.\n \nAutres : tape Stage pour connaître mes expériences de stagiaire.",
      projets: "Je suis dans une agence de com.",
      cool: "Après et pendant mes études, j'ai été attiré par la radio, c’est pourquoi il y a un fil rouge autour de l’audio. J’ai commencé comme bénévole chez Radio Campus Montpellier, o j’ai pu me former au métier du son, notamment en production et technique.\n \nSuite à cela, avec une bande de potes, nous avons créé en 2017 une radio musicale locale et indépendante, Piñata Radio, dans le style de FIP et Nova. On a commencé dans un appartement, et aujourd’hui, Piñata Radio est une radio et un lieu dédié à la musique dans un bar à Montpellier.\n \nEn parallèle, avec d’autres passionné.e.s, nous avons créé un collectif : Salut Salut Internet. Une association de passionné.e.s de jeux vidéo basée à Montpellier, où nous nous interrogeons sur notre identité et le monde qui nous entoure à travers une culture pop et vidéoludique.",
      passions: "Ma passion, c’est la technologie, et particulièrement l'informatique rétro comme le Minitel. Mes films préférés et sources d’inspiration sont : Interstellar, 2001 l'Odyssée de l'espace, Mad Max, Alien, Ad Astra, Premier Contact, Contact, Gravity, Le 5ᵉ Élément, Star Wars, Dune, Matrix, IA Intelligence Artificielle, Minority Report, Avatar et bien d'autres.\n \nJ’aime aussi Isaac Asimov et Barjavel, ainsi que les cycles de Fondation, des Robots et de Tchaï, et Stephane Braxter.\n \nEn termes de jeux vidéo, j’aime les jeux de gestion comme Roller Coaster Tycoon, Stellaris, Age of Empires II et Dark Souls !\n \nJ’adore le pixel art et l’univers rétro gaming. J’aime aussi la musique expérimentale, électronique, le jazz fusion, le blues et le rock alternatif !",
      contact: "Tu peux me retrouver à la Barbote, bar à bière à Montpellier",
      compétences: "Mes études, mes expériences pro et mes projets persos m'ont permis d'acquérir des compétences techniques et des connaissances dans divers univers.\n \nMes compétences touchent des champs d’expertise des métiers de la communication : web et digital, marketing, écriture, organisation, analyse, veille et relations publiques.\n \nJ’aime aussi créer, notamment dans le domaine du son et de la vidéo. Durant mon parcours, j'ai été amené à produire des contenus audiovisuels, acquérant des connaissances solides dans l’art de la captation, du montage et de la diffusion.\n \nPremiere Pro, Logic Pro, les micros, les caméras, les tables de mixage, les câblages et les tournages, ainsi que la post-production, sont dans ma boîte à outils !",
    },
  };

 function printMessage(message, isResponse = false) {
  const historiqueElement = document.getElementById("historique");
  const messageElement = document.createElement("p");
  messageElement.classList.add(isResponse ? "reponse" : "demande");

  historiqueElement.appendChild(messageElement); // Ajoute l'élément de message au conteneur

  let i = 0;
  const interval = setInterval(() => {
    if (i < message.length) {
      messageElement.textContent += message[i];
      i++;

      // Scroll automatique au fur et à mesure que les lettres sont ajoutées
      messageElement.scrollIntoView({ behavior: "smooth", block: "end" });

      // Aussi, on assure que le conteneur global scroll bien vers le bas
      historiqueElement.scrollTop = historiqueElement.scrollHeight;

    } else {
      clearInterval(interval); // Arrête l'animation quand tout est affiché
    }
  }, 30); // Vitesse d'animation des caractères (ajustable)

}


  function handleInput(input) {
    // Afficher la demande de l'utilisateur avec "vous : "
    printMessage(`vous : vous avez demandé d'en savoir plus sur ${input}.`);

    const lowercasedInput = input.toLowerCase();

    // Vérifiez si l'entrée est "bonjour", "hello" ou "salut"
    if (["bonjour", "hello", "salut"].includes(lowercasedInput)) {
      printMessage("Bonjour", true);
      return;
    }

    // Mots-clés pour les réponses multiples
    const multiWordResponses = {
      parcours:
        "Fac de sciences puis fac de lettre \n - 2011 : bac sciences \n - 2016 : licence sciences du langage \n- 2018 : master 1 humanités numériques",
      études:
        "Fac de sciences puis fac de lettre \n - 2011 : bac sciences \n - 2016 : licence sciences du langage \n - 2018 : master 1 humanités numériques",
    };

    // Vérifiez si l'entrée correspond à une réponse avec plusieurs mots-clés
    const response = multiWordResponses[lowercasedInput];
    if (response) {
      printMessage(response, true);
      return;
    }

    // Vérifiez les autres commandes
    if (lowercasedInput in interactions.commands) {
      const command = interactions.commands[lowercasedInput];
      if (typeof command === "string") {
        // Commande simple
        printMessage(command, true);
      } else if (command.hasOwnProperty("description")) {
        // Commande avec options
        if (lowercasedInput === "aide") {
          printMessage(command.description, true);
          for (const option of command.options) {
            printMessage(` - ${option.command}: ${option.description}`, true);
          }
        } else {
          // Trouver l'option correspondante
          const option = command.options.find(
            (option) => option.command === lowercasedInput
          );
          if (option) {
            printMessage(option.description, true);
          } else {
            printMessage(`Commande "${input}" inconnue.`, true);
          }
        }
      }
    } else {
      printMessage(`Commande "${input}" inconnue.`, true);
    }
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      const input = document.getElementById("input-zone").value;
      handleInput(input);
      document.getElementById("input-zone").value = "";
    }
  });

  printMessage(interactions.welcome);

  // Gestion du son
  const audio = document.getElementById("myAudio");
  const muteButton = document.getElementById("muteButton");
  audio.volume = 0.1;

  // Fonction pour jouer l'audio
  function playAudio() {
    audio.play().catch(error => {
      console.log("Lecture audio impossible :", error);
    });
  }

  // Modifiez cet événement pour jouer l'audio uniquement lors du premier clic sur le bouton de lecture
  muteButton.addEventListener("click", function () {
    if (audio.paused) {
      audio.play();
      muteButton.textContent = "Mute Music";
    } else {
      audio.pause();
      muteButton.textContent = "Play Music";
    }
  });

  // Supprimez ou commentez cet événement qui jouait l'audio au premier clic sur la page
  /*
  document.addEventListener('click', function onFirstClick() {
    playAudio();
    document.removeEventListener('click', onFirstClick);
  }, { once: true });
  */

  // Fonction pour traiter les clics sur les boutons
  document.querySelectorAll('.btn-action').forEach(button => {
    button.addEventListener('click', () => {
      const command = button.getAttribute('data-command');
      handleInput(command);  // Utilise la fonction existante pour traiter la commande
    });
  });

  // Créez un objet Audio pour le son du bouton
  const buttonSound = new Audio('bouton_SFX.mp3');
  buttonSound.volume = 0.1; // Ajustez cette valeur entre 0 et 1 selon vos préférences

  // Fonction pour jouer le son
  function playButtonSound() {
    buttonSound.currentTime = 0; // Réinitialise le son au début
    buttonSound.play().catch(error => console.log("Erreur de lecture audio :", error));
  }

  // Fonction pour gérer le clic sur un bouton
  function handleButtonClick(buttonId) {
    playButtonSound(); // Joue le son du bouton

    // Le reste de votre logique de gestion des clics de bouton ici
    // ...
  }

  // Ajoutez cet écouteur d'événements à tous vos boutons
  document.querySelectorAll('.btn-action').forEach(button => {
    button.addEventListener('click', () => {
      handleButtonClick(button.id);
    });
  });
});

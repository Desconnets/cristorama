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
      
      // Démarrer la musique ici
      if (!musicStarted) {
        audio.play().then(() => {
          musicStarted = true;
          console.log("Musique démarrée avec succès");
        }).catch(error => {
          console.log("Erreur lors du démarrage de la musique :", error);
        });
      }
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
    

    setTimeout(() => {
      texte1.classList.remove("hidden");
      animateText(texte1, "Salut salut l'internaute d'internet !", 50, () => {
        setTimeout(() => {
          texte1.classList.add("hidden");
          setTimeout(() => {
            texte2.classList.remove("hidden");
            animateText(texte2,
              "Pour me connaître, il suffit de jouer avec le joujou digital qui va apparaître, je te remercie par avance de ton interêt pour ce nouveau projet qui, j'espère, me servira de tremplin pour découvrir de nouveaux horizons et collaborer avec des personnes créatives, ouvertes et inspirées !",
              50,() => {
                setTimeout(() => {
                  texte2.classList.add("hidden");
                  setTimeout(() => {
                    chat.classList.remove("hidden");
                    chat.classList.add("fade-in");
                    // Supprimez ces deux lignes :
                    // audio.src = 'strauss.mp3';
                    // playAudio();
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
      "\n\nSalut salut, je suis super heureux de pouvoir parler avec vous, je vous écris depuis le passé. Pour être exact, il est onze heures du matin et nous sommes samedi premier juin 2024.\nUn passé proche, évidemment, qui donne des airs de retour vers le futur à cette expérience.\n\nVous voyez ce que je veux dire ?\n \nÀ travers ce chat, on pourra converser par le biais de mots clés !\n\nCliquez et obtenez des infos  ! ",
    commands: {
      agence: "\n\nJe travaille dans l’agence de communication Brandie depuis 2021 ou j’ai développé des connaissances solides dans le conseil stratégique digital grâce aux clients variés de l’agence, qui sont autant dans le privé que dans le public.\n\nMes missions incluent l’écriture, la création de contenus audiovisuels, la publication de posts sur les réseaux sociaux, l'élaboration de stratégies digitales, le conseil et l’analyse de performances, entre autres.",
      formations:  "\n\nJ’ai une formation de base, scientifique, sauce physique et chimie !\nJ’ai obtenu une licence et un master 1 en sciences du langage, communication, média et médiation numérique à l’Université Paul Valéry !\nJ’ai effectué également plusieurs formations en initiation au web et en montage audio et vidéo. ",
      bio: "\n\nNé pendant le boom internet et issu de la génération Game boy, eMule, iPod et Skyblog, je suis un passionné de pop-culture, de sciences et des techs rétro.\nAujourd'hui, fort de mes sept ans d’expérience en social media management et en relation publique, je suis un fin connaisseur des TIC, un explorateur du pixel, un geek de l’info.",
      expériences: "\n\nContent-Manager & Social Media Manager chez Brandie, agence de communication à Montpellier de 2021 à aujourd'hui ! Pour en savoir plus sur mes missions, cliquez sur Agence.\n \nSocial Media Manager, Chargé des Partenariats Médias & des Relations Presse au Festival Radio France Montpellier de 2017 à 2021 !\n \nPour en savoir plus sur mes missions, cliques sur Radio France.",
      projets: "\n\nJe suis dans une agence de com.",
      broadcast: "\n\nAprès et pendant mes études, j'ai été attiré par la radio, c’est pourquoi je suis un méga fan d’audio et de musique. J’ai commencé comme bénévole chez Radio Campus Montpellier, ou j’ai pu me former au métier du son, notamment en production et technique son.\n \nSuite à cela, avec une bande de potes, nous avons créé en 2017 une radio musicale locale et indépendante, Piñata Radio, dans le style de FIP et Nova.\n \nEn parallèle, avec d’autres passionné.e.s, nous avons créé un collectif : Salut Salut Internet. Une association faites de passionné.e.s de jeux vidéo basée à Montpellier où nous mettons en avant l’univers vidéoludique et la culture pop à travers des événements et des reportages.\n\nDepuis peu je collabore avec un agence de production Broadacast, ZQSD, en tant qu’opérateur son avec qui je gère le son, le mixage et le set-up d’émissions sur des plateaux télé pour des steamers et des influenceurs réputés.",
      passions: "\n\nMa passion, c’est la technologie, et particulièrement l'informatique rétro comme le Minitel.\n\nMes films préférés et sources d’inspiration sont : Interstellar, 2001 l'Odyssée de l'espace, Mad Max, Alien, Ad Astra, Premier Contact, Contact, Gravity, Le 5ᵉ Élément, Star Wars, Dune, Matrix, IA Intelligence Artificielle, Minority Report, Avatar et bien d'autres.\n \nJ’aime aussi Isaac Asimov et Barjavel, ainsi que les cycles de Fondation, des Robots et de Tchaï, et Stephane Braxter.\n \nJe suis aussi un gros fan de la manette et des jeux-vidéo, j’aime les jeux de gestion comme Roller Coaster Tycoon, Stellaris, Age of Empires II et Dark Souls !\n \nJ’adore le pixel art et l’univers rétro gaming. J’aime aussi la musique expérimentale, électronique, le jazz fusion, le blues et le rock alternatif !",
      digitalover: "\n\nL'évolution technologique m'a toujours fasciné, mais ma récente découverte de Python a ouvert des perspectives inattendues dans ma pratique professionnelle. Parti d'une simple curiosité de geek, j'ai commencé à développer quelques scripts pour automatiser mes tâches répétitives de recherche et de compilation.\n \nPetit à petit, j'ai intégré les LLMs dans mes outils personnels pour créer un workflow plus fluide : veille automatisée, montage vidéo, centralisation des données éditoriales, aide à la structuration de contenus. Rien de révolutionnaire, mais ces petites optimisations transforment progressivement ma façon d'aborder la communication corporate et l’univers de la création de contenus. Je gagne en autonomie et en temps de cerveau disponible pour ce qui compte vraiment : la stratégie et la créativité.",
      radiofrance: "\n\nLe Festival Radio France est un festival réputé pour les amoureux de la musique classique dans le sud de la France.\nCréée dans les années 80 par Radio France, sa raison d’être est de démocratiser l'accès à la musique classique, au jazz et à l'électro.\n\nDe 2017 à 2021, j'ai développé des compétences en gestion de projets, en relations publiques et en marketing digital dans le cadre de mes missions.",
      compétences: "\n\nMes études, mes expériences pro et mes projets persos m'ont permis d'acquérir des compétences techniques et des connaissances dans divers univers.\n \nMes compétences touchent des champs d’expertise des métiers de la communication : web et digital, marketing, écriture, organisation, analyse, veille et relations publiques.\n \nJ’aime aussi créer, notamment dans le domaine du son et de la vidéo. Durant mon parcours, j'ai été amené à produire des contenus audiovisuels, acquérant des connaissances solides dans l’art de la captation, du montage et de la diffusion.\n \nPremiere Pro, Logic Pro, les micros, les caméras, les tables de mixage, les câblages et les tournages, ainsi que la post-production, sont dans ma boîte à outils !",
    },
  };

  let isProcessingCommand = false;

  function printMessage(message, isResponse = false) {
    return new Promise((resolve) => {
      const historiqueElement = document.getElementById("historique");
      const messageElement = document.createElement("p");
      messageElement.classList.add(isResponse ? "reponse" : "demande");

      const prefixElement = document.createElement("span");
      prefixElement.classList.add("prefix");
      if (isResponse) {
        prefixElement.classList.add("cristobal-prefix");
      } else {
        prefixElement.classList.add("vous-prefix");
      }

      historiqueElement.appendChild(messageElement);

      let prefix = isResponse ? "cristobal : " : "vous : ";
      prefixElement.textContent = prefix;
      messageElement.appendChild(prefixElement);

      let i = 0;
      const interval = setInterval(() => {
        if (i < message.length) {
          messageElement.appendChild(document.createTextNode(message[i]));
          i++;

          messageElement.scrollIntoView({ behavior: "smooth", block: "end" });
          historiqueElement.scrollTop = historiqueElement.scrollHeight;
        } else {
          clearInterval(interval);
          resolve();
        }
      }, 20);
    });
  }

  async function handleInput(input) {
    if (isProcessingCommand) {
      return; // Ignore la nouvelle commande si une est déjà en cours
    }

    isProcessingCommand = true;

    // Afficher d'abord la demande de l'utilisateur
    await printMessage(`vous avez demandé d'en savoir plus sur ${input}.`);

    const lowercasedInput = input.toLowerCase();

    // Vérifiez si l'entrée est "bonjour", "hello" ou "salut"
    if (["bonjour", "hello", "salut"].includes(lowercasedInput)) {
      await printMessage("Bonjour", true);
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
      await printMessage(response, true);
      return;
    }

    // Vérifiez les autres commandes
    if (lowercasedInput in interactions.commands) {
      const command = interactions.commands[lowercasedInput];
      if (typeof command === "string") {
        // Commande simple
        await printMessage(command, true);
      } else if (command.hasOwnProperty("description")) {
        // Commande avec options
        if (lowercasedInput === "aide") {
          await printMessage(command.description, true);
          for (const option of command.options) {
            await printMessage(` - ${option.command}: ${option.description}`, true);
          }
        } else {
          // Trouver l'option correspondante
          const option = command.options.find(
            (option) => option.command === lowercasedInput
          );
          if (option) {
            await printMessage(option.description, true);
          } else {
            await printMessage(`Commande "${input}" inconnue.`, true);
          }
        }
      }
    } else {
      await printMessage(`Commande "${input}" inconnue.`, true);
    }

    isProcessingCommand = false;
  }

  // Modification de l'écouteur d'événements pour le clavier
  document.addEventListener("keydown", async (event) => {
    if (event.key === "Enter" && !isProcessingCommand) {
      const input = document.getElementById("input-zone").value;
      await handleInput(input);
      document.getElementById("input-zone").value = "";
    }
  });

  // Modification de la gestion des clics sur les boutons
  document.querySelectorAll('.btn-action').forEach(button => {
    button.addEventListener('click', async () => {
      if (!isProcessingCommand) {
        const command = button.getAttribute('data-command');
        await handleInput(command);
      }
    });
  });

  // Ajoutez cette fonction asynchrone
  async function displayWelcomeMessage() {
    await printMessage(interactions.welcome, true);
  }

  // Appelez cette fonction au lieu de printMessage directement
  displayWelcomeMessage();

  // Gestion du son
  const audio = document.getElementById("myAudio");
  let musicStarted = false;
  const muteButton = document.getElementById("muteButton");
  audio.volume = 0.1;

  // Modifiez l'événement du bouton Mute/Play
  muteButton.addEventListener("click", function () {
    if (audio.paused) {
      audio.play().then(() => {
        muteButton.textContent = "Mute Music";
      }).catch(error => {
        console.log("Erreur lors de la reprise de la musique :", error);
      });
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

  const skipIntroLink = document.getElementById("skipIntro");
  skipIntroLink.addEventListener("click", (e) => {
    e.preventDefault();
    document.getElementById("welcome-screen").classList.add("hidden");
    document.getElementById("main-content").classList.remove("hidden");
    document.getElementById("fenetre-dialogue").classList.remove("hidden");
    // Assurez-vous que texte1 et texte2 sont cachés
    document.getElementById("texte1").classList.add("hidden");
    document.getElementById("texte2").classList.add("hidden");
    
    // Démarrer la musique
    if (!musicStarted) {
      audio.play().then(() => {
        musicStarted = true;
        console.log("Musique démarrée avec succès");
        muteButton.textContent = "Mute Music";
      }).catch(error => {
        console.log("Erreur lors du démarrage de la musique :", error);
      });
    }
    
    // Initialisez directement le chat ici si nécessaire
    initializeChat();
  });
});

function initializeChat() {
  // Placez ici le code pour initialiser le chat
  displayWelcomeMessage();
}

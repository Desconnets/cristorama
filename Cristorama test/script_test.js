  // Gestion des interactions du chat
  const interactions = {
    welcome:
      "\nSalut salut, je suis heureux de pouvoir parler avec vous, je vous écris depuis le passé. Pour être exact, il est onze heures du matin et nous sommes samedi premier juin 2024. \n \nBref, revenons à l’essentiel : l’I.N.F.O.R.M.A.T.I.O.N. \n \nÀ travers ce chat, on pourra converser par le biais de mots clés qui vont vous donner des informations sur moi !\n \nLes mots-clés, sont au en bas clickez sur eux pour obtenir des informations ! ",
    commands: {
      agence: "Brandie est une agence de communication basée à Montpellier, dans le sud de la France ! Chez Brandie depuis 2021, j’ai développé des connaissances solides de LinkedIn et je travaille avec des clients variés, autant dans le privé que dans le public, surtout dans l’ingénierie et la culture. Mes missions incluent l’écriture, la création de contenus audiovisuels, la publication de posts sur les réseaux sociaux, l'élaboration de stratégies digitales, le conseil et l’analyse de performances, entre autres. ",
      formations:  "Fac de sciences puis fac de lettres \n - 2011 : bac sciences \n - 2016 : licence sciences du langage \n - 2018 : master 1 humanités numériques",
      bio: "Né pendant le boom internet et issu de la génération Game boy, eMule, iPod et Skyblog, je suis un passionné de pop-culture, de sciences et des techs rétro. Aujourd'hui, fort de mes sept ans d’expérience en social media management et en relation public, je suis un fin connaisseur des TIC, un explorateur du pixel, un geek de l’info.",
      expériences: "Content-Manager & Social Media Manager chez Brandie, agence de communication à Montpellier de 2021 à aujourd'hui ! Pour en savoir plus sur mes missions, cliques sur Agence.\n \nSocial Media Manager, Chargé des Partenariats Médias & des Relations Presse au Festival Radio France Montpellier de 2017 à 2021 !\n \nPour en savoir plus sur mes missions, cliques sur Radio France.\n \nAutres : tape Stage pour connaître mes expériences de stagiaire.",
      projets: "Je suis dans une agence de com.",
      cool: "Après et pendant mes études, j'ai été attiré par la radio, c’est pourquoi il y a un fil rouge autour de l’audio. J’ai commencé comme bénévole chez Radio Campus Montpellier, o j’ai pu me former au métier du son, notamment en production et technique.\n \nSuite à cela, avec une bande de potes, nous avons créé en 2017 une radio musicale locale et indépendante, Piñata Radio, dans le style de FIP et Nova. On a commencé dans un appartement, et aujourd’hui, Piñata Radio est une radio et un lieu dédié à la musique dans un bar à Montpellier.\n \nEn parallèle, avec d’autres passionné.e.s, nous avons créé un collectif : Salut Salut Internet. Une association de passionné.e.s de jeux vidéo basée à Montpellier, où nous nous interrogeons sur notre identité et le monde qui nous entoure à travers une culture pop et vidéoludique.",
      passions: "Ma passion, c’est la technologie, et particulièrement l'informatique rétro comme le Minitel. Mes films préférés et sources d’inspiration sont : Interstellar, 2001 l'Odyssée de l'espace, Mad Max, Alien, Ad Astra, Premier Contact, Contact, Gravity, Le 5ᵉ Élément, Star Wars, Dune, Matrix, IA Intelligence Artificielle, Minority Report, Avatar et bien d'autres.\n \nJ’aime aussi Isaac Asimov et Barjavel, ainsi que les cycles de Fondation, des Robots et de Tchaï, et Stephane Braxter.\n \nEn termes de jeux vidéo, j’aime les jeux de gestion comme Roller Coaster Tycoon, Stellaris, Age of Empires II et Dark Souls !\n \nJ’adore le pixel art et l’univers rétro gaming. J’aime aussi la musique expérimentale, électronique, le jazz fusion, le blues et le rock alternatif !",
      contact: "Tu peux me retrouver à la Barbote, bar à bière à Montpellier",
      radiofrance: "Tu peux me retrouver à la Barbote, bar à bière à Montpellier",
      compétences: "Mes études, mes expériences pro et mes projets persos m'ont permis d'acquérir des compétences techniques et des connaissances dans divers univers.\n \nMes compétences touchent des champs d’expertise des métiers de la communication : web et digital, marketing, écriture, organisation, analyse, veille et relations publiques.\n \nJ’aime aussi créer, notamment dans le domaine du son et de la vidéo. Durant mon parcours, j'ai été amené à produire des contenus audiovisuels, acquérant des connaissances solides dans l’art de la captation, du montage et de la diffusion.\n \nPremiere Pro, Logic Pro, les micros, les caméras, les tables de mixage, les câblages et les tournages, ainsi que la post-production, sont dans ma boîte à outils !",
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
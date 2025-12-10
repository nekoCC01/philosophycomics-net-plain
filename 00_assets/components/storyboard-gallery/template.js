export default {
    render(state) {
        return `<style>${this.css(state)}</style>
                ${this.html(state)}`;
    },

    css(state) { return `#hero {
  --hero-max-height: 650px;      /* absolute Obergrenze (anpassen nach Geschmack) */

  height: min(80vh, var(--hero-max-height));
  /* 80vh: grob 80% des Viewports -> ca. 20% bleiben initial für den Text sichtbar */

  display: grid;
  grid-template-rows: auto minmax(0, 1fr) auto;  /* Header, Stage, Nav */
}

/* Header */

header {
  background: #aaa;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 0.15em;
}

header h1 {
  margin: 0;
  font-size: 1.8rem;
}

/* Stage */

#stage {
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 0;
  overflow: hidden;
  padding-block: 10px;
}

.stage-inner {
  display: flex;
  height: 100%;
  align-items: center;
  gap: 4vw;
  max-width: 80%;
}

.main-image {
  height: 100%;
  max-width: 30vw;
  object-fit: contain;
}

.thumb {
  height: 70%; 
  max-width: 15vw;
  opacity: 0.7;
}

/* Nav-Dots */

nav {
  background: #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding-block: 10px;;
}

.dot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: none;
  background: #eee;
  box-shadow: 0 0 0 2px #777 inset;
}

.dot.is-active {
  background: #333;
  box-shadow: 0 0 0 2px #333;
}

/* Textbereich: keine feste Höhe – wächst einfach mit dem Inhalt */

#text {
  padding: 1.5rem 3rem;
  background: #f5f5f5;
  flex: 0 0 auto;  /* gehört zum normalen Flow, kein eigener Scrollcontainer */
}

#text h2 {
  margin-top: 0;
  font-size: 1.1rem;
}

#text p {
  margin-top: 0.6rem;
  line-height: 1.4;
  font-size: 0.9rem;
}

/* Responsive */

@media (max-width: 700px) {
  .header h1 {
    font-size: 1.2rem;
  }

  .stage-inner {
    gap: 2vw;
  }

  .main-image {
    max-width: 50vw;
  }

  .thumb {
    display: none;
  }
}`; },
    html(state) {
        return `<div id="hero">
    <header>
      <h1>${state.texts[state.currentIndex].title}</h1>
    </header>
    <section id="stage">
      <div class="stage-inner">
        <img src="resources/1.jpg" alt="Linkes Bild" class="thumb">
        <img alt="Zentrales Bild" src="${state.resourceFolder}/${state.currentIndex}.jpg" class="main-image">
        <img src="${state.resourceFolder}/${state.currentIndex + 1}.jpg" alt="Rechtes Bild" class="thumb">
      </div>
    </section>
    <nav class="nav-dots" aria-label="Slide navigation">
      <button class="dot is-active" aria-label="Slide 1"></button>
      <button class="dot" aria-label="Slide 2"></button>
      <button class="dot" aria-label="Slide 3"></button>
      <button class="dot" aria-label="Slide 4"></button>
    </nav>
  </div>

  <!-- TEXT: darf beliebig lang sein und nach unten weitergehen -->
  <section id="text">
    <h2># Antike Unsterblichkeit</h2>
    ${state.texts[state.currentIndex].text}
  </section>
                
                `;
    },
    mapDOM(scope) {
        return {
            stage: scope.querySelector('#stage'),
            textContainer: scope.querySelector('#text'),
            leftButton: scope.querySelector('#left'),
            rightButton: scope.querySelector('#right')

        }
    }
}

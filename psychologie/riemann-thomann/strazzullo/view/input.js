export default (targetElement, { persons }) => {
    const newInput = targetElement.cloneNode(true)

    newInput.innerHTML = `
            <h3>${persons}</h3>
            <fieldset id="persons">
                <legend>Wieviel Teilnehmer?</legend>
                <input class="persons-input" type="radio" name="persons" value="1" id="p1">
                <label for="p1">1 Person</label>
                <input class="persons-input" type="radio" name="persons" value="2" id="p2">
                <label for="p2">2 Personen</label>
            </fieldset>

            <form class="name-input" id="name-input" action="">
                <input type="text" name="username" placeholder="Namen eingeben">
                <button type="submit">Abschicken</button>
            </form>
            <form class="name-input" id="name-input2" action="">
                <input type="text" name="username2" placeholder="Namen eingeben">
                <button type="submit">Abschicken</button>
            </form>
  `;
    return newInput
}
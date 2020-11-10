<template>
  <div
    class="rf-container-fluid rf-bg--alt rf-padding-bottom-6N rf-padding-top-2N"
  >
    <div class="rf-container">
      <h1>
        Trouver les études, statistiques et outils locaux utiles à vos prises de
        décision, recherches ou au débat public
      </h1>
      <p>Commune, EPCI, département, région</p>

      <v-super-select
        label="Commune, EPCI, département, région"
        :items="groupedItems"
        inputWidth="100%"
        placeholder="Taper les premières lettres de la collectivité recherchée"
      ></v-super-select>

      <div class="rf-search-bar" id="search-input">
        <label for="search-input-input" class="rf-label">
          Commune, EPCI, département, région
        </label>

        <input
          class="rf-input"
          placeholder="Taper les premières lettres de la collectivité recherchée"
          type="search"
          id="search-input-input"
          name="search-input-input"
        />
        <button class="rf-btn" title="Rechercher">
          <span> Rechercher </span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import VSuperSelect from "v-super-select";
export default {
  name: "TitleSearch",
  data() {
    return {
      loading: true,

      groupedItems: [
        {
          groupName: "Régions",
          items: [
            {
              text: "Bourgogne-Franche-Comté",
              value: "1",
            },
          ],
        },
        {
          groupName: "Départements",
          items: [
            {
              text: "Bouches-du-Rhône",
              value: "4",
            },
          ],
        },
        {
          groupName: "EPCI",
          items: [
            {
              text: "CA du Bassin de Bourg-en-Bresse",
              value: "5",
            },
            {
              text: "CC du Bocage Bourbonnais",
              value: "6",
            },
            {
              text: "CC des Portes du Luxembourg",
              value: "7",
            },
            {
              text: "CC Normandie-Cabourg-Pays d'Auge",
              value: "8",
            },
            {
              text: "CA Bourges Plus",
              value: "9",
            },
          ],
        },
        {
          groupName: "Communes",
          items: [
            {
              text: "Bouligneux (01052)",
              value: "10",
            },
            {
              text: "Bourg-en-Bresse (01053)",
              value: "11",
            },
            {
              text: "Bourg-Saint-Christophe (01054)",
              value: "12",
            },
            {
              text: "Saint-André-le-Bouchoux (01335)",
              value: "13",
            },
            {
              text: "Saint-Denis-lès-Bourg (01344)",
              value: "14",
            },
            {
              text: "Saint-Nizier-le-Bouchoux (01380)",
              value: "15",
            },
          ],
        },
      ],
    };
  },
  components: {
    VSuperSelect,
  },
};
</script>

<style scoped>
</style>
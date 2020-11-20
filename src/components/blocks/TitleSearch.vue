<template>
  <div
    class="rf-container-fluid rf-bg--alt rf-padding-bottom-6N rf-padding-top-2N"
  >
    <div class="rf-container">
      <h1>
        Trouver les études, statistiques et outils locaux utiles à vos prises de
        décision, recherches ou au débat public
      </h1>

      <Select
        :select_data="select_data"
        defaultOption="Taper les premières lettres de la collectivité recherchée"
      />

      <div class="rf-select-group">
        <label class="rf-label">Commune, EPCI, département, région</label>
        <multiselect
          v-model="value"
          :options="groupedItems"
          group-values="items"
          group-label="groupName"
          track-by="value"
          label="text"
          :group-select="false"
          :multiple="true"
          placeholder="Taper les premières lettres de la collectivité recherchée"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Select from "@/components/france-designsystem/Select.vue";
import Multiselect from "vue-multiselect";

// import VSuperSelect from "@/components/DsfrSuperSelect/VSuperSelect.vue";
export default {
  name: "TitleSearch",
  components: {
    Select,
    Multiselect,
  },
  data() {
    return {
      loading: true,
      value: null,
      options: ["list", "of", "options"],

      groupedItems: [
        {
          groupName: "Régions",
          items: [
            {
              text: "Bourgogne-Franche-Comté",
              value: "200053726",
            },
          ],
        },
        {
          groupName: "Départements",
          items: [
            {
              text: "Bouches-du-Rhône",
              value: "221300015",
            },
          ],
        },
        {
          groupName: "EPCI",
          items: [
            {
              text: "CA du Bassin de Bourg-en-Bresse",
              value: "200071751",
            },
            {
              text: "CC du Bocage Bourbonnais",
              value: "200071496",
            },
            {
              text: "CC des Portes du Luxembourg",
              value: "240800847",
            },
            {
              text: "CC Normandie-Cabourg-Pays d'Auge",
              value: "200065563",
            },
            {
              text: "CA Bourges Plus",
              value: "241800507",
            },
          ],
        },
        {
          groupName: "Communes",
          items: [
            {
              text: "Bouligneux (01052)",
              value: "210100525",
            },
            {
              text: "Bourg-en-Bresse (01053)",
              value: "210100533",
            },
            {
              text: "Bourg-Saint-Christophe (01054)",
              value: "210100541",
            },
            {
              text: "Saint-André-le-Bouchoux (01335)",
              value: "210103354",
            },
            {
              text: "Saint-Denis-lès-Bourg (01344)",
              value: "210103446",
            },
            {
              text: "Saint-Nizier-le-Bouchoux (01380)",
              value: "210103800",
            },
          ],
        },
      ],
    };
  },
  computed: {
    select_data() {
      return {
        label: "Commune, EPCI, département, région",
        optionGroups: this.groupedItems,
      };
    },
  },
};
</script>

<style scoped>
</style>
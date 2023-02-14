<template>
    <div class="totals">
       <div class="card border_card_color_palette_dark_blue bg_color_palette_cream">
          <div class="card-body">
             <div class="container text-center">
                <div class="row">
                   <div class="col">
                      <h4 class="text_color_palette_green">Nombre des factures</h4>
                      <h2>{{ nbfacture }}</h2>
                   </div>
                   <div class="col">
                      <h4 class="text_color_palette_green">Montant total TTC</h4>
                      <h2>{{ totalttc.toFixed(3) }} TND</h2>
                   </div>
                   <div class="col">
                      <h4 class="text_color_palette_green">Montant total HT</h4>
                      <h2>{{ totalht.toFixed(3) }} TND</h2>
                   </div>
                </div>
             </div>
          </div>
       </div>
    </div>
 </template>
 <script>


    export default {
      name: 'Totals',
      props: {
        
      },
      created() {
      this.Factures = JSON.parse(localStorage.getItem("Factures")) == null ? [] : JSON.parse(localStorage.getItem("Factures"));
      console.table(this.Factures);
   },
   data() {
      return {
         Factures: [],
      };
   },
   computed: {
    nbfacture() {
      // Calcul du nombre d'éléments dans le tableau
      return this.Factures.length
    },
    totalttc() {
         let totalttc = 0;
         for (let j = 0; j < this.Factures.length; j++) {
          for (let i = 0; i < this.Factures[j].Produits.length; i++) {
            totalttc += this.Factures[j].Produits[i].totalTTC
         }
        
      }
      return totalttc;
   },
      totalht() {
         let totalht = 0;
         for (let j = 0; j < this.Factures.length; j++) {
          for (let i = 0; i < this.Factures[j].Produits.length; i++) {
            totalht += this.Factures[j].Produits[i].totalTTC
         }
         
      }return totalht - (19 *totalht / 100);}
  }
      
    }
 </script>
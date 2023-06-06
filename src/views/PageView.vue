<template>
   <div class="page">
      <div class="container mt-3">
         <div>
            <Totals />
         </div>
         <router-link to="/about" class="btn btn_bg_color_palette_green mt-2 mb-2">Ajout facture</router-link>

         <table class="table text-center align-middle  mt-1">
            <thead
               class="bg_color_palette_dark_blue d-flex flex-wrap align-items-center justify-content-center justify-content-lg-end">
               <tr class="text-light">
                  <th scope="col">
                     <input type="search" class="form-control form-control " placeholder="Chercher..." aria-label="Search" v-model="recherche" @input="search()"> 
                  </th>
                  <th scope="col"> 
                     <button type="button" class="btn btn-warning"><i class="bi bi-search"></i></button>
                  </th>
               </tr>
            </thead>
         </table>


         <table class="table text-start align-middle">
            <thead class="bg_color_palette_dark_blue">
               <tr class="text-light">
                  <th scope="col">Ref</th>
                  <th scope="col">Date</th>
                  <th scope="col">Client</th>
                  <th scope="col">Nb produits</th>
                  <th scope="col">Montant TTC</th>
                  <th scope="col">Etat facture</th>
                  <th scope="col"></th>
               </tr>
            </thead>
            <tbody v-if="Factures==''">
               <tr>
                  <td class="text-center text-danger" colspan="6">No Data</td>
               </tr>
            </tbody>
            <tbody v-else>
               <tr v-for="(facture) in Factures" :key="facture.id">
                  <Tableaux :facture="facture" @delete-fact="deletefacture(facture.id)" />
                  
               </tr>
            </tbody>
         </table>
      </div>
   </div>
</template>
<script>
// @ is an alias to /src
import Totals from '@/components/Totals.vue';
import Tableaux from '@/components/Tableaux.vue';

export default {
   name: 'PageView',
   components:
   {
      Totals,
      Tableaux,
 
   },
   created() {
      this.Factures = JSON.parse(localStorage.getItem("Factures")) == null ? [] : JSON.parse(localStorage.getItem("Factures"));
      console.table(this.Factures);
   },
   data() {
      return {
         facture: '',
         Factures: [],
         recherche:'',
      };
   },
   mounted(){
      let confetti=this.$route.query.confetti;
      if(confetti=="true"){
         console.log("confetti");
         this.$confetti.start();
         setTimeout(() => {
            this.$confetti.stop();
            this.$router.replace({'query': null});
         }, 2000);
      }
   },
   methods: {
      deletefacture(id) {
         let i = 0;
         for (i = 0; i < this.Factures.length; i++) {
            if (this.Factures[i].id == id) {
               this.Factures.splice(i, 1);
               localStorage.setItem('Factures', JSON.stringify(this.Factures));
               this.$router.go();
            }
            
         }
      },
      search(){
      if(this.recherche!=''){
      this.Factures= this.Factures.filter((facture) =>facture.client.toLowerCase().includes(this.recherche.toLowerCase()));
   }
   else{
      this.Factures = JSON.parse(localStorage.getItem("Factures")) == null ? [] : JSON.parse(localStorage.getItem("Factures"));
   }
},
   },
   
}
</script>
<style scoped>

</style>
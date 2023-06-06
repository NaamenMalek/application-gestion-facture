<template>
   <div class="about">
      <div class="container p-4 align-middle">
         <div class="container px-4 text-center">
            <div class="row gx-5 align-items-center border_card_color_palette_dark_blue ">
               <div class="col ">
                  <h2 class="modal-title text_color_palette_blue mb-4 mt-2">Ajouter client</h2>
                  <form>

                     <label for="exampleInput" class="form-label">Nom & Prènom</label>
                     <input type="text" class="form-control" id="exampleInput" v-model="client">
                     <label class="form-label mt-2">Date</label>
                     <input type="date" class="form-control" v-model="date">
                     <label class="form-label mt-2">Etat facture</label>
                     <select class="form-select form-select-lg mb-3" v-model="etat">
                        <option value="payee">Payée</option>
                        <option value="impayee">impayée</option>
                     </select>


                     <input type="submit" value="Ajouter" class="btn btn-primary btn_bg_color_palette_green mb-2"
                        @click="add">


                  </form>

               </div>
               <div class="col">
                  <img src="../assets/formajout.svg" alt="">
               </div>
            </div>
         </div>

      </div>
   </div>
</template>
<script>
// @ is an alias to /src

export default {
   name: 'AboutView',
   components:
   {

   },
   created() {
      this.Factures = JSON.parse(localStorage.getItem("Factures")) == null ? [] : JSON.parse(localStorage.getItem("Factures"));
   },
   data() {
      return {
         Factures: [],
         client: '',
         date: '',
         etat: '',
         facture: null

      };
   },
   methods: {
      add() {
         let fact = {
            id: this.Factures.length == 0 ? 1 : this.Factures[this.Factures.length - 1].id + 1,
            client: this.client,
            date: this.date,
            etat: this.etat,
            Produits: []
         }
         this.Factures.push(fact)
         this.client = ''
         this.date = ''
         this.etat = ''
         localStorage.setItem('Factures', JSON.stringify(this.Factures));
         this.$router.push('/page?confetti=true');
      },

   }
}
</script>
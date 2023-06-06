<template>
   <th scope="row" class="text_color_palette_green">{{ facture.id }}</th>
   <td>{{ facture.date }}</td>
   <td>{{ facture.client }}</td>
   <td>{{ facture.Produits.length }}</td>
   <td>{{ totalfacture().toFixed(3) }} TND</td>
   <td>
      <span class="badge" :class="[facture.etat == 'payee' ? 'text-bg-dark' : 'text-bg-warning']">
         {{ facture.etat == 'payee' ? 'payée' : 'impayée' }}
      </span>
   </td>





   <!--les boutons-->

   <td class="me-2">

      <!--boutton Modal afficher tout produits-->
      <button type="button" class="btn btn-primary btn-sm ms-1 me-1 btn_bg_color_palette_red " data-bs-toggle="modal"
         :data-bs-target="'#infoproduit' + facture.id">
         <i class="bi bi-eye"></i>
      </button>
      <!-- Modal afficher tout produits-->
      <div class="modal fade" :id="'infoproduit' + facture.id" tabindex="-1" aria-labelledby="exampleModalLabel"
         aria-hidden="true">
         <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
               <div class="modal-header">
                  <h1 class="modal-title text_color_palette_blue fs-5" id="exampleModalLabel">Les détails des produits
                  </h1>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
               </div>
               <div class="modal-body">
                  <hr>
                  <div v-for="(Produit) in facture.Produits">
                     <ul>
                        <li class="list-group-item">Référence du produit: {{ Produit.refprd }}</li>
                        <li class="list-group-item">Nom du produit: {{ Produit.produit }}</li>
                        <li class="list-group-item">Prix unitaire TTC: {{ Produit.prixuni }} TND</li>
                        <li class="list-group-item">Prix unitaire HT: {{ Produit.prixuniHT }} TND</li>
                        <li class="list-group-item">Quantité: {{ Produit.quantite }}</li>
                        <li class="list-group-item mt-3">
                           <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                              <button type="button" class="btn btn-primary  btn_bg_color_palette_green me-1"
                                 data-bs-toggle="collapse" :data-bs-target="'#collapseWidthExample' + Produit.id"
                                 aria-expanded="false" :aria-controls="'collapseWidthExample' + Produit.id"
                                 @click="editproduit(facture.id, Produit.id)">
                                 <i class="bi bi-pencil-square"></i>
                              </button>
                              <button class="btn btn-primary btn_bg_color_palette_red ms-1 me-1 "
                                 @click="deleteproduit(facture,Produit.id)">
                                 <i class="bi bi-trash3" data-bs-dismiss="modal"></i>
                              </button>
                           </div>
                        </li>
                     </ul>
                     <div class="d-flex justify-content-center">
                        <div class="collapse collapse-horizontal mt-2 " :id="'collapseWidthExample' + Produit.id">
                           <div class="card card-body" style="width: 400px;">
                              <form @submit.prevent="UpdateProduit(facture.id, Produit.id)">
                                 <div class="mb-3">
                                    <label class="form-label">prix</label>
                                    <input type="text" class="form-control" v-model="nvprix">
                                 </div>
                                 <div class="mb-3">
                                    <label class="form-label">Qantité</label>
                                    <input type="text" class="form-control" v-model="nvquantite">
                                 </div>
                                 <button type="submit" class="btn btn-primary btn_bg_color_palette_blue">Enregistrer
                                    la modification</button>
                              </form>
                           </div>
                        </div>
                     </div>
                     <hr>
                  </div>
               </div>
            </div>
         </div>
      </div>






      <!--button Modal ajout produit -->
      <button type="button" class="btn btn-primary btn-sm ms-1 me-1 btn_bg_color_palette_red " data-bs-toggle="modal"
         :data-bs-target="'#addproduit' + facture.id">
         <i class="bi bi-plus-circle"></i>
      </button>
      <!-- Modal ajout produit -->
      <div class="modal fade" :id="'addproduit' + facture.id" tabindex="-1" aria-labelledby="exampleModalLabel"
         aria-hidden="true">
         <div class="modal-dialog modal-dialog-centered ">
            <div class="modal-content">
               <div class="modal-header ">
                  <h1 class="modal-title text_color_palette_blue fs-5" id="exampleModalLabel">Ajouter un produit</h1>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
               </div>
               <div class="modal-body">
                  <div>
                     <label class="form-label">Référence du produit</label>
                     <input type="text" class="form-control" v-model="refprd">
                     <label class="form-label mt-2">Produit</label>
                     <input type="text" class="form-control" v-model="produit">
                     <label class="form-label mt-2">Prix unitaire TTC </label>
                     <div class="input-group mb-3">
                        <input type="text" class="form-control" aria-describedby="basic-addon2" v-model="prixuni">
                        <span class="input-group-text" id="basic-addon2">TND</span>
                     </div>
                     <label class="form-label mt-2">Quantité</label>
                     <input type="text" class="form-control" v-model="quantite">
                  </div>
               </div>
               <div class="modal-footer">
                  <button type="button" class="btn btn-primary btn_bg_color_palette_red"
                     data-bs-dismiss="modal">Annuler</button>
                  <input type="submit" value="Ajouter" class="btn btn-primary btn_bg_color_palette_green"
                     @click="addproduit(facture)" data-bs-dismiss="modal">
               </div>
            </div>
         </div>
      </div>




      <!-- Button modal edit facture-->
      <button type="button" class="btn btn-primary btn-sm ms-1 me-1 btn_bg_color_palette_red" data-bs-toggle="modal"
         :data-bs-target="'#editetatfacture' + facture.id">
         <i class="bi bi-pencil-square"></i>
      </button>
      <!-- Button modal edit facture-->
      <div class="modal fade  " :id="'editetatfacture' + facture.id" tabindex="-1" aria-labelledby="exampleModalLabel"
         aria-hidden="true">
         <div class="modal-dialog  modal-dialog-centered">
            <div class="modal-content">
               <div class="modal-header">
                  <h1 class="modal-title fs-5 text_color_palette_blue" id="exampleModalLabel">Modifier l'état de facture du client {{
                     facture.client
                  }}</h1>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
               </div>
               <div class="modal-body">
                  <form @submit.prevent="UpdateFacture(facture.id)">
                     <label class="form-label mt-2">Etat facture</label>
                     <select class="form-select form-select-lg mb-3" v-model="nvetat">
                        <option value="payee">Payée</option>
                        <option value="impayee">impayée</option>
                     </select>
                     <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                        <button type="button" class="btn btn-secondary btn_bg_color_palette_red"
                           data-bs-dismiss="modal">Annuler</button>
                        <button type="submit" class="btn btn-primary btn_bg_color_palette_green"
                           data-bs-dismiss="modal">Confirmer</button>
                     </div>
                  </form>
               </div>
            </div>
         </div>
      </div>




      <button type="button" class="btn btn-primary btn-sm ms-1 me-1 btn_bg_color_palette_red" @click="exportToPDF(facture.id)">
         <i class="bi bi-file-earmark-arrow-down"></i>
      </button>
      <div class="none">
         <div :id="'facture'+facture.id">
            <div class="m-2">
               <div class="card border-light mb-5" style="width: 18rem;">
                  <img src="../assets/logo-no-background.png" class="card-img-top" alt="...">
               </div>
               <div class="card border_card_fact_color_palette_green mt-5 mb-5">
                  <div class="card-header">
                     DÉTAILS DE LA FACTURE
                  </div>
                  <div class="card-body">
                     <p>Nom & Prénom: {{ facture.client }}</p>

                     <p class="card-text">ID Commande: {{ facture.id }}</p>
                     <p class="card-text">Date: {{ facture.date }}</p>
                  </div>
               </div>

               <table class="table text-start align-middle">
                  <thead class="bg_color_palette_dark_blue">
                     <tr class="text-light">
                        <th scope="col">Référence</th>
                        <th scope="col">Nom</th>
                        <th scope="col">Quantité</th>
                        <th scope="col">Prix unitaire HT</th>
                        <th scope="col">Prix unitaire TTC</th>
                        <th scope="col">Total TTC</th>
                     </tr>
                  </thead>
                  <tbody>
                     <tr v-for="produit in facture.Produits" :key="produit.id">
                        <td>{{ produit.refprd }}</td>
                        <td>{{ produit.produit }}</td>
                        <td>{{ produit.quantite }}</td>
                        <td>{{ produit.prixuniHT }} TND</td>
                        <td>{{ produit.prixuni }} TND</td>
                        <td>{{ produit.totalTTC }} TND</td>
                     </tr>
                  </tbody>
               </table>
               <div class="card border_card_fact_color_palette_yellow text-end float-end mt-5" style="width: 18rem;">
                  <div class="card-header">
                     DÉTAILS DE LA FACTURE
                  </div>
                  <div class="card-body">
                     <table>
                        <tr>
                           <td class="border_table_color_palette_grey p-2">Nombre total des produits : </td>
                           <td class="border_table_color_palette_grey p-2">{{ totalquantite() }}</td>
                        </tr>
                        <tr>
                           <td class="border_table_color_palette_grey p-2">TVA : </td>
                           <td class="border_table_color_palette_grey p-2">19.0%</td>
                        </tr>
                        <tr>
                           <td class="border_table_color_palette_grey p-2">Total facture HT : </td>
                           <td class="border_table_color_palette_grey p-2">{{ totalfactureHT().toFixed(3) }} TND</td>
                        </tr>
                        <tr>
                           <td class="border_table_color_palette_grey p-2">Total facture TTC : </td>
                           <td class="border_table_color_palette_grey p-2">{{ totalfacture().toFixed(3) }} TND</td>
                        </tr>

                     </table>
                  </div>
               </div>
            </div>
         </div>
      </div>








      <!-- Button modal supprimer facture -->
      <button class="btn btn-primary btn-sm ms-1 me-1 btn_bg_color_palette_red" data-bs-toggle="modal"
         :data-bs-target="'#deletefacture' + facture.id">
         <i class="bi bi-trash3"></i>
      </button>
      <!-- Modal supprime facture -->
      <div class="modal fade  " :id="'deletefacture' + facture.id" tabindex="-1" aria-labelledby="exampleModalLabel"
         aria-hidden="true">
         <div class="modal-dialog  modal-dialog-centered">
            <div class="modal-content">
               <div class="modal-header">
                  <h1 class="modal-title fs-5 text_color_palette_blue" id="exampleModalLabel">Supprimer facture du client {{ facture.client }}
                  </h1>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
               </div>
               <div class="modal-body">
                  Voulez-vous supprimer définitivement cette facture?
               </div>
               <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
                  <button type="button" class="btn btn-primary btn_bg_color_palette_red" @click="deletefacture()"
                     data-bs-dismiss="modal">Confirmer</button>
               </div>
            </div>
         </div>
      </div>
   </td>




</template>
<script>

import html2pdf from 'html2pdf.js';
export default {
   name: 'Tableaux',

   props: {
      facture: Object,
   },
   created() {
      this.Factures = JSON.parse(localStorage.getItem("Factures")) == null ? [] : JSON.parse(localStorage.getItem("Factures"));
      console.table(this.Factures);
   },
   data() {
      return {
         refprd: '',
         produit: '',
         prixuni: '',
         quantite: '',
         nvprix: '',
         nvquantite: '',
         nvetat: '',
         Factures: [],
      };
   },
   methods: {
      deletefacture() {
         this.$emit('delete-fact');
      },
      refreshFactures() {
         this.Factures = JSON.parse(localStorage.getItem("Factures")) == null ? [] : JSON.parse(localStorage.getItem("Factures"));
      },
      addproduit(facture) {
         this.Factures = JSON.parse(localStorage.getItem("Factures")) == null ? [] : JSON.parse(localStorage.getItem("Factures"));
         console.log(this.Factures.Produits);
         let selectedfac = 0;
         for (let i = 0; i < this.Factures.length; i++) {
            if (this.Factures[i].id == facture.id) {
               selectedfac = i;
               break;
            }
         }
         let prod = {
            id: this.Factures[selectedfac].Produits.length == 0 ? 1 : this.Factures[selectedfac].Produits[this.Factures[selectedfac].Produits.length - 1].id + 1,
            refprd: this.refprd,
            produit: this.produit,
            prixuni: this.prixuni,
            prixuniHT: this.prixuni - (19 * this.prixuni / 100),
            quantite: this.quantite,
            totalTTC: this.quantite * this.prixuni,
         }
         for (let i = 0; i < this.Factures.length; i++) {
            if (this.Factures[i].id == facture.id) {
               this.Factures[i].Produits.push(prod);
            }
         }

         localStorage.setItem('Factures', JSON.stringify(this.Factures));
         this.refprd = ''
         this.produit = ''
         this.prixuni = ''
         this.quantite = ''
         this.refreshFactures();
         this.$router.go();
      },

      deleteproduit(facture,id_produit) {
         this.Factures = JSON.parse(localStorage.getItem("Factures")) == null ? [] : JSON.parse(localStorage.getItem("Factures"));
         for (let i = 0; i < this.Factures.length; i++) {
            if (this.Factures[i].id == facture.id) {
               for (let j = 0; j < this.Factures[i].Produits.length; j++) {
                  if (this.Factures[i].Produits[j].id == id_produit) {
                     this.Factures[i].Produits.splice(j, 1);
                  }
               }
            }
            localStorage.setItem('Factures', JSON.stringify(this.Factures));
         }
         this.$router.go();
         this.refreshFactures();
      },
      totalfacture() {
         let total = 0;
         for (let i = 0; i < this.facture.Produits.length; i++) {
            total += this.facture.Produits[i].totalTTC
         }
         return total;
      },
      totalfactureHT() {
         let totalht = 0;
         for (let i = 0; i < this.facture.Produits.length; i++) {
            totalht += this.facture.Produits[i].totalTTC - (19 * this.facture.Produits[i].totalTTC / 100)
         }
         return totalht;
      },
      totalquantite() {
         let totalqte = 0;
         for (let i = 0; i < this.facture.Produits.length; i++) {
            totalqte += parseInt(this.facture.Produits[i].quantite)
         }
         return totalqte
      },

      editproduit(id_facture, id_Produit) {
         for (let i = 0; i < this.Factures.length; i++) {
            if (this.Factures[i].id == id_facture) {
               for (let j = 0; j < this.Factures[i].Produits.length; j++) {
                  if (this.Factures[i].Produits[j].id == id_Produit) {
                     this.nvprix = this.Factures[i].Produits[j].prixuni
                     this.nvquantite = this.Factures[i].Produits[j].quantite
                     this.selectedi = this.Factures[i].Produits[j].id
                     this.isedit = true;
                     localStorage.setItem('Factures', JSON.stringify(this.Factures));
                  }
               }
            }
         }
         this.refreshFactures();
      },

      UpdateFacture(facture_id) {
         console.log(facture_id);
         for (let i = 0; i < this.Factures.length; i++) {
            if (this.Factures[i].id == facture_id) {
               this.Factures[i].etat = this.nvetat;
               localStorage.setItem('Factures', JSON.stringify(this.Factures));
               this.$router.go();
            }
         }
         this.refreshFactures();
      },

      UpdateProduit(id_facture, id_produit) {
         for (let i = 0; i < this.Factures.length; i++) {
            if (this.Factures[i].id == id_facture) {
               for (let j = 0; j < this.Factures[i].Produits.length; j++) {
                  if (this.Factures[i].Produits[j].id == id_produit) {
                     this.Factures[i].Produits[j].prixuni = this.nvprix;
                     this.Factures[i].Produits[j].quantite = this.nvquantite;
                     this.Factures[i].Produits[j].prixuniHT = this.Factures[i].Produits[j].prixuni - (19 * this.Factures[i].Produits[j].prixuni / 100);
                     this.Factures[i].Produits[j].totalTTC = this.Factures[i].Produits[j].quantite * this.Factures[i].Produits[j].prixuni,
                        this.isedit = false;
                     localStorage.setItem('Factures', JSON.stringify(this.Factures));
                  }
               }
            }
         }
         this.$router.go();
         this.refreshFactures();
      },
      exportToPDF(id_facture) {
         html2pdf(document.getElementById("facture"+id_facture), {
            margin: 1,
            filename: "facture.pdf",
         })
      },
   }

}


</script>
<style scoped>
.none {
   display: none;
}
</style>
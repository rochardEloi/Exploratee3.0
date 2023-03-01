const { createApp } = Vue

let url = "https://b-monee.onrender.com/api/form/add-form"
//import Swal from 'sweetalert2'

/*setTimeout(() => {
     Swal.fire({
         title: 'Error!',
         text: 'Do you want to continue',
         icon: 'success',
         confirmButtonText: 'Cool'
     })
 }, 5000)*/


createApp({
    data() {
        return {
            datas: {
                email: "",
                complete_name: "",
                birth_date: "",
                confirm_parent: "",
                phone: "509",
                complete_name_parent: "",
                phone_parent: "509",
                participation_reason: "",
                allergy_object: "",
                sick_value: "",
                mystic_value: "",
                shirt_color: "",
                shirt_size: ""
            },

            field_error: false,
            field: "",
            loading: false
        }
    },

    methods: {
        validForm: async function () {

            
            let myDatas = this.datas
            if (myDatas.complete_name === "") {
                this.field_error = true
                this.field = "Vous devez écrire votre nom complet pour valider l'inscription"
                return
            }

            if (myDatas.birth_date === "") {
                this.field_error = true
                this.field = "Votre date de naisssance est obligatoire"
                return
            }

            if (myDatas.phone === "") {
                this.field_error = true
                this.field = "Votre numéro de téléphone est obligatoire"
                return
            }

            if (myDatas.complete_name_parent === "") {
                this.field_error = true
                this.field = "Le nom d'un responsable est obligatoire"
                return
            }

            if (myDatas.phone_parent === "") {
                this.field_error = true
                this.field = "le numéro de téléphone du responsable est obligatoire"
                return
            }


            if (myDatas.sick_value === "") {
                this.field_error = true
                this.field = "Vous devez nous dire si vous souffrez ou non d'une maladie"
                return
            }

            if (myDatas.mystic_value === "") {
                this.field_error = true
                this.field = "Vous devez nous indiquer  vous avez eu des problèmes mystiques lors des sorties en groupe dont vous aviez participé"
                return
            }

            if (myDatas.shirt_color === "") {
                this.field_error = true
                this.field = "Vous devez choisir une couleur pour votre t-shirt"
                return
            }

            if (myDatas.shirt_size === "") {
                this.field_error = true
                this.field = "Vous devez choisir le size pour votre t-shirt"
                return
            }

            if(this.loading){
                true;
            }

            console.log("Ok")
            this.loading = true;

            this.field_error = false;
            let headersList = {
                "Accept": "*/*",
                "User-Agent": "Thunder Client (https://www.thunderclient.com)",
                "Content-Type": "application/json"
            }
            console.log(this.datas)
            let bodyContent = JSON.stringify({
                "datas": myDatas
            });

            let response = await fetch(url, {
                method: "POST",
                body: bodyContent,
                headers: headersList
            });
            try {
                let data = await response.text();
                let jsonData = JSON.parse(data)
               // console.log(data);
                if(jsonData.message === "Success"){
                    Swal.fire({
                        title: 'Success',
                        text: 'Votre formulaire a ete enregistrer, vous allez recevoir un message sur whatsapp',
                        icon: 'success',
                        confirmButtonText: 'Fermer',
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.href = 'index.html'
                        }
                      })
                }
            } catch (error) {
                Swal.fire({
                    title: 'Erreur!',
                    text: 'Il y a eu une erreur dans la requête, essaie à nouveau dans quelques minutes',
                    icon: 'error',
                    confirmButtonText: 'Fermer'
                })
            }finally{
              this.loading = false
            }
            

           

        }
    }

}).mount('#app')
const PodioConfig =require( '../../config/podioConfig');
const dbConnection =require( '../../config/mysqlConnection');
const tse = dbConnection().tse;

/*PodioConfig()
	.then((podio) => {
		podio
			.request('GET', '/item/app/21822217',{
                limit: 15,
                offset: 1000
            })
			.then(function(data) {
                //console.log(data.items.length, 'items encontrados');
                let c=0;
                data.items.forEach(element => {
                  as(element.item_id)
                  
                    /*tse.query( `UPDATE ciudadanos SET podio=1, itemIdPodio=${element.item_id} WHERE cedula =${element.title}` , (err, result) =>{
                        if(err){
                            console.log(err);
                        }else{
                            if(result.changedRows) c++;                           
                        }
                    });
                });
                console.log(c, 'items cambiados');
			}).catch((err) => {
                console.log(err);
            });        
	})
	.catch((err) => {
		console.log(err);
    });


  function as(id){*/
  PodioConfig()
	.then((podio) => {
    let res = {};
		podio
			.request('GET', '/item/1033526356')
			.then(function(data) {
        res = asigna(data.fields);
        console.log(res)
      }).catch((err) => {
          console.log(err);
      })

  }).catch((err) => {
      console.log(err);
  })


  function asigna(data){
    let result = {}
    data.forEach(campo => {
      switch(campo.external_id) {
        case 'lead-contact':
          result.nombre = campo.values[0].value;
          break;
        case 'apellido':
          result.apellido1= campo.values[0].value;
          break;
        case 'apellido-2':
          result.apellido2= campo.values[0].value;
          break;
        case 'sexo':
          result.sexo= campo.values[0].value.id
          break;
        case 'estado-civil-2':
          result.civil= campo.values[0].value.id
          break;
        case 'provincia-2':
          result.provincia= campo.values[0].value.text
          break;
        case 'canton-1':
          result.canton= campo.values[0].value.text
          break;
        case 'canton-4':
          if(!result.canton){
            result.canton= campo.values[0].value.text
          }
          break;
        case 'direccion':
          result.direccion= campo.values[0].value
          break;
        case 'ocupacion-2':
          result.ocupacion= campo.values[0].value
          break;
        case 'celular-3':
          result.celular= campo.values[0].value
          break;
        case 'telefono-de-casa':
          result.telefono1= campo.values[0].value
          break;
        case 'telefono-del-trabajo-3':
          result.telefono2= campo.values[0].value
          break;
        case 'celular-de-familiar-o-amigo':
          result.telFamiliar1= campo.values[0].value
          break;
        case 'email-2':
          result.email1= campo.values[0].value
          break;
        case 'email2':
          if(!result.email1){
          result.email1= campo.values[0].value
          }
          break;
      }
    });

    return result;
  }
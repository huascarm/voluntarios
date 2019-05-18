const PodioConfig =require( '../../config/podioConfig');
const dbConnection =require( '../../config/mysqlConnection');
const tse = dbConnection().tse;

PodioConfig()
	.then((podio) => {
		podio
			.request('GET', '/item/app/21822217',{
                limit: 3,
                offset: 0
            })
			.then(function(data) {
                console.log(data.items.length, 'items encontrados');
                let c=0;
                data.items.forEach(element => {
                  c++;
                  const sql = `UPDATE ciudadanos SET podio=1, itemIdPodio=${element.item_id} WHERE cedula =${element.title}`;
                  console.log(sql)  
                  tse.query( sql , (err, result) =>{
                        if(err){
                            console.log(err);
                        }else{
                            console.log(result)                           
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

/*
  function as(id){
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
*/
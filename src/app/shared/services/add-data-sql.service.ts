import { ApiMaterialAdminService } from './../../modules/admin/services/api-material-admin.service';
import { Injectable } from '@angular/core';
import { CreateMaterial } from '../interfaces/Material';

@Injectable({
  providedIn: 'root'
})
export class AddDataSqlService {

  constructor(
    private apiMaterial : ApiMaterialAdminService
  ) { }


  materialsToCreate : CreateMaterial[] = [
      {
          "name": "copte",
          "price": 7.85,
          "description": "<p>Cette reliure artisanale tient son nom des coptes, ch&eacute;tiens d&rsquo;Egypte, qui seraiet les premiers &agrave; cr&eacute;er des livres constitu&eacute;s de cahiers cousus ensemble. Ses caract&eacute;riques sont de ne pas utiliser de colle et d&rsquo;avoir un dos ouvert avec la couture apparente : les couvertures et les cahiers sont reli&eacute;s par une couture en forme de tresse.</p>\n<p>Elle permet une ouverture du livre &agrave; plat.</p>",
          "picture": "https://www.reliurealamain.fr/wp-content/uploads/2018/04/Copte-marbr%C3%A9.jpg",
          "materialType": "RELIURE",
      },
      {
          "name": "cousue ‘simple’",
          "price": 3.80,
          "description": "<p>Cette technique de reliure artisanale permet de relier &lsquo;simplement&rsquo; des ouvrages peu &eacute;pais et ne n&eacute;cessie pas de mat&eacute;riel professionnel. Les feuilles sont assembl&eacute;es en cahiers qui sont cousus entre eux le long de la tranche. Le dos du corps d&rsquo;ouvrage est coll&eacute; et est reli&eacute; &agrave; la couverture gr&acirc;ce au collage des pages de garde.</p>",
          "picture": "https://i.pinimg.com/originals/97/e3/53/97e353825b7888020a83c652ce1ef216.jpg",
          "materialType": "RELIURE",
      },
      {
          "name": "A5",
          "price": 3.50,
          "description": "<p>&nbsp;format A5 orientation paysage : environ 21,5 x 15 cm, &eacute;paisseur environ 3 cm.</p>",
          "picture": "http://www.format-papier-a0-a1-a2-a3-a4-a5.fr/format-a5/surface-A5.jpg",
          "materialType": "PAPIER",
      },
      {
          "name": "A4 portrait",
          "price": 2.80,
          "description": "<p>format A4 orientation portrait, environ 21,5 x 30 cm, &eacute;paisseur environ 3 cm.</p>",
          "picture": "http://www.format-papier-a0-a1-a2-a3-a4-a5.fr/format-a4/format-a4.jpg",
          "materialType": "PAPIER",
      },
      {
          "name": "cartonné",
          "price": 5.60,
          "description": "<p>du joli carton</p>",
          "picture": "http://pmco.com.mx/wp-content/uploads/2020/07/LAMINA-DE-CARTON.jpg",
          "materialType": "COUVERTURE",
      },
      {
          "name": "recyclé",
          "price": 4.50,
          "description": "<p>superbe papier recycl&eacute;</p>",
          "picture": "http://www.purplejumble.com/wp-content/uploads/2021/09/66D25212-E768-4C38-A0F7-939FC59FFF9A.jpeg",
          "materialType": "COUVERTURE",
      },
      {
          "name": "japonaise",
          "price": 8.95,
          "description": "<p>Cette technique de reliure artisanale est h&eacute;rit&eacute;e des traditions japonaises. Les feuilles simples sont assembl&eacute;s entre les deux plats de couverture et sont cousus avec la couverture par une couture apparente. Ce type de reliure offre un r&eacute;sultat esth&eacute;tique mais avec une ouverture r&eacute;duite.</p>",
          "picture": "https://www.sayonneara.fr/wp-content/uploads/2019/02/thumbnail_reliure-japonaise.jpg",
          "materialType": "RELIURE",
      },
      {
          "name": "dos brisé ou ficelle passée",
          "price": 5.99,
          "description": "<p>C&rsquo;est la reliure traditionnelle, n&eacute;cessitant un savoir faire et&nbsp; de nombreuses op&eacute;rations.<br>Dans cette reliure artisanale, le dos du livre est ind&eacute;pendant des pages, c&rsquo;est &agrave; dire que seules les pages de garde sont coll&eacute;es &agrave; la couverture, une ficelle ou un ruban assure la solidit&eacute; du collage entre le coprs d&rsquo;ouvrage et la couverture. Le dos est souvent courb&eacute; afin de permettre une amplitude d&rsquo;ouverture du livre.</p>\n<p>Les reliures pr&eacute;sent&eacute;es par la suite ne demande pas de mat&eacute;riel de professionnel</p>",
          "picture": "https://www.plumetismagazine.net/medias/2015/12/couture_3-690x370.jpg",
          "materialType": "RELIURE",
      },
      {
          "name": "cuir",
          "price": 9.99,
          "description": "<p>peau de vache morte</p>",
          "picture": "https://cdn.shopify.com/s/files/1/2574/6280/products/image_6ddedc23-d3e7-4c7f-b995-3307b9d3e79d.jpg?v=1570187484",
          "materialType": "COUVERTURE",
      }
  ]
}

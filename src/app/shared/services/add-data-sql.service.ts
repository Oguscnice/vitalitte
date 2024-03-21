import { ApiNotebookAdminService } from './../../modules/admin/services/api-notebook-admin.service';
import { ApiRequestsService } from 'src/app/shared/services/api-requests.service';
import { ApiCategoryAdminService } from './../../modules/admin/services/api-category-admin.service';
import { ApiMaterialAdminService } from './../../modules/admin/services/api-material-admin.service';
import { Injectable } from '@angular/core';
import { CreateMaterial } from 'src/app/modules/admin/interfaces/Material';
import { CategoryDto } from '../interfaces/Category';
import { MaterialDto } from '../interfaces/Material';
import { CreateNotebook } from 'src/app/modules/admin/interfaces/Notebook';

@Injectable({
  providedIn: 'root'
})
export class AddDataSqlService {

  constructor(
    private apiRequestsService : ApiRequestsService,
    private apiMaterialAdminService : ApiMaterialAdminService,
    private apiCategoryAdminService : ApiCategoryAdminService,
    private apiNotebookAdminService : ApiNotebookAdminService
  ) { }

  createAll(){
    //ils s'enchainent avec les autres
    this.createCategories();
  }

  categories! : CategoryDto[]
  materials! : MaterialDto[]
  
  createCategories(): void{
    for (let category of this.categoriesToCreate){
      this.apiCategoryAdminService.post(category).subscribe({
        next: (response) => console.log(response),
        error: (err) => console.log(err),
      })
    }
    this.getAllCategories();
  }

  getAllCategories(){
    this.apiRequestsService.getAllCategories().subscribe({
        next: (categories) => {
            this.categories = categories
            console.log(this.categories);
            this.createMaterials()
        },
        error: (err) => console.log(err),}
    )
  }

  createMaterials(): void{
    for (let material of this.materialsToCreate){
        this.apiMaterialAdminService.post(material).subscribe({
          next: (response) => console.log(response),
          error: (err) => console.log(err),
        })
      }
      this.getAllMaterials()
  }



  getAllMaterials(){
    this.apiRequestsService.getAllMaterials().subscribe({
        next: (materials) => {
            this.materials = materials
            console.log(this.materials);
            this.createNotebooks()
        },
        error: (err) => console.log(err),}
    )
  }

  selectRandomCategory(): CategoryDto{
    let randomIndex = Math.floor(Math.random() * this.categories.length);
    return this.categories[randomIndex];
  }

  selectRandomMaterials(): MaterialDto[]{

    let materialsRandom : MaterialDto[] = [];
    let randomMaterialNumber = Math.floor(Math.random() * 6);

    for(let i =0; i < randomMaterialNumber; i++){
        let randomIndex = Math.floor(Math.random() * this.materials.length);
        if(!materialsRandom.includes(this.materials[randomIndex])){
            materialsRandom.push(this.materials[randomIndex])
        }
    }

    return materialsRandom;
  }
  
  selectRandomSecondaryPictures(): string[]{

    let secondaryPictures : string[] = [];
    let randomPicturesNumber = Math.floor(Math.random() * 5);

    for(let i = 0; i < randomPicturesNumber; i++){
        let randomIndex = Math.floor(Math.random() * this.secondaryPictures.length);
        if(!secondaryPictures.includes(this.secondaryPictures[randomIndex])){
            secondaryPictures.push(this.secondaryPictures[randomIndex])
        }
    }

    return secondaryPictures;
  }

  selectOneRandomSecondaryPictures(): string{

        let randomIndex = Math.floor(Math.random() * this.secondaryPictures.length);
           return (this.secondaryPictures[randomIndex])

    }
  

  createNotebooks(): void{
    for(let notebook of this.notebooksToCreate){
        let newNotebook : CreateNotebook = {
            name : notebook.name,
            mainPicture : this.selectOneRandomSecondaryPictures(),
            introduction : notebook.introduction,
            price : notebook.price,
            description : notebook.description,
            materialsDto : this.selectRandomMaterials(),
            categoryDto : this.selectRandomCategory(),
            secondaryPictures : this.selectRandomSecondaryPictures()
        }
        console.log(newNotebook);
        

        this.apiNotebookAdminService.post(newNotebook).subscribe({
            next: (response) => console.log(response),
            error: (err) => console.log(err),
          })
    }
  }

  categoriesToCreate: string[] = [
    "été",
    "hiver",
    "printemps",
    "noel",
    "automne",
    "speciale",
    "occasionnel",
    "unique"
  ];

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

  notebooksToCreate = [
    {
    name : 'le végétal',
    introduction : `Une immersion dans la nature à chaque page. Teintes vertes apaisantes évoquent les feuillages luxuriants. Fait main avec un engagement écologique, chaque carnet offre un espace pour vos pensées créatives. Inspiré par la nature, ce carnet biodégradable vous encourage à cultiver vos idées tout en préservant notre environnement, page après page.`, 
    price : 1.50,
    secondaryPictures : [],
    description : `une célébration de la nature et de la durabilité. Sa couverture, réalisée à la main à partir de matériaux écologiques, reflète la richesse de la vie végétale avec des motifs floraux délicats et des teintes organiques. Chaque détail est une ode à la beauté naturelle, mettant en lumière la diversité des plantes qui peuplent notre planète. À l'intérieur, les pages en papier recyclé offrent une toile respectueuse de l'environnement pour capturer les pensées, les croquis ou les notes. La texture douce du papier invite à l'exploration créative, tandis que des empreintes végétales subtiles rappellent le lien intrinsèque entre l'homme et la nature. Des illustrations botaniques exquises et des motifs inspirés par la flore mondiale parsèment les pages, créant une expérience immersive au cœur du règne végétal. Des nuances de vert apaisantes et des touches de couleur inspirées des plantes ajoutent une dimension artistique, faisant de chaque page un jardin miniature. Le carnet artisanal bio végétal incarne l'éthique d'une fabrication respectueuse de l'environnement, soulignant l'importance de préserver la biodiversité. En choisissant ce carnet, vous optez pour un compagnon d'écriture qui capture l'énergie vivifiante de la nature, tout en soutenant des pratiques responsables pour une planète plus verte.`,
    materialsDto : [],
    },
    {
    name : 'le braise',
    introduction : `Une odyssée enflammée à chaque écriture. Les teintes chaudes évoquent les flammes dansantes. Réalisé à la main avec passion, chaque page offre un espace pour vos pensées ardentes. Inspiré par le feu, ce carnet biodégradable vous invite à graver vos idées tout en préservant notre planète, chaque mot s'embrasant sur ses pages.`, 
    price : 12.50,
    secondaryPictures : [],
    description : `évoque la puissance primitive et réconfortante du feu. Sa couverture, méticuleusement conçue à la main à partir de matériaux écologiques, reflète la lueur chaleureuse des braises avec des nuances de rouge, d'orange et de noir. Les motifs captivent l'esprit, évoquant le mouvement hypnotique des flammes dansantes. À l'intérieur, les pages en papier recyclé révèlent une toile résistante mais délicate, prête à accueillir les pensées ardentes et les idées passionnées. Chaque feuille semble prête à s'embraser, créant une toile où l'expression artistique ou l'écriture prend vie de manière flamboyante. Des illustrations captivantes de flammes tourbillonnantes et de braises incandescentes animent les pages, évoquant la vitalité et la force du feu. Des teintes de rouge, d'or et de noir créent un contraste saisissant, tandis que des détails subtils rappellent la ferveur de l'élément feu. Le carnet artisanal bio sur le thème de la braise et du feu symbolise la passion et la créativité brûlante. En choisissant ce carnet, vous emportez avec vous non seulement un objet artisanal magnifiquement conçu, mais aussi un rappel de la force inspiratrice du feu qui a captivé l'humanité depuis ses débuts.`,
    materialsDto : [],
    },
    {
    name: `Le Trésor de l'Océan`,
    introduction: `Une plongée envoûtante dans les profondeurs marines. Ce carnet artisanal bio, teinté des nuances apaisantes du bleu océan, est créé à la main avec un profond respect pour l'environnement. Chaque page vous offre une toile pour vos pensées créatives, tandis que les motifs inspirés de la mer vous invitent à explorer votre propre océan d'idées.`,
    price: 11.90,
    secondaryPictures : [],
    description: `La couverture, élaborée avec des matériaux écologiques, capture la beauté mystérieuse des fonds marins. Des motifs marins tels que les vagues, les coquillages et les étoiles de mer ornent la couverture, évoquant la richesse et la diversité de la vie sous-marine. Les pages du carnet révèlent un papier recyclé de haute qualité, offrant une surface lisse pour exprimer vos pensées et créations. Chaque feuille devient une fenêtre vers l'océan, avec des détails subtils tels que des reflets irisés ou des empreintes d'algues marines. Des illustrations délicates d'animaux marins et des citations inspirantes bordent les pages, créant une atmosphère empreinte de calme et de contemplation. Ce carnet est plus qu'un simple objet, c'est une invitation à plonger dans les profondeurs de votre imagination. Chaque carnet artisanal bio "Le Trésor de l'Océan" incarne l'engagement envers la préservation des océans et rappelle la beauté fragile de notre écosystème marin. En choisissant ce carnet, vous soutenez la protection des mers et des créatures qui les habitent.`,
    materialsDto : [],
    },
    {
    name: 'Le Jardin Enchanté',
    introduction: `Un carnet féerique où chaque page est une invitation à explorer un jardin magique. Les teintes pastel et les motifs floraux délicats créent une ambiance enchanteresse. Fabriqué à la main avec un engagement écologique, ce carnet biodégradable offre un espace créatif pour cultiver vos idées et laisser fleurir votre imagination.`,
    price: 10.50,
    secondaryPictures : [],
    description: `La couverture, ornée de motifs floraux et de papillons, transporte le regard dans un monde féerique. Réalisée avec des matériaux respectueux de l'environnement, elle incarne la beauté naturelle et éphémère d'un jardin enchanté. Les pages en papier recyclé offrent une toile douce et texturée pour vos écrits et croquis. Les détails délicats, tels que des empreintes de pétales et des motifs végétaux, ajoutent une touche de magie à chaque page, invitant à la rêverie. Des illustrations de fées, d'oiseaux chanteurs et de fleurs fantastiques parsèment le carnet, créant une atmosphère poétique. Les citations inspirantes vous guident dans ce voyage enchanteur, où chaque idée peut prendre racine et s'épanouir comme une fleur magique. Choisir le carnet "Le Jardin Enchanté", c'est inviter la magie dans votre quotidien tout en affirmant votre engagement envers des pratiques respectueuses de la nature. Ce carnet est une passerelle vers un monde où la créativité et la nature fusionnent harmonieusement.`,
      materialsDto : [],
    },
    {
    name: 'Le Cosmos Mystique',
    introduction: `Explorez l'infini avec le carnet "Le Cosmos Mystique". Sa couverture constellée et ses pages noires invitent à l'exploration cosmique. Chaque feuille devient une étoile où vos pensées brillent comme des galaxies lointaines. Un carnet biodégradable pour ceux qui rêvent au-delà des limites.`,
    price: 14.90,
    secondaryPictures : [],
    description: `La couverture noire profonde, ornée d'étoiles scintillantes, capture la majesté de l'univers. Chaque page est un voyage stellaire, avec des détails subtils tels que des constellations discrètes et des bords galactiques. Les pages noires offrent un contraste saisissant pour l'écriture ou le dessin blanc. Les illustrations de planètes lointaines et de nébuleuses époustouflantes parsèment le carnet, créant une expérience immersive dans le cosmos. Inspiré par la magie de l'espace infini, ce carnet incite à la réflexion profonde et à l'exploration créative. Choisir ce carnet, c'est embrasser l'inconnu avec chaque ligne tracée.`,
    materialsDto : [],
    },
    {
    name: 'Le Voyageur Temporel',
    introduction: `Plongez dans les méandres du temps avec le carnet "Le Voyageur Temporel". Sa couverture énigmatique, inspirée par les engrenages du temps, vous invite à explorer des époques lointaines. Chaque page devient une chronique où vos pensées transcendent les limites du présent.`,
    price: 16.50,
    secondaryPictures : [],
    description: `La couverture en cuir vieilli, ornée de motifs d'engrenages et de symboles mystérieux, évoque l'atmosphère d'une machine temporelle. Chaque détail invite à l'aventure dans les époques passées et futures. Les pages écrues, au grain délicat, sont une toile pour capturer vos pensées et visions temporelles. Des marques subtiles, telles que des empreintes d'horloges anciennes, ajoutent une dimension artistique et rappellent le passage du temps. Des illustrations évoquant différentes époques et des citations philosophiques jalonnent les pages, créant une expérience d'écriture qui transcende le présent. Choisir ce carnet, c'est entreprendre un voyage intemporel à chaque ligne.`,
    materialsDto : [],
    },
    {
    name: 'La Forêt Enchantée',
    introduction: `Plongez dans la magie de "La Forêt Enchantée", un carnet où les mystères de la nature s'entrelacent avec des histoires enchantées. La couverture, ornée de motifs floraux et d'animaux mystiques, invite à explorer un royaume féerique à chaque page.`,
    price: 13.90,
    secondaryPictures : [],
    description: `La couverture, faite à la main avec du cuir végétalien, évoque la texture douce de l'écorce des arbres enchantés. Des détails tels que des fées dansantes et des animaux fantastiques ajoutent une touche de magie à chaque regard. Les pages, en papier recyclé et durable, offrent une toile naturelle pour vos idées créatives. Des empreintes délicates de feuilles et des motifs végétaux créent une expérience immersive, transportant chaque utilisateur au cœur de la forêt enchantée. Des illustrations évoquant des créatures mystiques et des citations inspirantes de la nature parsèment les pages, créant une atmosphère de calme et de rêverie. Choisir ce carnet, c'est s'immerger dans un monde où la magie de la forêt se mêle à l'expression artistique.`,
    materialsDto : [],
    },
  ]

  secondaryPictures : string[] =[
    "https://pliereliure.com/1272-large_default/carnet-artisanal-livre-artiste-a5-papier-fait-main.jpg",
    "https://pliereliure.com/550-large_default/carnet-couture-belge-nature.jpg",
    "https://pliereliure.com/333-large_default/carnet-artisanal-de-notes-avec-petit-message.jpg",
    "https://media.cdnws.com/_i/259334/1051/2842/51/carnet-cuir-5.jpeg",
    "https://pliereliure.com/img/cms/30-12.jpg",
    "https://bluevertsoul.fr/wp-content/uploads/2023/07/Bluevert-Soul-carnet-creatif-carnet-aqaurelle-format-A6-couleur-bleue-motif-colibri-papier-100-coton-32-pages-reliure-dos-exposee-carnet-artisanal-jardin-creatif-booster-sa-creativite-scaled.jpg",
    "https://www.skinproject.fr/2610-large_default/carnet-en-cuir-a-crochet-figuratif.jpg",
    "https://millastudio.fr/wp-content/uploads/2022/02/20220207_162149-scaled.jpg",
    "https://les-ames-papier.com/wp-content/uploads/2019/06/crisscross-225x300.jpg"
  ]
}

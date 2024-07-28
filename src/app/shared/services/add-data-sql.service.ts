import { ApiNotebookAdminService } from '../../modules/admin/shared/services/api/api-notebook-admin.service';
import { ApiRequestsService } from 'src/app/shared/services/api-requests.service';
import { ApiCategoryAdminService } from '../../modules/admin/shared/services/api/api-category-admin.service';
import { ApiMaterialAdminService } from '../../modules/admin/shared/services/api/api-material-admin.service';
import { Injectable, inject } from '@angular/core';
import { CreateMaterial } from '../../modules/admin/shared/interfaces/Material';
import { CategoryDto } from '../interfaces/Category';
import { MaterialDto } from '../interfaces/Material';
import { CreateNotebook } from '../../modules/admin/shared/interfaces/Notebook';
import { CollectionDto } from '../interfaces/Collection';
import { ApiCollectionAdminService } from '../../modules/admin/shared/services/api/api-collection-admin.service';
import { ApiWorkshopAdminService } from '../../modules/admin/shared/services/api/api-workshop-admin.service';
import { CreateWorkshop } from '../../modules/admin/shared/interfaces/Workshop';
import { CreatePublication } from '../../modules/admin/shared/interfaces/Publication';
import { ApiPublicationAdminService } from '../../modules/admin/shared/services/api/api-publication-admin.service';
import { SecondaryPictureDto } from '../interfaces/SecondaryPicture';
import {CreateGiftCard} from "../../modules/admin/shared/interfaces/GiftCard";
import {ApiGiftcardService} from "../../modules/admin/shared/services/api/api-giftcard.service";
import {CreateDeliveryOption} from "../../modules/admin/shared/interfaces/DeliveryOption";
import {ApiDeliveryOptionAdminService} from "../../modules/admin/shared/services/api/api-delivery-option-admin.service";
import {ApiReviewAdminService} from "../../modules/admin/shared/services/api/api-review-admin.service";
import {CreateReview, ReviewDto} from "../interfaces/Review";
import {NotebookDto} from "../interfaces/Notebook";
import {DataSignalService} from "./data-signal.service";
import {PaginationSignalService} from "./pagination-signal.service";
import {PublicationDto} from "../interfaces/Publication";
import {DeliveryOptionDto} from "../interfaces/DeliveryOptionDto";
import {GiftCardDto} from "../interfaces/GiftCard";

@Injectable({
  providedIn: 'root'
})
export class AddDataSqlService {

  private apiNotebookAdminService = inject(ApiNotebookAdminService);
  private apiRequestsService = inject(ApiRequestsService);
  private apiMaterialAdminService = inject(ApiMaterialAdminService);
  private apiCategoryAdminService = inject(ApiCategoryAdminService);
  private apiCollectionAdminService = inject(ApiCollectionAdminService);
  private apiWorkshopAdminService = inject(ApiWorkshopAdminService);
  private apiPublicationAdminService = inject(ApiPublicationAdminService);
  private apiGiftCardAdminService = inject(ApiGiftcardService);
  private apiDeliveryOptionAdminService = inject(ApiDeliveryOptionAdminService);
  private apiReviewAdminService = inject(ApiReviewAdminService);
  private dataSignal = inject(DataSignalService);
  private paginationSignal = inject(PaginationSignalService);

  createAll(){
    this.createCategories(); // il s'enchaine avec collection, Carnets et Reviews
    this.createWorkshop();
    this.createPublications();
    this.createGiftCards();
    this.createDeliveryOptions();
  }

  categories!: CategoryDto[];
  materials!: MaterialDto[];
  collections!: CollectionDto[];
  notebooks!: NotebookDto[];
  publications!: PublicationDto[];
  deliveryOptions!: DeliveryOptionDto[];
  giftCards!: GiftCardDto[];
  reviews!: ReviewDto[];

  createCategories(): void {
    for (let category of this.categoriesToCreate) {
      this.apiCategoryAdminService.post(category).subscribe({
        next: (response) => console.log(response),
        error: (err) => {
          if (err.status !== 409) {
            console.log(err)
          }
        },
      })
    }
    this.getAllCategories();
    this.createCollections();
  }

  getAllCategories(){
    this.apiRequestsService.getAllCategories().subscribe({
        next: (categories) => {
          this.categories = categories;
          console.log("Catégories : ")
          console.log(this.categories)
          this.createCollections();
        },
        error: (err) => console.log(err),
      })
  }

  createCollections(): void{
    for (let collection of this.collectionsToCreate) {
      this.apiCollectionAdminService.post(collection).subscribe({
        next: (response) => console.log(response),
        error: (err) => {
          if (err.status !== 409) {
            console.log(err)
          }
        }
      })
    }
    this.getAllCollections();
    this.createMaterials();
  }

  getAllCollections(){
    this.apiRequestsService.getAllCollections().subscribe({
        next: (collections) => {
            this.collections = collections;
            console.log("Collections :");
            console.log(this.collections);
        },
        error: (err) => console.log(err),}
    )
  }

  createMaterials(): void {
    for (let material of this.materialsToCreate) {
        this.apiMaterialAdminService.post(material).subscribe({
          next: (response) => console.log(response),
          error: (err) => {
            if (err.status !== 409) {
              console.log(err)
            }
          }
        })
    }
    this.getAllMaterials();
  }

  getAllMaterials(): void {
    this.apiRequestsService.getAllMaterials().subscribe({
        next: (materials) => {
          this.materials = materials
          console.log("Matériels :")
          console.log(this.materials);
          this.createNotebooks();
        },
        error: (err) => console.log(err),
      })
  }

  selectRandomCategory(): CategoryDto{
    let randomIndex = Math.floor(Math.random() * this.categories.length);
    return this.categories[randomIndex];
  }

  selectRandomCollection(): CategoryDto{
    let randomIndex = Math.floor(Math.random() * this.collections.length);
    return this.collections[randomIndex];
  }

  createNotebooks(): void {
    for (const notebook of this.notebooksToCreate) {
      const picture = this.secondaryPictures[this.randomIndex(this.secondaryPictures.length)];
      const newNotebook: CreateNotebook = {
        name : notebook.name,
        picture : picture,
        pictureThumbnail : picture,
        introduction : notebook.introduction,
        price : notebook.price,
        description : notebook.description,
        materialsDto : this.selectRandomMaterials(),
        categoryDto : this.categories[this.randomIndex(this.categories.length)],
        collectionDto : this.collections[this.randomIndex(this.collections.length)],
        secondaryPicturesDto : this.selectRandomSecondaryPictures(),
      }

      this.apiNotebookAdminService.post(newNotebook).subscribe({
        next: (response) => console.log(response),
        error: (err) => {
          if (err.status !== 409) {
            console.log(err)
          }
        }
      })
    }
    this.getAllNotebooks();
  }

  getAllNotebooks(): void {
    this.apiRequestsService.getAllNotebooks().subscribe({
      next: (notebooks) => {
        console.log("Carnets :");
        this.notebooks = notebooks;
        this.createReviewsNotebook();
      },
      error: (err) => console.log(err),
    })
  }

  createReviewsNotebook(): void {

    for (const NOTEBOOK of this.notebooks) {

      const REVIEWS_COUNT = this.randomIndex(30);
      console.log("nombre de reviews : REVIEWS_COUNT");

      for (let i = 0; i < REVIEWS_COUNT; i++) {
        const RANDOM_NUMBER_PEOPLE = this.randomIndex(this.people.length);
        const RANDOM_NUMBER_REVIEW = this.randomIndex(this.reviewsToCreate.length);

        const reviewToCreate: CreateReview = {
          content: this.reviewsToCreate[RANDOM_NUMBER_REVIEW].content,
          title: this.reviewsToCreate[RANDOM_NUMBER_REVIEW].title,
          lastname: this.people[RANDOM_NUMBER_PEOPLE].lastname,
          firstname: this.people[RANDOM_NUMBER_PEOPLE].lastname,
          email: this.people[RANDOM_NUMBER_PEOPLE].email,
          rating: this.reviewsToCreate[RANDOM_NUMBER_REVIEW].rating,
          productCommonValuesDto: this.dataSignal.convertToProductDto(NOTEBOOK)
        }

        this.apiRequestsService.postReview(reviewToCreate).subscribe({
          next: (res) => {
            console.log(res.message);
          },
          error: (err) => console.log(err),
        });
      }
    }
    this.changeReviewsStatus();
  }

  changeReviewsStatus(): void {

    let REVIEWS: ReviewDto[];
    this.paginationSignal.setReviewStatus('');
    this.paginationSignal.setReviewRating(0);
    this.paginationSignal.setPageSize(999);

    this.apiRequestsService.getReviewsByStatus(this.paginationSignal.transformToPaginationReviewsFiltered()).subscribe({
      next: (page) => {
        REVIEWS = page.content;

        this.apiReviewAdminService.getAllReviewStatus().subscribe({
          next: (statusPossible) => {
            for (const REVIEW of REVIEWS) {

              const RANDOM_STATUS_INDEX = this.randomIndex(statusPossible.length)
              REVIEW.status = statusPossible[RANDOM_STATUS_INDEX];

              this.apiReviewAdminService.changeStatus(REVIEW).subscribe({
                  next: (res) => {
                    console.log(res.message);
                  },
                  error: (err) => console.log(err),
                }
              );
            }
          },
          error: (err) => console.log(err),
        })
      },
      error: (err) => console.log(err),
    })
  }

  createWorkshop(): void {
    for (let workshop of this.workshopsToCreate) {
      this.apiWorkshopAdminService.post(workshop).subscribe({
        next: (response) => console.log(response),
        error: (err) => {
          if (err.status !== 409) {
            console.log(err)
          }
        }
      })
    }
    this.createPublications();
  }

  createPublications(): void {
    for (let publication of this.publicationsToCreate) {
      this.apiPublicationAdminService.post(publication).subscribe({
        next: (response) => console.log(response),
        error: (err) => {
          if (err.status !== 409) {
            console.log(err)
          }
        }
      })
    }
  }

  createGiftCards(): void {
    for (let giftCard of this.giftCardsToCreate) {
      this.apiGiftCardAdminService.post(giftCard).subscribe({
        next: (response) => console.log(response),
        error: (err) => {
          if (err.status !== 409) {
            console.log(err)
          }
        }
      })
    }
    this.getAllGiftCards();
  }

  getAllGiftCards(): void {
      this.apiGiftCardAdminService.getAll().subscribe({
        next: (giftCards) => {
          this.giftCards = giftCards;
          console.log("Carte Cdeau :");
          console.log(this.giftCards);
        },
        error: (err) => {
          if (err.status !== 409) {
            console.log(err)
          }
        }
      })
  }

  createDeliveryOptions(): void {
    for (const DELIVERY_OPTION of this.deliveryOptionsToCreate) {
      this.apiDeliveryOptionAdminService.post(DELIVERY_OPTION).subscribe({
        next: (response) => console.log(response),
        error: (err) => {
          if (err.status !== 409) {
            console.log(err)
          }
        }
      })
    }
    this.getAllDeliveryOptions();
  }

  getAllDeliveryOptions(): void {
    this.apiDeliveryOptionAdminService.getAll().subscribe({
      next: (deliveryOption) => {
        this.deliveryOptions = deliveryOption;
        console.log("Option de Livraison :");
        console.log(this.deliveryOptions);
      },
      error: (err) => {
        if (err.status !== 409) {
          console.log(err)
        }
      }
    })
  }


  selectRandomMaterials(): MaterialDto[] {

    let materialsRandom : MaterialDto[] = [];
    let randomMaterialNumber = this.randomIndex(6);

    for(let i =0; i < randomMaterialNumber; i++){
        let randomIndex = this.randomIndex(this.materials.length);
        if (!materialsRandom.includes(this.materials[randomIndex])) {
            materialsRandom.push(this.materials[randomIndex])
        }
    }
    return materialsRandom;
  }

  selectRandomSecondaryPictures(): SecondaryPictureDto[] {

    let secondaryPictures : SecondaryPictureDto[] = [];
    let randomPicturesNumber = this.randomIndex(5);

    for(let i = 0; i < randomPicturesNumber; i++){
        const RANDOM_INDEX = this.randomIndex(this.secondaryPictures.length);
        if(!secondaryPictures.some(item => item.picture === this.secondaryPictures[RANDOM_INDEX])) {
          const secPic = {
            picture : this.secondaryPictures[RANDOM_INDEX],
            pictureThumbnail : this.secondaryPictures[RANDOM_INDEX]
          }
            secondaryPictures.push(secPic)
        }
    }

    return secondaryPictures;
  }

  private randomIndex(length: number): number {
    return Math.floor(Math.random() * length);
  }

  private people: { firstname: string, lastname: string, email: string }[] = [
    { firstname: "John", lastname: "Doe", email: "john.doe@example.com" },
    { firstname: "Alice", lastname: "Smith", email: "alice.smith@example.com" },
    { firstname: "Bob", lastname: "Johnson", email: "bob.johnson@example.com" },
    { firstname: "Emily", lastname: "Brown", email: "emily.brown@example.com" },
    { firstname: "Michael", lastname: "Davis", email: "michael.davis@example.com" },
    { firstname: "Jennifer", lastname: "Miller", email: "jennifer.miller@example.com" },
    { firstname: "William", lastname: "Wilson", email: "william.wilson@example.com" },
    { firstname: "Jessica", lastname: "Moore", email: "jessica.moore@example.com" },
    { firstname: "David", lastname: "Taylor", email: "david.taylor@example.com" },
    { firstname: "Sarah", lastname: "Anderson", email: "sarah.anderson@example.com" },
    { firstname: "Matthew", lastname: "Thomas", email: "matthew.thomas@example.com" },
    { firstname: "Laura", lastname: "Jackson", email: "laura.jackson@example.com" },
    { firstname: "Christopher", lastname: "White", email: "christopher.white@example.com" },
    { firstname: "Amanda", lastname: "Harris", email: "amanda.harris@example.com" },
    { firstname: "Daniel", lastname: "Martin", email: "daniel.martin@example.com" },
    { firstname: "Elizabeth", lastname: "Thompson", email: "elizabeth.thompson@example.com" },
    { firstname: "Joseph", lastname: "Garcia", email: "joseph.garcia@example.com" },
    { firstname: "Samantha", lastname: "Martinez", email: "samantha.martinez@example.com" },
    { firstname: "Andrew", lastname: "Robinson", email: "andrew.robinson@example.com" },
    { firstname: "Karen", lastname: "Clark", email: "karen.clark@example.com" },
    { firstname: "James", lastname: "Rodriguez", email: "james.rodriguez@example.com" },
    { firstname: "Nicole", lastname: "Lewis", email: "nicole.lewis@example.com" },
    { firstname: "Kevin", lastname: "Lee", email: "kevin.lee@example.com" },
    { firstname: "Melissa", lastname: "Walker", email: "melissa.walker@example.com" },
    { firstname: "Steven", lastname: "Hall", email: "steven.hall@example.com" },
    { firstname: "Taylor", lastname: "Allen", email: "taylor.allen@example.com" },
    { firstname: "Mary", lastname: "Young", email: "mary.young@example.com" },
    { firstname: "Ryan", lastname: "Hernandez", email: "ryan.hernandez@example.com" },
    { firstname: "Lauren", lastname: "King", email: "lauren.king@example.com" },
    { firstname: "John", lastname: "Wright", email: "john.wright@example.com" },
    { firstname: "Hannah", lastname: "Lopez", email: "hannah.lopez@example.com" },
    { firstname: "Brandon", lastname: "Hill", email: "brandon.hill@example.com" },
    { firstname: "Ashley", lastname: "Scott", email: "ashley.scott@example.com" },
    { firstname: "Justin", lastname: "Green", email: "justin.green@example.com" },
    { firstname: "Megan", lastname: "Adams", email: "megan.adams@example.com" },
    { firstname: "Eric", lastname: "Baker", email: "eric.baker@example.com" },
    { firstname: "Rachel", lastname: "Nelson", email: "rachel.nelson@example.com" },
    { firstname: "Timothy", lastname: "Carter", email: "timothy.carter@example.com" },
    { firstname: "Stephanie", lastname: "Mitchell", email: "stephanie.mitchell@example.com" },
    { firstname: "Jeffrey", lastname: "Perez", email: "jeffrey.perez@example.com" },
    { firstname: "Rebecca", lastname: "Roberts", email: "rebecca.roberts@example.com" },
    { firstname: "Brian", lastname: "Turner", email: "brian.turner@example.com" },
    { firstname: "Olivia", lastname: "Phillips", email: "olivia.phillips@example.com" },
    { firstname: "Kyle", lastname: "Campbell", email: "kyle.campbell@example.com" },
    { firstname: "Heather", lastname: "Evans", email: "heather.evans@example.com" },
    { firstname: "Nathan", lastname: "Edwards", email: "nathan.edwards@example.com" },
    { firstname: "Christina", lastname: "Collins", email: "christina.collins@example.com" },
    { firstname: "Gregory", lastname: "Stewart", email: "gregory.stewart@example.com" },
    { firstname: "Lindsay", lastname: "Sanchez", email: "lindsay.sanchez@example.com" }
  ];


  publicationsToCreate: CreatePublication[] = [
      {
        title: "Atelier d'inspiration : Créez votre propre carnet artistique !",
        description: "<p>Rejoignez-nous lors de notre prochain atelier o&ugrave; vous pourrez laisser libre cours &agrave; votre cr&eacute;ativit&eacute; en fabriquant votre propre carnet, guid&eacute; par nos artisans exp&eacute;riment&eacute;s.</p>",
        picture: "https://i.ibb.co/7nXhnLY/publication.jpg",
        pictureThumbnail: "https://i.ibb.co/7nXhnLY/publication.jpg"
      },
      {
        title: "Rencontre avec l'artisan : Découvrez l'histoire derrière nos créations !",
        description: "<p>Plongez dans l'univers de la fabrication artisanale en rencontrant notre artisan principal, qui partagera ses inspirations et son savoir-faire lors d'une s&eacute;ance exclusive.</p>",
        picture: "https://i.ibb.co/7nXhnLY/publication.jpg",
        pictureThumbnail: "https://i.ibb.co/7nXhnLY/publication.jpg"
      },
      {
        title: "Concours de design : Montrez votre talent et gagnez des carnets exclusifs !",
        description: "<p>Participez &agrave; notre concours de design et montrez-nous votre cr&eacute;ativit&eacute; en proposant votre propre motif de carnet. Les gagnants recevront une collection de nos carnets exclusifs en r&eacute;compense.</p>",
        picture: "https://i.ibb.co/7nXhnLY/publication.jpg",
        pictureThumbnail: "https://i.ibb.co/7nXhnLY/publication.jpg"
      },
      {
        title: "Carnets sur mesure : Personnalisez votre compagnon d'écriture !",
        description: "<p>Exprimez votre individualit&eacute; en commandant un carnet enti&egrave;rement personnalis&eacute;, adapt&eacute; &agrave; vos besoins et &agrave; votre style.</p>",
        picture: "https://i.ibb.co/7nXhnLY/publication.jpg",
        pictureThumbnail: "https://i.ibb.co/7nXhnLY/publication.jpg"
      },
      {
        title: "Cadeau artisanal : Offrez un carnet unique pour célébrer les moments spéciaux !",
        description: "<p>Faites de chaque occasion un souvenir inoubliable en offrant un cadeau artisanal unique, tel qu'un carnet fait &agrave; la main, parfait pour capturer les moments pr&eacute;cieux de la vie.</p>",
        picture: "https://i.ibb.co/7nXhnLY/publication.jpg",
        pictureThumbnail: "https://i.ibb.co/7nXhnLY/publication.jpg"
      },
      {
        title: "Édition limitée : Nos nouveaux carnets inspirés de la nature sont disponibles !",
        description: "<p>Explorez la beaut&eacute; de la nature &agrave; travers notre derni&egrave;re &eacute;dition limit&eacute;e de carnets, orn&eacute;s de motifs floraux et de textures organiques uniques.</p>",
        picture: "https://i.ibb.co/7nXhnLY/publication.jpg",
        pictureThumbnail: "https://i.ibb.co/7nXhnLY/publication.jpg"
      },
      {
        title: "Carnets éco-responsables : Engagez-vous pour un avenir plus vert avec nos produits durables !",
        description: "<p>Faites un pas vers un mode de vie plus respectueux de l'environnement en optant pour nos carnets &eacute;co-responsables, fabriqu&eacute;s &agrave; partir de mat&eacute;riaux durables et recycl&eacute;s.</p>",
        picture: "https://i.ibb.co/7nXhnLY/publication.jpg",
        pictureThumbnail: "https://i.ibb.co/7nXhnLY/publication.jpg"
      },
      {
        title: "Nouvelle collection artisanale : Découvrez nos carnets exclusifs !",
        description: "<p>Plongez dans l'artisanat authentique avec notre derni&egrave;re collection de carnets, alliant qualit&eacute;, design et durabilit&eacute;.</p>",
        picture: "https://i.ibb.co/7nXhnLY/publication.jpg",
        pictureThumbnail: "https://i.ibb.co/7nXhnLY/publication.jpg"
      },
      {
        title: "Artisanat local : Soutenez nos créateurs locaux en achetant des carnets faits à la main !",
        description: "<p>Valorisez l'artisanat local et soutenez nos talentueux artisans en choisissant nos carnets faits &agrave; la main, fabriqu&eacute;s avec amour et d&eacute;vouement dans notre atelier.</p>",
        picture: "https://i.ibb.co/7nXhnLY/publication.jpg",
        pictureThumbnail: "https://i.ibb.co/7nXhnLY/publication.jpg"
      },
      {
        title: "Nouvelle technique de reliure : Découvrez notre dernière innovation artisanale !",
        description: "<p>Explorez notre toute nouvelle technique de reliure, fusionnant tradition et innovation pour cr&eacute;er des carnets &agrave; la fois &eacute;l&eacute;gants et r&eacute;sistants, parfaits pour accompagner vos aventures quotidiennes.</p>",
        picture: "https://i.ibb.co/7nXhnLY/publication.jpg",
        pictureThumbnail: "https://i.ibb.co/7nXhnLY/publication.jpg"
      },
      {
        title: " Offrez un carnet ",
        description: "<p>Valorisez l'artisanat local et soutenez nos talentueux artisans en choisissant nos carnets faits &agrave; la main, fabriqu&eacute;s avec amour et d&eacute;vouement dans notre atelier.</p> <p>Participez &agrave; notre concours de design et montrez-nous votre cr&eacute;ativit&eacute; en proposant votre propre motif de carnet. Les gagnants recevront une collection de nos carnets exclusifs en r&eacute;compense.</p> <p>Explorez notre toute nouvelle technique de reliure, fusionnant tradition et innovation pour cr&eacute;er des carnets &agrave; la fois &eacute;l&eacute;gants et r&eacute;sistants, parfaits pour accompagner vos aventures quotidiennes.</p>",
        picture: "https://i.ibb.co/7nXhnLY/publication.jpg",
        pictureThumbnail: "https://i.ibb.co/7nXhnLY/publication.jpg"
      }
    ]

  workshopsToCreate: CreateWorkshop[] = [
    {
      title : "Papier d'Artisanat Carnet",
      description : "Dans l'atelier du Papier d'Artisanat Carnet, chaque carnet est façonné avec passion et dévotion, mêlant habilement tradition et innovation. Nos artisans expérimentés utilisent des techniques ancestrales de reliure et de façonnage du papier pour créer des carnets uniques en leur genre. Chaque étape du processus est effectuée à la main, de la sélection méticuleuse des matériaux à la découpe précise du papier, en passant par l'assemblage et la finition minutieuse. Notre engagement envers la qualité se reflète dans chaque détail, des couvertures exquises aux pages lisses et durables. Que ce soit pour capturer des pensées fugaces, noter des idées créatives ou simplement pour le plaisir d'écrire, nos carnets artisanaux offrent une expérience d'écriture incomparable, empreinte de caractère et d'authenticité.",
      date : new Date("08/09/2024 18:36"),
      address : "123 Rue des Nuages, Ville-sur-Mer, France",
      price : (5.99),
      picture : "https://pliereliure.com/569-large_default/carnet-artisanal-a5-livre-d-artiste-mon-univers-scrapbooking.jpg",
      pictureThumbnail : "https://pliereliure.com/569-large_default/carnet-artisanal-a5-livre-d-artiste-mon-univers-scrapbooking.jpg",
      registrations : 8
    },
    {
      title : "Carnets Faits à la Main Co.",
      description : "Chez Carnets Faits à la Main Co., nous croyons en l'importance de l'artisanat traditionnel et de la qualité intemporelle. Chaque carnet qui quitte notre atelier est le fruit d'un travail méticuleux réalisé par nos artisans qualifiés. Inspirés par la beauté de la simplicité, nous utilisons des matériaux de haute qualité et des techniques de reliure traditionnelles pour créer des carnets qui allient fonctionnalité et esthétique. Chaque carnet est conçu pour être un compagnon fidèle, offrant un espace où les idées prennent vie et les souvenirs sont préservés. Qu'il s'agisse d'un journal intime, d'un carnet de croquis ou d'un cahier de voyage, nos carnets faits à la main sont conçus pour inspirer la créativité et nourrir l'âme.",
      date : new Date("10/09/2024 08:00"),
      address : "456 Avenue de l'Arc-en-Ciel, Ville-en-Montagne, Canada",
      price : (0),
      picture : "https://pliereliure.com/1386-large_default/carnet-artisanal-carnettiste-artistique.jpg",
      pictureThumbnail : "https://pliereliure.com/1386-large_default/carnet-artisanal-carnettiste-artistique.jpg",
      registrations : 3
    },
    {
      title : "Atelier Carnets Artisanaux",
      description : "À l'Atelier Carnets Artisanaux, nous nous engageons à créer des produits authentiques qui capturent l'essence de l'artisanat traditionnel. Chaque carnet que nous produisons est le résultat d'un processus méticuleux réalisé à la main, depuis la sélection attentive des matériaux jusqu'à la finition minutieuse. Nos artisans passionnés mettent leur expertise et leur savoir-faire au service de la création de carnets uniques en leur genre, où la qualité et l'attention aux détails sont primordiales. Nos carnets artisanaux sont conçus pour inspirer la créativité et encourager l'expression personnelle, offrant un espace où les idées peuvent s'épanouir et les histoires peuvent prendre vie. Avec leur charme intemporel et leur qualité exceptionnelle, nos carnets sont bien plus que de simples objets ; ce sont des compagnons précieux qui enrichissent la vie quotidienne.",
      date : new Date("10/04/2024 09:00"),
      address : "789 Boulevard des Étoiles, Ville-aux-Étoiles, Australie",
      price : (10),
      picture : "https://pliereliure.com/568-large_default/carnet-artisanal-a5-livre-d-artiste-mon-univers-scrapbooking.jpg",
      pictureThumbnail : "https://pliereliure.com/568-large_default/carnet-artisanal-a5-livre-d-artiste-mon-univers-scrapbooking.jpg",
      registrations : 999
    },
    {
      title : "Studio de Reliure Créative",
      description : "Bienvenue à la Papeterie Artisanale des Mots, où chaque carnet est une œuvre d'art en soi. Dans notre atelier, nous célébrons la beauté de l'écriture à la main et la puissance des mots, en créant des carnets qui inspirent la créativité et captivent l'imagination. Nos artisans passionnés utilisent des matériaux de qualité supérieure et des techniques de reliure traditionnelles pour concevoir des carnets uniques qui sont à la fois fonctionnels et esthétiquement plaisants. Chaque détail est soigneusement considéré, des motifs exquis sur les couvertures aux pages lisses et agréables au toucher. Que ce soit pour écrire, dessiner ou simplement pour laisser libre cours à votre imagination, nos carnets artisanaux sont conçus pour vous accompagner dans tous vos voyages créatifs.",
      date : new Date("12/05/2024 14:30"),
      address : "1010 Rue de la Licorne, Ville-enchantée, Royaume-Uni",
      price : (5.99),
      picture : "https://pliereliure.com/333-large_default/carnet-artisanal-de-notes-avec-petit-message.jpg",
      pictureThumbnail : "https://pliereliure.com/333-large_default/carnet-artisanal-de-notes-avec-petit-message.jpg",
      registrations : 2
    },
    {
      title : "L'Atelier des Carnets d'Écriture",
      description : "Au Studio de Reliure Créative, nous sommes dévoués à l'art intemporel de la reliure artisanale. Chaque carnet qui quitte notre atelier est le fruit d'un processus méticuleux et passionné, où chaque étape est effectuée à la main avec une attention méticuleuse aux détails. Nos artisans talentueux utilisent des matériaux de haute qualité, allant du papier de qualité supérieure aux tissus et cuirs exquis, pour créer des carnets qui allient fonctionnalité et esthétique. Chaque carnet est conçu pour être une œuvre d'art en soi, offrant un espace où les idées peuvent s'épanouir et les pensées peuvent être capturées. Qu'il s'agisse d'un carnet de voyage, d'un journal intime ou d'un carnet de croquis, nos créations sont conçues pour inspirer la créativité et enrichir la vie de nos clients.",
      date : new Date("06/05/2024 17:00"),
      address : "1313 Avenue de la Lune, Ville-lunaire, États-Unis",
      price : (0),
      picture : "https://latelierdestephanieaguado.com/wp-content/uploads/2020/05/mini-carnet-07.jpg",
      pictureThumbnail : "https://latelierdestephanieaguado.com/wp-content/uploads/2020/05/mini-carnet-07.jpg",
      registrations : 9
    },
    {
      title : "Carnet",
      description : "L'Atelier des Carnets d'Écriture est un sanctuaire pour les amoureux de l'écriture et du papier de qualité. Dans notre atelier, nous mettons l'accent sur l'artisanat traditionnel et la qualité exceptionnelle, en utilisant des techniques de reliure ancestrales pour créer des carnets qui sont à la fois beaux et fonctionnels. Chaque carnet est conçu avec soin et attention aux détails, depuis la sélection des matériaux jusqu'à la finition finale. Nos artisans expérimentés mettent leur expertise au service de la création de carnets uniques en leur genre, offrant un espace où les pensées peuvent s'épanouir et les idées peuvent prendre forme. Qu'il s'agisse d'un carnet de voyage rempli d'aventures ou d'un journal intime rempli de souvenirs, nos créations sont conçues pour inspirer et enrichir la vie de nos clients, une page à la fois.",
      date : new Date("05/06/2024 20:00"),
      address : "1313 Avenue de la Lune, Ville-lunaire, États-Unis",
      price : 7.89,
      picture : "https://pliereliure.com/565-large_default/carnet-artisanal-a5-livre-d-artiste-mon-univers-scrapbooking.jpg",
      pictureThumbnail : "https://pliereliure.com/565-large_default/carnet-artisanal-a5-livre-d-artiste-mon-univers-scrapbooking.jpg",
      registrations : 10
    },
    {
      title : "Artisanat Carnet",
      description : "L'Atelier des Carnets d'Écriture est un sanctuaire pour les amoureux de l'écriture et du papier de qualité. Dans notre atelier, nous mettons l'accent sur l'artisanat traditionnel et la qualité exceptionnelle, en utilisant des techniques de reliure ancestrales pour créer des carnets qui sont à la fois beaux et fonctionnels. Chaque carnet est conçu avec soin et attention aux détails, depuis la sélection des matériaux jusqu'à la finition finale. Nos artisans expérimentés mettent leur expertise au service de la création de carnets uniques en leur genre, offrant un espace où les pensées peuvent s'épanouir et les idées peuvent prendre forme. Qu'il s'agisse d'un carnet de voyage rempli d'aventures ou d'un journal intime rempli de souvenirs, nos créations sont conçues pour inspirer et enrichir la vie de nos clients, une page à la fois.",
      date : new Date("01/08/2024 08:00"),
      address : "1515 Chemin de la Magie, Ville-mystère, Espagne",
      price : (5.99),
      picture : "https://pliereliure.com/img/cms/30-03.jpg",
      pictureThumbnail : "https://pliereliure.com/img/cms/30-03.jpg",
      registrations : 80
    }
  ]

  categoriesToCreate: string[] = [
    "Les illustrés",
    "Les amoureux du papier",
    "Les créations uniques",
    "Les sur-mesures"
  ];

  collectionsToCreate: string[] = [
    "été",
    "printemps",
    "hiver",
    "automne"
  ];

  materialsToCreate : CreateMaterial[] = [
      {
          "name": "copte",
          "price": 7.85,
          "description": "<p>Cette reliure artisanale tient son nom des coptes, ch&eacute;tiens d&rsquo;Egypte, qui seraiet les premiers &agrave; cr&eacute;er des livres constitu&eacute;s de cahiers cousus ensemble. Ses caract&eacute;riques sont de ne pas utiliser de colle et d&rsquo;avoir un dos ouvert avec la couture apparente : les couvertures et les cahiers sont reli&eacute;s par une couture en forme de tresse.</p>\n<p>Elle permet une ouverture du livre &agrave; plat.</p>",
          "picture": "https://www.reliurealamain.fr/wp-content/uploads/2018/04/Copte-marbr%C3%A9.jpg",
          "pictureThumbnail": "https://www.reliurealamain.fr/wp-content/uploads/2018/04/Copte-marbr%C3%A9.jpg",
          "materialType": "RELIURE",
      },
      {
          "name": "cousue ‘simple’",
          "price": 3.80,
          "description": "<p>Cette technique de reliure artisanale permet de relier &lsquo;simplement&rsquo; des ouvrages peu &eacute;pais et ne n&eacute;cessie pas de mat&eacute;riel professionnel. Les feuilles sont assembl&eacute;es en cahiers qui sont cousus entre eux le long de la tranche. Le dos du corps d&rsquo;ouvrage est coll&eacute; et est reli&eacute; &agrave; la couverture gr&acirc;ce au collage des pages de garde.</p>",
          "picture": "https://i.pinimg.com/originals/97/e3/53/97e353825b7888020a83c652ce1ef216.jpg",
          "pictureThumbnail": "https://i.pinimg.com/originals/97/e3/53/97e353825b7888020a83c652ce1ef216.jpg",
          "materialType": "RELIURE",
      },
      {
          "name": "A5",
          "price": 3.50,
          "description": "<p>&nbsp;format A5 orientation paysage : environ 21,5 x 15 cm, &eacute;paisseur environ 3 cm.</p>",
          "picture": "http://www.format-papier-a0-a1-a2-a3-a4-a5.fr/format-a5/surface-A5.jpg",
          "pictureThumbnail": "http://www.format-papier-a0-a1-a2-a3-a4-a5.fr/format-a5/surface-A5.jpg",
          "materialType": "PAPIER",
      },
      {
          "name": "A4 portrait",
          "price": 2.80,
          "description": "<p>format A4 orientation portrait, environ 21,5 x 30 cm, &eacute;paisseur environ 3 cm.</p>",
          "picture": "http://www.format-papier-a0-a1-a2-a3-a4-a5.fr/format-a4/format-a4.jpg",
          "pictureThumbnail": "http://www.format-papier-a0-a1-a2-a3-a4-a5.fr/format-a4/format-a4.jpg",
          "materialType": "PAPIER",
      },
      {
          "name": "cartonné",
          "price": 5.60,
          "description": "<p>du joli carton</p>",
          "picture": "http://pmco.com.mx/wp-content/uploads/2020/07/LAMINA-DE-CARTON.jpg",
          "pictureThumbnail": "http://pmco.com.mx/wp-content/uploads/2020/07/LAMINA-DE-CARTON.jpg",
          "materialType": "COUVERTURE",
      },
      {
          "name": "recyclé",
          "price": 4.50,
          "description": "<p>superbe papier recycl&eacute;</p>",
          "picture": "http://www.purplejumble.com/wp-content/uploads/2021/09/66D25212-E768-4C38-A0F7-939FC59FFF9A.jpeg",
          "pictureThumbnail": "http://www.purplejumble.com/wp-content/uploads/2021/09/66D25212-E768-4C38-A0F7-939FC59FFF9A.jpeg",
          "materialType": "COUVERTURE",
      },
      {
          "name": "japonaise",
          "price": 8.95,
          "description": "<p>Cette technique de reliure artisanale est h&eacute;rit&eacute;e des traditions japonaises. Les feuilles simples sont assembl&eacute;s entre les deux plats de couverture et sont cousus avec la couverture par une couture apparente. Ce type de reliure offre un r&eacute;sultat esth&eacute;tique mais avec une ouverture r&eacute;duite.</p>",
          "picture": "https://www.sayonneara.fr/wp-content/uploads/2019/02/thumbnail_reliure-japonaise.jpg",
          "pictureThumbnail": "https://www.sayonneara.fr/wp-content/uploads/2019/02/thumbnail_reliure-japonaise.jpg",
          "materialType": "RELIURE",
      },
      {
          "name": "dos brisé ou ficelle passée",
          "price": 5.99,
          "description": "<p>C&rsquo;est la reliure traditionnelle, n&eacute;cessitant un savoir faire et&nbsp; de nombreuses op&eacute;rations.<br>Dans cette reliure artisanale, le dos du livre est ind&eacute;pendant des pages, c&rsquo;est &agrave; dire que seules les pages de garde sont coll&eacute;es &agrave; la couverture, une ficelle ou un ruban assure la solidit&eacute; du collage entre le coprs d&rsquo;ouvrage et la couverture. Le dos est souvent courb&eacute; afin de permettre une amplitude d&rsquo;ouverture du livre.</p>\n<p>Les reliures pr&eacute;sent&eacute;es par la suite ne demande pas de mat&eacute;riel de professionnel</p>",
          "picture": "https://www.plumetismagazine.net/medias/2015/12/couture_3-690x370.jpg",
          "pictureThumbnail": "https://www.plumetismagazine.net/medias/2015/12/couture_3-690x370.jpg",
          "materialType": "RELIURE",
      },
      {
          "name": "cuir",
          "price": 9.99,
          "description": "<p>peau de vache morte</p>",
          "picture": "https://cdn.shopify.com/s/files/1/2574/6280/products/image_6ddedc23-d3e7-4c7f-b995-3307b9d3e79d.jpg?v=1570187484",
          "pictureThumbnail": "https://cdn.shopify.com/s/files/1/2574/6280/products/image_6ddedc23-d3e7-4c7f-b995-3307b9d3e79d.jpg?v=1570187484",
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

  giftCardsToCreate: CreateGiftCard[] = [
    {
      code:"code de noel",
      rising: 0.65,
      percentage: true,
      expiryDate: new Date(new Date().getFullYear(), new Date().setMonth(new Date().getMonth()+1), 24)
    },
    {
      code:"code d'été",
      rising: 5,
      percentage: true,
      expiryDate: new Date(new Date().getFullYear(), 8, 31)
    },
    {
      code:"la rentrée en folie",
      rising: 20,
      percentage: false,
      expiryDate: new Date(new Date().getFullYear(), 8, 15)
    },
    {
      code:"code de d'anniversaire",
      rising: 10,
      percentage: true,
      expiryDate: new Date(new Date().getFullYear(), 10, 10)
    },
    {
      code:"fete des mères 2024",
      rising: 20,
      percentage: false,
      expiryDate: new Date(new Date().getFullYear(), 6, 10)
    },
    {
      code:"offre de bienvenue",
      rising: 5,
      percentage: false,
      expiryDate: new Date(new Date().getFullYear(), 6, 10)
    },
  ]

  deliveryOptionsToCreate: CreateDeliveryOption[] = [
    {
      name: `classique`,
      price: 1.05,
      estimatedDeliveryTime: `2 - 4 jours`,
      isExpress: false,
      carrier: `la poste`,
      description: `une livraison classique par la poste`
    },
    {
      name: `recommandé`,
      price: 3,
      estimatedDeliveryTime: `1 - 2 jours`,
      isExpress: true,
      carrier: `la poste`,
      description: `une livraison recommandée par la poste`
    },
    {
      name: `méga rapide`,
      price: 5,
      estimatedDeliveryTime: `1 jour`,
      isExpress: true,
      carrier: `ups`,
      description: ``
    },
  ]

  reviewsToCreate: { rating: number, content: string, title: string }[] = [
    {
      rating: 5,
      content: "Ce carnet est tout simplement magnifique. Le cuir est de haute qualité, le papier est parfait pour écrire et dessiner. J'adore le design rustique. Vivement recommandé !",
      title: "Magnifique carnet de haute qualité"
    },
    {
      rating: 4.5,
      content: "Très beau carnet, idéal pour mes croquis. Juste un petit souci avec la fermeture qui pourrait être un peu plus solide. Sinon, c'est parfait !",
      title: "Idéal pour les croquis"
    },
    {
      rating: 4,
      content: "La qualité est exceptionnelle et le design est superbe. Cependant, le prix est un peu élevé pour un carnet.",
      title: "Exceptionnel mais cher"
    },
    {
      rating: 3.5,
      content: "J'aime beaucoup ce carnet, mais le papier n'est pas aussi épais que je l'aurais souhaité. L'encre de mon stylo plume transperce légèrement.",
      title: "Beau carnet, papier fin"
    },
    {
      rating: 3,
      content: "Le carnet est beau et pratique, mais je trouve le cuir un peu trop rigide. Il faut un peu de temps pour qu'il s'assouplisse.",
      title: "Cuir rigide"
    },
    {
      rating: 2.5,
      content: "Le design est joli, mais le papier se froisse facilement. Aussi, la livraison a pris plus de temps que prévu.",
      title: "Design joli mais papier fragile"
    },
    {
      rating: 2,
      content: "Le carnet a l'air bien, mais le cuir a commencé à se déchirer après quelques semaines. Je m'attendais à mieux pour ce prix.",
      title: "Déception sur la durée"
    },
    {
      rating: 1.5,
      content: "Le carnet est très beau, mais le papier est trop fin. Il n'est pas pratique pour écrire avec un stylo plume.",
      title: "Beau mais papier de mauvaise qualité"
    },
    {
      rating: 1,
      content: "Le cuir est de mauvaise qualité et s'effrite rapidement. De plus, le papier n'est pas agréable pour écrire. Je ne recommande pas.",
      title: "Mauvaise qualité"
    },
    {
      rating: 0.5,
      content: "Le carnet est arrivé endommagé et le service client n'a pas été utile du tout. Très déçu de mon achat.",
      title: "Carnet endommagé et service client décevant"
    },
    {
      rating: 5,
      content: "Ce carnet est idéal pour mes croquis et mes notes. La qualité du papier est excellente et le design est magnifique. Je l'adore !",
      title: "Parfait pour croquis et notes"
    },
    {
      rating: 4.5,
      content: "J'ai adoré ce carnet dès que je l'ai vu. Le cuir est doux et souple, et le papier est parfait pour écrire. Juste un peu lourd pour le transporter partout.",
      title: "Beau mais un peu lourd"
    },
    {
      rating: 4,
      content: "J'aime beaucoup ce carnet, le cuir est de qualité et le papier aussi. Le prix est un peu élevé, mais je pense que ça vaut le coup.",
      title: "Bon carnet mais cher"
    },
    {
      rating: 3.5,
      content: "Le carnet est beau, mais le cuir sent très fort au début. Le papier est de bonne qualité, mais pourrait être un peu plus épais.",
      title: "Odeur forte, bon papier"
    },
    {
      rating: 3,
      content: "La qualité du cuir est bonne, mais le papier est un peu fin. Ce carnet est bien pour des notes rapides, mais pas pour des croquis détaillés.",
      title: "Bon pour des notes rapides"
    },
    {
      rating: 2.5,
      content: "Le cuir est beau, mais le papier laisse à désirer. L'encre de mon stylo transperce souvent les pages. Dommage.",
      title: "Beau cuir, papier médiocre"
    },
    {
      rating: 2,
      content: "J'ai été déçu par la qualité du cuir. Il s'est abîmé rapidement et le papier n'est pas aussi épais que je l'espérais.",
      title: "Cuir décevant"
    },
    {
      rating: 1.5,
      content: "Le carnet est joli, mais le papier est de mauvaise qualité. L'encre traverse les pages et le carnet ne reste pas bien fermé.",
      title: "Papier de mauvaise qualité"
    },
    {
      rating: 1,
      content: "Le cuir est de mauvaise qualité et le papier est fin et fragile. Je ne recommande pas ce carnet.",
      title: "Mauvais cuir, mauvais papier"
    },
    {
      rating: 0.5,
      content: "Le carnet est arrivé avec des pages détachées et le cuir est de très mauvaise qualité. Très déçu par cet achat.",
      title: "Pages détachées, cuir de mauvaise qualité"
    },
    {
      rating: 5,
      content: "J'ai récemment acheté ce carnet artisanal en ligne et je ne pourrais pas être plus satisfait de mon achat ! La qualité du cuir est exceptionnelle et le soin apporté aux détails est impressionnant. Chaque page est faite de papier épais, parfait pour écrire ou dessiner sans que l'encre ne transperce. Le design est à la fois élégant et rustique, ce qui en fait un superbe ajout à ma collection de papeterie. J'apprécie particulièrement la fermeture en lanière de cuir qui ajoute une touche authentique et assure que le carnet reste bien fermé dans mon sac. C'est évident que beaucoup de passion et de talent ont été investis dans la fabrication de ce carnet. C'est bien plus qu'un simple objet utilitaire ; c'est une véritable œuvre d'art. Je recommande vivement ce produit à tous ceux qui cherchent un carnet à la fois pratique et esthétiquement plaisant. Je suis déjà en train de considérer l'achat d'un autre pour offrir en cadeau !",
      title: "Exceptionnel et magnifique"
    },
    {
      rating: 5,
      content: "Je suis absolument ravi de mon achat du carnet artisanal en cuir. Dès que je l'ai reçu, j'ai été impressionné par la qualité du matériau et la finesse de la fabrication. Le cuir est doux au toucher et a un parfum agréable, authentique, qui ajoute à l'expérience globale d'écriture. L'attention aux détails est évidente : les coutures sont solides, les pages sont bien alignées et le carnet se ferme parfaitement grâce à son élastique robuste. Les pages en papier épais sont idéales pour l'écriture à l'encre, sans aucune trace de bavure, ce qui est parfait pour quelqu'un comme moi qui utilise souvent des stylos-plumes. Un autre aspect que j'adore, c'est le design rustique mais élégant du carnet. Il se démarque vraiment des carnets industriels et ajoute une touche de sophistication à mon bureau. Il est suffisamment compact pour que je puisse l'emporter partout avec moi, mais assez grand pour permettre de longues sessions d'écriture ou de dessin. En résumé, ce carnet artisanal a surpassé toutes mes attentes. Il est non seulement un outil pratique pour mes besoins quotidiens, mais aussi un objet de beauté qui me rappelle l'importance de la qualité et de l'artisanat dans notre monde moderne. Je recommande vivement ce carnet à tous ceux qui cherchent un compagnon d'écriture durable et élégant.",
      title: "Une véritable œuvre d'art"
    },
    {
      rating: 5,
      content: "Je suis absolument ravi de ce carnet artisanal. Le cuir est d'une qualité exceptionnelle, très doux au toucher, et dégage un parfum agréable. Le papier est épais et supporte très bien l'encre de mes stylos plume sans aucune trace de saignement. J'adore le design rustique et la fermeture en lanière de cuir, ce qui ajoute une touche authentique et sophistiquée. C'est parfait pour mes notes personnelles et mes croquis. Je recommande vivement ce produit à tous les amateurs de belles papeteries.",
      title: "Carnet exceptionnel pour notes et croquis"
    },
    {
      rating: 4.5,
      content: "Ce carnet est vraiment magnifique et de très bonne qualité. Le cuir est souple et durable, tandis que le papier est parfait pour écrire ou dessiner. Cependant, j'ai trouvé la fermeture un peu délicate à manipuler au début, mais après quelques utilisations, elle fonctionne bien. C'est un petit bijou pour les amateurs de carnets, et je l'utilise tous les jours pour mes journaux et mes dessins. La livraison a été rapide et soignée, ce qui est un plus.",
      title: "Magnifique et de bonne qualité"
    },
    {
      rating: 4,
      content: "Un carnet très bien conçu avec un beau design. Le cuir est de bonne qualité et le papier est agréable pour écrire. J'ai cependant trouvé le prix un peu élevé par rapport à d'autres carnets similaires sur le marché. De plus, le carnet est légèrement plus lourd que prévu, ce qui peut être un inconvénient pour le transporter partout. Malgré cela, je suis très satisfait de mon achat et je le recommande à ceux qui cherchent un carnet de qualité supérieure.",
      title: "Beau design et bonne qualité"
    },
    {
      rating: 4,
      content: "Très joli carnet avec un cuir de qualité et un design rustique qui me plaît beaucoup. Le papier est parfait pour écrire avec des stylos à bille et des crayons. Cependant, j'ai remarqué que l'encre de mon stylo plume traverse un peu les pages, ce qui est un peu décevant. La taille du carnet est idéale pour le transporter dans mon sac, et la fermeture en lanière de cuir est un joli détail. Globalement, je suis satisfait de ce carnet, même si je dois faire attention à l'encre que j'utilise.",
      title: "Joli carnet avec quelques réserves"
    },
    {
      rating: 3.5,
      content: "Le carnet est très beau, avec un cuir de bonne qualité et un design soigné. Le papier est agréable pour écrire, mais j'ai eu quelques problèmes avec l'encre de mon stylo plume qui traverse légèrement. La fermeture en lanière de cuir est esthétique, mais pas très pratique. Le carnet est également un peu plus lourd que prévu. Malgré ces petits inconvénients, je trouve que c'est un bon produit pour ceux qui cherchent un carnet élégant et durable.",
      title: "Beau carnet mais quelques inconvénients"
    },
    {
      rating: 3,
      content: "Le carnet est joli et le cuir semble de bonne qualité, mais j'ai été déçu par le papier. Il est trop fin à mon goût et l'encre de mon stylo plume transperce facilement. De plus, la fermeture en lanière de cuir n'est pas très pratique. Le carnet est également un peu lourd pour être transporté partout. Je pense qu'il y a de meilleurs carnets disponibles à ce prix.",
      title: "Déçu par le papier"
    },
    {
      rating: 2.5,
      content: "Le carnet a un beau design et le cuir est de bonne qualité, mais le papier laisse vraiment à désirer. Il est trop fin et l'encre de mon stylo plume traverse les pages. De plus, la fermeture en lanière de cuir n'est pas très pratique et le carnet est assez lourd. Je suis déçu de cet achat et je ne le recommande pas pour ceux qui utilisent des stylos plume.",
      title: "Beau design mais papier médiocre"
    },
    {
      rating: 2,
      content: "Le cuir de ce carnet est de bonne qualité, mais le papier est vraiment décevant. Il est trop fin et ne supporte pas bien l'encre de mon stylo plume. De plus, la fermeture en lanière de cuir est difficile à manipuler. Le carnet est également assez lourd, ce qui le rend peu pratique à transporter. Je suis déçu de cet achat et je ne le recommande pas.",
      title: "Cuir de qualité mais papier décevant"
    },
    {
      rating: 1.5,
      content: "Le carnet est beau en apparence, mais le papier est de très mauvaise qualité. Il est trop fin et l'encre de mon stylo plume traverse les pages. De plus, le cuir a commencé à se déchirer après quelques semaines d'utilisation. La fermeture en lanière de cuir n'est pas pratique et le carnet est assez lourd. Je suis très déçu de cet achat et je ne le recommande pas.",
      title: "Beau mais de mauvaise qualité"
    },
    {
      rating: 1,
      content: "Très déçu par ce carnet. Le cuir est de mauvaise qualité et le papier est trop fin. L'encre de mon stylo traverse les pages et le cuir s'est déchiré après quelques semaines d'utilisation. La fermeture en lanière de cuir n'est pas pratique du tout. Je ne recommande pas ce produit.",
      title: "Mauvaise qualité"
    },
    {
      rating: 0.5,
      content: "Le carnet est arrivé endommagé, avec des pages détachées et le cuir de mauvaise qualité. Le papier est fin et l'encre traverse les pages. De plus, la fermeture en lanière de cuir n'est pas pratique et le carnet est lourd. Le service client n'a pas été utile du tout pour résoudre le problème. Très déçu de cet achat.",
      title: "Carnet endommagé et mauvaise qualité"
    }
  ];
}

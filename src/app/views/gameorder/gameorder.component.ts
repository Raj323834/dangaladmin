import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { IconSetService } from '@coreui/icons-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GamesOrderDataStore } from '../../../datastore/GamesOrderDataStore';
import { GameCategory } from '../../models/gameorder/GameCategory';
import { GameOrder } from '../../models/gameorder/GameOrder';
import { AppConstants } from '../../constant/AppConstants';
import { NgxSpinnerService } from 'ngx-spinner';
import { HelperService } from '../../services/HelperService';
import { UrlConstant } from '../../constant/UrlConstant';
import { Responses } from '../../constant/Responses';
import { ResponsesDescription } from '../../constant/ResponsesDescription';
import { GameOrderService } from '../../services/GameOrderService';

@Component({
  templateUrl: 'gameorder.component.html',
  styleUrls: ['gameorder.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class GameorderComponent implements OnInit {
  private formGroupNewGames: FormGroup;
  private formGroupCardGames: FormGroup;
  private formGroupCasualGames: FormGroup;

  // used in HTML file to populate games
  private allNewAndCasualGames: String[] = [];
  private allCardGames: String[] = [];
  private allNewGames: String[] = [];
  private allCasualGames: String[] = [];
  private allGames: String[] = [];

  private newGameOne: string = 'new_game_one';
  private newGameTwo: string = 'new_game_two';
  private newGameThree: string = 'new_game_three';
  private newGameFour: string = 'new_game_four';
  private newGameFive: string = 'new_game_five';
  private newGameSix: string = 'new_game_six';
  private newGameSeven: string = 'new_game_seven';

  private cardGameOne: string = 'card_game_one';
  private cardGameTwo: string = 'card_game_two';
  private cardGameThree: string = 'card_game_three';
  private cardGameFour: string = 'card_game_four';
  
  
  private casualGameOne: string = 'casual_game_one';
  private casualGameTwo: string = 'casual_game_two';
  private casualGameThree: string = 'casual_game_three';
  private casualGameFour: string = 'casual_game_four';
  private casualGameFive: string = 'casual_game_five';
  private casualGameSix: string = 'casual_game_six';
  private casualGameSeven: string = 'casual_game_seven';

  private gameOrderModule: string = 'game order';

  public access_permission_read: boolean = false;
  public access_permission_write: boolean = false;

  private emptyString: string = '""';

  constructor(
    private formBuilder: FormBuilder,
    public iconSet: IconSetService,
    private gameOrderService: GameOrderService, 
    private gameOrderDataStore: GamesOrderDataStore,
    private spinnerService: NgxSpinnerService
  ) { }


  ngOnInit(): void {

    const accessPermission=HelperService.getModulePermissions(this.gameOrderModule);
    this.access_permission_read=accessPermission[HelperService.READ];
    this.access_permission_write=accessPermission[HelperService.WRITE]; 
      this.initialiseFormGroupNewGames();
      this.initialiseFormGroupCardGames();
      this.initialiseFormGroupCasualGames();
      this.getAllGames();

}

  alert: string = ""
  showAlertModal = false;
  private showAlertBox(alert: string) {
    this.alert = alert;
    this.showAlertModal = true;
  }
  closeAlertModal = () => {
    this.showAlertModal = false;
    this.alert = "";
  }

  private initialiseFormGroupCasualGames() {
    this.formGroupCasualGames = this.formBuilder.group(
      {
        casual_game_one: [''],
        casual_game_two: [''],
        casual_game_three: [''],
        casual_game_four: [''],
        casual_game_five: [''],
        casual_game_six: [''],
        casual_game_seven: [''],
      }
    );
  }

  private initialiseFormGroupCardGames() {
    this.formGroupCardGames = this.formBuilder.group(
      {
        card_game_one: ['', [Validators.required]],
        card_game_two: ['', [Validators.required]],
        card_game_three: ['', [Validators.required]],
        card_game_four: ['', [Validators.required]]
      }
    );
  }

  private initialiseFormGroupNewGames() {
    this.formGroupNewGames = this.formBuilder.group({
      new_game_one: ['', [Validators.required]],
      new_game_two: ['', [Validators.required]],
      new_game_three: ['', [Validators.required]],
      new_game_four: ['', [Validators.required]],
      new_game_five: ['', [Validators.required]],
      new_game_six: ['', [Validators.required]],
      new_game_seven: ['', [Validators.required]]
    });
  }

  getAllGames() {
    this.spinnerService.show();
    this.gameOrderService.getIP().subscribe((response: any) => {
      let ipAddress: string = response.ip;
      let storageUserData = JSON.parse(sessionStorage.user);
      let userName: string = storageUserData.user_name;
      this.gameOrderService.getAllGames(UrlConstant.getAllGamesUrl, AppConstants.NO_URL_PARAM, AppConstants.NO_QUERY_PARAM, ipAddress, userName, '' + Date.now())
      .subscribe(responseData => {
        this.spinnerService.hide();
        if (responseData.result === Responses.SUCCESS) {
          this.gameOrderDataStore.categorizeGames(responseData.games.gameCategories);
          this.allNewAndCasualGames = this.gameOrderDataStore.getNewAndCasualGames;
          this.allCardGames = this.gameOrderDataStore.getCardGames;
          this.allNewGames = this.gameOrderDataStore.getNewGames;
          this.allCasualGames = this.gameOrderDataStore.getCasualGames;
          this.setDefaultValueForNewGames(this.allNewGames);
          this.setDefaultValueForCardGames(this.allCardGames);
          this.setDefaultValueForCasualGames(this.allCasualGames);

        } else if (responseData.result === Responses.DB_ERROR) {
          this.showAlertBox(ResponsesDescription.DB_ERROR);
        }
      },
        error => {
          this.spinnerService.hide();
          if (error === 'OK') {
            this.closeAlertModal();
            this.showAlertBox("BAD REQUEST");
          } else if (error === Responses.DB_ERROR) {
            this.closeAlertModal();
            this.showAlertBox(ResponsesDescription.DB_ERROR);
          } else {
            this.closeAlertModal();
          }
        });
    });
  }

  private setDefaultValueForNewGames(newGames: String[]) {
    let i: number;
    for (i = 0; i < newGames.length; i++) {
      {
        switch (i) {
          case 0:
            this.formGroupNewGames.get(this.newGameOne).setValue(newGames[i]);
            break;
          case 1:
            this.formGroupNewGames.get(this.newGameTwo).setValue(newGames[i]);
            break;
          case 2:
            this.formGroupNewGames.get(this.newGameThree).setValue(newGames[i]);
            break;
          case 3:
            this.formGroupNewGames.get(this.newGameFour).setValue(newGames[i]);
            break;
          case 4:
            this.formGroupNewGames.get(this.newGameFive).setValue(newGames[i]);
            break;
          case 5:
            this.formGroupNewGames.get(this.newGameSix).setValue(newGames[i]);
            break;
          case 6:
            this.formGroupNewGames.get(this.newGameSeven).setValue(newGames[i]);
            break;
          default:
            console.log("No such index exists!");
            break;
        }
      }
    }
  }

  private setDefaultValueForCardGames(cardGames: String[]) {
    let i: number;
    for (i = 0; i < cardGames.length; i++) {
      {
        switch (i) {
          case 0:
            this.formGroupCardGames.get(this.cardGameOne).setValue(cardGames[i]);
            break;
          case 1:
            this.formGroupCardGames.get(this.cardGameTwo).setValue(cardGames[i]);
            break;
          case 2:
            this.formGroupCardGames.get(this.cardGameThree).setValue(cardGames[i]);
            break;
          case 3:
            this.formGroupCardGames.get(this.cardGameFour).setValue(cardGames[i]);
            break;
          default:
            console.log("No such index exists!");
            break;
        }
      }
    }
  }

  private setDefaultValueForCasualGames(casualGames: String[]) {
    let i: number;
    for (i = 0; i < casualGames.length; i++) {
      {
        switch (i) {
          case 0:
            this.formGroupCasualGames.get(this.casualGameOne).setValue(casualGames[i]);
            break;
          case 1:
            this.formGroupCasualGames.get(this.casualGameTwo).setValue(casualGames[i]);
            break;
          case 2:
            this.formGroupCasualGames.get(this.casualGameThree).setValue(casualGames[i]);
            break;
          case 3:
            this.formGroupCasualGames.get(this.casualGameFour).setValue(casualGames[i]);
            break;
          case 4:
            this.formGroupCasualGames.get(this.casualGameFive).setValue(casualGames[i]);
            break;
          case 5:
            this.formGroupCasualGames.get(this.casualGameSix).setValue(casualGames[i]);
            break;
          case 6:
            this.formGroupCasualGames.get(this.casualGameSeven).setValue(casualGames[i]);
            break;
          default:
            console.log("No such index exists!");
            break;
        }
      }
    }
  }

  submitGames() {

    if (this.access_permission_write) {
      this.clearGamesData();

      // validate New Games Section

      this.validateNewGameValue(this.newGameOne);
      this.validateNewGameValue(this.newGameTwo);
      this.validateNewGameValue(this.newGameThree);
      this.validateNewGameValue(this.newGameFour);
      this.validateNewGameValue(this.newGameFive);
      this.validateNewGameValue(this.newGameSix);
      this.validateNewGameValue(this.newGameSeven);

      // validate Card Games Section

      this.validateCardGameValue(this.cardGameOne);
      this.validateCardGameValue(this.cardGameTwo);
      this.validateCardGameValue(this.cardGameThree);
      this.validateCardGameValue(this.cardGameFour);

      // validate Casual Games Section

      this.validateCasualGameValue(this.casualGameOne);
      this.validateCasualGameValue(this.casualGameTwo);
      this.validateCasualGameValue(this.casualGameThree);
      this.validateCasualGameValue(this.casualGameFour);
      this.validateCasualGameValue(this.casualGameFive);
      this.validateCasualGameValue(this.casualGameSix);
      this.validateCasualGameValue(this.casualGameSeven);

      if (!this.areDistinct(this.allGames)) {
        this.showAlertBox("Please Check..!!! \n \n You cannot display single game at two places");
      } else {

        let newGamesCategory = new GameCategory();
        newGamesCategory.name = AppConstants.NEW_GAMES_CATEGORY;
        newGamesCategory.games = this.allNewGames;

        let cardGamesCategory = new GameCategory();
        cardGamesCategory.name = AppConstants.CARD_GAMES_CATEGORY;
        cardGamesCategory.games = this.allCardGames;

        let casualGamesCategory = new GameCategory();
        casualGamesCategory.name = AppConstants.CASUAL_GAMES_CATEGORY;
        casualGamesCategory.games = this.allCasualGames;

        let gameOrder = new GameOrder;
        gameOrder.gameCategories.push(newGamesCategory, cardGamesCategory, casualGamesCategory);

        this.gameOrderService.getIP().subscribe((response: any) => {
          let ipAddress: string = response.ip;
          let storageUserData = JSON.parse(sessionStorage.user);
          let userName: string = storageUserData.user_name;
          this.gameOrderService.saveGameOrder(UrlConstant.saveGameOrderUrl, AppConstants.NO_URL_PARAM, gameOrder, userName, ipAddress, '' + Date.now())
            .subscribe(responseData => {
              console.log(responseData)
              if (responseData['result'] == 'INVALID REQUEST') {
                this.closeAlertModal();
                this.showAlertBox("Invalid Request");
              } else if (responseData['result'] == Responses.SUCCESS) {
                this.closeAlertModal();
                this.showAlertBox("Game Order updated Successfully");
                this.getAllGames();
              } else if (responseData['result'] == Responses.DB_ERROR) {
                this.closeAlertModal();
                this.showAlertBox(ResponsesDescription.DB_ERROR);
              }
            });
        });
      }
    } else {
      this.closeAlertModal();
      this.showAlertBox("You dont have the permission to update the game order");
    }
 
  }
  private validateNewGameValue(controlName: string) {
    if ((this.formGroupNewGames.get(controlName).value != undefined) && (this.formGroupNewGames.get(controlName).value !== this.emptyString)) {
      this.allNewGames.push(this.formGroupNewGames.get(controlName).value);
      this.allGames.push(this.formGroupNewGames.get(controlName).value);
    }
  }

  private validateCardGameValue(controlName: string) {
    if ((this.formGroupCardGames.get(controlName).value != undefined) && (this.formGroupCardGames.get(controlName).value !== this.emptyString)) {
      this.allCardGames.push(this.formGroupCardGames.get(controlName).value);
      this.allGames.push(this.formGroupCardGames.get(controlName).value);
    }
  }

  private validateCasualGameValue(controlName: string) {
    if ((this.formGroupCasualGames.get(controlName).value != undefined) && (this.formGroupCasualGames.get(controlName).value !== this.emptyString)) {
      this.allCasualGames.push(this.formGroupCasualGames.get(controlName).value);
      this.allGames.push(this.formGroupCasualGames.get(controlName).value);
    }
  }

  private areDistinct(allGamesData: String[]) {
    let allGamesLength = allGamesData.length;
    // Put all array elements in a Set
    let s = new Set();
    for (let i = 0; i < allGamesLength; i++) {
      s.add(allGamesData[i]);
    }
    return (s.size == allGamesLength);
  }

  private clearGamesData() {
    this.allNewGames = [];
    this.allCardGames = [];
    this.allCasualGames = [];
    this.allGames = [];
  }
}
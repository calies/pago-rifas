import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSortModule} from '@angular/material/sort';

import { AppRoutingModule } from './app-routing.module';

import { NgxEditorModule } from 'ngx-editor';

import { AngularFontAwesomeModule } from 'angular-font-awesome';

//Components
/* GENERAL */
import { AppComponent } from './app.component';
import { LoginComponent }		from './components/login.component';
import { DefaultComponent }		from './components/default.component';
import { DashboardComponent } from './components/dashboard.component';
/* ITINERARIOS */
import { ItinerariosComponent } from './components/itinerario/itinerario-list.component';
/* RIFAS */
import { RifasComponent } from './components/rifa/rifa-list.component';
import { PagoOnlineComponent } from './components/rifa/pago-online.component';

//Services
import { AuthGuard } from './auth-guard.service';
import { AuthService } from './auth.service';
import { UserService } from './services/user.service';
import { ActionsService } from './services/actions.service';
import { ItinerarioService } from './services/itinerario.service';
import { UploadService } from './services/upload.service';
import { PasajeroService } from './services/pasajero.service';
import { RifaService } from './services/rifa.service';
import { GeoPayService } from './services/geopay.service';

//Material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { 
  MatButtonModule, 
  MatCheckboxModule, 
  MatMenuModule, 
  MatIconModule, 
  MatInputModule, 
  MatSelectModule, 
  MatDialogModule, 
  MatSnackBarModule, 
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatTooltipModule,
  MatToolbarModule,
  MatSidenavModule,
  MatAutocompleteModule,
  MatRadioModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatGridListModule,
  MatPaginatorModule,
  MatFormFieldModule,
  MatStepperModule,
  MatSlideToggleModule,
  MatListModule,
  MatDividerModule,
  MatExpansionModule,
  MatCardModule,
  MatBottomSheetModule,
  // MatBottomSheet, 
  // MatBottomSheetRef,
  MatTabsModule,
  MatTreeModule
} from '@angular/material';

import { DragDropModule } from '@angular/cdk/drag-drop';

// import { MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DefaultComponent,
  	ItinerariosComponent,
    DashboardComponent,
    RifasComponent,
    PagoOnlineComponent
  ],
  imports: [
   AngularFontAwesomeModule,
    NgxEditorModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule, //MATERIAL
    BrowserAnimationsModule,
    MatCheckboxModule, 
    MatMenuModule, 
    MatIconModule, 
    MatInputModule, 
    MatSelectModule, 
    MatDialogModule, 
    MatSnackBarModule, 
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatToolbarModule,
    MatSidenavModule,
    MatAutocompleteModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatGridListModule,
    MatSortModule,
    MatFormFieldModule,
    MatStepperModule,
    MatSlideToggleModule,
    MatExpansionModule,
    MatListModule,
    MatDividerModule,
    MatCardModule,
    MatTabsModule,
    MatTreeModule,
    MatBottomSheetModule,
    DragDropModule,
    // MatBottomSheet, 
    // MatBottomSheetRef,
    MatPaginatorModule //END MATERIAL
  ],
  providers: [
  	AuthGuard,
  	AuthService,
  	ActionsService,
  	ItinerarioService,
  	UserService,
  	UploadService,
    PasajeroService,
    RifaService,
    GeoPayService
  ],
  entryComponents: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

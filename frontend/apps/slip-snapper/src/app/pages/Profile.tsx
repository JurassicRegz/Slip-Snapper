import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonItem,
  IonCol,
  IonRow,
  IonAlert,
  IonImg,
  IonThumbnail,
  IonInput,
  IonProgressBar,
  IonTextarea,
  IonList,
  IonLabel,
} from '@ionic/react';
import React, { useState } from 'react';
import { NavButtons } from '../components/NavButtons';
import '../theme/profile.css';
import { setBudgetA, getBudgetA, getStatsA } from "../../api/apiCall"

const favourite = { store: "N/A", total: 0 }
const mostSpentCategory = { itemCategory: "N/A", total: 0 }
const mostSpentStore = { store: "N/A", total: 0 }
const weekMonthSpent = { lastWeek: 0, thisWeek: 0, lastMonth: 0, thisMonth: 0}

const Profile: React.FC = () => {
  const [logoutAlert, setLogoutAlert] = useState(false);
  const [budgetAlert, setBudgetAlert] = useState(false);
  const val = { weekly: 0, monthly: 0 }; 
   
  let totalWeeklySpent = 300;
  let totalMonthlySpent = 500;
  getBudgetA(1)
    .then((res) => res.json())
    .then(
      (json) => {
        val.weekly = json.weekly;
        val.monthly = json.monthly;
        totalWeeklySpent = json.weeklyTotal;
        totalMonthlySpent = json.monthlyTotal;
    })

  getStatsA(1)
    .then((res) => res.json())
    .then(
      (json) => {
        mostSpentCategory.itemCategory= json.category.name;
        mostSpentCategory.total=json.category.amount;
        mostSpentStore.store = json.mostExpensive.name;
        mostSpentStore.total = json.mostExpensive.amount;
        weekMonthSpent.lastWeek=json.lastWeek.previous;
        weekMonthSpent.thisWeek = json.lastWeek.current;
        weekMonthSpent.lastMonth = json.lastMonth.previous;
        weekMonthSpent.thisMonth = json.lastMonth.current;
        favourite.store = json.favouriteStore.name;
        favourite.total = json.favouriteStore.total;
         
        setUserStatistics()
       
    })

  const [weelkyBudgetValue, setWeeklyBudget] = useState<string>("Weekly Budget: R " + val.weekly);
  const [monthlyBudgetValue, setMonthlyBudget] = useState<string>("Monthly Budget: R " + val.monthly);
  let weeklyBudget: number, monthlyBudget: number
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Profile</IonTitle>
          <IonButtons slot="end">
            <NavButtons />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonRow>
          <IonCol>
            <IonCard color="primary">
              <IonCardHeader>
                <IonCardTitle>User details</IonCardTitle>
                <IonCardSubtitle>Name: Christian Devraj </IonCardSubtitle>
                <IonCardSubtitle>
                  My Business: Isabella's Decor and Gifts
                </IonCardSubtitle>
                <IonCardSubtitle>
                  <IonItem class="profilePhoto">
                    <IonThumbnail slot="start">
                      <IonImg src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" />
                    </IonThumbnail>
                  </IonItem>
                </IonCardSubtitle>
              </IonCardHeader>
            </IonCard>
          </IonCol>

          <IonCol>
            <IonCard color="primary">
              <IonCardHeader>
                <IonCardTitle>Personal Budget</IonCardTitle>
              </IonCardHeader>
              <IonItem >
                <IonInput readonly value={weelkyBudgetValue}></IonInput>
                <IonProgressBar id='weeklyProgressBar' class='progressBar' ></IonProgressBar><br />
              </IonItem>
              <IonItem >
                <IonInput readonly value={monthlyBudgetValue}></IonInput>
                <IonProgressBar id='monthlyProgressBar' class='progressBar' ></IonProgressBar><br />
              </IonItem>
              <IonItem>
                <IonButton title="adjustBudgetButton" onClick={() => setBudgetAlert(true)} fill="outline" slot="end" color="secondary">
                  Adjust Budget
                </IonButton>
                 <IonAlert
          isOpen={budgetAlert}
          onDidDismiss={() => setBudgetAlert(false)}
         
          header={'Change Budget'}
          inputs={[
            {
              name: 'weeklyBudget',
              type: 'text',
              placeholder: 'Insert Weekly Budget'
              
            },
            {
              id: "monthlyBudget",
              name: 'monthlyBudget',
              type: 'text',
              placeholder: 'Insert Monthly Budget'
            },]}

          buttons={[
          {
            text:'Cancel'
          },
          {
            role:'applyBudget',
            text:'Apply',
            handler: (alertData) => {
              applyToBudget(alertData.weeklyBudget,alertData.monthlyBudget);
              isExceeded()
             }
          }
          ]}
        ></IonAlert>
              </IonItem>
            </IonCard>
          </IonCol>
        </IonRow>
        <IonCard color="primary">
          <IonCardHeader>
            <IonCardTitle>
              Favorite Store (Most frequent this month)
            </IonCardTitle>
            <IonCardSubtitle><IonTextarea id='favoriteStore' readonly ></IonTextarea></IonCardSubtitle>
            <IonCardSubtitle><IonTextarea id='favoriteTotal' readonly ></IonTextarea></IonCardSubtitle>
          </IonCardHeader>

          <IonList>
            <IonItem>
              <IonLabel>...</IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>20 May 2022: R110.99</IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>22 May 2022: R99.49</IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>23 May 2022: R139.49</IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>28 May 2022: R350.99</IonLabel>
            </IonItem>
          </IonList>
          <IonItem>
            <IonButton fill="outline" slot="end" color="secondary">
              View
            </IonButton>
          </IonItem>
        </IonCard>

        <IonRow>
          <IonCol>
            <IonCard  color="primary">
              <IonCardHeader>
                <IonCardTitle>Most purchased item category</IonCardTitle>
                <IonTextarea id='categoryName' readonly ></IonTextarea>
                <IonTextarea id='categoryTotal' readonly></IonTextarea>
              </IonCardHeader>
            </IonCard>
          </IonCol>
          <IonCol>
            <IonCard color="primary">
              <IonCardHeader>
                <IonCardTitle>Most spent at a store</IonCardTitle>
                <IonCardSubtitle> <IonTextarea id='storeName' readonly ></IonTextarea></IonCardSubtitle>
                <IonCardSubtitle> <IonTextarea id='storeTotal' readonly ></IonTextarea></IonCardSubtitle>
              </IonCardHeader>
            </IonCard>
          </IonCol>
        </IonRow>

        <IonRow>
          <IonCol>
            <IonCard color="primary">
              <IonCardHeader>
                <IonCardTitle>Expenditure compared to last week</IonCardTitle>
                <IonCardSubtitle> <IonTextarea id='lastWeek' readonly ></IonTextarea></IonCardSubtitle>
                <IonCardSubtitle> <IonTextarea id='thisWeek' readonly ></IonTextarea></IonCardSubtitle>
              </IonCardHeader>
              <IonItem>
                <IonButton fill="outline" slot="end" color="secondary">
                  Compare Reports
                </IonButton>
              </IonItem>
            </IonCard>
          </IonCol>

          <IonCol>
            <IonCard color="primary">
              <IonCardHeader>
                <IonCardTitle>Expenditure compared to last month</IonCardTitle>
                <IonCardSubtitle><IonTextarea id='lastMonth' readonly ></IonTextarea></IonCardSubtitle>
                <IonCardSubtitle><IonTextarea id='thisMonth' readonly ></IonTextarea></IonCardSubtitle>
              </IonCardHeader>
              <IonItem>
                <IonButton fill="outline" slot="end" color="secondary">
                  Compare Reports
                </IonButton>
              </IonItem>
            </IonCard>
          </IonCol>
        </IonRow>
        <IonButton onClick={() => setLogoutAlert(true)} expand="block">
          Logout
        </IonButton>
        <IonAlert
          isOpen={logoutAlert}
          onDidDismiss={() => setLogoutAlert(false)}
          header={'Are you sure you want to logout?'}
          buttons={[
            'Cancel',
            {
              text: 'Logout',
              cssClass: 'my-custom-class',
                handler: () => {
                 Logout();
          }
            },
          ]}
        ></IonAlert>
      </IonContent>
    </IonPage>
  );
  function Logout() {
    throw new Error('Function not implemented.');
  }

  function applyToBudget(newWeeklyBudget: string, newMonthlyBudget: string) {
     weeklyBudget= parseFloat(newWeeklyBudget)
     monthlyBudget = parseFloat(newMonthlyBudget)
    if(!isNaN(weeklyBudget)){
      setWeeklyBudget("Weekly Budget: R "+weeklyBudget.toString())
    }
    if(!isNaN(monthlyBudget)){
      setMonthlyBudget("Monthly Budget: R "+monthlyBudget.toString())
    }
    
    setBudgetA( 1, weeklyBudget, monthlyBudget )
  }

  function isExceeded() {
    const withinWeeklyBudget = totalWeeklySpent / weeklyBudget
    const withinMonthlyBudget = totalMonthlySpent / monthlyBudget
    

    if (totalWeeklySpent >= weeklyBudget && !isNaN(weeklyBudget))
    {
      document.getElementById("weeklyProgressBar")?.setAttribute("color","danger")
    } 
    else if (totalWeeklySpent >= weeklyBudget / 2 && !isNaN(weeklyBudget))
    {
      document.getElementById("weeklyProgressBar")?.setAttribute("color", "warning")
    }
    else if(!isNaN(weeklyBudget)){
      document.getElementById("weeklyProgressBar")?.setAttribute("color", "primary")
    }

    if (totalMonthlySpent >= monthlyBudget && !isNaN(monthlyBudget)) {
      document.getElementById("monthlyProgressBar")?.setAttribute("color", "danger")
    }
    else if (totalMonthlySpent >= monthlyBudget / 2&&!isNaN(monthlyBudget)) {
      document.getElementById("monthlyProgressBar")?.setAttribute("color", "warning")
    }
    else if (!isNaN(monthlyBudget)) {
      document.getElementById("monthlyProgressBar")?.setAttribute("color", "primary")
    }

    document.getElementById("weeklyProgressBar")?.setAttribute("value", withinWeeklyBudget.toString())
    document.getElementById("monthlyProgressBar")?.setAttribute("value", withinMonthlyBudget.toString())

    if(weeklyBudget===0)
    {
      document.getElementById("weeklyProgressBar")?.setAttribute("value", "0")
      document.getElementById("weeklyProgressBar")?.setAttribute("color", "primary")
    }

    if (monthlyBudget === 0) {
      document.getElementById("monthlyProgressBar")?.setAttribute("value", "0")
      document.getElementById("monthlyProgressBar")?.setAttribute("color", "primary")
    }

  }

  function setUserStatistics()
  {
    document.getElementById("favoriteStore")?.setAttribute("value", "Store Name: " + favourite.store)
    document.getElementById("favoriteTotal")?.setAttribute("value", "Total: R" + favourite.total.toString())
    document.getElementById("categoryName")?.setAttribute("value", "Item Category: " + mostSpentCategory.itemCategory)
    document.getElementById("categoryTotal")?.setAttribute("value", "Total: R" + mostSpentCategory.total.toString())
    document.getElementById("storeName")?.setAttribute("value", "Store Name: " + mostSpentStore.store)
    document.getElementById("storeTotal")?.setAttribute("value", "Total: R" + mostSpentStore.total.toString())
    document.getElementById("lastWeek")?.setAttribute("value", "Total Spent Last Week: R" + weekMonthSpent.lastWeek.toString())
    document.getElementById("thisWeek")?.setAttribute("value", "Total Spent This Week: R" + weekMonthSpent.thisWeek.toString())
    document.getElementById("lastMonth")?.setAttribute("value", "Total Spent Last Month: R" + weekMonthSpent.lastMonth.toString())
    document.getElementById("thisMonth")?.setAttribute("value", "Total Spent This Month: R" + weekMonthSpent.thisMonth.toString())
  }
};

export default Profile;
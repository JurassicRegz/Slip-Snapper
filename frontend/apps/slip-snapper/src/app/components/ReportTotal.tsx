import {
    IonButton,
    IonCard,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonCol,
    IonItem
} from "@ionic/react";
import { generateReportA } from "../../api/apiCall"
import '../theme/reportTotal.css'

type Props = {
    reportData : string[]
}
function ReportTotal({ reportData }: Props) {
    return (
        <IonCol className='item-col'>
            <IonCard color="primary">
                <IonCardHeader>
                    <IonCardTitle>{reportData[0]}</IonCardTitle>
                    <IonCardSubtitle>{reportData[1]}</IonCardSubtitle>
                </IonCardHeader>
                <IonItem color="tertiary">
                    <IonButton
                        fill="solid"
                        title= {reportData[2]}
                        slot="end"
                        color="secondary"
                        onClick={() => {generateReport(reportData[3])}}
                    >
                        Generate Report
                    </IonButton>
                </IonItem>
            </IonCard>
        </IonCol>
    );
}
export default ReportTotal;

function generateReport(period: string) {
    const user = JSON.parse(localStorage.getItem('user')!)
    
    generateReportA(user.username, user.id ,period)
        .then(apiResponse => apiResponse.data);
}

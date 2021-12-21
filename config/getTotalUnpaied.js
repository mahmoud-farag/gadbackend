

const getTotalUnpaied = (patients)=>{
    let totalUnpaied=0;
    patients.forEach((patient)=>{
        totalUnpaied += patient.unPaiedSessions * patient.sessionPrice
        // console.log(totalUnpaied);
     })
     return totalUnpaied ;
}
export {getTotalUnpaied} 
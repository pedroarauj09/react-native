
export function convertHmin(hoursString:string){
    const [hours,minutes] = hoursString.split(':').map(Number);
    const min = (hours * 60) + minutes;
    return min;
}
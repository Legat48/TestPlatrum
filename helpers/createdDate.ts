export default function createdDate (date : string) : string {
  const currDate : Date = new Date(date)
  let day : string | number = currDate.getDate()
  let month : string | number = currDate.getMonth() + 1
  if (day < 10) {
    day = '0' + day
  }
  if (month < 10) {
    month = '0' + month
  }
  const year : string | number = currDate.getFullYear()
  return day + '.' + month + '.' + year
}

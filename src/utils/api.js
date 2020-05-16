import word_extractor from 'keyword-extractor'
import symptoms from './symptoms'

export const getLikeSymptoms = (searchValue) => {
  // let searchRegex = searchValue.map((word) => {
  //   return new RegExp(`/\b${word}/\b`, 'gi')
  // })
  // console.log('searchRegex', searchRegex)
  // let words = word_extractor.extract(searchValue, {
  //   language:"english",
  //   remove_digits: true,
  //   return_changed_case:true,
  //   remove_duplicates: true
  // })
  let suggestions = symptoms.filter((symptom) => {
    let results = searchValue.map((word) => {
      let common_name = symptom.common_name.toLowerCase()
      let found = common_name.includes(word)
      return found
    })
    return results.includes(true)
  })

  return suggestions
}
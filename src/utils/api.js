import word_extractor from 'keyword-extractor'
import symptoms from './symptoms'

export const getLikeSymptoms = (searchValue) => {
  let searchRegex = searchValue.map((word) => {
    let regex = `\\b${word}\\b`
    return new RegExp(regex, 'i')
  })
  // console.log('searchRegex', searchRegex)
  // let words = word_extractor.extract(searchValue, {
  //   language:"english",
  //   remove_digits: true,
  //   return_changed_case:true,
  //   remove_duplicates: true
  // })
  let suggestions = symptoms.filter((symptom) => {
    let res = searchRegex.map((r) => {
      let common_name = symptom.common_name.toLowerCase()
      return r.test(common_name)
    })
    // console.log('res', res)
    // let results = searchValue.map((word) => {
    //   let common_name = symptom.common_name.toLowerCase()
    //   let found = common_name.includes(word)
    //   return found
    // })
    return res.includes(true)
  })

  return suggestions
}
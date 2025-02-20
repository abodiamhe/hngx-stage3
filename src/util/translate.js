export default async function translate(selectLanguage, obj) {
  // Create a translator that translates from English to French.
  const translator = await self.ai.translator.create({
    sourceLanguage: obj.lang,
    targetLanguage: selectLanguage,
  });
  


  return await translator.translate(obj.text);
  // console.log(translated)
  // return translate;
}

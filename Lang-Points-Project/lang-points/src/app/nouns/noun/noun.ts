export class Noun {

  singular: string = ''; 
  plural: string = ''; 
  singularFullForm: string = ''; 
  pluralFullForm: string = ''; 
  transliteration: string = '';
  gender: string = ''; 
  animate: string = ''; 
  declination_type: string = '';
  translations: string[] = [];
  translations_str:string = '';
  examples: {text:string, translation:string}[] = [];
}
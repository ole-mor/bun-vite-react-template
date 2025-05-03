// src/data/candyData.ts

export interface CandyItem {
    name: string;
    description: string;
    ingredients: string;
    imageUrl: string;
    modelUrl: string;
  }
  
  const candyItems: CandyItem[] = [
    {
        "name": "Krokodiller",
        "description": "Skum og gelé med solbær- og jordbærsmak",
        "ingredients": "Glukose-fruktosesirup, sukker, gelatin, vann, syre (sitronsyre), aromaer, vegetabilsk olje (kokos), farging mat (konsentrat av reddik og saflor), fargestoff (E153)",
        "imageUrl": "/images/Krokodiller.png",
        "modelUrl": "/models/Krokodiller_model.glb"
    },
    {
        "name": "Nidar hobby",
        "description": "Melkesjokolade fylt med gele og skum",
        "ingredients": "Sukker, glykosesirup, vann, fuktighetsbevarende middel (sorbitol), tørrmelk, kakaosmør*, kakaomasse*, invertsukkersirup, gelatin, geleringsmiddel (agar), syrer (sitronsyre, melkesyre), emulgatorer (soyalecitin, E471), fargestoffer (E100, E120), salt og aromaer. Kan inneholde spor av hasselnøtter. *Rainforest Alliance-sertifisert. Les mer på ra.org Melkesjokoladen inneholder: Kakaotørrstoff minst 30%. Melketørrstoff minst 20%",
        "imageUrl": "/images/Nidar_hobby.png",
        "modelUrl": "/models/Nidar_hobby_model.glb"
    },
    {
        "name": "Bringebær lakrisskaller",
        "description": "Vingummi med smak av bringebær og lakris",
        "ingredients": "glukose-fruktosesirup, sukker, maisstivelse, vann, ammoniumklorid, lakris, surhetsregulerende middel (eplesyre, natriumsitrat), aromaer, fargestoffer (svart gulrot konsentrat, E153, E100), salt, kokosolje, overflatebehandlingsmiddel (karnaubavoks.)",
        "imageUrl": "/images/Bringebaer_lakrisskaller.png",
        "modelUrl": "/models/Bringebaer_lakrisskaller_model.glb"
    },
    {
        "name": "Nidar sjokoladefamilien",
        "description": "Porøs melkesjokolade",
        "ingredients": "Sukker, tørrmelk, kakaomasse*, emulgator (soyacitin), salt og aroma. Kan inneholde spor av hasselnøtter, mandler og gluten. *Rainforest Alliance-sertifisert. Les mer på ra.org Melkesjokoladen inneholder: Kakaotørrstoff minst 30%. Melketørrstoff minst 20%",
        "imageUrl": "/images/Nidar_sjokoladefamilien.png",
        "modelUrl": "/models/Nidar_sjokoladefamilien_model.glb"
    },
    {
        "name": "Sure kirsebær",
        "description": "Sur vingummi med kirsebærsmak",
        "ingredients": "Sukker, glykosesirup, hvetestivelse, vann, modifisert maisstivelse, syrer (E270, E296, sitronsyre, E350), modifisert potetstivelse, surhetsregulerende middel (E500), aroma, konsentrat (spirulina, salfor), konsentrat av juice fra svart gulrot",
        "imageUrl": "/images/Sure_kirsebaer.png",
        "modelUrl": "/models/Sure_kirsebaer_model.glb"
    },
    {
        "name": "Fizzy soda pops",
        "description": "Sur vingummi med fruktsmak",
        "ingredients": "Sukker, glykosesirup, modifisert mais- og potetstivelse, gelatin, syrer (eplesyre, sitronsyre, melkesyre), overflatebehandlingsmiddel (karnaubavoks), aroma, fargestoff (E133)",
        "imageUrl": "/images/Fizzy_soda_pops.png",
        "modelUrl": "/models/Fizzy_soda_pops_model.glb"
    },
    {
        "name": "Skumfisk",
        "description": "Skum med fruktsmak",
        "ingredients": "Sukker, glykosesirup, vann, gelatin, stivelse, syrer (eplesyre, sitronsyre), surhetsregulerende middel (E350), naturlig aroma, konsentrat fra (salfor, gulrot, solbær, spirulina, sitron), fargestoff (paprikaekstrakt)",
        "imageUrl": "/images/Skumfisk.png",
        "modelUrl": "/models/Skumfisk_model.glb"
    },
    {
        "name": "Banana bubs",
        "description": "Skum med banan- og karamellsmak",
        "ingredients": "Glukose-fruktosesirup, sukker, maisstivelse, vann, surhetsregulerende middel (eplesyre, natriumsitrat), potetprotein, aromaer, fargestoffer (E150d, E100), kokosolje, overflatebehandlingsmiddel (karnabavoks)",
        "imageUrl": "/images/Banana_bubs.png",
        "modelUrl": "/models/Banana_bubs_model.glb"
    },
    {
        "name": "Søte jordbær",
        "description": "Sukret vingummi med jordbærsmak",
        "ingredients": "Sukker, glykosesirup, stivelse, syre (sitronsyre), surhetsregulerende middel (natriumsitrat), aromaer, konsentrat fra (solbær, gulrot, spirulina, saflor)",
        "imageUrl": "/images/Soete_jordbaer.png",
        "modelUrl": "/models/Soete_jordbaer_model.glb"
    },
    {
        "name": "Sunset",
        "description": "Vingummi med lakris- og fruktsmak",
        "ingredients": "glykosesirup, sukker, modifisert stivelse, syrer (E296, E350, E270, sitronsyre), lakrisekstrakt, melasse, ammoniumklorid, fargestoff (E153), naturlig aroma, konsentrat (svart gulrot)",
        "imageUrl": "/images/Sunset.png",
        "modelUrl": "/models/Sunset_model.glb"
    },
    {
        "name": "Sjokoladelinser",
        "description": "Sukkerdragerte sjokoladelinser",
        "ingredients": "Sukker, kakaosmør, helmelkspulver, kakaomasse, mysepulver (melk), risstivelse, fortykningsmiddel (gummi arabicum), emulgator (solsikkelecitin), glykosesirup, overflatebehandlingsmiddel (karnaubavoks, bivoks, skjellakk), konsentrat fra (saflor, alger), salt, fargestoffer (kurkumin, karminsyre, anthocyaniner), surhetsregulerende middel (sitronsyre)",
        "imageUrl": "/images/Sjokoladelinser.png",
        "modelUrl": "/models/Sjokoladelinser_model.glb"
    },
    {
        "name": "Diamantringer",
        "description": "Sur géle med fruktsmak",
        "ingredients": "Sukker, glykosesirup, stivelse, syre (sitronsyre, eplesyre), surhetsregulerende middel (natrium malat, natriumsitrat), naturlig aroma, konsentrat (spirulina, gulrot, solbær), karamelisert sukker, fargestoff (paprika)",
        "imageUrl": "/images/Diamantringer.png",
        "modelUrl": "/models/Diamantringer_model.glb"
    },
    {
        "name": "Vanilje fudge",
        "description": "Fudge med vaniljesmak",
        "ingredients": "Sukker, glykosesirup, fullherdet kokosfett, skummet melkepulver, salt, emulgator (licetin (soya)), naturlig aroma (Karamell), vaniljeektrakt, vann, Kan inneholde egg, nøtter og peanutter",
        "imageUrl": "/images/Vanilje_fudge.png",
        "modelUrl": "/models/Vanilje_fudge_model.glb"
    },
    {
        "name": "Colaflasker",
        "description": "Vingummi med colasmak",
        "ingredients": "Glukosesirup, sukker, vann, gelatin, syre (sitronsyre), aromaer, karamellisert sukker, vegetabilske oljer (kokos, raps), overflatebehandlingsmiddel (karnaubavoks)",
        "imageUrl": "/images/Colaflasker.png",
        "modelUrl": "/models/Colaflasker_model.glb"
    },
    {
        "name": "Jordbær bonbon",
        "description": "Myk jordbærkaramell dekket med melis",
        "ingredients": "Sukker, glykosesirup, fullherdet kokosfett, maltodekstrin, syre (sitronsyre), naturlig aroma, konsentrat (eple, sitron, jordbær, appelsinolje, ananas, fersken), emulgator (E473), fargestoff (E120). Kan inneholde spor av melk, nøtter og peanutter",
        "imageUrl": "/images/Jordbaer_bonbon.png",
        "modelUrl": "/models/Jordbaer_bonbon_model.glb"
    },
  ];
  
  // Function to generate a URL-friendly ID from the name
  export const generateItemId = (name: string): string => {
      return encodeURIComponent(name.toLowerCase().replace(/\s+/g, '-'));
  };
  
  
  // Export the array as the default export
  export default candyItems;
"use strict";
const getRnd = e => e[Math.floor(Math.random() * e.length)],
  STOP = new Set(["das", "die", "der", "dem", "den", "ein", "eine", "einer", "eines", "ist", "sind", "wie", "wo", "was", "wer", "wann", "warum", "welche", "welcher", "welches", "mir", "dir", "uns", "sie", "ihnen", "ich", "du", "er", "es", "wir", "ihr", "euch", "euer", "eure", "unser", "unsere", "bitte", "mal", "schon", "halt", "doch", "auch", "noch", "und", "oder", "aber", "sich", "mich", "dass", "auf", "mit", "von", "bei", "für", "zu", "im", "in", "an", "um", "da", "so", "hier", "hallo", "hey", "hi", "moin", "guten", "tag", "danke", "dank", "vielen", "gute", "morgen", "abend", "servus", "grüß", "gott", "tschüss", "ciao", "ja", "nein", "ok", "okay", "gut", "super", "perfekt", "alles", "klar", "sehr", "gern", "gerne", "wird", "werden", "haben", "kann", "können", "darf", "dürfen", "muss", "müssen", "soll", "sollen", "gibt", "machen", "tun", "vom", "zum", "zur", "über", "am", "ähm", "ehm", "eigentlich", "bzw", "quasi", "schließlich", "irgendwie", "vielleicht"]),
  lev = (e, n) => {
    if (!e.length) return n.length;
    if (!n.length) return e.length;
    let r = Array.from({
        length: e.length + 1
      }, ((e, n) => n)),
      i = new Array(e.length + 1);
    for (let t = 0; t < n.length; t++) {
      i[0] = t + 1;
      for (let s = 0; s < e.length; s++) i[s + 1] = n[t] === e[s] ? r[s] : Math.min(r[s], r[s + 1], i[s]) + 1;
      let s = r;
      r = i, i = s
    }
    return r[e.length]
  };

function clean(e) {
  return e.toLowerCase()
    .replace(/[^a-zäöüß0-9\s]/g, "")
    .split(/\s+/)
    .filter((e => e.length > 1 && !STOP.has(e)))
}
const CATEGORIES = [{
    title: "Warum Einzelunterricht",
    regex: /warum lp swim|wieso einzelunterricht|warum ihr|was ist der vorteil|warum seid ihr besser|für wen ist das gedacht|was zeichnet euch aus|warum zu euch|warum einzelunterricht|warum privatunterricht|was ist das konzept|wieso keine gruppen|vorteile von|was ist euer konzept/i,
    keywords: ["wieso", "weshalb", "vorteile", "vorteil", "einzelunterricht", "unterschied", "besonders", "philosophie", "einzelkurs", "privatkurs", "besser", "grund", "konzept", "mehrwert", "alleinstellungsmerkmal", "einzelbetreuung", "privatstunde", "privatunterricht", "einszueins", "1zu1", "methode"],
    text: "Während Gruppenkurse durch das soziale Miteinander überzeugen, bleibt dort oft zu wenig Zeit für den Einzelnen. Unser Konzept setzt genau hier an und versteht Einzelunterricht als klares Qualitätsversprechen. Eine persönliche Betreuung bedeutet naturgemäß eine höhere finanzielle Investition, garantiert Ihnen dafür jedoch unsere uneingeschränkte Aufmerksamkeit. Das macht unser Angebot zur idealen Ergänzung zu regulären Kursen oder zum perfekten Feinschliff für Ambitionierte. Völlig ohne Leistungsdruck bestimmen Sie Ihr eigenes Tempo. Vom ersten Wasserkontakt bis zum nächsten Triathlon — wir sind dabei!"
  }, {
    title: "Schwimmstile & Techniken",
    regex: /bieten sie kraulschwimmen an|kann man bei euch kraulen|unterrichten sie brustschwimmen|ich möchte schmetterling|lernt man auch rückenschwimmen|delfinschwimmen|welche schwimmstile|welche schwimmarten|schwimmstil verbessern|technik verbessern|alle schwimmstile/i,
    keywords: ["kraulschwimmen", "kraulen", "kraul", "kraulkurs", "freistil", "brustschwimmen", "brust", "brustkurs", "rückenschwimmen", "rücken", "rückenkurs", "schmetterling", "delfin", "delfinschwimmen", "lagenschwimmen", "lagen", "schwimmstil", "schwimmstile", "schwimmart", "schwimmarten", "schwimmtechnik", "stilarten", "techniktraining", "tauchen", "tieftauchen", "streckentauchen"],
    text: "Wir bringen Ihnen alle gewünschten Schwimmstile bei. Im Einzelunterricht erarbeiten wir gemeinsam die perfekte Technik von der grundlegenden Wasserbewältigung bis zum Feinschliff für fortgeschrittene Schwimmer."
  }, {
    title: "Erfahrungen & Qualität",
    regex: /bist du gut|seid ihr gut|könnt ihr was|taugt ihr was|wie gut seid ihr|lohnt sich das|wie sind die erfahrungen|gibt es bewertungen|wo finde ich erfahrungen|sind sie zu empfehlen|ist das training gut/i,
    keywords: ["erfolgreich", "seriös", "empfehlenswert", "referenzen", "bewertungen", "erfahrungen", "qualität", "professionell", "fähig", "kompetent", "vertrauenswürdig", "rezensionen", "kundenstimmen", "feedback", "meinungen", "testbericht", "auszeichnung"],
    text: "Wir geben jeden Tag unser Bestes und freuen uns über Ihre schnellen Fortschritte. Werfen Sie gerne einen Blick auf unsere aktuellen <a href='https://www.google.com/search?sca_esv=4ef3de7c1dd16902&sxsrf=APpeQnt1oDQ-wyRPC5DGuNHChTb5u8_kuw:1789758401870&q=lp+swim&si=APenkKm7iecQ4G6P-TsbSMFKIQtv3EFIqRAFw-i8uEbk55Z-_-HqBtgUH0vZnzbLQReQXxGdVZzlqJNzXxrY2ebUFcEzB6Td3gOypOa-cKxJxw-zydPrHT0%3D&uds=AJ5uw1-NJiCKB2vgbZj6OMiVQNpxzJoB4nFXmS8TcxlIU5_i7ORIFuGayCjOMv6gePBB_iU767sDC28JZxLPZcnFsDVlqNRI_FtGbqm8PTf5jMHVmzWXryM&sa=X&ved=2ahUKEwjqvpvO6fiWAxUpgP0HHQfPEOYQ3PALegQILhAF&biw=1920&bih=945&dpr=1' target='_blank' rel='noopener noreferrer'>Google Rezensionen</a> und überzeugen Sie sich selbst von unserer Arbeit."
  }, {
    title: "Stornierung & Krankheit",
    regex: /termin verschieben|kann ich absagen|muss leider absagen|kind ist krank|termin ändern|wie storniere ich|termin umbuchen|ausfallen lassen|kann leider nicht|wir sind krank|können nicht kommen|terminabsage|verschieben wegen krankheit|nicht teilnehmen/i,
    keywords: ["stornieren", "stornierung", "storno", "absagen", "absage", "krank", "krankheit", "krankgemeldet", "krankmelden", "attest", "grippe", "erkältet", "verschieben", "ausfall", "abmelden", "rücktritt", "cancel", "ändern", "aendern", "umbuchen", "terminänderung", "absagefrist", "stornofrist", "absageregelung", "verhindert", "ausfallen"],
    text: "Wir bitten um Verständnis, dass vereinbarte Termine bindend sind. Bis 48 Stunden vor Beginn können wir Termine kostenfrei verschieben oder stornieren. Bei kurzfristigeren Absagen oder Krankheit müssen wir das Honorar leider vollständig einbehalten, da wir die fest reservierte Zeit nicht mehr anderweitig vergeben können."
  }, {
    title: "Treffpunkt & Standort",
    regex: /wo ist das|wo findet der kurs|wo treffen wir uns|welches schwimmbad|in welchem bad|wo genau ist der treffpunkt|wie komme ich dorthin|wo ist der kurs|wo müssen wir hin|wo ist der eingang|treffen wir uns|wo genau in viernheim/i,
    keywords: ["treffpunkt", "standort", "ort", "schwimmbad", "hallenbad", "freibad", "waldschwimmbad", "adresse", "viernheim", "badeaufsicht", "stattfinden", "findet", "statt", "navi", "location", "wohin", "anfahrt", "eingang", "kasse", "parkplatz", "parken", "treffen"],
    text: "Wir trainieren je nach Saison im Waldschwimmbad oder im Hallenbad in Viernheim. Treffpunkt für unsere gemeinsamen Stunden ist immer direkt bei der Badeaufsicht. Das Eintrittsgeld für das Bad ist vor Ort zu entrichten."
  }, {
    title: "Kursauswahl & Buchung",
    regex: /welchen kurs soll ich buchen|welcher kurs ist der richtige|wie buche ich|wo kann ich mich anmelden|wie läuft die buchung|was muss ich buchen|ab wann ist man fortgeschritten|termin buchen/i,
    keywords: ["buchung", "buchen", "ablauf", "reservieren", "anmelden", "eintragen", "fortgeschritten", "fortgeschrittene", "stufe", "level", "leistungsstand", "niveau", "anfänger", "buchungsprozess", "wassergewöhnung", "grundlagen"],
    text: "Wir unterscheiden zwischen Grundlagen ab fünf Jahren und Fortgeschrittenen ab dem Bronze-Abzeichen – jeweils als Einzel- oder Duo-Unterricht. Die Buchung übernehmen Sie ganz bequem über unser <a href='https://calendly.com/lp-swim' target='_blank' rel='noopener noreferrer'>Online-Portal</a>: Wählen Sie dort einfach das gewünschte Einzel- oder Duo-Angebot, suchen Sie sich ein Zeitfenster aus und buchen Sie den Termin verbindlich. Im Anschluss erhalten Sie eine Buchungsbestätigung mit einem Link zu unserem WhatsApp-Chat."
  }, {
    title: "Preise & Bezahlung",
    regex: /was kostet das|wie teuer ist|wie kann ich bezahlen|wie bezahlt man|welche zahlungsmöglichkeiten|kann man bar zahlen|gibt es paypal|wie hoch ist das honorar|was kosten die|wie viel kostet|eintritt inklusive|muss ich den eintritt|kann ich überweisen/i,
    keywords: ["preis", "preise", "kosten", "teuer", "wieviel", "gebühr", "tarife", "tarif", "geld", "günstig", "honorar", "stundensatz", "kostet", "paypal", "rechnung", "bezahlen", "zahlen", "zahlung", "zahlungsart", "zahlungsmöglichkeiten", "bar", "bargeld", "kreditkarte", "überweisen", "überweisung", "iban", "eintritt", "eintrittsgeld", "badkasse"],
    text: "Wir gestalten unsere Preise transparent in unserer aktuellen <button type='button' data-open-modal='preisModal' class='text-[#38bdf8] font-semibold hover:underline outline-none'>Preisübersicht</button> auf der Website. Die Bezahlung erfolgt bequem vorab direkt bei der Online-Buchung über verschiedene sichere Zahlungsmöglichkeiten wie PayPal, Kreditkarte oder SEPA. Das Eintrittsgeld für das Bad ist vor Ort zu entrichten."
  }, {
    title: "Dauer & Verspätung",
    regex: /wie lange dauert|wie lang ist eine stunde|wie viele minuten|wie lange geht das|was passiert bei verspätung|wie lang trainieren wir|wie lange sind wir im wasser|wann müssen wir da sein|zu spät kommen/i,
    keywords: ["dauer", "lang", "lange", "minuten", "zeitraum", "zeitfenster", "60min", "trainingszeit", "pünktlich", "verspätung", "zeiten", "stundendauer", "einheit", "trainingsdauer", "zuspät"],
    text: "Wir planen für jede Trainingseinheit exakt 60 Minuten ein. Wir treffen uns bereits umgezogen und abgeduscht direkt bei der Badeaufsicht. Etwaige Verspätungen gehen leider zulasten Ihrer eigenen Trainingszeit."
  }, {
    title: "Zuschauen & Begleitpersonen",
    regex: /dürfen eltern zuschauen|muss ich dabei bleiben|darf ich am rand|kann ich zugucken|müssen eltern dabei sein|dabei sein|dabei bleiben|mitkommen|wo warten die eltern|kann ich zusehen|am beckenrand warten/i,
    keywords: ["eltern", "zuschauen", "dabei", "dabeibleiben", "aufsicht", "mama", "papa", "mutter", "vater", "begleitperson", "rand", "beckenrand", "anwesend", "zugucken", "zusehn", "zusehen", "zuschauer", "warten", "bleiben", "dabeisein", "begleiten"],
    text: "Wir überlassen es ganz Ihnen, ob Sie während der Stunde am Beckenrand zuschauen oder die Zeit für sich nutzen möchten."
  }, {
    title: "Feedback & Übungen",
    regex: /gibt es hausaufgaben|bekommen wir tipps|was können wir zuhause üben|gibt es ein feedback|wie ist der stand|was können wir verbessern|was kann ich mit meinem kind üben|bekommen wir eine rückmeldung|wie erfahren wir den fortschritt/i,
    keywords: ["tipps", "übungen", "zuhause", "freizeit", "üben", "hausaufgaben", "trockenübungen", "feedback", "resümee", "rückmeldung", "ratschläge", "lernfortschritt", "fazit", "besprechung", "auswertung", "fortschritt", "weiterüben"],
    text: "Wir nehmen uns nach jeder Einheit kurz Zeit für ein gemeinsames Fazit. Dabei geben wir Ihnen direktes Feedback zu Ihren Fortschritten und zeigen Ihnen gerne kleine Übungen für zuhause."
  }, {
    title: "Ausrüstung & Mitzubringen",
    regex: /was muss ich mitbringen|brauchen wir eine brille|was gehört in die tasche|welche ausrüstung|braucht mein kind flossen|was sollen wir einpacken|brauchen wir schwimmflügel|muss ich ein brett mitbringen|was ziehen wir an|stellen sie flossen/i,
    keywords: ["mitbringen", "ausrüstung", "badesachen", "kleidung", "brille", "handtuch", "packen", "utensilien", "anzug", "neopren", "flossen", "tasche", "schwimmbrille", "badehose", "badeanzug", "schwimmflügel", "schwimmbrett", "poolnudel", "neoprenanzug", "taucherbrille", "hilfsmittel"],
    text: "Sie benötigen für den Unterricht lediglich klassische Badekleidung und ein Handtuch. Eine Schwimmbrille empfehlen wir ebenfalls. Sämtliche Trainingsmaterialien bringen wir selbstverständlich für Sie mit."
  }, {
    title: "Wetter & Regen",
    regex: /was ist bei regen|findet es bei schlechtem wetter statt|was passiert bei gewitter|regnet es rein|ist es zu kalt|fällt das training bei regen aus|schlechtes wetter|was tun bei gewitter|findet der kurs bei regen statt|ist das wasser beheizt|friert man/i,
    keywords: ["wetter", "regen", "gewitter", "kalt", "schlechtwetter", "blitz", "unwetter", "sturm", "kälte", "regnet", "schauer", "donner", "blitzschlag", "hagel", "wolken", "temperatur", "wassertemperatur", "sommer", "winter"],
    text: "Wir gehen auch bei unbeständigem Wetter ins Wasser. Der Unterricht im Freibad findet bei Regen regulär statt. Bei echten Gefahren wie Gewitter oder Blitzschlag sagen wir den Termin selbstverständlich zu Ihrer Sicherheit rechtzeitig ab."
  }, {
    title: "Geschwister & Gruppen",
    regex: /können geschwister zusammen|geht das auch zu zweit|bieten sie gruppenkurse an|freund mitbringen|trainieren wir alleine|gibt es gruppen|beiden kinder gleichzeitig|kurse für paare|mit meiner freundin/i,
    keywords: ["geschwister", "bruder", "schwester", "zwilling", "zwillinge", "zusammen", "beide", "paar", "pärchen", "zweit", "dritt", "viert", "duo", "geteilt", "teilen", "gemeinsam", "doppel", "gruppe", "gruppen", "gruppenkurse", "gruppenunterricht", "mehrere", "alleine", "privat", "freund", "freunde", "freundin", "kumpel", "geschwisterkind", "doppelstunde", "pärchenkurs", "gleichzeitig"],
    text: "Wir setzen primär auf Einzelunterricht, doch begleiten Paare und Geschwister genauso gerne im gemeinsamen Training zu zweit. Wählen Sie dafür bei der Buchung in unserem <a href='https://calendly.com/lp-swim' target='_blank' rel='noopener noreferrer'>Online-Portal</a> einfach direkt das gewünschte Duo-Angebot aus."
  }, {
    title: "Wasserangst & Besonderheiten",
    regex: /mein kind hat angst|traut sich nicht|was bei panik|förderbedarf|er weint immer|wasserangst|adhs|wasserscheu|inklusion|behindert|behinderte|behinderten|behinderung|handicap|rollstuhl|einschränkung/i,
    keywords: ["allergie", "adhs", "autismus", "inklusion", "förderbedarf", "behinderung", "behindert", "behinderten", "behinderte", "einschränkung", "handicap", "besonderheit", "panik", "angst", "wasserangst", "phobie", "schiss", "furcht", "unwohl", "traumatisiert", "vorerkrankung", "chronisch", "diagnose", "trauma", "wasserscheu", "schreckhaft", "entwicklungsverzögerung", "trisomie", "rollstuhl"],
    text: "Wir gehen im Einzelunterricht sehr behutsam auf Wasserangst oder besondere Förderbedarfe ein. Bitte teilen Sie uns gesundheitliche Besonderheiten oder Einschränkungen unbedingt direkt bei der Buchung mit. So können wir das Training optimal und sicher vorbereiten."
  }, {
    title: "Verfügbarkeit & Warteliste",
    regex: /alles ist ausgebucht|wann gibt es neue termine|steht man auf der warteliste|wann werden plätze frei|wie buche ich folgetermine|ab wann kann man buchen|ich finde keinen termin|gibt es eine warteliste|wann schaltet ihr neue|nächsten monat buchen|sind noch plätze frei/i,
    keywords: ["ausgebucht", "voll", "termine", "termin", "freigeschaltet", "warteliste", "folgetermine", "kalender", "zeiten", "plätze", "kapazität", "belegt", "monat", "folgemonat", "buchungsportal", "auslastung", "reservierungsstart", "buchungsstart"],
    text: "Wir schalten neue Termine für den Folgemonat immer Mitte bis Ende eines jeden Monats in unserem Buchungsportal frei. Schauen Sie am besten in diesem Zeitraum wieder rein, falls aktuell alles belegt sein sollte."
  }, {
    title: "Das Team & Qualifikation",
    regex: /wer unterrichtet|wer ist der trainer|wer bringt es bei|wer steckt hinter|wofür steht|wer ist lukas|welche qualifikation|wie heißt der trainer|habt ihr zertifikate|wer führt den kurs durch/i,
    keywords: ["inhaber", "lukas", "prehn", "lpswim", "bedeutung", "wofür", "lehrer", "trainer", "personal", "gründer", "team", "schwimmlehrer", "qualifikation", "ausbilder", "chef", "hintergrund", "fachangestellter", "bäderbetriebe", "zertifizierung"],
    text: "LP-SWIM steht für Lernen und Perfektionieren. Die Idee zu diesem Konzept entstand aus der täglichen Arbeit im Bäderbetrieb des Gründers Lukas Prehn. Dabei zeigte sich, dass klassische Gruppenkurse zwar wunderbar für das soziale Miteinander sind, in starren Formaten jedoch oft die Zeit für eine individuelle Betreuung fehlt. Zudem mangelt es gerade für Erwachsene häufig an verlässlichen Angeboten. Genau aus dieser Lücke heraus entstand LP-SWIM. Das Konzept bietet einen sicheren und persönlichen Weg ins Wasser, bei dem ungeteilte Aufmerksamkeit und ein Training ohne Leistungsdruck im Mittelpunkt stehen. Diese Qualität ist auch durch den <b>DSLV</b> als unabhängige Stelle <a href='https://schwimmlehrerverband.de/dslv-gepruefte-schwimmschulen' target='_blank' rel='noopener noreferrer'>offiziell geprüft</a>."
  }, {
    title: "Kontakt & Erreichbarkeit",
    regex: /wie kann ich euch erreichen|telefonnummer|kann ich anrufen|wo finde ich whatsapp|wie kommunizieren wir|über whatsapp schreiben|telefonisch erreichen|handynummer|kontaktformular|schickt ihr eine whatsapp/i,
    keywords: ["whatsapp", "telefon", "anrufen", "erreichbar", "handynummer", "kontaktieren", "kontakt", "kommunikation", "nummer", "chat", "festnetz", "mobil", "telefonnummer", "email", "mail", "schreiben", "nachricht", "messenger"],
    text: "Wir bündeln unsere Anfragen über unser <a href='https://calendly.com/lp-swim/fragen-und-sondertermine' target='_blank' rel='noopener noreferrer'>Kontaktformular</a>. Wir melden uns in der Regel binnen 48 Stunden auf Ihre Anfrage. Um die weitere Kommunikation direkter zu gestalten, erhalten Sie nach Eingang Ihrer Nachricht einen Link zu unserem WhatsApp-Chat. Dort können Sie uns weitere aufkommende Fragen gerne jederzeit mitteilen."
  }, {
    title: "Schwimmabzeichen",
    regex: /seepferdchen|nehmt ihr abzeichen ab|wie bekomme ich bronze|gibt es eine urkunde|rettungsschwimmer|für die polizei trainieren|silberabzeichen|kind gold machen|abzeichen für die feuerwehr|schwimmpass/i,
    keywords: ["seepferdchen", "abzeichen", "bronze", "silber", "gold", "prüfung", "urkunde", "pass", "rettungsschwimmer", "dlrg", "polizei", "sportabzeichen", "schwimmabzeichen", "totenkopf", "freischwimmer", "abnahme", "prüfer", "sportprüfung", "einstellungstest", "feuerwehr"],
    text: "Das Deutsche Schwimmabzeichen bildet die Grundlage unseres Trainings und wird selbstverständlich kostenfrei abgenommen. Auch Schwimmnachweise für Polizei, Feuerwehr, Rettungsdienst oder das klassische Sportabzeichen sind bei uns möglich.<br><br>Auf Wunsch bereiten wir Sie zudem auf das Rettungsschwimmabzeichen vor. Da es sich hierbei um eine Verbandszertifizierung handelt, erfolgt die Prüfung durch einen DLRG-Lehrscheininhaber. In Absprache mit der örtlichen DLRG organisieren wir diese Abnahme aber gerne ganz unkompliziert für Sie."
  }, {
    title: "Alter & Zielgruppe",
    regex: /ab welchem alter|für welches alter|was für erwachsene|nehmen sie auch babys|was ist das mindestalter|bis zu welchem alter|unterrichten sie auch erwachsene|kurse für senioren|ab wie vielen jahren|zu jung/i,
    keywords: ["alter", "alt", "mindestalter", "kleinkind", "baby", "senior", "erwachsen", "jahre", "zielgruppe", "altersempfehlung", "senioren", "altersgruppe", "erwachsenenkurs", "erwachsenenschwimmen", "babyschwimmen", "jugendliche", "rentner"],
    text: "Wir unterrichten ab fünf Jahren und begleiten Sie in jedem Alter. Wir passen das Training an Ihre persönlichen Voraussetzungen an, ganz gleich, ob Sie Anfänger oder bereits fortgeschritten sind."
  }, {
    title: "Lerngeschwindigkeit",
    regex: /wie viele stunden braucht man|wann kann er schwimmen|wie lange dauert es bis|wie schnell geht das|gibt es eine garantie|wie viele wochen|wie oft müssen wir kommen|nach wie vielen stunden|garantieren sie/i,
    keywords: ["stunden", "lerngeschwindigkeit", "schnell", "fortschritt", "anzahl", "garantie", "wochen", "monate", "zeitaufwand", "lernerfolg", "kursdauer", "schnelligkeit", "stundenanzahl", "einheiten", "dauerhaftigkeit"],
    text: "Wir richten uns beim Lerntempo komplett nach Ihnen. Da wir im Einzelunterricht ohne Ablenkung trainieren, erzielen wir erfahrungsgemäß sehr zügige und nachhaltige Fortschritte."
  }, {
    title: "Hausbesuche & Sondertermine",
    regex: /kommt ihr auch nach hause|hausbesuche|in unseren pool kommen|schulbegleitung|was kosten sondertermine|ins hotel|eigenen pool|termine zuhause|fahrtkosten/i,
    keywords: ["sondertermin", "hausbesuch", "pool", "privatpool", "zuhause", "hotel", "schule", "schulbegleitung", "extern", "auswärts", "anfahrt", "hotelpool", "eigenpool", "schulsport", "schulschwimmen", "sonderanfrage", "zonen", "fahrtkosten"],
    text: "Wir bieten nach individueller Absprache auch Hausbesuche oder Sondertermine an. Hierfür berechnen wir je nach Entfernung eine gestaffelte Anfahrtspauschale. Nutzen Sie für solche Anfragen gerne unser <a href='https://calendly.com/lp-swim/fragen-und-sondertermine' target='_blank' rel='noopener noreferrer'>Kontaktformular</a>."
  }, {
    title: "Fotos & Filmen",
    regex: /darf ich filmen|kann ich fotos|videos machen|fotografieren erlaubt|aufnehmen/i,
    keywords: ["filmen", "fotografieren", "fotos", "foto", "video", "videos", "kamera", "handy", "aufnehmen", "aufnahme", "bild", "bilder", "smartphone"],
    text: "Aus Gründen des Datenschutzes und zum Schutz aller Badegäste ist das eigenmächtige Fotografieren und Filmen im gesamten Schwimmbad untersagt."
  }, {
    title: "Bot Identität",
    regex: /wer bist du|bist du ein mensch|bist du ein bot|was machst du hier|wie kannst du helfen|bist du eine ki|mit wem spreche ich/i,
    keywords: ["name", "mensch", "bot", "ki", "assistent", "hilfe", "roboter", "chatbot", "künstliche", "intelligenz"],
    text: "Wir haben diesen digitalen Rettungsring entwickelt, um Ihnen schnelle Antworten auf häufige Fragen zu liefern. Das System arbeitet aus Datenschutzgründen komplett lokal in Ihrem Browser und speichert keine Ihrer Eingaben."
  }],
  FALLBACK_RESPONSES = ["Oje, da haben Sie mich eiskalt erwischt! 🥶 Leider ist Ihre Frage noch nicht in meiner Datenbank hinterlegt. Schreiben Sie uns Ihr Anliegen gerne direkt über unser <a href='https://calendly.com/lp-swim/fragen-und-sondertermine' target='_blank' rel='noopener noreferrer'>Kontaktformular</a> und wir melden uns persönlich bei Ihnen!", "Da muss ich leider passen! 🙈 Diese Frage ist in meinem System noch nicht hinterlegt. Nutzen Sie am besten unser <a href='https://calendly.com/lp-swim/fragen-und-sondertermine' target='_blank' rel='noopener noreferrer'>Kontaktformular</a> – wir melden uns schnellstmöglich bei Ihnen!"];

self.onmessage = e => {
  const {
    type: n,
    payload: r
  } = e.data;
  
  if ("INIT" === n) return self.postMessage({
    type: "READY"
  });
  
  if ("CHAT" === n) try {
    const eStr = r.toLowerCase().trim();
    const nArr = [...new Set(clean(eStr))];
    const norm = s => s.replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss");
    const stem = w => w.replace(/(?:e|em|en|er|es|st|s)$/, "");
    
    const iList = CATEGORIES.map(cat => {
      let catScore = 0;
      
      if (cat.regex && cat.regex.test(eStr)) {
        catScore += 25;
      }

      if (cat.title.toLowerCase() === eStr) {
        catScore += 100;
      }
      
      nArr.forEach(userWord => {
        const normUser = norm(userWord);
        const stemmedUser = stem(normUser);
        let bestWordScore = 0;
        
        cat.keywords.forEach(kw => {
          const normKw = norm(kw);
          const stemmedKw = stem(normKw);
          
          if (normUser === normKw || stemmedUser === stemmedKw) {
            bestWordScore = Math.max(bestWordScore, 10);
          } else if ((normUser.length >= 5 && normKw.length >= 4 && normUser.includes(normKw)) || (normKw.length >= 5 && normUser.length >= 4 && normKw.includes(normUser))) {
            bestWordScore = Math.max(bestWordScore, 7);
          } else {
            const threshold = normKw.length <= 3 ? 0 : Math.floor(normKw.length * 0.25);
            
            if (threshold > 0 && Math.abs(normUser.length - normKw.length) <= threshold) {
              if (lev(normUser, normKw) <= threshold) {
                bestWordScore = Math.max(bestWordScore, 3);
              }
            }
          }
        });
        
        catScore += bestWordScore;
      });
      
      return { ...cat, score: catScore };
    }).filter(c => c.score > 0).sort((a, b) => b.score - a.score);

    let t = "";
    if (0 === iList.length) {
      t = getRnd(FALLBACK_RESPONSES);
    } else {
      const topScore = iList[0].score;
      
      if (iList.length > 1 && (topScore - iList[1].score < 5)) {
        t = "Wir sind uns nicht ganz sicher. Welches dieser Themen passt besser?<br><br><div class='flex flex-wrap gap-2 mt-2'><button type='button' class='chat-suggestion px-4 py-2.5 bg-white border border-brand-300 text-brand-800 rounded-full text-xs font-semibold hover:bg-brand-50 active:scale-95 transition-all shadow-sm outline-none cursor-pointer'>" + iList[0].title + "</button><button type='button' class='chat-suggestion px-4 py-2.5 bg-white border border-brand-300 text-brand-800 rounded-full text-xs font-semibold hover:bg-brand-50 active:scale-95 transition-all shadow-sm outline-none cursor-pointer'>" + iList[1].title + "</button></div>";
      } else {
        t = iList[0].text;
      }
    }
    
    setTimeout(() => {
      self.postMessage({ type: "REPLY", text: t });
    }, 700 + 900 * Math.random());
    
  } catch (e) {
    self.postMessage({ type: "ERROR", text: e.message });
  }
};

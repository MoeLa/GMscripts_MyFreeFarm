// ==UserScript==
// @name        MyFreeFarm LP Polish
// @namespace   https://github.com/BastianKanaan/GMscripts_MyFreeFarm
// @author      BastianKanaan
// @description Language pack "Polish" for MyFreeFarm Scripts
// @date        26.11.2015
// @version     1.0.7
// @license     GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @include     /^http:\/\/(|www\.|s\d+\.)wolnifarmerzy.pl\/.*$/
// @grant       GM_log
// ==/UserScript==

// Edit above the @include. This controls on which pages the script is called.
try{
// Do not edit ********************************************************************************************************
    if(!top.window.wrappedJSObject.greaseMonkeyData){ createObjectIn(top.window.wrappedJSObject, {defineAs: "greaseMonkeyData"}); }
    top.unsafeData = top.window.wrappedJSObject.greaseMonkeyData;
    if(undefined===top.unsafeData.text){
        top.unsafeData.text=new Object();
    }
    var text=top.unsafeData.text;
    const GM_Home  =GM_info["script"]["namespace"];
    const GM_Source=GM_info["script"]["namespace"];
    const PRODSTOP =-1;
    const GFX = "http://mff.wavecdn.de/mff/"; // The path to the in-game images

// Important constants ************************************************************************************************
    const COUNTRY="PL"; // The country ISO-code (2 digits)
    const LANGUAGE="pl"; // The language ISO-code (2 digits)        
    const delimThou="."; // The separator for thousands (e.g. in 1,000).
    const regDelimThou="\\."; // = delimThou. "." has to be masked to "\\."!
    const regDelimThouShift="([\\d\\.])(\\d)\\.(\\d{1,2}\\D)"; // = "([\\d"+delimThou+"])(\\d)"+delimThou+"(\\d{1,2}\\D)"
    const regDelimThouDelete="(\\d)\\.(\\.*)(\\d{1,2}\\D)"; // = "(\\d)"+delimThou+"("+delimThou+"*)(\\d{1,2}\\D)"
    const delimDeci=","; // The separator for decimals (e.g. in 1.99).
    const regDelimDeci=","; // = delimDeci. "." has to be masked to "\\."!
    const dateFormatDM = "day.month."; // The style a short date is displayed. You can use the tags "day" and "month".
    const dateFormatDMY = "day.month.year"; // The style a date is displayed. You can use the tags "day", "month" and "year".
    const timeFormatHM = "hour:min"; // The style a time is displayed. You can use the tags "hour" and "min".
    const timeFormatHMS = "hour:min:sec"; // The style a precise time is displayed. You can use the tags "hour", "min" and "sec".

// Take the following from the game ***********************************************************************************
    if(undefined===text[LANGUAGE]){
        text[LANGUAGE]=new Object();
        // Open the system messages and watch the Firefox console for warnings from "messagesSystem".
        // *************
        // Take from a message sent if you sell something on the market place.
        // - The subject: Replace the variable information by ".+". Prefix brackets with "\".
        text[LANGUAGE]["msgSubjectMarketsale"]="xxx";
        // - The content: The text where the information is stated. The information has to be replaced by "(.+?)".
        text[LANGUAGE]["msgContentMarketsale"]="(.+) zakupil od Ciebie na targu\\s*(\\d+)x (.+?) za kwote\\s*<br>\\s*(.+?) ft\\."; 
        // *************
        // Take from a message sent if you sell something via contract.
        // - The subject.
        text[LANGUAGE]["msgSubjectContractsale"]="xxx";
        // - The content: The text where the general information is stated. The information has to be replaced by "(.+?)".
        text[LANGUAGE]["msgContentContractsale"]="(.+) podpisal wyslana mu przez Ciebie umowe!<br>\\s*<br>\\s*Sprzedales nastepujace produkty:\\s*<br>([\\S\\s]*)\\s*<br>\\s*Naleznosc za produkty w wysokosci (.+?) ft zostala przelana na Twoje konto\\."; 
        // - The line-pattern for the detailed selling list (equals the replaced information above).
        text[LANGUAGE]["msgContentContractsaleList"]="\\s*(\\d+)x\\s*(.+?)\\s*<br>";
        // - A contract which was sent to you was canceld before you were able to accept it
        text[LANGUAGE]["msgSubjectContractCancel"]="xxx";
        // *************
        // Take the subject from a message sent if you purchased coins
        text[LANGUAGE]["msgSubjectCoins"]="xxx";
        // Take the subject from a message sent if you won in a competition.
        text[LANGUAGE]["msgSubjectCongratulation"]="xxx";
        // Take the subject from a message sent if you got a gift.
        text[LANGUAGE]["msgSubjectCongratulation2"]="xxx";
        // Take the subject from a message sent if somebody wants to add you as friend. The person has to be replaced by "(.+)".
        text[LANGUAGE]["msgSubjectFriend"]="(.+) chce zostac twoim przyjacielem";
        // Take the subject from a message sent if somebody has canceled your friendship. The person has to be replaced by "(.+)".
        text[LANGUAGE]["msgSubjectFriendEnd"]="xxx";
        // Take the subject from a message sent if you reach the next level.
        text[LANGUAGE]["msgSubjectLevel"]="xxx";
        // Take the subject from a message sent if you have to renew premium mode
        text[LANGUAGE]["msgSubjectPremium"]="xxx";
        // Take the subject from a message sent if you got a present.
        text[LANGUAGE]["msgSubjectPresent"]="xxx";
        // Take the subjects from messages sent if a quest was completed.
        text[LANGUAGE]["msgSubjectQuest"]="xxx";
        // Take the subjects from messages sent if weed occurred on your field.
        text[LANGUAGE]["msgSubjectWeed1"]="xxx";
        text[LANGUAGE]["msgSubjectWeed2"]="xxx";
    
// And all the other texts you can enter what you want ****************************************************************
        text[LANGUAGE]["above"] = "Suma prod. powyzej";
        text[LANGUAGE]["absolute"] = "Potrzebne";
        text[LANGUAGE]["accountActive"]="Konto aktywne";
        text[LANGUAGE]["accounts"] = "Konta";
        text[LANGUAGE]["activation"] = "Aktywuje";
        text[LANGUAGE]["additionalFarmi"] = "%1% dodatkowy klient dziennie"; 
        text[LANGUAGE]["additionalForestFarmiSlot"] = "%1% dodatkowe miejsce w kolejce klientów lesnych";
        text[LANGUAGE]["additionalLogCapacity"] = "Zwieksza pojemnosc drewutni o %1%";
        text[LANGUAGE]["advertisingEnds"] = "Kampania reklamowa konczy sie dzis";
        text[LANGUAGE]["adviser"] = "Doradca";
        text[LANGUAGE]["afterFee"] = "Po oplacie";
        text[LANGUAGE]["alertSetPriceNone"] = "Czy na pewno chcesz ustawic cene %PRODUCT% na zero?";
        text[LANGUAGE]["alertSetPriceOverNPC"] = "Czy na pewno chcesz ustawic cene %PRICE% dla %PRODUCT%?<br>To wiecej niz daja NPC - %NPC%.";
        text[LANGUAGE]["alertSetPriceOverObs"] = "Czy na pewno chcesz ustawic cene %PRICE% dla %PRODUCT%?<br>To znacznie wiecej niz srednia (%OBS%).";
        text[LANGUAGE]["alertSetPriceUnderObs"] = "Czy na pewno chcesz ustawic cene %PRICE% dla %PRODUCT%?<br>To znacznie mniej niz srednia (%OBS%).";
        text[LANGUAGE]["alertWillLowRack"] = "UWAGA! Na regale zostanie ci mniej niz ustalone minimum!";
        text[LANGUAGE]["all"] = "Wszystko";
        text[LANGUAGE]["autologinAllOk"] = "Wszystkie konta zalogowane.";
        text[LANGUAGE]["autologinChecking"] = "Sprawdzenie aktywnych sesji. Prosze odczekac %1% sekund<br>...";
        text[LANGUAGE]["bonus"]="Bonus";
        text[LANGUAGE]["boughtTickets"] = "Kupione losy";
        text[LANGUAGE]["buy"] = "Kupuj";
        text[LANGUAGE]["buyers"] = "Kupcy";
        text[LANGUAGE]["calcTo"] = "Wyliczone do"; 
        text[LANGUAGE]["carpentry"] = "Stolarnia";
        text[LANGUAGE]["city"] = "Miasto";
        text[LANGUAGE]["change"]="Change";
        text[LANGUAGE]["clearFilter"]="Wyczysc filtr";
        text[LANGUAGE]["click"] = "Klik";
        text[LANGUAGE]["clickAlt"] = "Alt+Klik";
        text[LANGUAGE]["clickCtrl"] = "Ctrl+Klik";
        text[LANGUAGE]["clickDouble"] = "Dwuklik";
        text[LANGUAGE]["clickToChange"] = "Kliknij aby zmienic";
        text[LANGUAGE]["coins"]=unsafeWindow.t_coins;
        text[LANGUAGE]["commission"] = "Prowizja";
        text[LANGUAGE]["confirmUseObservedPrices"] = "Czy przyjac srednia rynkowa jako ceny na targu?";
        text[LANGUAGE]["confirmChangelogVersion"]="You have installed a new version of the Adviser script.<br>The version %1% contains the following changes:";
        text[LANGUAGE]["contract"] = "Umowa";
        text[LANGUAGE]["contractsReceived"] = "Umowy otrzymane";
        text[LANGUAGE]["contractsSent"] = "Umowy wyslane";
        text[LANGUAGE]["copyToTextFile"]="Copy this string to a text-file";
        text[LANGUAGE]["couldNotGetRank"]="Nie mozna okreslic twojego miejsca w rankingu."; 
        text[LANGUAGE]["couldNotGetUpdateInfoOfX"]="Nie znaleziono aktualizacji skryptu %1%"
        text[LANGUAGE]["createStorageString"]="Create storage string";
        text[LANGUAGE]["cropped"] = "Wysiewanie";
        text[LANGUAGE]["currentOffers"] = "Aktualne oferty";
        text[LANGUAGE]["dailyRuns"] = "Dzienna produkcja ";
        text[LANGUAGE]["dailyTicket"] = "Dzienne losy";
        text[LANGUAGE]["dailyYield"] = "Dzienny plon";
        text[LANGUAGE]["date"]="Date";
        text[LANGUAGE]["day"] = "Dzien";
        text[LANGUAGE]["day0"] = "Dzis";
        text[LANGUAGE]["day1"] = "Jutro";
        text[LANGUAGE]["day2"] = "Pojutrze"; //comment it if not used in the language
        text[LANGUAGE]["default"] = "Domyslnie";
        text[LANGUAGE]["delete"] = "Usun";
        text[LANGUAGE]["deleteFollowingData"]="Delete following data";
        text[LANGUAGE]["demand"] = "Potrzebne";
        text[LANGUAGE]["detail"]="Detal";
        text[LANGUAGE]["difficulty"]="Difficulty";
        text[LANGUAGE]["donkey"]="Donkey";
        text[LANGUAGE]["duration"] = "Czas prod.";
        text[LANGUAGE]["editPrice"] = "Edytuj cene";
        text[LANGUAGE]["emptyField"] = "Puste pole!";
        text[LANGUAGE]["end"]="End";
        text[LANGUAGE]["exchangedLots"] = "Wymienione losy";
        text[LANGUAGE]["farm"] = "Farma";
        text[LANGUAGE]["farmersmarket"]=unsafeWindow.t_farmers_market;
        text[LANGUAGE]["farmX"] = "%1%. farme"; 
        text[LANGUAGE]["farmi"] = "Klient";
        text[LANGUAGE]["farmis"] = "Klienci";
        text[LANGUAGE]["farmpedia"] = "Forum";
        text[LANGUAGE]["farmpediaUrl"] = "http://forum.wolnifarmerzy.pl/";
        text[LANGUAGE]["farmzone"] = "%1% miejsce pod zabudowe na %2% farmie";  
        text[LANGUAGE]["feed"] = "Karmienie";
        text[LANGUAGE]["fields"]="Fields";
        text[LANGUAGE]["filter"] = "Filtr";
        text[LANGUAGE]["filterForX"] = "Filtrowanie po %1%";
        text[LANGUAGE]["finished"] = "Gotowe";
        text[LANGUAGE]["foodworld"] = unsafeWindow.foodworld_title; 
        text[LANGUAGE]["forest"] = "Las";
        text[LANGUAGE]["forestry"] = "Lesnictwo";
        text[LANGUAGE]["formatNumbers"] = "Format liczb";
        text[LANGUAGE]["formulaType"] = ["Prod", "+val", "+pts"];
        text[LANGUAGE]["fl1"]="Rabatka";
        text[LANGUAGE]["fl2"]="Pracownia kwiatowa";
        text[LANGUAGE]["fl3"]="Monster fruit culture";
        text[LANGUAGE]["fl5"]="Animal doctor";
        text[LANGUAGE]["fl6"]="Speed eating";
        text[LANGUAGE]["fw1"] = "Stoisko z napojami";
        text[LANGUAGE]["fw2"] = "Bistro";
        text[LANGUAGE]["fw3"] = "Piekarnia";
        text[LANGUAGE]["gain"] = "Daje";
        text[LANGUAGE]["gamecurrency"]=unsafeWindow.gamecurrency;
        text[LANGUAGE]["general"] = "Ogólne";
        text[LANGUAGE]["given"] = "Oddano";
        text[LANGUAGE]["goods"] = "Towary";
        text[LANGUAGE]["goToClothingDonation"]="Go to clothing donation";
        text[LANGUAGE]["goToDonkey"]="Go to donkey Luke";
        text[LANGUAGE]["goToLottery"] = "Przejdz do loterii";
        text[LANGUAGE]["goToMarket"] = "Idz na targ";
        text[LANGUAGE]["goToMarketOfX"] = "Idz na targ po %1%";
        text[LANGUAGE]["goToMarketstall"] = "Idz do Twojego Straganu";
        text[LANGUAGE]["goToPage"] = "Przejdz do strony";
        text[LANGUAGE]["goToRank"] = "Przejdz do pozycji";
        text[LANGUAGE]["goToX"]="Przejdz do %1%";
        text[LANGUAGE]["hide"]="ukryj";
        text[LANGUAGE]["highlightProducts"] = "Podswietl produkty na targu";
        text[LANGUAGE]["highlightUser"] = "Podswietl farmera na targu";
        text[LANGUAGE]["hotkeys"] = "Hotkeys";
        text[LANGUAGE]["idle"] = "Bezczynne!!";
        text[LANGUAGE]["importStorageString"]="Import storage string";
        text[LANGUAGE]["importStorageStringError"]="Sorry. Can't read the storage string.";
        text[LANGUAGE]["informationIsMissing"]="Brak danych."
        text[LANGUAGE]["ingredients"] = "Skladniki";
        text[LANGUAGE]["inStock"] = "w regale";
        text[LANGUAGE]["invalidServer"] = "Bledny serwer";
        text[LANGUAGE]["inventory"] = "Zapasy";
        text[LANGUAGE]["jobIncomplete"]="Job not finished successfully";
        text[LANGUAGE]["jobComplete"]="Job finished successfully";
        text[LANGUAGE]["jobCurrent"]="Current job";
        text[LANGUAGE]["keptLots"] = "Zatrzymane losy";
        text[LANGUAGE]["lastPrice"]="Last price";
        text[LANGUAGE]["lastQuest"]="Completed";
        text[LANGUAGE]["level"] = "Poziom";
        text[LANGUAGE]["levelTooLow"] = "Twój poziom jest za niski";
        text[LANGUAGE]["levelXneeded"] = "Wymagany&nbsp;%1%&nbsp;poziom";
        text[LANGUAGE]["load"] = "Laduj";
        text[LANGUAGE]["loading"] = "Ladowanie";
        text[LANGUAGE]["localTime"] = "Czas lokalny";
        text[LANGUAGE]["lodge"] = "Lesniczówka";
        text[LANGUAGE]["login"] = "Login";
        text[LANGUAGE]["loginPageFound"]="Found login page";
        text[LANGUAGE]["loginPortalSubmitted"]="Submitted portal login";
        text[LANGUAGE]["loginSubmitted"]="Submitted login";
        text[LANGUAGE]["logDonkey"]="Donkey Luke Log";
        text[LANGUAGE]["lotteryLog"] = "Historia loterii";
        text[LANGUAGE]["lvl"] = "Lvl";
        text[LANGUAGE]["manageVariables"] = "Zarzadzaj zmiennymi";
        text[LANGUAGE]["market"] = "Targ";
        text[LANGUAGE]["marketplace"] = "Rynek";
        text[LANGUAGE]["marketPrice"] = "Na&nbsp;targu&nbsp;po";
        text[LANGUAGE]["marketstall"] = "Twój stragan";
        text[LANGUAGE]["megafield"]="Megafield";
        text[LANGUAGE]["megafieldCurrency"]=unsafeWindow.t_megafield_currency;
        text[LANGUAGE]["messages"] = "Wiadomosci";
        text[LANGUAGE]["minRack"] = "Min&nbsp;ilosc";
        text[LANGUAGE]["minRackamount"] = "Minimalna ilosc w regale";
        text[LANGUAGE]["missing"] = "Brakuje";
        text[LANGUAGE]["money"] = "Oferuje";
        text[LANGUAGE]["name"] = "Login";
        text[LANGUAGE]["newLevelReached"] = "Gratulacje!<br>Osiagnales kolejny poziom!";
        text[LANGUAGE]["nextMessage"] = "Nastepna wiadomosc";
        text[LANGUAGE]["no"] = "Nie";
        text[LANGUAGE]["nothingSelected"]="Nothing selected";
        text[LANGUAGE]["NPC"] = "w sklepie";
        text[LANGUAGE]["NPCprice"] = "Cena sklepowa";
        text[LANGUAGE]["nr"] = "Nr";
        text[LANGUAGE]["observed"] = "Srednia rynkowa";
        text[LANGUAGE]["ok"] = "OK";
        text[LANGUAGE]["oldOnes"] = "Poprzednie";
        text[LANGUAGE]["options"] = "Opcje";
        text[LANGUAGE]["overNPCprice"] = "wiecej nizw sklepie";
        text[LANGUAGE]["overview"] = "Przeglad";
        text[LANGUAGE]["overX"] = "wiecej %1%";
        text[LANGUAGE]["pageXNotLoaded"]="Page '%1%' is not loaded completely.";
        text[LANGUAGE]["password"] = "Haslo";
        text[LANGUAGE]["pleaseOpenX"]="Otwórz %1%.";
        text[LANGUAGE]["points"] = "Punktów";
        text[LANGUAGE]["pleaseWait"]="Pleae wait";
        text[LANGUAGE]["portalLogin"]="Portal-Login";
        text[LANGUAGE]["powerups"] = "Power-Upy";
        text[LANGUAGE]["previousMessage"] = "Poprzednia wiadomosc";
        text[LANGUAGE]["price"] = "Cena";
        text[LANGUAGE]["prices"] = "Ceny";
        text[LANGUAGE]["product"] = "Produkt";
        text[LANGUAGE]["production"] = "Produkcja";
        text[LANGUAGE]["productOverview"] = "Przeglad produktów";
        text[LANGUAGE]["products"] = "Produkty";
        text[LANGUAGE]["productTimeSaving"] = "%1% minut oszczednosci dla %2%";  
        text[LANGUAGE]["profit"] = "Zysk";
        text[LANGUAGE]["profitTable"] = "Kalkulacja zysków dziennych";
        text[LANGUAGE]["quantity"] = "Ilosc";
        text[LANGUAGE]["quest_foodworld"] = "Quest Piknikowy";
        text[LANGUAGE]["quest_forestry"]="Quest Lesny";
        text[LANGUAGE]["quest_main"]="Quest farmy";
        text[LANGUAGE]["quest_veterinary"]="Veterinary quest series";
        text[LANGUAGE]["questfoodworld1"]="Questy piknikowe";     
        text[LANGUAGE]["questforestry1"]="Questy I (lesne)";
        text[LANGUAGE]["questforestry2"]="Questy II (lesne)";
        text[LANGUAGE]["questmain1"]="Questy I (farma)";
        text[LANGUAGE]["questmain2"]="Questy II (farma)";
        text[LANGUAGE]["questmain3"]="Questy III (farma)";
        text[LANGUAGE]["questveterinary1"]="Veterinary quest series";
        text[LANGUAGE]["quests"] = "Questy";
        text[LANGUAGE]["questSetXToNrY"]="Setting %1% to No %2%";
        text[LANGUAGE]["rackX"] = "%1%. regal";
        text[LANGUAGE]["rank"] = "Pozycja";
        text[LANGUAGE]["readAll"] = "Wszystkie przeczytane";
        text[LANGUAGE]["readyAtX"] = "Gotowe o %1%"; //%1%=2:15+text[LANGUAGE]["shortOClock"]
        text[LANGUAGE]["readyAtX_day1"] = "Gotowe jutro o %1%";
        text[LANGUAGE]["readyAtX_day2"] = "Gotowe pojutrze o %1%"; //comment it if not used in the language
        text[LANGUAGE]["readySinceX"] = "Gotowe za %1%";
        text[LANGUAGE]["recipes"] = "Przepisy";
        text[LANGUAGE]["recursive"] = "Rekurencyjnie potrzebne"
        text[LANGUAGE]["relative"] = "Brakuje";
        text[LANGUAGE]["reloadInXSec"]="Reload in %1%s.";
        text[LANGUAGE]["relogin"] = "Zbliza sie koniec sesji.<br>Nowe logowanie za %1% sek.";
        text[LANGUAGE]["remaining"]="Remaining";
        text[LANGUAGE]["requestingUpdateInfoOfX"]="Sprawdzam dostepne aktualizacje %1% ..."
        text[LANGUAGE]["requestingUserStatistic"]="Sprawdzam statystyki uzytkownika ...";
        text[LANGUAGE]["requirement"] = "Potrzeba";
        text[LANGUAGE]["requirementPerProduction"] = "Wymagane do produkcji";
        text[LANGUAGE]["reward"] = "Nagroda";
        text[LANGUAGE]["salesLog"]="Log sprzedazy";
        text[LANGUAGE]["save"] = "Zapis";
        text[LANGUAGE]["saveAsTemplate"] = "Zapisz jako szablon";
        text[LANGUAGE]["sawmill"] = "Tartak";
        text[LANGUAGE]["scriptHomepage"] = "Strona skryptu";
        text[LANGUAGE]["searchPlayer"] = "Szukaj gracza";
        text[LANGUAGE]["seed"]="Seed";
        text[LANGUAGE]["seedPerField"]="Seed per field";
        text[LANGUAGE]["sendContract"] = "Wyslac umowe";
        text[LANGUAGE]["sendingXObservedPricesToServer"]="Wysylanie %1% obserwowanych cen na serwer ...";
        text[LANGUAGE]["sentContractNrX"]="Wyslij umowe nr %1%."
        text[LANGUAGE]["server"] = "Serwer";
        text[LANGUAGE]["serverTime"] = "Czas serwera";
        text[LANGUAGE]["sessionEnd"] = "Koniec sesji o %1% - Kliknij by zalogowac ponownie";
        text[LANGUAGE]["seedVendor"] = "Sklep";
        text[LANGUAGE]["seedVendorShort"]="Sklep"; // Short for the seller of plants
        text[LANGUAGE]["shadowboxitem"]="Shadowbox item";
        text[LANGUAGE]["shortHours"] = "h";
        text[LANGUAGE]["shortOClock"] = "h";
        text[LANGUAGE]["shouldReload"] = "Powinienes odswiezyc strone.";
        text[LANGUAGE]["showAll"] = "Pokaz wszystko";
        text[LANGUAGE]["showChangelog"]="Show changelog";
        text[LANGUAGE]["showLog"] = "Pokaz log";
        text[LANGUAGE]["showMissingProducts"]="Pokaz braki produktowe";//?
        text[LANGUAGE]["showPasswords"] = "Pokaz haslo";
        text[LANGUAGE]["sinceX"] = "od %1%";
        text[LANGUAGE]["single"] = "Pojedynczo";
        text[LANGUAGE]["start"] = "Start";
        text[LANGUAGE]["stat_days1"] = "1 dzien";
        text[LANGUAGE]["stat_days3"] = "3 dni";
        text[LANGUAGE]["stat_days5"] = "5 dni";
        text[LANGUAGE]["stat_days7"] = "7 dni";
        text[LANGUAGE]["stat_gamefield"] = "Pokaz gre";
        text[LANGUAGE]["stat_stats"] = "Pokaz statystyki";
        text[LANGUAGE]["statistics"] = "Statystyki";
        text[LANGUAGE]["stock"] = "Ilosc";
        text[LANGUAGE]["stockValue"] = "Wartosc towaru";
        text[LANGUAGE]["stockXlow"] = "Malo produktu: %1%";
        text[LANGUAGE]["stockXmissing"] = "Brakuje produktu: %1%!!!";
        text[LANGUAGE]["storeXinContract"] = "Przenies %1% do umowy";
        text[LANGUAGE]["summarize"] = "Analiza obrotów";
        text[LANGUAGE]["takeObservedPrices"] = "Przyjmij srednia rynkowa";
        text[LANGUAGE]["time"] = "Czsa";
        text[LANGUAGE]["title"] = "Nazwa";
        text[LANGUAGE]["toMessage"] = "do wiadomosci";
        text[LANGUAGE]["toSeedVendor"] = "Idz do sklepu";
        text[LANGUAGE]["total"] = "Ogólem";
        text[LANGUAGE]["turnover"] = "Obrót";
        text[LANGUAGE]["unitPrice"] = "Cena jedn.";
        text[LANGUAGE]["upgradeForX"] = "Rozbudowa&nbsp;za&nbsp;%1%";
        text[LANGUAGE]["upgradeLevel"] = "Podnies poziom";
        text[LANGUAGE]["upjersAdvertising"] = "Upjers-Advertising";
        text[LANGUAGE]["useQuestProducts"] = "Uzyj towarów z biezacego Questa";
        text[LANGUAGE]["userscriptNotStarted"]= "The userscript is not started completely.";
        text[LANGUAGE]["useWildcard"]= "Uzyj * aby oznaczyc jedna lub wiecej liter.";
        text[LANGUAGE]["value"] = "Wartosc";
        text[LANGUAGE]["version"]="Version";
        text[LANGUAGE]["veterinary"]="Veterinary";
        text[LANGUAGE]["veterinaryLevelXNeeded"]="Veterinary level %1% needed";
        text[LANGUAGE]["waterBonus"] = "%1%% bonus podlewania";
        text[LANGUAGE]["wateringFeature"] = "Maszyna nawadniajeaca";
        text[LANGUAGE]["waterNeeded"] = "Wymaga podlania";
        text[LANGUAGE]["waterNeededAtX"] = "Trzeba podlac o %1%";
        text[LANGUAGE]["waterNeededAtX_day1"] = "Trzeba podlac jutro o %1%";
        text[LANGUAGE]["windmill"] = "Mlyn";
        text[LANGUAGE]["writeMessage"] = "Wyslij wiadomosc";
        text[LANGUAGE]["XIsUpToDate"]="%1% jest aktualny."
        text[LANGUAGE]["yes"] = "Tak";
        text[LANGUAGE]["yield"] = "Plon";
        text[LANGUAGE]["yieldPerProduction"] = "Efekt produkcji";
        text[LANGUAGE]["youAreOnRankX"]="Jestes na miejscu %1%.";
        // category
        text[LANGUAGE]["category_c"]=text[LANGUAGE]["coins"];
        text[LANGUAGE]["category_v"]="Rosliny";
        text[LANGUAGE]["category_e"]="Produkty zwierzece";
        text[LANGUAGE]["category_z"]=unsafeWindow.rack_deco;
        text[LANGUAGE]["category_o"]=unsafeWindow.rack_oil;
        text[LANGUAGE]["category_f1"]="Sadzonki";
        text[LANGUAGE]["category_f2"]="Pnie";
        text[LANGUAGE]["category_f3"]="Produkty tartaku";
        text[LANGUAGE]["category_f4"]="Produkty stolarni";
        text[LANGUAGE]["category_f5"]="Produkty drewniane";
        text[LANGUAGE]["category_fw"]=unsafeWindow.rack_foodworld;
        text[LANGUAGE]["category_fw1"]="Napoje";
        text[LANGUAGE]["category_fw2"]="Przekaski";
        text[LANGUAGE]["category_fw3"]="Ciasta";
        text[LANGUAGE]["category_fw4"]="jeszcze niedostepne";
        text[LANGUAGE]["category_fl"]="Flowers";
        text[LANGUAGE]["category_fla"]="Arrangements";
        text[LANGUAGE]["category_hr"]="Medicinal herb";
        text[LANGUAGE]["category_md"]="Healing tincture";
        text[LANGUAGE]["category_r0"]="Przepisy - produkty";
        text[LANGUAGE]["category_r1"]="Przepisy - zwiekszajace wydajnosc";
        text[LANGUAGE]["category_r2"]="Przepisy - dajace punkty";
        text[LANGUAGE]["category_p0"]="Power-Ups - produkty";
        text[LANGUAGE]["category_p1"]="Power-Ups - zwiekszajace wydajnosc";
        text[LANGUAGE]["category_p2"]="Power-Ups - dajace punkty";  
        // settings
        text[LANGUAGE]["settings_valAutoWater"]=["Automatyczne podlewanie", "Rosliny beda automatycznie podlewane (jesli masz konto Premium)."];
        text[LANGUAGE]["settings_valAssumeWater"]=["Kontynuuj podlewanie", "Jest to wazne dla roslin rosnacych dluzej niz 24h. Na podstawie przewidywanego czasu zbioru jesli podlewanie jest mozliwe, to jest kontynuowane."];
        text[LANGUAGE]["settings_valAutoCrop"]=["Automatyczne zbiory", "Po wejsciu na pole wszystkie plony zostana automatycznie zebrane."];
        text[LANGUAGE]["settings_valWaterNeeded"]=["Info o podlewaniu","Czy ma byc wyswietlana ikona informujaca o niepodlanym polu?"];        
        text[LANGUAGE]["settings_valCropMsg"]=["Autozamykanie zbiorów", "Zaznacz jesli denerwuje cie wyskakujaca plansza z iloscia zebranych plonów."];
        text[LANGUAGE]["settings_valLimitEmptyFields"]=["Puste miejsca", "Jesli ilosc pustych miejsc przekroczy ta wartosc, to pole bedzie oznaczone jako puste."];
        text[LANGUAGE]["settings_valLimitEmptyFields_forest"]=["Puste miejsca w lesie", "Jesli ilosc pustych miejsc przekroczy ta wartosc, to pole bedzie oznaczone jako puste."];
        text[LANGUAGE]["settings_valMoveAnimals"]=["Ruchome zwierzaki", ""];
        text[LANGUAGE]["settings_valContractLogAmount"]=["Ilosc zachowanych umów", "Twoje ostatnio wyslanie i otrzymane umowy beda zachowane i bedzie mozna przejrzec ich historie."];
        text[LANGUAGE]["settings_valFarmiLimits"]=["Limit Klientów", "Klienci sa oznaczani trzema kolorami zaleznie od oplacalnosci ich oferty."];
        text[LANGUAGE]["settings_valFarmiMiniInfo"]=["Mini Info Klienta", "Wyswietla male kólko pod klientem zaleznie od oplacalnosci jego oferty."];
        text[LANGUAGE]["settings_valMinRackMan"]=["Minimalne ilosci", "Mozesz ustalic dokladna ilosc *tutaj*"];
        text[LANGUAGE]["settings_valMinRack"]=[, " Produkt jest oznaczany, jesli jego ilosc w regale spadnie ponizej tego poziomu. Mozesz ustalic rózne wartosci zaleznie od kategorii."];
        text[LANGUAGE]["settings_valMinRackPlantsize"]=["Uwzglednij rozmiar sadzonki", "Przykladowo zboze potrzebuje tylko polowe powyzszej wartosci."];
        text[LANGUAGE]["settings_valMinRackGrowing"]=["Produkcja w toku", "Uwzglednia ilosc produktów bedacych w trakcie produkcji/wzrostu i gotowych przez bonusy."];
        text[LANGUAGE]["settings_valMinRackQuest"]=["Produkty do Questów","Uwzglednia ilosc potrzebna do wykonania Questa."];   
        text[LANGUAGE]["settings_valMinRackRecursive"]=["Produkty rekurencyjnie", "Dodaj produkty wymagane do produkcji brakujacych towarów i przelicz ponownie dla takiego stanu (uzyteczne przy produkcji lesnej)"];
        text[LANGUAGE]["settings_valMinRackFarmis"]=["Produkty klientów", "Dodaje ilosc produktów potrzebnych dla klientów, którzy placa wiecej niz ustalone minimum."]
        text[LANGUAGE]["settings_valMinRackForestryFarmis"]=["Produkty klientów Lasu", "Dodaje ilosc produktów potrzebnych dla klientów Lasu."];
        text[LANGUAGE]["settings_protectMinRack"]=["Ochrona sprzedazy", "Sprzedajac na targu zostawi w regale ustalone minimum towaru"];
        text[LANGUAGE]["settings_valBuyingLimitDown"]=["Podswietlenie ceny ponizej minimum", ""];
        text[LANGUAGE]["settings_valBuyingLimit"]=["Górny limit zakupu", "Zaznaczasz do jakiej granicy chcesz kupowac na targu. To chroni przed zakupem zbyt drogich produktów na targu."];
        text[LANGUAGE]["settings_valBuyingLimitNPC"]=["Blokada zakupów", "Pozwól na zakupy tylko do ceny sklepowej"];
        text[LANGUAGE]["settings_valSellingLimit"]=["Limity sprzedazy", "Zakres w jakim twoja sprzedaz bedzie chroniona, abys nie sprzedal swoich plonów zbyt tanio lub za drogo.."];
        text[LANGUAGE]["settings_valJoinPrices"]=["Uprosc sprzedaz", "Polaczy w jedno pola ceny na twoim straganie (ulatwia wprowadzanie cen)."];
        text[LANGUAGE]["settings_valQuicklinks"]=["Szybki przeglad rynku (ikony)", "Pokazuje wysuwany pasek z ikonami dostepnych towarów (z prawej)"];
        text[LANGUAGE]["settings_valUseObservedPrices"]=["Uzyj srednich cen", "Podczas przegladania cen na targu sa one notowane i usredniona cena jest wykazywana w tabeli cen. Czy automatycznie ma ona byc przyjmowana jako rynkowa?"];
        text[LANGUAGE]["settings_valSendStatistics"]=["Wyslij statystyki", "Wspomaga <a href='http://mff.metrax.eu/' target='_blank'>Statistik-Server</a>.  Dane prywatne nie sa wysylane!"];
        text[LANGUAGE]["settings_valPrivateMessages"]=["Ilosc zachowanych prywatnych wiadomosci", "Liczba prywatnych wiadomosci, które zostana zachowane, aby umozliwic przeglad historii danej umowy"];
        text[LANGUAGE]["settings_valMarketMessages"]=["Ilosc zachowanych rynkowych wiadomosci", "Zaznacz ile wiadomosci ma byc przechowywanych, nawet jesli sa starsze niz maksymalnie 7 dni."];
        text[LANGUAGE]["settings_valMessageRe"]=["Skrót tematu", "Zamienia \"Re:Re:\" na \"Re:\" w temacie wiadomosci, gdy na nia odpowiadasz."];
      text[LANGUAGE]["settings_valMessagesSystemMarkRead"]=["Auto odczyt wiadomosci","Automatycznie odczytywanie wiadomosci systemowych."];
      text[LANGUAGE]["settings_valFoodworldFarmiPlacing"]=["Obsluga klientów strefy pikniku","Klienci stefy pikniku beda automatycznie umieszczani na wolnych miejscach."]; 
        text[LANGUAGE]["settings_valAutoLogin"]=["Automatyczne logowanie", "Po wprowadzeniu nazwy uzytkownika i hasla nastepuje automatyczne logowanie. Pozwala to zachowac ciaglosc grania. Przy wielu kontach musi byc dozwolone wyskakiwanie okienek."];
        text[LANGUAGE]["settings_valUpdate"]=["Aktualizacja", "Automatycznie sprawdza czy jest nowsza wersja tego skryptu."];
        text[LANGUAGE]["settings_valServerTimeOffset"]=["Czas serwera", ""];
        text[LANGUAGE]["settings_valGamecursor"]=["Kursor gry", "Uzyj kursora gry zamiast systemowego."];
        text[LANGUAGE]["settings_valDrag"]=["Przesuwanie", "Pozwala na przesuwanie okien po kliknieciu na lewy górny róg."];
        text[LANGUAGE]["settings_valClickErrorbox"]=["Ukryj okno bledu", "Niektórzy uzytkownicy maja problemy z oknem bledu. Pamietaj jednak, ze zasadniczo jest ono przydatne!"];
        text[LANGUAGE]["settings_valHotkeys"]=["Hotkeys", "Uzywanie klawiszy pozwala na szybsze poruszanie sie po grze."];
        text[LANGUAGE]["settings_hotkeymap"]={"prevPage": "poprzednia wiadomosc, pole, ...","nextPage": "nastepna wiadomosc, pole, ...",      "farm1": "1-sza farma","farm2": "2-ga farma","farm3": "3-cia farma","guild": "Klub","city1": "Pierwsze miasto","city2": "Drugie miasto","farmilog": "Farmi-Log","help": "Pomoc","market": "Targ","marketstand": "Market stand","messages": "Wiadomosci","options": "Opcje","profit": "Kalkulator zysków","sgh": "Sklep z nasionami","overview": "Przeglad","contract": "Umowy","systemmessage": "wiadomosci systemowe"    };
        text[LANGUAGE]["settings_valzoneAddToGlobalTime"]=["Zintegruj", "Czy czas produkcji ma byc wliczony do czasu ogólnego?"];
        text[LANGUAGE]["settings_valGlobaltimeShowCroppedZone"]=["Zintegruj zebrane pola", "Czy doliczyc do ogólnego czasu pola juz zebrane?"];
        text[LANGUAGE]["settings_cacheReset"]=["Cache reset", "Usuwanie wszystkich danych zapisanych przez ten skrypt..."];
        text[LANGUAGE]["settings_zoneReset"]=["Zones reset","All information about your farms will be deleted ..."];
        text[LANGUAGE]["settings_setQuestMain"]=["Questseries","Main questseries are declared terminated ..."];
        text[LANGUAGE]["settings_setQuestMain3"]=["Overwrite Questseries 3","The questnumber of main questseries 3 is set to the mff-questnumber."];
        text[LANGUAGE]["settings_setQuestMain3_1"]=["Execute","The questnumber of main questseries 3 is set to the chosen number. Please use it carefully ..."];
        text[LANGUAGE]["settings_megafieldSmartTimer"]=["Integrate active tour", "Megafield-Timer is set to end of the tour after a tour is started."];
        text[LANGUAGE]["settings_clothingDonation"]=["Clothing Donation", "A blinking icon indicates, when you can donate or gamble."];
        //help
        text[LANGUAGE]["help_0"]=[,"Oto skrócona instrukcja funkcji dostepnych w Doradcy Farmera. Nie sa tu opisane wszystkie, gdyz skrypt stale sie rozwija. Aby odkryc niektóre wystarczy najechac na nie myszka. <br>Na dole strony widac przycisk opcji, mozesz tam dopasowac skrypt do swoich wymagan.<br> Generalnie skrypt wie tylko tyle ile zobaczy i ustalisz, wiec w razie jakichs problemów radze tam zajrzec"];
        text[LANGUAGE]["help_1"]=["Pola","Po wejsciu na pole skrypt zapisuje co jest produkowane, czas produkcji oraz czy rosliny sa podlane. Informacje sa pózniej wyswietlane w widoku farmy. Kazde pole ma wlasny licznik czasu, odliczajacy czas do zbioru.<br> Jesli masz wlaczona pomoc w sianiu to jest ona dostepna pod ikonka kwiatka. Na górze pola sa umieszczone strzalki pozwalajace na przemieszczanie sie miedzy polami"];
        text[LANGUAGE]["help_2"]=["Przeglad","Klikniecie na swinke na górze ekranu wyswietla przeglad informacji o calej farmie. Opisane jest tu kazde pole, jego obecny stan (produkcja, punkty oraz czas zakonczenia). Podawana jest tez suma wszystkich zbiorów.<br> Ponizej wyswietlany jest spis brakujacych produktów zadanych przez klientów. Zas nizej szczególowe zestawienie zamówien, w którym wyliczone sa zadane produkty (braki oznaczone na czerwono), sugerowana cena, wartosc rynkowa i nasz zysk.<br> Klikajac na dany produkt (w zestawieniu braków lub indywidualnym) przeniesiesz sie prosto na targ, abys mógl go kupic.<br> Mozesz tez przejsc do wybranego pola lub klienta po klikajac na nie."];
        text[LANGUAGE]["help_3"]=["Niebieski pasek","Zdobywane punkty sa codziennie zliczane, a ich ilosc pokazywana na niebieskim pasku u dolu ekranu. Czarna kreska oddziela poziom poprzedni i biezacy, kreski biale oddzielaja dni, zas czerwona oznacza niedziele.<br> Klikniecie na ten pasek wyswietli tabele zdobywanych punktów oraz braki w produktach"];
        text[LANGUAGE]["help_4"]=["Regal","Przedstawione tu informacje zostaly rozszerzone o ceny oraz wartosc towaru. Kolorem zaznaczone sa towary, których jest za malo do zrealizowania zamówienia klientów."];
        text[LANGUAGE]["help_5"]=["Kalkulator zysków","U dolu planszy jest znaczek <img src=\"" + GFX + "buildingupdatebutton_off.png\" style=\"width: 15px; height: 15px;\">. Klikniecie na niego otwiera tabele zawierajaca wyliczony czas zbiorów, ilosc zdobywanych punktów oraz przewidywane zyski. Klikniecie na gwiazdki zwieksza poziom dla danego towaru, zas na naglówki kolum - sortuje dane wzgledem danej kolumny"];
        text[LANGUAGE]["help_6"]=["Klienci","Dymki nad klientami zostaly rozszerzone o kalkulacje czy zamówienie jest oplacalne. Towary, których jest za malo sa oznaczone czerwona ramka.<br> Na niebieskim pasku z prawej mozesz ustalic poziom oplacalnosci ponizej którego klienci sa odsylani. <br>Tabela pozwala sie zorientowac jakie zyski osiagnieto z handlu z klientami"];
        text[LANGUAGE]["help_7"]=["Hotkeys","Mozesz szybko przenosic sie przy uzyciu klawisza <i>Alt</i>+... zobacz w Opcjach!"];
        text[LANGUAGE]["help_8"]=["Targowisko","Na targu jestes \"chroniony\", co znaczy, ze nie mozesz kupic towaru drozej niz w sklepie lub poza ustalonym w opcjach przedzialem. Jesli wlaczony jest 'szybki przeglad rynku', to mozesz przejsc do wybranego towaru przez wysuwane boczne okno.<br> Z lewej u góry sa strzalki pozwalajace zmieniac towar oraz wyswietlana jest ilosc danego towaru.<br> Na dole zas jest bardzo wazny przycisk: CENY.<br> Zawiera on zestawienie ilosci towarów oraz Arednich cen po jakich jest on wystawiany oraz ustalanej przez ciebie. Ceny te sa wykorzystywane w wielu miejscach, wiec dbaj by byly aktualne.\" Srednia rynkowa\" jest ustalana, gdy odwiedzasz strone danego towaru. Na twoim straganie wyswietlane jest kilka przydatnych informacji, zapamietywana jest tez twoja ostatnia oferta."];
        text[LANGUAGE]["help_9"]=["Wiadomosci","Twoja sprzedaz jest monitorowana i wyswietlana od razu, wiec nie trzeba klikac dwa razy.<br> Przydatny na pewno bedzie przycisk \"Wszystkie przeczytane\" pozwalajacy za jednym kliknieciem oznaczyc wszystkie wiadomosci. <br> Zas przycisk \"Log\" zawiera zestawienie zapamietanych wiadomosci oraz analizy sprzedazy towarów na targu. <br>Twoje wiadomosci prywatne sa równiez zapamietywane, wiec znacznie latiwej obsluguje sie umowy."];
        text[LANGUAGE]["help_10"]=["Umowy","Sa równiez zapamietywane. Podczas tworzenia umowy w bocznym oknie wyswietlana jest wiadomosc zródlowa, aby latwiej bylo skompletowac towar. Na biezaco pokazywana jest wartosc wysylanego towaru. Mozna wysylac wiele razy ta sama umowe."];
        text[LANGUAGE]["help_11"]=["Obsluga kont","Mozesz zapisac wszystkie swoje konta w opcjach. Pozwala to na latwe logowanie przy pomocy przycisków wyswietlanych na stronie startowej. Dzieki temu mozesz przelaczac sie miedzy kontami na tym samym serwerze."];

        text[LANGUAGE]["automat"] = "Automat";
        text[LANGUAGE]["automat_planting"] = "Wysiewanie...";
        text[LANGUAGE]["automat_waiting"] = "Oczekiwanie...";
        text[LANGUAGE]["automat_watering"] = "Podlewanie...";
        text[LANGUAGE]["automat_feeding"] = "Karmienie...";
        text[LANGUAGE]["automat_automatPlanting"] = "AutoZasiewy...";
        text[LANGUAGE]["automat_automatFeeding"] = "AutoKarmienie...";
        text[LANGUAGE]["automat_automatFactory"] = "AutoProdukcja...";
        text[LANGUAGE]["automat_automatMegafield"] = "Megafield machine";
        text[LANGUAGE]["automat_automatWindmill"] = "AutoMlyn...";
        text[LANGUAGE]["automat_botStart"] = "Startuj Auto-Bota";
        text[LANGUAGE]["automat_botStop"] = "Zatrzymaj Auto-Bota";
        text[LANGUAGE]["automat_settings_botErrorBehaviour"] = "Behaviour of Automaton in case of errors";
        text[LANGUAGE]["automat_settings_pageReload"] = "Reload of page";
        text[LANGUAGE]["automat_settings_botRestart"] = "Restart bot";
        text[LANGUAGE]["automat_zonePairing"] =  "Laczenie pól";
        text[LANGUAGE]["automat_debugInfo"] = "Debug Info";
        text[LANGUAGE]["automat_windmill"] ="Mlyn";
        text[LANGUAGE]["automat_timing"] = "Czas";
        text[LANGUAGE]["automat_general"] =  "Ogólne";
        text[LANGUAGE]["automat_development"] = "Development";
        text[LANGUAGE]["automat_arrivedInFarm"] = "Arrived in farm";
        text[LANGUAGE]["automat_changeToFarmX"] = "Going to farm %1%";
        text[LANGUAGE]["automat_changingToX"] = "Going to %1%";
        text[LANGUAGE]["automat_closingFieldContainer"] = "Closing field";
        text[LANGUAGE]["automat_closingFactoryContainer"] = "Closing factory";
        text[LANGUAGE]["automat_closingStableContainer"] = "Closing stable";
        text[LANGUAGE]["automat_openingZoneX"] = "Opening zone %1%";
        text[LANGUAGE]["automat_zoneXIsOpened"] = "Zone %1% is opened";
        text[LANGUAGE]["automat_confirmChangelogVersion"]="You have installed a new version of the Automaton script.<br>The version %1% contains the following changes:";
        text[LANGUAGE]["automat_maximumStockCapacityReached"]="Maximum stock capacity will be reached.";
        text[LANGUAGE]["automat_nothingToCrop"]="Nothing to crop.";
        text[LANGUAGE]["automat_cropWaitingInX"]="Waiting for crop in %1%.";
        text[LANGUAGE]["automat_plantingAtX"]="Planting at %1%.";
        text[LANGUAGE]["automat_plantingNoFreeField"]="No free field to plant.";
        text[LANGUAGE]["automat_plantingSetX"]="Setting plant \"%1%\".";
        text[LANGUAGE]["automat_queueItemAmountDecreased"]="Queue item amount decreased..";
        text[LANGUAGE]["automat_queueItemDeleted"]="Queue item deleted.";
        text[LANGUAGE]["automat_responseWaiting"]="Waiting for response.";
        text[LANGUAGE]["automat_stopAdding"]="Adding stop to queue.";
        text[LANGUAGE]["automat_tourStarting"]="Starting tour.";
        text[LANGUAGE]["automat_vehicleNotKnown"]="No vehicle known.";
        text[LANGUAGE]["automat_vehicleXNotAvailable"]="Vehicle \"%1%\" not available.";
        text[LANGUAGE]["automat_vehicleXBuying"]="Buying vehicle \"%1%\".";
        text[LANGUAGE]["automat_vehicleXSelected"]="Vehicle \"%1%\" is selected.";
        text[LANGUAGE]["automat_msgUpdate"] = "Jest nowa wersja skryptu automatyzacji. Zainstalowac?";
        text[LANGUAGE]["automat_shouldUpdateAdviser"] = "Powinienes zaktualizowac skrypt Doradcy!<br> Inaczej Automat nie bedzie dzialal prawidlowo.";
        text[LANGUAGE]["automat_settings_autoPlant"] = "Czy wyswietlac ikony automatyzacji siewu?";
        text[LANGUAGE]["automat_settings_autoWater"] = "Czy pola maja byc podlewane?";
        text[LANGUAGE]["automat_settings_autoFeed"] = "Czy wyswietlac ikony automatyzacji karmienia?";
        text[LANGUAGE]["automat_settings_botUse"] = "Uzyj bota";
        text[LANGUAGE]["automat_settings_disableCropFields"]="Blokuj zbiory na uspionych polach";
        text[LANGUAGE]["automat_settings_donating"] = " to automatically donate in case the exchange is favorable.";
        text[LANGUAGE]["automat_settings_gambling"] = " to automatically gamble in case the exchange isn't favorable.";
        text[LANGUAGE]["automat_settings_pauseShortMin"] = "Minimalna zwloka dla automatyzacji siewu";
        text[LANGUAGE]["automat_settings_pauseShortMax"] = "Maksymalna zwloka dla automatyzacji siewu";
        text[LANGUAGE]["automat_settings_pauseMin"] = "Minimalny czas oczekiwania miedzy operacjami";
        text[LANGUAGE]["automat_settings_pauseMax"] = "Maksymalny czas oczekiwania miedzy operacjami";
        text[LANGUAGE]["automat_settings_maxDurationBotRun"] = "Maximal running time of the automaton";
        text[LANGUAGE]["automat_settings_maxDurationBotStep"] = "Maximal running time for a step of the automaton";
        text[LANGUAGE]["automat_setToDefault"] = "Przywróc domyslne";
        text[LANGUAGE]["automat_settings_seedWaitForCrop"] ="Czekaj z zasiewem, jesli do kolejnego zbioru to mniej niz";
        text[LANGUAGE]["automat_emergencyPlants"] = "Rosliny rezerwowe. Sa uzywane jesli wymagane rosliny nie sa dostepne lub sie skoncza.";
        text[LANGUAGE]["automat_settings_useQueueList"] = "Uzyj listy zasiewów dla pól.";
        text[LANGUAGE]["automat_set12a"] = "Usun \n listy zasiewów\n dla wszystkich pól";
        text[LANGUAGE]["automat_set12b"] = "Usuwanie zakonczone.";
        text[LANGUAGE]["automat_settings_showQueueTime"] = "Pokaz skalkulowany czas zbiorów na liscie.";
        text[LANGUAGE]["automat_set18a"] ="Usun wszystkie listy prac dla mlyna";
        text[LANGUAGE]["automat_set18b"] = "Usuwanie zakonczone";
        text[LANGUAGE]["automat_settings_powerUpActivate"] = "Aktywuj powerupy dla produktów";
        text[LANGUAGE]["automat_settings_lotteryActivate"] = "Automatycznie aktywuj dzienna loterie";
        text[LANGUAGE]["automat_settings_lotteryDailyLot"] = "Zaznacz, aby automatycznie odebrac nagrode";
        text[LANGUAGE]["automat_settings_questActivate"] = "Aktywuj Quest automatycznie do questa:";
        text[LANGUAGE]["automat_settings_questSolving"] =  "Wykonaj Quest automatycznie do questa:";
        text[LANGUAGE]["automat_settings_farmiReject"] =  "Odrzucaj klientów ponizej :";
        text[LANGUAGE]["automat_settings_farmiAccept"] = "Akceptuj klientów powyzej:";
        text[LANGUAGE]["automat_settings_farmiAcceptBelowMinValue"] = "Akceptuj klientów, których obsluga spowoduje spadek towaru w Regale ponizej minimum.";
        text[LANGUAGE]["automat_settings_farmiRemoveMissing"] = "Usuwaj klientów dla których brakuje towaru i z najnizsza wydajnoscia. Próg:";  
        text[LANGUAGE]["automat_fields"] = "Pola";
        text[LANGUAGE]["automat_titleGeneral"] = "Lista glówna";;
        text[LANGUAGE]["automat_titleQueue"] = "Lista";
        text[LANGUAGE]["automat_QueCopyTextHeader"] = "Kopiuj liste";
        text[LANGUAGE]["automat_QueCopyTextHeaderFrom"] = "Kopuj z:";
        text[LANGUAGE]["automat_QueCopyTextHeaderTo"] = "Kopuj do:";
        text[LANGUAGE]["automat_QueAddText"] = "Kliknij aby dodac produkt do listy."; //Add product
        text[LANGUAGE]["automat_QueAddAboveText"] = "Kliknij aby dodac produkt do listy przed ta pozycja.";
        text[LANGUAGE]["automat_QueDeleteText"] = "Usun ten produkt z listy.";
        text[LANGUAGE]["automat_QueClose"] = "Zamknij to menu";
        text[LANGUAGE]["automat_QueCloseAll"] = "Zamknij wszystkie otwarte listy zasiewów.";
        text[LANGUAGE]["automat_QueMin"] = "Zmniejsz wartosc";
        text[LANGUAGE]["automat_QuePlus"] = "Zwieksz wartosc";
        text[LANGUAGE]["automat_QueBehaviourF"] = "Kliknij aby przejsc do trybu Regalu";
        text[LANGUAGE]["automat_QueBehaviourR"] = "Kliknij aby przejsc do trubu Pól";
        text[LANGUAGE]["automat_QueUpButton"] = "W góre";
        text[LANGUAGE]["automat_QueDownButton"] = "W dól";
        text[LANGUAGE]["automat_buttonTimeLine"] = "Pokaz linie czasowe prac";
        text[LANGUAGE]["automat_buttonOverview"] = "Pokaz przeglad automatyzacji";
        text[LANGUAGE]["automat_repeat_on"] = "Zapetlenie listy: TAK, kliknij aby wylaczyc.";
        text[LANGUAGE]["automat_repeat_off"] = "Zapetlenie listy: NIE, kliknij aby wlaczyc.";
        text[LANGUAGE]["automat_shuffle_on"] = "Losowe zasiewy: TAK, kliknij aby wylaczyc.";
        text[LANGUAGE]["automat_shuffle_off"] = "Losowe zasiewy: NIE, kliknij aby wlaczyc.";
        text[LANGUAGE]["automat_rotate"] = "Rotacja: przesun towary o jedna pozycje (pierwszy na koniec)";
        text[LANGUAGE]["automat_stop"] = "STOP";
        text[LANGUAGE]["automat_week"] = "tydzien";
        text[LANGUAGE]["automat_inftext"] = "w nieskonczonosc";
        text[LANGUAGE]["automat_removeAllWeed"] = "Usun wszystkie %AMOUNT% %PROD%<br>za szt. = %COST%<br>razem = %TCOST%";
        text[LANGUAGE]["automat_usedFarmFieldsReadyAt"] = "Uzyte pola gootowe o:";
        text[LANGUAGE]["automat_CloseWindowTimer"] = "Zamkniecie ekranu za :%1%";
        text[LANGUAGE]["automat_CloseWindowTimerClick"] = "Kliknij aby zresetowac timer!";
        //%PRODNAME% = product name, %FLDFROM% = field nr from, %FLDTO% = field nr until,
        text[LANGUAGE]["automat_QueDoWork"] = "Pole obslugiwane przez bota";
        text[LANGUAGE]["automat_QueDontWork"] = "Pole ignorowane przez bota";
        text[LANGUAGE]["automat_QueueStoped"] = "Wykryto wstrzymanie produkcji. %PRODNAME% nie bedzie dalej siany.";
        text[LANGUAGE]["automat_QueStop0"] = "Proces automatycznych zasiewów zostanie zatrzymany.";
        text[LANGUAGE]["automat_QueStop1"] = "Po obsianiu %FLDFROM% pola proces automatycznych zasiewów zostanie zatrzymany.";
        text[LANGUAGE]["automat_QueStopX"] =  "Po obsianiu %FLDFROM% pól proces automatycznych zasiewów zostanie zatrzymany.";
        text[LANGUAGE]["automat_QueRepeat"] = "(Tryb powtarzania)";
        text[LANGUAGE]["automat_QueShuffle"] = "(Tryb losowy)";
        text[LANGUAGE]["automat_QueRepeatShuffle"] = "(Tryb losowy powtarzalny)";
        text[LANGUAGE]["automat_QueFieldInRow1"] = "(Nr. %FLDFROM%)";
        text[LANGUAGE]["automat_QueFieldInRowX"] = "(Nr. %FLDFROM% to %FLDTO%)";
        text[LANGUAGE]["automat_QueRoundDoneR"] = "Te pola %PRODNAME% sa juz zagospodarowane i zostana pominiete";
        text[LANGUAGE]["automat_QueRoundDone1"] = "Na tym polu %PRODNAME% zostal wysiany w tej turze, <br/>w kolejnej turze bedzie wysiany ponownie.";
        text[LANGUAGE]["automat_QueRoundDoneX"] = "Na tych polach %PRODNAME% zostaly wysiane w tej turze, <br/>w kolejnej turze beda wysiane ponownie.";
        text[LANGUAGE]["automat_QueFieldMake"] =  "Ogólem:";
        text[LANGUAGE]["automat_QueFieldToGo"] = "Pozostalo:";
        text[LANGUAGE]["automat_QueRoundMake"] = "W kazdej turze: ";
        text[LANGUAGE]["automat_QueRoundMade"] = "Wyprodukowano:";
        text[LANGUAGE]["automat_QueRoundToGo"] = "Pozostalo:";
        text[LANGUAGE]["automat_QueUses"] = "Uzyto:";
        text[LANGUAGE]["automat_QueGives"] = "Plon:";
        text[LANGUAGE]["automat_QueFutter"] = "Zysk czasowy:";
        text[LANGUAGE]["automat_QueTimeThis"] =  "Czas produkcji:";
        text[LANGUAGE]["automat_QueTimeToGo"] =  "Pozostaly czas wzrostu:";
        text[LANGUAGE]["automat_QueTimeReady"] = "Gotowe o:";
        text[LANGUAGE]["automat_QueTimeFirstReady"] = "Pierwsze gotowe o:"
        text[LANGUAGE]["automat_QueTimeNextReady"] = "Nastepne gotowe o:";
        text[LANGUAGE]["automat_QueTimeRound"] =  "Srednio na ture:";
        text[LANGUAGE]["automat_QueRackMode"]="(Tryb regalu)"
        text[LANGUAGE]["automat_queueshow"]="Kliknij aby edytowac kolejke";
        text[LANGUAGE]["automat_zoneXWaiting"]="Zone \"%1%\" is waiting"; 
        //For the Mill
        //%PRODNAME% = product name, %FLDFROM% = field nr from, %FLDTO% = field nr until,
        text[LANGUAGE]["automat_MillQueue"] =  "Lista Mlyna";
        text[LANGUAGE]["automat_MillDoWork"] ="Mlyn jest obslugiwany automatycznie.";
        text[LANGUAGE]["automat_MillDontWork"] = "Mlyn jest pomijany. Wymagana obsluga reczna";
        text[LANGUAGE]["automat_MillClearAddAll"] ="Wyczysc liste mlyna i dodaj ponownie wszystkie przepisy";     
        text[LANGUAGE]["automat_MillShuffle"] = "(Tryb losowy)";
        text[LANGUAGE]["automat_MillInRow1"] = "(Nr. %FLDFROM%)";
        text[LANGUAGE]["automat_MillInRowX"] = "(Nr. %FLDFROM% do %FLDTO%)";
        text[LANGUAGE]["automat_MillTimeTotal"] = "Calkowity czas tworzenia:";
        text[LANGUAGE]["automat_MillTimeReady"] = "Gotowe:";
        text[LANGUAGE]["automat_MillStoped"] = "Wykryto wstrzymanie produkcji. %PRODNAME% nie bedzie dalej tworzony.";
        text[LANGUAGE]["automat_MillStop0"] = "Proces automatycznych wypieków zostanie zatrzymany.";
        text[LANGUAGE]["automat_MillStop1"] =  "Po wykonaniu %FLDFROM% przepisu proces automatycznych wypieków zostanie zatrzymany.";
        text[LANGUAGE]["automat_MillStopX"] = "Po wykonaniu %FLDFROM% przepisów proces automatycznych wypieków zostanie zatrzymany.";
        try{
            text[LANGUAGE]["automat_MillTimeThis"] = top.window.wrappedJSObject.windmill_bakeingtime;
            text[LANGUAGE]["automat_MillPowerUpText_0"] = top.window.wrappedJSObject.powerup_bonustext1;
            text[LANGUAGE]["automat_MillPowerUpText_1"] = top.window.wrappedJSObject.powerup_bonustext2;
            text[LANGUAGE]["automat_MillPowerUpText_2"] = top.window.wrappedJSObject.powerup_bonustext3;
            text[LANGUAGE]["automat_MillIngredients"] = top.window.wrappedJSObject.windmill_zutaten;
        }catch(err){GM_logError("texte mill","","",err);}
        text[LANGUAGE]["automat_number"] ="Numer";
        text[LANGUAGE]["automat_lack"] = "Brak";
        text[LANGUAGE]["automat_MillRecipesBought"] = "Ilosc wypieków ogólem: ";
        text[LANGUAGE]["automat_MillRecipesUsed"] = "Uzyto ogólem przepisów: ";
        text[LANGUAGE]["automat_MillRecipesBake"] ="Max przepisów do zrobienia: ";
        //title
        text[LANGUAGE]["automat_title_on_general"] = "Pokaz tylko Liste Glówna<br>+Ctrl: Pokaz Liste Glówna";
        text[LANGUAGE]["automat_title_off_general"] = "Pokaz tylko Liste Glówna<br>+Ctrl: Schowaj Liste Glówna";
        text[LANGUAGE]["automat_title_on_farm1"] = "Pokaz tylko pierwsza farme<br>+Ctrl: Pokaz pierwsza farme";
        text[LANGUAGE]["automat_title_off_farm1"] = "Pokaz tylko pierwsza farme<br>+Ctrl: Schowaj pierwsza farme";
        text[LANGUAGE]["automat_title_on_farm2"] = "Pokaz tylko druga farme<br>+Ctrl: Pokaz druga farme";
        text[LANGUAGE]["automat_title_off_farm2"] = "Pokaz tylko druga farme<br>+Ctrl: Schowaj druga farme";
        text[LANGUAGE]["automat_title_on_farm3"] = "Pokaz tylko trzecia farme<br>+Ctrl: Pokaz trzecia farme";
        text[LANGUAGE]["automat_title_off_farm3"] = "Pokaz tylko trzecia farme<br>+Ctrl: Schowaj trzecia farme";
        text[LANGUAGE]["automat_title_on_farm4"] = "Pokaz tylko czwarta farme<br>+Ctrl: Pokaz czwarta farme";
        text[LANGUAGE]["automat_title_off_farm4"] = "Pokaz tylko czwarta farme<br>+Ctrl: Schowaj czwarta farme";
        text[LANGUAGE]["automat_title_on_farm5"] = "Show fifth farm only<br>+Ctrl: Show fifth farm";
        text[LANGUAGE]["automat_title_off_farm5"] = "Show fifth farm only<br>+Ctrl: Hide fifth farm";
        text[LANGUAGE]["automat_title_on_farmersmarket"] = "Show farmersmarket only<br>+Ctrl: Show farmersmarket";
        text[LANGUAGE]["automat_title_off_farmersmarket"] = "Show farmersmarket only<br>+Ctrl: Hide farmersmarket";
        text[LANGUAGE]["automat_title_on_megafield"] = "Show megafield only<br>+Ctrl: Show megafield";
        text[LANGUAGE]["automat_title_off_megafield"] = "Show megafield only<br>+Ctrl: Hide megafield";
        text[LANGUAGE]["automat_title_on_city"] = "Show city only<br>+Ctrl: Show city";
        text[LANGUAGE]["automat_title_off_city"] = "Show city only<br>+Ctrl: Hide city";
        text[LANGUAGE]["automat_title_on_forestry"] = "Pokaz tylko las<br>+Ctrl: Pokaz las";
        text[LANGUAGE]["automat_title_off_forestry"] = "Pokaz tylko las<br>+Ctrl: Schowaj las";
        text[LANGUAGE]["automat_title_on_foodworld"] = "Pokaz tylko piknik<br>+Ctrl: Pokaz piknik";
        text[LANGUAGE]["automat_title_off_foodworld"] = "Pokaz tylko piknik<br>+Ctrl: Schowaj piknik";
        text[LANGUAGE]["automat_title_on_type1"] ="Pokaz tylko pola<br>+Ctrl: Pokaz pola";  
        text[LANGUAGE]["automat_title_off_type1"] = "Pokaz tylko pola<br>+Ctrl: Schowaj pola";  
        text[LANGUAGE]["automat_title_on_type2"] = "Pokaz tylko zagrody<br>+Ctrl: Pokaz zagrody";  
        text[LANGUAGE]["automat_title_off_type2"] = "Pokaz tylko zagrody<br>+Ctrl: Schowaj zagrody";  
        text[LANGUAGE]["automat_title_on_type3"] = "Pokaz tylko wytwórnie<br>+Ctrl: Pokaz wytwórnie";   
        text[LANGUAGE]["automat_title_off_type3"] = "Pokaz tylko wytwórnie<br>+Ctrl: Schowaj wytwórnie";
        text[LANGUAGE]["automat_title_on_all"] ="Pokaz listy dla wszystkich farm";
        text[LANGUAGE]["automat_title_off_all"] =  "Ukryj listy dla wszystkich farm";

        //help
        text[LANGUAGE]["automat_help_0"] = [, "Ten skrypt sluzy do automatyzacji produkcji na farmie."];
        text[LANGUAGE]["automat_help_1"] = ["Jak to dziala?", "Jesli klikniesz na dole przycisk '" + text[LANGUAGE]["automat"]["botStart"] + "' rozpocznie sie proces automatyzacji.<br>Mozesz kontynuowac gre samemu dopóki nic nie bedzie gotowe. Wówczas bot rozpocznie symulacje kliniec za uzytkownika. Podczas tego procesu nie powinienes przeszkadzac automatowi."];
        text[LANGUAGE]["automat_help_2"] = ["Pole", "U dolu kazdego pola wyswietlana jest ikona. Jesli ikona pokazuje <div class = \"kp" + PRODSTOP + "\" style = \"display:inline-block;\">&nbsp;</div> to proces automatyzacji jest zatrzymany lub bedzie zatrzymany po zakonczeniu biezacych operacji. Na tym polu nie bedzie nic siane ani produkowane do momentu wybrania innej opcji. Jesli wybrana jest ikona produktu to bedzie on wysiewany/produkowany w nastepnej kolejnosci."];
        text[LANGUAGE]["automat_help_3"] = ["Plan zasiewów", "Jesli w opcjach zaznaczona jest lista zasiewów, klikniecie na ikone rosliny na wybranym polu wyswietla liste produktów, które moga byc uprawiane. Jesli tlo danej pozycji na liscie jest czerwone, to znaczy, ze do listy zostala dodana ikona zatrzymania produkcji gdzies przed ta pozycja."];
        text[LANGUAGE]["automat_help_4"] = ["Zapetlenie", "Ikona \"Zapetlenie listy\" oznacza, ze po wlaczeniu zasiewy beda realizowane \"w petli\" tj. po ostatnim zostanie wysiany pierwszy i tak w kólko."];
        text[LANGUAGE]["automat_help_5"] = ["Losowe zasiewy", "Wlaczenie opcji \"Losowe zasiewy\" spowoduje, ze do uprawy beda wybierane losowo pozycje z listy."];
        text[LANGUAGE]["automat_help_6"] = ["Zagrody", "Na dole kazdej zagrody wyswietlana jest ikona. Jesli pokazuje </div>" + PRODSTOP + "\" style = \"display:inline-block;\">&nbsp;</div> to proces automatyzacji jest zatrzymany lub bedzie zatrzymany po zakonczeniu biezacych operacji. Jesli wyswietlany jest produkt, to bedzie on uzywany w zagrodzie. Po kliknieciu na ikone mozna zmienic produkt oraz ilosc jaka bedzie uzyta do karmienia. Klikniecie na ikone pozwala ustawic ilosc karmy za pomoca suwaka lub zmienic rodzaj karmy."];
        text[LANGUAGE]["automat_help_7"] = ["Przetwórnie", "Na dole kazdej przetwórni równiez jest ikona i podobnie jak w przypadku pól czy zagród wyswietlenie <div class = \"kp" + PRODSTOP + "\" style = \"display:inline-block;\">&nbsp;</div> to proces automatyzacji jest zatrzymany lub bedzie zatrzymany po zakonczeniu biezacych operacji. Wyswietlana inna ikona informuje co jest produkowane obecnie."];
        text[LANGUAGE]["automat_help_8"] = [text[LANGUAGE]["automat_zonePairing"],"W opcji \"" + text[LANGUAGE]["automat"]["zonePairing"] + "\" znaczniki pozwalaja ustalic, które pola wchodza w sklad danej listy zasiewów, co wedlug niej bedzie wysiewane oraz dodac dodatkowe listy zasiewów."];
        text[LANGUAGE]["automat_help_9"] = ["Mlyn", "Lista prodkucji dla mlyna dziala podobnie jak lista zasiewów tylko, ze tu wyrabiane sa przepisy.<br> Lista produkcji dla mlyna posiada dodatkowy przycisk <div class = \"queueButtonAddAll\">&nbsp;</div>, który moze byc wykorzystany do wyczyszczenia biezcej listy i utworzenia nowej na podstawie zakupionych przepisów oraz ilosci produktów w regale. Jesli lista podswietlona jest na zólto to znaczy, ze jest za malo surowców do produkcji wszystkich przepisów.<br><br><b>Uwaga: </b>Przed pierwszym uzyciem, jesli juz zakupilismy, przepisy konieczna jest wizyta u handlarki lub mlynarza, aby automat wczytal zakupione przepisy."];
    }
// Do not edit ********************************************************************************************************
/*
function compareObjectsExistance(obj1,obj2,pre){
    try{
        if(typeof(pre)=="undefined") pre="";
        for(i in obj1){
            if(!obj1.hasOwnProperty(i)){ continue; }
            if(typeof obj2[i] == "undefined"){
                GM_log("miss in 2: "+pre+i);
            }else{
                if(typeof obj1[i] == "object"){
                    compareObjectsExistance(obj1[i],obj2[i],pre+i+" : ");
                }
            }
        }
        for(i in obj2){
            if(!obj2.hasOwnProperty(i)){ continue; }
            if(typeof obj1[i] == "undefined"){
                GM_log("miss in 1: "+pre+i);
            }else{
                if(typeof obj2[i] == "object"){
                    compareObjectsExistance(obj1[i],obj2[i],pre+i+" : ");
                }
            }
        }
    }catch(err){ GM_log("ERROR compareObjectsExistance\n"+err); }
}
window.setTimeout(function(){
    GM_log("START COMPARING");
    compareObjectsExistance(texte,top.unsafeData.texte);
    GM_log("END COMPARING");
},1000);
*/  
    if(undefined===top.unsafeData.COUNTRY){
        top.unsafeData.LANGUAGE=LANGUAGE;
        top.unsafeData.COUNTRY=COUNTRY;
        top.unsafeData.delimThou=delimThou;
        top.unsafeData.regDelimThou=regDelimThou;
        top.unsafeData.regDelimThouShift=regDelimThouShift;
        top.unsafeData.regDelimThouDelete=regDelimThouDelete;
        top.unsafeData.delimDeci=delimDeci;
        top.unsafeData.regDelimDeci=regDelimDeci;
        top.unsafeData.dateFormatDM=dateFormatDM;
        top.unsafeData.dateFormatDMY=dateFormatDMY;
    }    
}catch(err){ GM_log("ERROR\npage="+location.href+"\n"+err); }

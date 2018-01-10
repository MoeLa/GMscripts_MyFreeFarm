// Custom interfaces START
interface String {
    reverse: () => string;
    capitalize: () => string;
}

interface Array<T> {
    equals: (val: T[]) => boolean;
    contains: (val) => boolean;
    shuffle: () => void;
    swap: (v1, v2) => void;
}

interface Object {
    equals: (val) => boolean;
    order: any[];
    sortObj: (sortfkt, descending: boolean) => void;
    isEmpty: () => boolean;
    length: () => number;
    clone: () => any;
    /**
     * 
     * @see https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
     */
    assign(target, ...sources);
}

interface UnsafeData {
    LANGUAGE: string;
    COUNTRY: string;
    prodNameSort: Object;
    prodName: Object;
    prodStock: Object;
    /** Blocked products */
    prodBlock: Object;
    prodTyp: Object;
    delimDeci: string; // ","
    regDelimDeci: string; // ","
    delimThou: string; // "."
    regDelimThou: string; // "."
    beraterVersion: string;
    beraterDone: boolean;

    ALL_ZONES: Object;
    PRODUCT_MAP: Object;
    PRODUCT2BUILDING: Object;
    BUILDING2PRODUCT: Object;
    BUILDINGTYPE: Object;
    BUILDING_SIZE: Object;
    BUILDING_SLOTS: Object;
    BUILDING_INPUT: Object;
    FUELSTATION_INPUT: Object;
    QUESTS: Object;

    gameLocation: Object;
    readyZone: any;
    zones: any;
    prodMinRackInit: any[];
    prodMinRack: any[];
    prodMinRackSettings: any;
    getQuestBestAlternative(arr: any);
    questData: any;
    setCalcToQuest(type, campaign, nr);
    npcSaison: any;

    valAutoWater: any;
    valAutoCrop: any;
    valFarmiLimits: any[];
    zoneAddToGlobalTime: any[];

    ALL_SLOTS: any;
    botConfigData: any;
    currentPowerup: any;
    valWaterNeeded: any;
}

interface Window {
    greaseMonkeyData: UnsafeData;
    wrappedJSObject: Window;
    unsafeData: any;
    toolTip: () => void;
    _GFX: string;
    forestry_user_buildings: any;

    market_filter_name: string;
    market_filter_pid: number;
    market_filter_own: number;
    market_guild_filter: number;

    t_money: string; // "Geld"
    t_points: string; // "Punkte"
    lng_t_premium: string; // "Premium"
    guildquestlist_level: string; // "Level: "

    currentuserlevel: string;

    prodMinRackAddon: {
        newdata: any[];
        busy: boolean;
        add(type, pid, reason, amount);
        remove(type, pid, reason);
        removeAll(type, reason);
    };

    vet_data: VetData;
    pets: Pets;

    produkt_name: any;
    produkt_x: any;
    produkt_y: any;
    produkt_ernte: any;
    produkt_category: any;
    produkt_zeit: any;
    produkt_points: any;
    produkt_level: any;
    produkt_name_forestry: any;

    forestry_unlock: number;
    /** All possible recipes for mill. Note: The array contains only one element that contains 42 recipes in a complicated structure */
    formulas: any[];
    /** All possible buildings. Note: The array contains only one element that contains 23 buildings in a complicated structure */
    buildinginfos: any[];
    /** Information about all farmis. Note: The info is in the first element of the array. */
    farmisinfo: any[];
    /** Waiting farmis */
    farmilist: any[];
    farmisaway: any[];

    /** Current account's power ups */
    poweruprack: {};

    megafield_data: MegafieldData;
    city: number;
    gclr(); // Something for the tutorial
    clr();
    cityname1: string; // "Klein Muhstein"
    premium: number; // e.g. 1
    servertimetime: number;
    farms_data: FarmsData;
    initGuildsearch(); // TODO: Does this function still exist?
    stats_searchGuild(); // TODO: Does this function still exist?
    buildInfoPanel(mode, mode2);
    buildInfoPanelAutomat(mode, mode2);
    buildInfoPanelMenu(mode2);
    quest_reward_6: string; // "Bauernhausitem"
    t_vet_quest_bonus: any;
    t_foodworld_reward_bonus: string; // "Mampfis zahlen nun %PERCENT%% mehr"
    t_donkey_farmiadd: string; // "heutiger Zusatzfarmi"
    /** Note: This method is only available, if Automat is installed */
    buildInfoPanelAutomatMenu(mode);

    farmersmarket_data: FarmersmarketData;
    foodworld_title: string; // "Picknickarea"
    Zeit: {
        Client: number;
        Server: number;
        UpdateIntervall: number;
        Verschiebung: number;
    }
    customerarecalled: string; // "%FARMI% Farmis"
    farm: number;
    market_nav: number;

    inforequirepremium: string; // "Benötigt Premium-Account"
    questblock: string; // "Kann durch Quests freigespielt werden"
    customerstats: any;
    adrun: string | number; // 0, 1 or ""
    rid: string; // Session-ID à la "12a345c02e1b5c0b73572a873991e6be"
    foodworldfarmis: any[];
    foodworld_bonus: {
        bonus: number;
    };
    foodworldtables: any[];
    foodworldbuildings: any;
    farmamount: number; // e.g. 5 or 6
    welcomeblurb: {
        1: string; // "Willkommen bei <b>My Free Farm</b>.<br>"
    }
}

interface VetData {
    drugs: {};
    info: {
        level: number;
    }
}

interface Pets {
    data: {
        block: number;
        breed: {
            money: string;
            points: string;
            breedpoints: string;
        };
        data: {
            level: number;
        }
    }
}

interface MegafieldData {
    job: {
        products: any;
    }

    tour: {
        duration: number;
        remain: number;
        start: number;
        steps: any[];
        vid: number;
    }

    vehicle_slots: {}

    area: {}
    area_free: {};
    job_start: string; // Yep, that's a string for what ever reason
}

interface FarmsData {
    farms: {};
    count: number;
    freegardenspeedup: number;
    freegardenspeedup2: number;
    blocked: any;
}

// Note: An attribute might only be there, if the building is unlocked
interface FarmersmarketData {
    vet: {

    };
    megafruit: {
        // Note: Since I/Moe haven't a megafruit plant, I'm not sure about the attribute types.
        current: {
            pid: any;
            points: any;
            rewards: {
                fruits: any;
                money: any;
                parts: any
                points: any;
            }
        }
    }
}
// Custom interfaces END

// Methods, not declared in index.d.ts START
/**
 * 
 * @param obj An object indicating the compartment in which the new object should be created; the new object will be created in the scope of this object's compartment.
 * @param options An object containing a single option defineAs, which determines the name of the object in the target compartment.
 * 
 * @return A new object in the specified scope.
 * 
 * @see https://developer.mozilla.org/en-US/docs/Mozilla/Tech/XPCOM/Language_Bindings/Components.utils.createObjectIn
 */
declare function createObjectIn(obj, options): {};

/**
 * This function provides a safe way to take an object defined in a privileged scope and create a structured clone of it in a less-privileged scope.
 * 
 * @param obj The object to clone.
 * @param targetScope The object to attach the object to.
 * @param options This optional parameter is an object with the following optional properties:
 *                  cloneFunctions: a Boolean value that determines if functions should be cloned. If omitted the default value is false. Cloned functions have the same semantics as functions exported using Components.utils.exportFunction. See Cloning objects that have functions below.
 *                  wrapReflectors: a Boolean value that determines if objects reflected from C++, such as DOM objects, should be cloned. If omitted the default value is false.
 * 
 * @return A reference to the cloned object.
 * 
 * @see https://developer.mozilla.org/en-US/docs/Mozilla/Tech/XPCOM/Language_Bindings/Components.utils.cloneInto
 */
declare function cloneInto(obj, targetScope, options?): {};

/**
 * 
 * @param func The function to export.
 * @param targetScope The object to attach the function to. This does not have to be the global window object: it could be any other object in the target window, or an object created by the caller.
 * @param options Optional parameter that supplies additional options.
 *                The following options are currently defined:
 *                   defineAs: determines the name of the function in targetScope. If this is omitted, you need to assign the return value of exportFunction() to an object in the target scope.
 *                   allowCallbacks: deprecated/redundant from Firefox 34. This option allows the exported function to accept callbacks as arguments. Boolean, defaulting to false. This option is new in Firefox 33. From Firefox 34 onwards this option has no effect: the exported function is always able to accept callbacks as arguments.
 *                   allowCrossOriginArguments: do not check that arguments to the exported function are subsumed by the caller: this allows the caller to pass objects with a different origin into the exported function, which can then use its privileged status to make cross-origin requests with them. Boolean, defaulting to false. This option is new in Firefox 34.
 * @return The placeholder function which has been created in the target context.
 * 
 * @see https://developer.mozilla.org/en-US/docs/Mozilla/Tech/XPCOM/Language_Bindings/Components.utils.exportFunction
 */
declare function exportFunction(func, targetScope, options?): {};
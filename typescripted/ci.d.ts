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
        data: {
            level: number;
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
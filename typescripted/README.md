## Setup a development environment

* Install [VS-Code](https://code.visualstudio.com/Download)
* Install [NodeJS/TypeScript](https://www.typescriptlang.org/#download-links)
* Set _environment variable_ to _gm_scripts_ folder
  * In Windows: Set **%GM_SCRIPTS_DIR%** to _C:\Users\\&lt;username&gt;\AppData\Roaming\Mozilla\Firefox\Profiles\\&lt;some letters and numbers&gt;.default\gm_scripts_


## How to convert a script file in JavaScript to a TypeScript

1. Rename the file from _&lt;filename&gt;.js_ to _&lt;filename&gt;.ts_
2. Add the references to declared interfaces  
   <b>/// &lt;reference path="./typescripted/index.d.ts" /&gt;  
   /// &lt;reference path="./typescripted/ci.d.ts" /&gt;  
   /// &lt;reference path="./typescripted/mff_all_171130.d.ts" /&gt;</b>
3. Declare variables being provided from the main script (e.g. in Common_functions variables coming from Berater)  
   **declare var prodName, prodTyp, prodId;**
4. Compile

## File descriptions
_index.d.ts_ is taken from [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/greasemonkey "DefinitelyTyped-Repository").
That file describes all functionality provided from the Greasemonkey framework. **IT MUST NOT BE EXTENDED/ALTERED MANUALLY!**

_mff_all_yyMMdd.d.ts_ is generated from the current _mff_all_yyMMdd.js_ and thus more or less provided from Upjers. **IT MUST NOT BE EXTENDED/ALTERED MANUALLY!**
How to generate/update the file:
* Receive current _mff_all_yyMMdd.js_
* Rename it to _mff_all_yyMMdd.ts_
* Compile with 'tsc --declaration mff_all_yyMMdd.ts'.  
   Ignore errors.
* Open declarations file _mff_all_yyMMdd.d.ts_ and  
  * insert **interface Window {** as first line
  * add **}** after last line
  * remove all appearances of **declare var** (use Ctrl+h)
  * remove all appearances of **declare function** (use Ctrl+h)
  * format document
  * optionally remove doubled declarations like **factory: () => void;** and **teaser: () => void;**
  
_ci.d.ts_ contains all manual adjustments and declarations that are needed to remove compile problems not covered by the both files above.
The more detailed any class is described here, the better code completion and other features work. It may only contain declarations of interfaces.

_CompileAndCopyXXX.bat_ is a script, that compiles the TypeScript files and copies the outcome to the script location folder.
Requirement for this to work is the third step in the [setup](#setup-a-development-environment).
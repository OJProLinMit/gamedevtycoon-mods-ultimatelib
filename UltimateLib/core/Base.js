/**
 * @fileOverview UltimateLib base declaration. Makes the namespace and the base class available before any other thing.
 * @author alphabit
 * @version 1.0.1
 * @class UltimateLib
 * @description Ultimate provides access to library related functionality as well as access all the related libraries from here. This class hooks into GDT.
 * @constructor
 * @namespace GDT
*/

var UltimateLib = (function(self) { 
    
    /**
     * @property {array} js
     * @description An array that contains the js files associated to the complete UltimateLib libraries
     * @public
    */            
    self.js             = [];
      
    /**
     * @property {array} libraries
     * @description An array that contains all the core files of UltimateLib
     * @public
    */            
    self.libraries      = [{name:'Configuration', file:''},
                           {name:'Contracts', file:''}, 
                           {name:'Dialog', file:''},
                           {name:'Elements', file:''},
                           {name:'NameGenerator', file:''},
                           {name:'Notifications', file:'PopupMenu'},
                           {name:'Publishers', file:''},
                           {name:'Research', file:''},
                           {name:'Storage', file:''},
                           {name:'Utils', file:''},
                           {name:'VisualTweaks', file:''}];

    /**
     * @property {array} libraries3rd
     * @description An array that contains all the 3rd party files of UltimateLib
     * @public
    */            
    self.libraries3rd   = [{name:'foswig', file:'Contracts'},{name:'jstorage', file:'Contracts'}];

    /**
     * @function getFiles
     * @param {string} Section name
     * @description An array that contains all files found in the UltimateLib library section folders
     * @returns 
     * @public
    */       
    function getFiles(section){
        var outFiles    = [];
        var fs          = require('fs');
       
        if ( typeof fs == 'undefined'){
            return outFiles;
        }
        
        var dir     = './mods/UltimateLib/'+section+'/';
        var files   = fs.readdirSync(dir);
        
        for(var i = 0; i < files.length; i++) {
            
            var f  = files[i];
            var fn = f.substring(f.lastIndexOf('/')+1);
            try{
                var stats = fs.statSync(dir+f);
                if (stats.isFile()) {
                    outFiles.push(dir+f);
                }
            }
            catch(ex){
                self.Logger.log('UltimateLib.getFiles - Could not use acquire info on ' + f, ex);
            }
        }
        
        return outFiles;        
    }

    /**
     * @function init
     * @description Called for global initialization after Base.init()
     * @public
    */        
    self.init = function(){
        var sections        = ['3rd','libs'];
        self.js             = [];        
        
        var availMods = ModSupport.availableMods;
        $.each(availMods, function(i, mod){
            if (mod.id == 'UltimateLib'){
                self.mod = mod;
            }
        });
        
        var handler = function (e) {
            UltimateLib.Logger.log("A module has been loaded. " + e);
            //custom code which will be called whenever one week passes.
            // console.log("mod.loaded");
            // console.log(ModSupport);
        };
        
        GDT.on(GDT.eventKeys.mod.loaded, handler);        
    };
    
    /**
     * @function initDev
     * @description Called for global initialization after Base.init()
     * @public
    */        
    self.initDev = function(){
        var sections        = ['3rd','libs'];
        self.js             = [];

        $.each(sections, function(i, section){
            var files = getFiles(section);
            $.each(files, function(j, file){
                var name = file.replace(/^.*[\\\/]/, '');
                    name = name.substring(0, name.length-3);
                    
                switch(section){
                    case '3rd':
                        self.libraries3rd.push({name:name, file:file});
                    break;
                    
                    case 'libs':
                        self.libraries.push({name:name, file:file});
                    break; 
                }
                
                self.js.push(file);
            });
        });
        
        var availMods = ModSupport.availableMods;
        $.each(availMods, function(i, mod){
            if (mod.id == 'UltimateLib'){
                self.mod = mod;
            }
        });
        
        var handler = function (e) {
            UltimateLib.Logger.log("A module has been loaded. " + e);
            //custom code which will be called whenever one week passes.
            // console.log("mod.loaded");
            // console.log(ModSupport);
        };
        
        GDT.on(GDT.eventKeys.mod.loaded, handler);
    };
        
    /**
     * @property {object} mod
     * @description Returns the GDT package.json object representation of this mod
     * @public
    */                   
    self.mod;
    
    /**
     * @function getObjByName
     * @param {string} Name of the object to find 
     * @description Tries to retrieve an object by it's specified name 
     * @returns An object with the specified name or undefined
     * @public
    */       
    self.getObjByName = function(name){
        var obj  = self[name];
        if(!obj){
           obj = window[name];
        }
        if(!obj){
           obj = eval(name); // eval is evil *eg*
        }        
        return obj;
    };
    
    return self;
})(UltimateLib || {});

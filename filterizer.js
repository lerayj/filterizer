		var FilterHelper = new function FilterHelper () {
		this.filtersList = {};
	//tagname est la class du filter
	//filter est la fonction de filtre
this.filterEngine = function(collection, query, tagname, filter) {
		var filterListScoped = this.filtersList;
		var res = _.filter(collection.fetch(), function(elem){ 
			var val = null;
			if(_.isFunction(filterListScoped[tagname].fieldFilterOn))
				val = filterListScoped[tagname].fieldFilterOn(elem);
			else
				val = elem[filterListScoped[tagname].fieldFilterOn];
			return filter(val, query);
    	});
    	res = _.pluck(res, "_id");
    	var sesFilteredList = Session.get("filteredList");
    	$.each(res, function(key, elem){
    		if(!sesFilteredList.hasOwnProperty(elem)){
    			sesFilteredList[elem] = [];
    		}
    		if(sesFilteredList[elem].indexOf(tagname) == -1)
    			sesFilteredList[elem].push(tagname);
    	});
    	//set une liste id/filtres a cacher
		Session.set("filteredList",sesFilteredList);
		console.log("FilterEngine: ", Session.get("filteredList"));
    	return res;
	};

	// @collection: Mongo cursor collection
	// @fieldCollec: collection field filtered on
	// @query: input to filter
	// @tagFilterClass: 
	this.filter = function(collection, query, tagFilterClass) {
		this.filterEngine(collection, query, tagFilterClass, this.filtersList[tagFilterClass].filterFunction);
	};

	this.removeFilter = function(tagToDelete) {
		var sesFilteredList = Session.get("filteredList");
		_.each(sesFilteredList, function(tagsArray,key){
			var idx = tagsArray.indexOf(tagToDelete);
			if( idx > -1){
				tagsArray.splice(idx, 1);
				if(tagsArray.length == 0){
					delete sesFilteredList[key];
				}
			}
		});
		Session.set("filteredList",sesFilteredList);
		
			
	};

	this.filterUrlHandler = function(tagname, value) {
		window.location.href = window.location.href + '?';
		var query = tagname+"="+value;

	};

	this.isFiltered = function(id){
		var sesFilteredList = Session.get("filteredList");
		if(sesFilteredList.hasOwnProperty(id))
			return true;
		return false;
	};

	this.filterAlreadyApply = function(filterName){
		var sesFilteredList = Session.get("filteredList");
		var result = _.find(sesFilteredList, function(elem){
			if(elem.indexOf(filterName) != -1)
				return true;
			return false;
		});
		if(result == undefined)
			return false;
		return true;
	}
	}();
}
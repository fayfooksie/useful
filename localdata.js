function localData(data) {
	if(!data.v) data.v=0;
	return Object.defineProperties(data, {
		load: {
			writable: true,
			configurable: true,
			value: function(key) {
				if(localStorage[key]) {
					var	data=JSON.parse(localStorage[key]);
					for(key in data) {
						this[key]=data[key];
						}
					return true;
					}
				return false;
				}
			},
		save: {
			writable: true,
			configurable: true,
			value: function(key) {
				localStorage[key]=JSON.stringify(this);
				return true;
				}
			},
		update: {
			writable: true,
			configurable: true,
			value: function(v, callback) {
				if(this.v<v) {
					callback(this.v);
					this.v=v;
					return true;
					}
				return false;
				}
			}
		});
	};
(function(global, none){
    
    function defined(obj) {
        return obj !== none;
    }
    
    function valid(fn) {
        return defined(fn) && fn.call;
    }
    
    function numeric(obj) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }
    
    global.Page = function Page(iterator, index) {
        this.iterator(iterator);
        this.index(index);
    };
    
    Page.prototype = {
        
        _index: 1,
        _iterator: null,
        _pages: {},
        
        data: function(getter, fresh) {
            var page = this;
            if (valid(getter)) {
                if (defined(page._value) && !fresh) {
                    getter(page._value);
                } else if(defined(page._iterator)) {
                    page._iterator(page._index, function(value){
                        getter(page._value = value);
                    });
                }
            }
        },
        
        next: function() {
            this.jump(this._index+1);
        },
        
        prev: function() {
            this.jump(this._index-1);
        },
        
        jump: function(index) {
            if (numeric(index) && index !== this._index) {
                if (!this._pages.hasOwnProperty(index)) {
                    this._pages[index] = new Page(this._iterator, index);
                }
                return this._pages[index];
            }
            return this;
        },
        
        index: function(setter) {
            if (valid(setter)) {
                this._index = setter;
            } else {
                return this._index;
            }
        },
        
        iterator: function(setter) {
            if (valid(setter)) {
                this._iterator = setter;
            } else {
                return this._iterator;
            }
        }
        
    };
    
})(window, undefined);
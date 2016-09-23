const elements = document.getElementsByClassName("stack"),
  limit = 5,
  changes = [],
  todo = document.getElementById("to-do"),
  pages = ["A", "B", "C", "D", "E", "E", "A", "B", "D", "G", "H", "S"],
  collection = Array.prototype.map.call(elements, (val) => {
    var obj = {}, 
      value = "";
    obj.ele = val;
    Object.defineProperty(obj, "value", {
      get: function () {
        return value;
      },
      set: function (v) {
        value = v;
        this.ele.innerText = value;
        this.ele.className += " fill";
        setTimeout(() => {
          this.ele.className = "stack";
        }, 1100);
      }
    });
    return obj;
  });

function Cache (limit) {
  this.size = 0;
  this.limit = limit;
  this.head = this.tail = undefined;
  this._keymap = Object.create(null);
}

var p = Cache.prototype;

p.put = function (key, value) {
  var removed, index = [], values = [], tail = this.tail;
  var entry = this.get(key, true);
  if (!entry) {
    if (this.size < this.limit) {
      for (var i = 0; i < this.size; i++) {
        index[i] = this.limit - 2 - i;
        values[i] = tail.value;
        tail = tail.older;
      }
    }
    if (this.size === this.limit) {
      removed = this.shift();
    }
    entry = {
      key: key
    };
    this._keymap[key] = entry;
    if (this.tail) {
      this.tail.newer = entry;
      entry.older = this.tail;
    } else {
      this.head = entry;
    }
    this.tail = entry;
    this.size++;
    index.push(limit - 1);
    values.push(value);
    changes.push({
      index: index,
      value: values
    });
  }
  entry.value = value;
  return removed;
};

p.shift = function () {
  var entry = this.head,
    next = entry.newer,
    index = [],
    last = limit - 1,
    value = [];
  if (entry) {
    this.head = this.head.newer;
    this.head.older = undefined;
    entry.newer = entry.older = undefined;
    this._keymap[entry.key] = undefined;
    this.size--;
  }
  for (var i = 1; i < limit; i++) {
    index.push(i - 1);
    value.push(next.value);
    next = next.newer;
  }
  index[last] = last;
  value[last] = "";
  changes.push({
    index: index,
    value: value
  });
  return entry;
};

p.get = function (key) {
  var entry = this._keymap[key],
    l = this.limit - 1;
  if (entry === undefined) return void 0;
  if (entry === this.tail) {
    changes.push({
      index: [l],
      value: [entry.value]
    });
    return entry;
  }
  if (entry.newer) {
    if (entry === this.head) {
      this.head = entry.newer;
    }
    entry.newer.older = entry.older;
  }
  if (entry.older) {
    entry.older.newer = entry.newer;
  }
  entry.newer = undefined;
  entry.older = this.tail;
  if (this.tail) {
    this.tail.newer = entry;
  }
  this.tail = entry;
  var tail = this.tail, 
    indexs = [], 
    values = [];
  for (let i = 0; i < this.size; i++) {
    indexs[i] = l - i;
    values[i] = tail.value;
    tail = tail.older;
  }
  changes.push({
    index: indexs,
    value: values
  });
  return entry;
};
const cache = new Cache(limit);
pages.forEach(val => {
  cache.put(val, val);
});
function run (indexs, values) {
  var len = indexs.length;
  for (let i = 0; i < len; i++) {
    collection[indexs[i]].value = values[i];
  }
}
function *show () {
  var len = changes.length;
  for (let i = 0; i < len; i++) {
    yield run(changes[i].index, changes[i].value);
  }
}
const start = show();
var timer = null;
todo.addEventListener("click", () => {
  if (timer !== null) {
    return void 0;
  }
  start.next();
  timer = setInterval(() => {
    if (start.next().done) {
      clearInterval(timer);
    }
  }, 2000);
}, false);
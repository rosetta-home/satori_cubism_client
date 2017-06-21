function Horizon(title, context, dom_id, discrete){
  this.title = title;
  this.context = context;
  this.dom_id = dom_id;
  this.last_value = {};
  this.events = [];
  this.discrete = discrete || false;
}

Horizon.prototype.data = function(event){
  if(!(event.measurement in this.last_value)){
    this.events.push(this.create_metric(event));
    this.render();
  }else{
    this.last_value[event.measurement] = event.fields.value;
  }
}

Horizon.prototype.get_value = function(i){
  return get_text(i);
}

Horizon.prototype.create_metric = function(event){
  var values = [], last, self = this;
  this.last_value[event.measurement] = event.fields.value;
  return this.context.metric(function (start, stop, step, callback) {
    start = +start, stop = +stop;
    if (isNaN(last)) last = start;
    while (last < stop) {
      var v = self.last_value[event.measurement];
      values.push(v);
      last += step;
    }
    callback(null, values = values.slice((start - stop) / step));
  }, event.measurement);
}

Horizon.prototype.render = function(){
  var horizon = this.context.horizon();
  if(this.discrete){
    horizon.format(this.get_value);
  }else{
    horizon.format(d3.format(".3f"));
  }
  horizon.title(this.title);
  d3.select(this.dom_id).selectAll(".horizon")
    .data(this.events)
    .enter()
    .append("div")
    .attr("class", "horizon")
    .call(horizon);
}

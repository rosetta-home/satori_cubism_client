function Comparison(title, context, dom_id){
  this.title = title;
  this.context = context;
  this.dom_id = dom_id;
  this.last_value = {};
  this.events = [];
}

Comparison.prototype.data = function(event){
  if(!(event.measurement in this.last_value)){
    this.events.push(this.create_metric(event));
    if(this.events.length == 2) this.update_data();
  }else{
    this.last_value[event.measurement] = event.fields.value;
  }
}

Comparison.prototype.create_metric = function(event){
  var values = [], value = 0, last, self = this;
  this.last_value[event.measurement] = event.fields.value;
  return this.context.metric(function (start, stop, step, callback) {
    start = +start, stop = +stop;
    if (isNaN(last)) last = start;
    while (last < stop) {
      var v = self.last_value[event.measurement];
      values.push(v);
      last += step;
    }
    callback(null, values = values.slice((start - stop) / step)); //And execute the callback function
  }, event.measurement);
}

Comparison.prototype.update_data = function(){
  var comparison = this.context.comparison();
  comparison.formatPrimary(d3.format(".2f"));
  comparison.title(this.title);
  d3.select(this.dom_id).selectAll(".comparison")
    .data([this.events])
    .enter()
    .append("div")
    .attr("class", "comparison")
    .call(comparison);
}

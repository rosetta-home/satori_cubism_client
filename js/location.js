function Location(title, dom, id, context){
  this.title = title;
  this.dom = dom;
  this.id = id;
  this.context = context;
  this.build_dom();
  this.init_charts(context);
}

Location.prototype.build_dom = function(){
  $(this.dom).append(" \
    <div class=\"location\"> \
      <h2 class=\"property_title\">"+this.title+"</h2> \
      <div id=\"stats"+this.id+"\"> \
        <div id=\"kw"+this.id+"\"></div> \
        <div id=\"co2"+this.id+"\"></div> \
        <div id=\"pressure"+this.id+"\"></div> \
        <div id=\"wind_speed"+this.id+"\"></div> \
        <div id=\"solar_radiation"+this.id+"\"></div> \
        <div id=\"indoor_temperature"+this.id+"\"></div> \
        <div id=\"outdoor_temperature"+this.id+"\"></div> \
        <div id=\"hvac_mode"+this.id+"\"></div> \
        <div id=\"hvac_state"+this.id+"\"></div> \
      </div> \
    </div> ");
}

Location.prototype.init_charts = function(context){
  this.kw = new Horizon("KW", context, "#kw"+this.id);
  this.co2 = new Horizon("CO2", context, "#co2"+this.id);
  this.wind_speed = new Horizon("Wind Speed", context, "#wind_speed"+this.id);
  this.pressure = new Horizon("Pressure", context, "#pressure"+this.id);
  this.solar_radiation = new Horizon("Solar Radiation", context, "#solar_radiation"+this.id);
  this.indoor_temp = new Horizon("Indoor Temperature", context, "#indoor_temperature"+this.id);
  this.outdoor_temp = new Horizon("Outdoor Temperature", context, "#outdoor_temperature"+this.id);
  this.hvac_mode = new Horizon("HVAC Mode", context, "#hvac_mode"+this.id, true);
  this.hvac_state = new Horizon("HVAC State", context, "#hvac_state"+this.id, true);
}

Location.prototype.data = function(event){
  if(event.tags.node_id == this.id) this.process_data(event);
}

Location.prototype.process_data = function(event){
  switch(event.measurement){
    case 'smart_meter.kw':
      this.kw.data(event);
      break;
    case 'ieq.co2':
      this.co2.data(event);
      break;
    case 'hvac.state':// discrete view
      event.fields.text = event.fields.value;
      event.fields.value = hvac_discrete[event.fields.value];
      this.hvac_state.data(event);
      break;
    case 'hvac.mode':
      event.fields.text = event.fields.value;
      event.fields.value = hvac_discrete[event.fields.value];
      this.hvac_mode.data(event);
      break;
    case 'weather_station.outdoor_temperature':
      this.outdoor_temp.data(event);
      break;
    case 'weather_station.indoor_temperature':
      this.indoor_temp.data(event);
      break;
    case 'weather_station.pressure':
      this.pressure.data(event);
      break;
    case 'weather_station.solar.radiation':
      this.solar_radiation.data(event);
      break;
    case 'weather_station.wind.speed':
      this.wind_speed.data(event);
      break;
  }
}

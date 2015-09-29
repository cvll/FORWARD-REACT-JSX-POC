// DOM references
var appNode = document.getElementById('app');

// Reference to React objects
var appReference;

var template = "{\"id\":20,\n \"loc\": {\"lat\" : 32.88219705710263 ,\"lng\" : -117.22989883478147},\n \"type\": \"Car\" ,\n \"size\": \"Medium\",\n \"color\": \"Red\", \n  \"visibility\": true \n}";

var app = React.createClass({
    getInitialState: function() {
      // initial visibility is show all
      for (var i = 0 ; i < this.props.data.length ; i++) {
        this.props.data[i].visibility = true;
      }
      
      
      return {
                data:this.props.data,
                filter:['All','All','All'],
                mapData: {},
                mapOptions: {
                  center: {lat: 32.879632, lng: -117.235687},
                  zoom: 15
                },
                tableData: [{id:'Id',loc:'Location',type:'Type',size:'Size',color:'Color',visibility:'Visibility'}],
                activeMarker: null,
              };
    },
    // This function is passed to filter objects to notify the app of filter (drop-down) changes.
    onChange: function(i,data) {
      
      this.state.filter[i.slice(1,i.length)] = data;
      this.handleUpdate(this.state.data);
    },
    // From the knowledge of the app, provides necessary info for map
    getMapData: function() {
      return this.state.mapData;
    },
    getTableData: function() {
      return this.state.tableData;
    },
    generateMapObj: function(obj) {
      var mapObj = {};
      mapObj.id = obj.id;
      //mapObj.type = obj.type;
      if (obj.loc) {
        mapObj.loc = obj.loc;
      }
      
      if (obj.visibility != null) {
        mapObj.visibility = obj.visibility;
      }
      
      return mapObj;
    },
    generateTblObj: function(obj) {
      return obj;
    },
    generateMapData: function(new_data) {
      var res = {};
      for (var key in new_data) {
        if (new_data.hasOwnProperty(key)) {
          res[key] = this.generateMapObj(new_data[key]);
        }
      }
      return res; 
    },
    generateTblData: function(new_data) {
      var res = [{id:'Id',loc:'Location',type:'Type',size:'Size',color:'Color',visibility:'Visibility'}];
      
      for (var key in new_data) {
        if(new_data.hasOwnProperty(key)) {
          res.push(this.generateTblObj(new_data[key]));
        }
      }
      
      return res;
    },
    filter: function(data) {
      for (var key in data) {
        if(data.hasOwnProperty(key)) {
          if (
              (data[key].type == this.state.filter[FILTERS.TYPE] || (this.state.filter[FILTERS.TYPE] == 'All')) &&
              (data[key].size == this.state.filter[FILTERS.SIZE] || (this.state.filter[FILTERS.SIZE] == 'All')) &&
              (data[key].color == this.state.filter[FILTERS.COLOR] || (this.state.filter[FILTERS.COLOR] == 'All')))
              {
                data[key].visibility = true;    
              } else {
                data[key].visibility = false;
              }
          }
        }
    },
    handleUpdate: function(newData,options) {
      var ops = this.state.mapOptions;
      var data = this.state.data;
      if (options) {
        ops = options;
        
      }
      if (newData)
        data = newData;
        
      this.filter(data);
      var mapData = this.generateMapData(data);
      var tblData = this.generateTblData(data);
      
      this.setState({mapOptions:ops,data:data,mapData:mapData,tableData:tblData});
    },
    // Triggered on new props, just updates state
    componentWillReceiveProps: function(nextProps) {
      this.handleUpdate(nextProps.data,null);
    },
    componentWillMount: function() {
      this.handleUpdate(this.state.data,null);
    },
    componentDidUpdate: function(prevProp,prevState) {
      this.notifyChange();
    },
    /* UI Functions */
    updateData(data) {
      var obj = JSON.parse(data);
        
      for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
          obj[key].loc = new google.maps.LatLng(obj[key].loc.H,obj[key].loc.L); 
        }
      }
     
      this.handleUpdate(obj,null);
    },
    updateOptions(ops) {
      var obj = JSON.parse(ops);
      this.handleUpdate(null,obj);
    },
    /* Simulates an 'update' to the vdb */
    notifyChange() {
      ORIGINAL_DATA = this.state.data;
    },
    render: function() {
      
      // Must render map first to provide a reference , 
      return (
        <div id='app' className='app'>
          <MyDropMenu id={'f' + FILTERS.TYPE} onChange={this.onChange} items={this.props.items[FILTERS.TYPE]} title='Car Type'></MyDropMenu>
          <MyDropMenu id={'f' + FILTERS.SIZE} onChange={this.onChange} items={this.props.items[FILTERS.SIZE]} title='Car Size'></MyDropMenu>
          <MyDropMenu id={'f' + FILTERS.COLOR} onChange={this.onChange} items={this.props.items[FILTERS.COLOR]} title='Car Color'></MyDropMenu>
          <MyInputComp id='update' json='true' onClick={this.updateData} inputText={this.state.data} buttonText='Update Data'></MyInputComp>
          <MyInputComp id='options' json='true' onClick={this.updateOptions} inputText={this.state.mapOptions} buttonText='Update MapOptions'></MyInputComp>
          <div id='dataVis'>
            <MyGoogleMap mapOptions={this.state.mapOptions} ping={this.state.activeMarker} locations={this.getMapData()}></MyGoogleMap>
            <MyTable data={this.getTableData()}></MyTable>
          </div>
        </div>
        )
    }
});

var init = function() {
  ORIGINAL_DATA = randomData();
  // Creates the app
  appReference = React.render(React.createElement(app,{data: ORIGINAL_DATA,items:[CAR_TYPES,CAR_SIZE,CAR_COLOR]}),appNode);
    
    
    // Constantly updates locations of ORIGINAL_DATA  
    setInterval(function() {
      updateLocations();
     }, 3000);
}
  
  
  
  
  

  



var MyDropMenu = React.createClass({
    getInitialState: function() {
      return {
                  id: this.props.id,
                  filter:'All'
             };
    },
    onChange: function() {
      var node = React.findDOMNode(this);
      this.props.onChange(this.state.id,node.childNodes[1].options[node.childNodes[1].selectedIndex].value);  
    },
    render: function() {
      var createOption = this.props.items.map(function(item,idx) {
        return <option value={item}>{item}</option>
      });
	  
      return (
                  <div id={this.props.id}>
                        <h5>{this.props.title}</h5>            
                        <select onChange={this.onChange}>
                        {createOption}
                        </select>
                  </div>
        );
    }
}
);
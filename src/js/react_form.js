var MyInputComp = React.createClass({
    getInitialState: function() {
      // value : input value
      // send : function to call when submit button clicked
      return {
				send:null,
				value: null,
				inputTitle: "inputTitle",
				buttonTitle:"buttonTitle"
			};
    },
    getInputData() {
      var pNode = React.findDOMNode(this);
      return pNode.childNodes[0].value;
    },
    onClick: function() {
      this.state.send(this.getInputData());
    },
    
    componentDidMount: function() {
          var divNode = React.findDOMNode(this);
          var inputNode = divNode.childNodes[0];
          var buttonNode = divNode.childNodes[1];
          
          buttonNode.innerText = this.props.buttonText;
          inputNode.value = JSON.stringify(this.props.inputText);
          
          // quick-fix to increase size for some inputs
          if (this.props.json) {
                inputNode.rows = "7";
                inputNode.cols = "130";
          }
          
    },
    render: function() {
      this.state.send = this.props.onClick;
      
      return (
			<div id={this.props.id}>
				<textarea type="text"></textarea>
				<button onClick={this.onClick}></button>
			</div>

            )
	}
});
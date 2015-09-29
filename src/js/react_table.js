var MyTable = React.createClass({
    getInitialState: function() {
      return {data: this.props.data};
    },
    componentWillReceiveProps: function(nextProps) {
      this.setState({data:nextProps.data});
    },
    render: function() {
        var createRow = this.state.data.map(function(item,idx) {
            return (
				<MyTableRow data={item}></MyTableRow>
			)
        });
		return (
			<table id='tbl'>
				<tbody>
				{createRow}
				</tbody>
			</table>
        )
    }
});

var MyTableRow = React.createClass({
    getInitialState: function() {
      return {
				data: this.props.data
			 };
    },
    componentWillReceiveProps: function(nextProps) {
      this.setState({data:nextProps.data});
    },
    render: function() {
      return (
		<tr key={this.state.data.id} onChange={this.onChange}>
			<td>{this.state.data.id}</td>
			<td>{this.state.data.loc}</td>	
			<td>{this.state.data.type}</td>
			<td>{this.state.data.size}</td>
			<td>{this.state.data.color}</td>
			<td>{this.state.data.visibility.toString()}</td>
		</tr>
	  )
    }
});
    
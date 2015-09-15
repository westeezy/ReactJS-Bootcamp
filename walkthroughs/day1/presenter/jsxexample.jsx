var HelloMessage = React.createClass({
  render: function() {
  	var name = 'Westin';
    return <div className="wrapper">
    	<h1>Hello {this.props.name}</h1>
    	<div>How are <span className="bold">you</span>?</div>
    </div>;
  }
});

React.render(<HelloMessage name="Westin" />, mountNode);

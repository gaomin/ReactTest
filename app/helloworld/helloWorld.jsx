define(['react', 'react-dom'],function(React, ReactDOM){

  var helloWord = {
     init: function(){
        this.AppView = React.createClass({
          render: function () {
            return (
              <div>
                <p>Hello, React!</p>
              </div>
            );
          }
        });
        ReactDOM.render(<this.AppView />, document.getElementById('example'));
     }
  }

  return helloWord;

});
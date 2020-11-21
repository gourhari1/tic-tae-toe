import React,{Component} from 'react';



export default class subbox extends Component{

    componentDidUpdate(a,b,c){
    }
  
render()
{
    return <button onClick = {this.checker}  className = "btns"><p className = 'text'>{this.props.info.list_of_states[this.props.id]}</p></button>
}
   
checker = ()=>{

    if(this.props.info.list_of_states[this.props.id] === ' ') 
    {
        const current_val =  this.props.info.Player_turn === 1? '0':'X'
        this.props.update(current_val,this.props.id)

    }
   
};
}
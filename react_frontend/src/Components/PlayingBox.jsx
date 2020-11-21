import React,{Component} from 'react';
import SubBox from './SubBox'
import Grid from '@material-ui/core/Grid'
import axios from 'axios';


export default class PlayingBox extends Component{

   state = {
    Player_turn : 1,
     list_of_states : [' ',' ',' ',' ',' ',' ',' ',' ',' '],
    mode_of_playing : 2,
    Score:{player1 : 0,player2 : 0},
   };
  
render()
{
    
  return (
        <div className = 'pbox'>
<Grid container spacing={1}>

        <Grid item xs={4}>
          <SubBox  info = {this.state} update = {this.updateval} id = {0} />
        </Grid>
        <Grid item xs={4}>
          <SubBox info = {this.state} update = {this.updateval} id = {1}/>
        </Grid>
        <Grid item xs={4}>
          <SubBox info = {this.state} update = {this.updateval} id = {2}/>
          {"\n"}
        </Grid>
        <Grid item xs={4}>
            <SubBox info = {this.state} update = {this.updateval} id = {3}/>
        </Grid>
        <Grid item xs={4}>
          <SubBox info = {this.state} update = {this.updateval} id = {4}/> 
        </Grid>
        <Grid item xs={4}>
          <SubBox info = {this.state} update = {this.updateval} id = {5}/>
        </Grid>
        {"\n"}
        <Grid item xs={4}>
          <SubBox info = {this.state} update = {this.updateval} id = {6}/>
        </Grid>
        <Grid item xs={4}>
          <SubBox info = {this.state} update = {this.updateval} id = {7}/>
        </Grid>
        <Grid item xs={4} >  
          <SubBox info = {this.state} update = {this.updateval} id = {8}/>
        </Grid>
      </Grid>
        </div>
  );
  
}




fullboard = (state) => {

for(var i = 0;i<state.length;i++)
  {
    if(state[i] === ' ')
      return false
    
  }

  return true
}



updatestate =  (val,id) => {

  axios.post("http://127.0.0.1:8000/getdata/",
  {"val" : val ,"states_list" : this.state.list_of_states,"mode" : this.state.mode_of_playing})
  .then(res=> {
   
   if(this.state.mode_of_playing === 1)
   { this.setState({Player_turn : this.state.Player_turn ===1 ? 2:1},);
        if(res.data.win === 1)
       {
         const list_of_states = [' ',' ',' ',' ',' ',' ',' ',' ',' ']
         this.setState({list_of_states : list_of_states})
       } 
   }

   else
  {
   if(res.data.win === 1 && res.data.next !== -1 )
   {console.log(val)
     console.log(res.data.win)
     const list_of_states = [' ',' ',' ',' ',' ',' ',' ',' ',' ']
     this.setState({list_of_states : list_of_states},()=>{ console.log(this.state.list_of_states)})
   }
   else
   {
     const list_of_states = Object.assign([],this.state.list_of_states);
     console.log(res.data.nextindex)
     list_of_states[res.data.nextindex] = 'X'
    
     this.setState({list_of_states : list_of_states},()=>{ console.log(this.state.list_of_states)})
   }
 }
 if(this.fullboard(this.state.list_of_states) === true)
  {
    const list_of_states = [' ',' ',' ',' ',' ',' ',' ',' ',' ']
     this.setState({list_of_states : list_of_states})
  }
 })
}
 
updateval = (val,id)=>{
const list_of_states = Object.assign([],this.state.list_of_states);
list_of_states[id] = val;
this.setState({list_of_states : list_of_states},()=>{this.updatestate(val,id)});
};
}
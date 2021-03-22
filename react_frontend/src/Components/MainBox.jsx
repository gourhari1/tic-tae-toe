import React,{Component} from 'react';
import PlayingBox from './PlayingBox';


export default class subbox extends Component{
state = {
    player1_score : 0,
    player2_score : 0,
    tie : 0,
    mode_of_playing : 1,

};

render()
{
    return (
    <React.Fragment>
        <div className = "nav">TIC TAC TOE</div>
            <div className = "options"><label>Mode:&nbsp;</label>
                <select onChange = {this.changemode}>
                    <option>VS HUMAN</option>
                    <option>VS COMPUTER</option>
                 </select> </div>
                 <div className = 'mbox'>
                    <PlayingBox updatescore = {this.updatescore} mode_of_playing = {this.state.mode_of_playing}/>
                        <div className = "stats">
                            <pre>SCORES: PLAYER1:{this.state.player1_score}   Tie:{this.state.tie}   PLAYER2:{this.state.player2_score}</pre>
                        </div>
                </div>
        
        
     </React.Fragment>);
}



// Utility To Update Score

updatescore = (val)=>{

    if(val === '0')
    this.setState({player1_score: this.state.player1_score +1})

    else if(val ==='X')
    this.setState({player2_score: this.state.player2_score+1})

    else
    this.setState({tie: this.state.tie+1})

}

// Utility To Update Mode

changemode = (e)=>{

if(e.target.value === "VS HUMAN")
this.setState({mode_of_playing: 1,player1_score:0,player2_score:0,tie:0})

else if(e.target.value === "VS COMPUTER")
this.setState({mode_of_playing: 2,player1_score:0,player2_score:0,tie:0})

}
   

}
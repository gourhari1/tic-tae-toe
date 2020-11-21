import React,{Component} from 'react';
import PlayingBox from './PlayingBox';

export default class subbox extends Component{
state = {

};

render()
{
    return (<div className = 'mbox'>
        <PlayingBox/>
            <div className = "stats">
           <p>Player1(Score): player2(score):</p>
               </div>
     
        
            </div>);
}
   

}
from django.shortcuts import render
from django.http import JsonResponse
import json
from django.views.decorators.csrf import csrf_exempt

def tictac(request):

    respose = {}
    received_json_data = json.loads(request.body)
    mode = received_json_data["mode"]
    state = received_json_data["states_list"]
    val = received_json_data["val"]
    counterval ='X'

    # CHECKING IF THE BOARD HAS WINNING STATE:    

    def check_win(state,turn):
        if(turn in state[0] and turn in state[1] and turn in state[2]):
            return 1
        if(turn in state[3] and turn in state[4] and turn in state[5]):
            return 1
        if(turn in state[6] and turn in state[7] and turn in state[8]):
            return 1
        if(turn in state[0] and turn in state[3] and turn in state[6]):
            return 1
        if(turn in state[1] and turn in state[4] and turn in state[7]):
            return 1
        if(turn in state[2] and turn in state[5] and turn in state[8]):
            return 1
        if(turn in state[0] and turn in state[4] and turn in state[8]):
            return 1
        if(turn in state[2] and turn in state[4] and turn in state[6]):
            return 1
        else:    
            return -1

        #CHECKING IF THE BOARD IS FULL

    def boardisfull(state):
        for i in state:
            if i == ' ':
                return False
        return True            

    def nextturn(state,turn):
        if check_win(state,counterval) == 1:
            return 10
        if check_win(state,val) == 1:
            return -10    
        if(boardisfull(state)):
            return 0
        
        

        if turn == counterval:
            currmax = -1000
            for i in range(0,len(state)):
                if state[i]==' ':
                    state[i] = counterval
                    currmax = max(currmax,nextturn(state,val))
                    state[i] = ' '
            return currmax
        if turn == val:
            currmin = 1000 
            for i in range(0,len(state)):
                if state[i]==' ':
                    state[i] = val
                    currmin = min(currmin,nextturn(state,counterval))
                    state[i] = ' '
            return currmin

    def find(state):
        currmax = -15
        index = -1
        for i in range(0,len(state)):
            if state[i] == ' ':
                state[i] = counterval
                curr = nextturn(state,val)
                state[i] = ' '
                if curr > currmax:
                    index = i
                    currmax = curr
        return index   
        
    if(mode == 1):
        if check_win(state,val)== 1:
            respose["win"] = 1
            return JsonResponse(respose)
        else:
            respose["win"] = -1
            return JsonResponse(respose)
    if(mode == 2):
        if check_win(state,val) == 1:
            respose["win"] = 1
            respose["nextindex"] = -1
            return JsonResponse(respose)
        else:
            respose["nextindex"] = find(state)
            state[respose["nextindex"]] = counterval
            respose["win"] = check_win(state,counterval)
            return JsonResponse(respose)

     



    
    
    
# Create your views here.

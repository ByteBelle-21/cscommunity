import axios from 'axios';


export function recognizeDevice(){
    const width = window.innerWidth;
    if(width <= 767){
        return 0;
    }
    else if (767 <width <= 1023){
        return 1;
    }
    else if (1023 <width <= 1439){
        return 2;
    }
    else{
        return 3;
    }

};






export async function fetchActiveMembers(){
    try {
        const response = await axios.get('https://jrg814-4000.theiadockernext-0-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai//activeusers');
        if (response.status === 200) {
            console.log("Successfully retrieved active members");
            return(response.data);
        } 
    }catch (error) {
        console.error("Catched axios error: ",error); 
        return(null);   
    }
}


export async function fetchPopularChannels(){
    try {
        const response = await axios.get('https://jrg814-4000.theiadockernext-0-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai//popularchannels');
        if (response.status === 200) {
            console.log("Successfully retrieved popular channels");
            return(response.data);
        } 
    }catch (error) {
        console.error("Catched axios error: ",error);
        return(null); 
    }
}


export function handleRating(likes, posts){
    if (posts === 0){
        return "⭐️"
    }
    else if(likes/posts >= 5){
        return "⭐️⭐️⭐️⭐️⭐️"
    }
    else if(likes/posts >= 3 && likes/posts < 5){
        return "⭐️⭐️⭐️⭐️"
    }
    else if(likes/posts >= 1 && likes/posts < 3){
        return "⭐️⭐️⭐️"
    }
    else {
        return "⭐️⭐️"
    }
}

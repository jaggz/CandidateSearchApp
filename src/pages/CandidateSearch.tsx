import { useState, useEffect, SyntheticEvent, } from 'react';
import Candidate from '../interfaces/Candidate.interface';
import { searchGithub, searchGithubUser } from '../api/API';

// console.log(userdata);
const CandidateSearch  = () => {
  const [userNames,setUserNames] = useState([] as any);
   const [searchIndex,setSearchIndex] = useState<number>(0);
   const [userData,setUserData] = useState({}as Candidate);

//  get all Usernames from API
  const getUsernames = async () => {

    const res  = await searchGithub();
      // console.log(res);
    const userDataArray:any[]= await res.map((user:any)=>{
      return user.login;    
    });
    return userDataArray;
  }
  // function to get userdata by username
  const getUserData = async (usernames:any[]):Promise<Candidate>=>{

    
    setUserNames(usernames);
    const data:Candidate = await searchGithubUser(usernames[searchIndex]);
    return data;
  }
  // useeffect() when load the page first time and get user data
  useEffect(()=>{
    if(!userNames.length){
      console.log('hereif')
          getUsernames().then((res:any)=>{
            console.log(res);
            return getUserData(res);
          }).then((res:Candidate)=>{
            if(res.login){
          
              setUserData(res);
            }else{
              setUserData({} as Candidate);
            }
        })

    }else{
      console.log('herei else')
      if(searchIndex<userNames.length){

        getUserData(userNames).then((res:Candidate)=>{
          if(res.login){
            setUserData(res);
            // console.log(res);
          }else{
            setUserData({} as Candidate);
          }
          console.log(searchIndex)
        });

      }

    }
  },[searchIndex]);




  //Candidate  Not selected handler function
  const notSelectedClickHandler = (e:SyntheticEvent) =>{
    e.preventDefault();
    setSearchIndex(searchIndex+1);

  }
  // candidate selected handler
  const candidateSelectedClickHandler = (e:SyntheticEvent) =>{

    e.preventDefault();
    setSearchIndex(searchIndex+1);
    
    if(userData.login){
      saveToLocalStorage(userData);
    }

  }

  // save candidates in local storage 
  const saveToLocalStorage = (newSelectedCandidate:Candidate)=>{

    const localuserdata = localStorage.getItem('potentialCandidates');
    if(localuserdata){
     const  parsedlocaluserdata :Candidate[] = JSON.parse(localuserdata);
     parsedlocaluserdata.push(newSelectedCandidate);
      localStorage.setItem("potentialCandidates",JSON.stringify(parsedlocaluserdata));
    }else{
      const  parsedlocaluserdata :Candidate[] = [];
      parsedlocaluserdata.push(newSelectedCandidate);
      localStorage.setItem("potentialCandidates",JSON.stringify(parsedlocaluserdata));
    }

  }


  
  return (
    <div>
      <h1>Candidate Search</h1>
      {searchIndex < userNames.length?// checking if candidate limit Reaches
      <div className='candidateProfile'>
        <img className="profilepic" src={userData.avatar_url?userData.avatar_url:''} alt='Profile Pic' />
        <div>
          <span>{userData.login?userData.login:''}    ({userData.name?userData.name:'NO Name'})</span>
        </div>
        <div>
          <span>Location: {userData.location?userData.location:'    No Location....'}</span>
        </div>
        <div>
          <span>Email: {userData.email?userData.email:'     No Email....'}</span>
        </div>
        <div>
          <span>Company: {userData.company?userData.company:'  ....'}</span>
        </div>
        <div>
          <span>Bio: {userData.bio?userData.bio:'  ....'}</span>
        </div>
        <div>
          <button className='buttonDelete' onClick={(e)=>notSelectedClickHandler(e)}>-</button>
        
        </div>
        <div>
        <button className='buttonSelected' onClick={(e)=>candidateSelectedClickHandler(e)}>
            +
          </button>
        </div>
      </div>
      :<div> No Candidate Available or Refresh page!!</div>}
  </div>
  
)
};

export default CandidateSearch;

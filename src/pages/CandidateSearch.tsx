import { useState, useEffect, ReactNode, ReactElement, SyntheticEvent, } from 'react';
import Candidate from '../interfaces/Candidate.interface';
import { searchGithub, searchGithubUser } from '../api/API';

// console.log(userdata);
const CandidateSearch  = () => {
  const [userNames,setUserNames] = useState([] as any);
   const [searchIndex,setSearchIndex] = useState<number>(0);
   const [userData,setUserData] = useState({}as Candidate);
//  get all Usernames from API
  const getUsernames = async () => {
    // event.preventDefault();
    const res  = await searchGithub();
      console.log(res);
      
      const userDataArray:any[]= await res.map((user:any)=>{
        return user.login;    
      });
      return userDataArray;
  }
  // function to get userdata by username
  const getUserData = async (usernames:any[]):Promise<Candidate>=>{
    setUserNames(usernames);
    console.log(searchIndex);
    console.log(usernames[searchIndex]);

    const data:Candidate = await searchGithubUser(usernames[searchIndex]);

    return data;
  }
  // useeffect() when load the page first time and get user data
  useEffect(()=>{
    getUsernames().then((res:any)=>{
      console.log({"usernames":res});
      return getUserData(res);
    }).then((res:Candidate)=>{
      setUserData(res);
      console.log(res);
  })
  },[]);
  // runs when searchindex value changes
  useEffect(()=>{

    getUserData(userNames).then((res:Candidate)=>{
      if(res){
        setUserData(res);
        console.log(res);
      }else{
        setSearchIndex(searchIndex+1);
      }
    });
  },[searchIndex]);


  // Not selected Candidate function
  const notSelectedClickHandler = (e:SyntheticEvent) =>{
    e.preventDefault();
    setSearchIndex(searchIndex+1);

  }
  // candidate selected handler
  const candidateSelectedClickHandler = (e:SyntheticEvent) =>{
    e.preventDefault();
    setSearchIndex(searchIndex+1);
    saveToLocalStorage(userData);

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
    <img className="" src={userData.avatar_url?userData.avatar_url:''} alt="" />
    <div>
      <h2>{userData.login?userData.login:''}({userData.name?userData.name:'NO Name'})</h2>
    </div>
    <div>
      <h3>Location: {userData.location?userData.location:' No Location....'}</h3>
    </div>
    <div>
      <h4>Email: {userData.email?userData.email:' No Email....'}</h4>
    </div>
    <div>
      <h3>Company: {userData.company?userData.company:'....'}</h3>
    </div>
    <div>
      <h3>Bio: {userData.bio?userData.bio:'....'}</h3>
    </div>
    <div>
      <button onClick={(e)=>notSelectedClickHandler(e)}>-</button>
      <button onClick={(e)=>candidateSelectedClickHandler(e)}>
        +
      </button>
    </div>




  </div>
  
)
};

export default CandidateSearch;

import { useState ,useEffect, SyntheticEvent} from "react";
import Candidate from "../interfaces/Candidate.interface";


const SavedCandidates = () => {
  const [potentialUsers,setPotentialUsers] = useState([]as Candidate[]);
 



  // get saved candidates from Local storage
  const getCandidatesFromLocalStorage = ():Candidate[]=>{
    const localuserdata = localStorage.getItem('potentialCandidates');
    if(localuserdata){
     const  parsedlocaluserdata :Candidate[] = JSON.parse(localuserdata);
     return parsedlocaluserdata;
 
    }else{
      const  parsedlocaluserdata :Candidate[] = [];
     return parsedlocaluserdata;
    }
  }
  const rejectedClickHandler = (e:SyntheticEvent,index:number)=>{
    e.preventDefault();
    potentialUsers.splice(index,1);
    // const filteredData:Candidate[] = potentialUsers.filter((user,index)=>{
    //   if(user.login !== userName){
    //     return user;
    //   }
    // });
    setPotentialUsers(potentialUsers);
    localStorage.setItem('potentialCandidates',JSON.stringify(potentialUsers));
    setPotentialUsers(getCandidatesFromLocalStorage());
  }


  useEffect(()=>{
    setPotentialUsers(getCandidatesFromLocalStorage());

  },[])





  return (
    <>
      <h1>Potential Candidates</h1>
      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Location</th>
            <th>Email</th>
            <th>Company</th>
            <th>Bio</th>
            <th>Reject</th>
          </tr>
        </thead>
        <tbody>
        {potentialUsers.length!==0?potentialUsers.map((user,index)=>{
          //  setKey(key+1);
          
          return <tr key={index}>
          <td><img src={user.avatar_url?user.avatar_url:''}/></td>
          <td>{user.name?user.name:'No name'}</td>
          <td>{user.location?user.location:'No location'}</td>
          <td>{user.email?user.email:'no email'}</td>
          <td>{user.company?user.company:''}</td>
          <td>{user.bio?user.bio:''}</td>
          <td><button key={index} onClick={(e)=>rejectedClickHandler(e,index)}>-</button></td>
        </tr>}):'No Potential Candidate '}
        
        </tbody>
      </table>
    </>
  );
};

export default SavedCandidates;

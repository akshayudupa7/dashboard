import logo from './logo.svg';
import './App.css';
import {useEffect,useState} from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    const [launches,setLaunches]=useState(null);
    const [conditional,setConditional]=useState(false);
    const [itemData,setItemData]=useState([]);

    //event handler for user click
  const clickHandler=(e,item)=>{
    setItemData([item]);
    setConditional(true);
  }

  useEffect(()=>{
   const getData=async()=>{

    let data=fetch ('https://api.spacexdata.com/v3/launches',{
      mode:'cors'
    }).then(resp=>resp.json()).then((data)=>{
      setLaunches(data)
    })
   }
   getData();
  },[])
  if(!launches){
    return (<>
   <div className='container'>
   <h1>Dashboard</h1>
   <hr></hr>
   <h2>Please wait...App is loading</h2>
   </div>
    </>)
  }
  else if(conditional){
    return(
      <div className='container container-fluid'>
      <button style={{padding:'6px',position:'relative',top:'5px',outline:'none',border:'none',marginLeft:'4px',backgroundColor:'red',color:'#fff',borderRadius:'20px 20px 20px 20px'}} key='button-go-back' onClick={()=>setConditional(false)}>Go Back</button>
  
    <ul>
    
   
    {itemData.map(item=>(
    <>
    <div className='row mt-5'>
    <div className='col-lg-1 col-md-1 p-2 '>
    <img src={`${item.links.mission_patch}`} alt="img-cap" height="80px" width="80px"></img>
    </div>
    <div className='col-lg-1 col-md-1 mt-1'>
    <h6> {item.mission_name}</h6> 
    <p>{item.rocket.rocket_name}</p>
    </div>
    <div className='col-lg-1 col-md-1 mt-3'>
    <h6> {item.launch_success?<span className="toggle">Success</span>:<span className='N-toggle'>Failed</span>}</h6> 
  
    </div>
    </div>
      <p>Description: {item.details}</p>
      <p> Flight Number : {item.flight_number}</p> 
      <p> Mission Name : {item.mission_name}</p> 
      <p>Nationality : {item.rocket.second_stage.payloads[0]['nationality']}</p>
      <p>Rocket Type : {item.rocket.rocket_type}</p>
      <p>Rocket Name : {item.rocket.rocket_name} </p> 
      <p>Manufacture : {item.rocket.second_stage.payloads[0]['manufacturer']}</p>
      <p>payload_type : {item.rocket.second_stage.payloads[0]['payload_type']}</p>
      <p>Launch year: {item.launch_year}</p>
      
      <p>Launch Site Name: {item.launch_site.site_name}</p>
      
      </>
    ))}
    
    
    </ul>
      </div>
    )
  }else
  return (
    <div className="App container container-fluid">
    <h1 className='heading'>SPACE X</h1>
    <hr></hr>
    <div>
  
    </div>
    <div className='row'>
    <div className='col col-sm-1 col-md-1' > Site No</div>
    <div className='col col-sm-1 col-md-2' > Mission name</div>
   {/*  <div className='col col-sm-3 col-md-6'> Mission Details</div> */}
     <div className='col col-sm-1 col-md-2'> Location</div> 
     <div className='col col-sm-1 col-md-2'>launch success</div>
     <div className='col col-sm-1 col-md-1'>Orbit</div>
     <div className='col col-sm-1 col-md-2'> Search Status</div>
     <div className='col col-sm-1 col-md-2'> Rocket</div>
    </div>
    <hr></hr>
    <div>
    { 
    
     launches && launches.map(item=>(<div className='row d-flex launch-data pb-5' key={item.mission_name}>
     <div className='col col-sm-1 col-md-1' >  <a href="/#" id={item.launch_date_unix} onClick={(e)=>clickHandler(e,item)}>{item.flight_number}</a></div>  
   <div className='col col-sm-1 col-md-2' >  <a href="/#" id={item.launch_date_unix} onClick={(e)=>clickHandler(e,item)}>{item.mission_name}</a></div>  

   <div className='col col-sm-1 col-md-2'> <a href="/#" id={item.launch_date_unix} onClick={(e)=>clickHandler(e,item)}> {item.launch_site.site_name}</a> </div>
  <div className='col col-sm-1 col-md-2'> <a href="/#" id={item.launch_date_unix} onClick={(e)=>clickHandler(e,item)}> {item.launch_year}</a></div> 
  <div className='col col-sm-1 col-md-1'> <a href="/#" id={item.launch_date_unix} onClick={(e)=>clickHandler(e,item)}>{item.rocket.second_stage.payloads[0]['orbit']}</a></div>                             
                                         
   <div className='col col-sm-1 col-md-2'> <a href="/#" id={item.launch_date_unix} onClick={(e)=>clickHandler(e,item)}> {item.launch_success?<span className="toggle">Success</span>:<span className='N-toggle'>Failed</span>}</a></div> 
     <div className='col col-sm-1 col-md-2'>  <a href="/#" id={item.launch_date_unix} onClick={(e)=>clickHandler(e,item)}>{item.rocket.rocket_name}</a></div> 
     
  
 </div>))

    }

    </div>
    
    </div>
  );
}

export default App;

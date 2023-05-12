
import './app.css';
import BasicLayout1 from "./BasicLayout1";
import Hero from "./Hero";
import Navbar from "./Navbar";
import Textfield from "./TextFormField/Textfield"
import Swal from 'sweetalert2'
import { useState } from "react";

function App() {
  const [numRows, setNumRows] = useState(0);
  const [numCols, setNumCols] = useState(0);
  const [tableData, setTableData] = useState([]);
  const [ans, setAns]= useState("");
  let House =[]
  let Gym=[]
  let Hospital=[]
  let Restaurant=[]

  const handleNumRowsChange = (event) => {
    setNumRows(event.target.value);
  };

  const handleNumColsChange = (event) => {
    setNumCols(event.target.value);
  };
  function resetGrid() {
    setNumRows(0);
    setNumCols(0);
    setTableData([]);
  }
  const handleSubmit = (event) => {
    event.preventDefault();

    const rows = [];
    for (let i = 0; i < numRows; i++) {
      const cols = [];
      for (let j = 0; j < numCols; j++) {
        cols.push(``);
      }
      rows.push(cols);
    }

    setTableData(rows);
  };

  const handleCellChange = (event, rowIndex, colIndex) => {
    const newData = [...tableData];
    newData[rowIndex][colIndex] = event.target.value;
    setTableData(newData);
  };


 const extractData=(event)=>{
  event.preventDefault();
  console.log(tableData);
  for(let i=0; i<tableData.length; i++){
    for(let j=0; j<tableData[i].length; j++){
      for(let k=1; k<=tableData[i].length; k++){
        if(tableData[i][j]==`House${k}`){
          House[k] ={
            name:`House${k}`,
            x:i,
            y:j,
            hospital: 0,
            gym:0,
            restaurant:0,
            score:0
          }
          console.log(House[k])
            continue;
        }
        else if(tableData[i][j]==`Gym${k}`){
          Gym[k]={
            name:`Gym${k}`,
            x:i,
            y:j
          }
          console.log(Gym[k])
          continue;
        }
        else if(tableData[i][j]==`Hospital${k}`){
          Hospital[k]={
            name:`Hospital${k}`,
            x:i,
            y:j
          }
          console.log(Hospital[k])
            continue;
        }
        else if(tableData[i][j]==`Restaurant${k}`){
          Restaurant[k]={
            name:`Restaurant${k}`,
            x:i,
            y:j
          }
          console.log(Restaurant[k])
          continue;
        }
      }
    }
  }
  findMinGym()
  findMinHospital()
  findMinRestaurant()
  score()
  recommendHouse()
 }

 function distance(x1,y1,x2,y2){
  return (Math.abs(x1-x2)+Math.abs(y1-y2))
 }

 function findMinGym(){
  for(let i= 1; i<House.length; i++){
    var ans= Number.MAX_SAFE_INTEGER + 500
    for(let j=1; j<Gym.length; j++){
      let dist = distance(House[i].x, House[i].y, Gym[j].x,  Gym[j].y )
      console.log(dist)
      if(ans>dist){
        ans=dist;
        House[i].gym=ans;
        continue;
      }
      continue
    }
  } 
}

function findMinHospital(){
  for(let i=1; i<House.length; i++){
    var ans= Number.MAX_SAFE_INTEGER + 500
    for(let j=1; j<Hospital.length; j++){
      let dist = distance(House[i].x, House[i].y, Hospital[j].x,  Hospital[j].y )
      console.log(dist)
      if(ans>dist){
        ans=dist;
        House[i].hospital=ans;
        continue;
      }
      continue
    }
  } 
}

function findMinRestaurant(){
  for(let i=1; i<House.length; i++){
    var ans= Number.MAX_SAFE_INTEGER + 500
    for(let j=1; j<Hospital.length; j++){
      let dist = distance(House[i].x, House[i].y, Restaurant[j].x,  Restaurant[j].y )
      console.log(dist)
      if(ans>dist){
        ans=dist;
        House[i].restaurant=ans;
        continue;
      }
      continue
    }
  } 
}

function score(){
  for(let i=1;i<House.length;i++){
    House[i].score=House[i].gym+House[i].hospital+House[i].restaurant;
  }
}

function recommendHouse(){
  var minScore=Number.MAX_SAFE_INTEGER + 500
  var k=0;
  for(let i=1;i<House.length;i++){
    minScore=Math.min(minScore,House[i].score)
    if(minScore===House[i].score){
      k=i;
    }
  }
 Swal.fire(`House${k} is the best house.`)
}


  const renderBody = () => {
    return (
      <tbody>
        {tableData.map((rowData, rowIndex) => (
          <tr key={rowIndex}>
            {rowData.map((cellData, colIndex) => (
              <td key={colIndex}>
                {/* <Textfield
              value={cellData}
              onChange={(event) => handleCellChange(event, rowIndex, colIndex)}
              title=""
            /> */}
                <input
                  type="text"
                  value={cellData}
                  onChange={(event) => handleCellChange(event, rowIndex, colIndex)}
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  };

  return (
    <div>
      <Navbar/>
    <Hero 
    cName="hero-mid"
    ID="other"
    title=""
    
    text1="Please enter a valid data and also with unique label."
    text2="Example -
    House1, House2,Gym1,Gym2,Hospital1 etc"
    buttonText=""
    url="/"
    btnClass="hide"
    />
    <BasicLayout1>
    <div className='main'>
      <form onSubmit={handleSubmit}>
        <div className='inrow' >
        <label >
          Number of rows 
          <Textfield
              value={numRows}
              onChange={handleNumRowsChange}
              title=""
            />
            </label>
       
        <label >
          Number of columns
       
        <Textfield
              value={numCols}
              onChange={handleNumColsChange}
              title=""
            />
             </label>
        </div>
        <br />
        <div className='inrow' >
        <button className='cardbutton' onClick={handleSubmit} >Generate Layout</button>
        
      <button className='cardbutton'onClick={extractData} >Recommend House</button>
      <button className='cardbutton' onClick={resetGrid}>Reset All</button>
      </div>
      </form>
      </div>
      </BasicLayout1>
      
      
      <BasicLayout1>
    
        <div className='scrollable-div'>
      {tableData.length > 0 && (
        <table className="table">
          {renderBody()}
        </table>
        
      )}
      </div>

    </BasicLayout1>
   

   
    </div>
  );
}


export default App;


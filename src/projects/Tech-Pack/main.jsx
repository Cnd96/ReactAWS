// import React, { useState } from 'react';
// import Header from '../../components/Header/Header'
// import DataInputComponent from './DataInputComponent'
// import {techPackheaderNames} from './techPackHeadingsNames'

// import XLSX from 'xlsx';

// const placementNameText="placement name";
// const placementNumberText="placement number";
// const MainPage =props=> {
//   const {sizeCommonLine,sizeSpecCommonLine}=techPackheaderNames
//   // const [fileNames,setFileNames]=useState([]);
//   const [techPacks,setTechPacks]=useState([]);
//   const handleFileTeckPack=(files)=> {
   
//     // const existingFileNames=[...fileNames];
//     const existingTechPacks=[...techPacks];
//     for(let j=0;j<files.length;j++){
//       const reader = new FileReader();
//       const rABS = !!reader.readAsBinaryString;
     
//       reader.onload = (e) => {
//           const bstr = e.target.result;
//           const wb = XLSX.read(bstr, {type:rABS ? 'binary' : 'array'});
//           const wsname = wb.SheetNames[0];
//           const ws = wb.Sheets[wsname];
//           const data = XLSX.utils.sheet_to_json(ws, {header:1});
//           //FirstCellName should be either placement name or placement number
//           const firstCellName=data[0][0].trim().toLowerCase();
//           //Extracting fileName (Style)
//           const fileName=files[j].name.trim().substr(0, files[j].name.trim().indexOf('-')); 
//           // //Check whether same file is uploaded twice
//           const fileNameIndex=existingTechPacks.findIndex(techPack=>techPack.style==fileName);

//           if(fileNameIndex<0){
//             if(firstCellName.includes(placementNameText)){
//                 // existingFileNames.push(fileName);
//                 const placementNameIndex=0;
//                 const sizeCommonHeaderIndex=data[0].findIndex(line=>line.includes(sizeCommonLine.size)&&line.includes(sizeCommonLine.common));
//                 const sizeSpecCommonHeaderIndex=data[0].findIndex(line=>line.includes(sizeSpecCommonLine.sizeSpec)&&line.includes(sizeSpecCommonLine.common));
//                 const dataRows=data.slice(1,data.length).filter(line=>line.length>0&&line[0]!=undefined);
//                 const dataHeaders=data[0];
                
//                 for(let i=sizeCommonHeaderIndex+1;i<sizeSpecCommonHeaderIndex;i++){
//                   const ss=dataHeaders[i].slice(0, dataHeaders[i].indexOf('\n'))
//                   var numberOfLineBreaks = (dataHeaders[i].match(/\n/g)||[]).length;
//                   // console.log(ss,numberOfLineBreaks)
//                 }
//                 existingTechPacks.push({dataHeaders,dataRows,sizeCommonHeaderIndex,sizeSpecCommonHeaderIndex,style:fileName,techPackMethod:'single'})  
//             }
//             else if(firstCellName.includes(placementNumberText)){
//                 // existingFileNames.push(fileName);
//                 const sizeCommonHeaderIndex=data[0].findIndex(line=>line.includes(sizeCommonLine.size)&&line.includes(sizeCommonLine.common));
//                 const sizeSpecCommonHeaderIndex=data[0].findIndex(line=>line.includes(sizeSpecCommonLine.sizeSpec)&&line.includes(sizeSpecCommonLine.common));
//                 // console.log(data.length,data[data.length-1],data.slice(1,data.length),sizeCommonHeaderIndex,sizeSpecCommonHeaderIndex)
//                 existingTechPacks.push({data,style:fileName,techPackMethod:'pack'})
//             }
//             else{
//                 alert("Wrong Sheet Uploaded")
//             }
//             // console.log("k")
//           }
//           // else{
//           //   alert("File All Ready Uploaded")
//           // }

//           if(j==files.length-1){
//             // await setFileNames(existingFileNames)
//              setTechPacks(existingTechPacks) 
//           }
         
//       };
//       if(rABS) reader.readAsBinaryString(files[j]); else reader.readAsArrayBuffer(files[j]);
//       // console.log(j)
//     }
//   };
//   const readFileAsync=(file)=> {
//     return new Promise((resolve, reject) => {
//       let reader = new FileReader();
  
//       reader.onload = () => {
//         resolve(reader.result);
//       };
  
//       reader.onerror = reject;
  
//       reader.readAsArrayBuffer(file);
//     })
//   }
//   const handleFileLineMatrix=(file)=> {
//     console.log(techPacks)
//   };
//   return(
//     <React.Fragment>
//       <Header appName="Tech Pack"/>
      
//       <div className="container">
//         <div className="row" style={{marginTop:'2vw'}}>
//             <div className="col-sm-4">
//                 <DataInputComponent marginLeft='10px' buttonName="Upload Tech Packs"  handleFile={handleFileTeckPack} />
//                 {
//                     techPacks.map(
//                         ({style})=>
//                             <li key={style}>{style}</li>   
//                         )
//                 }
//             </div>
//             <div className="col-sm-3" >
//                 <DataInputComponent marginLeft='10px' buttonName="Upload Line Matrix"  handleFile={handleFileLineMatrix} />
//             </div>
//         </div>
//       </div>
//     </React.Fragment>
     
//   ) 
// };

// export default MainPage;

// export const techPackheaderNames={
//   sizeCommonLine:{
//       size:"Size",
//       common:"(Common)"
//   },
//   sizeSpecCommonLine:{
//       sizeSpec:"Size Spec",
//       common:"(Common)"
//   },
//   placementName:'Placement Name',
//   materialSupplier:'Material Supplier',
//   materialSupplierArticeNumber:"Material Supplier Supplier Article Number",
//   previousCode:"Previous Code",
//   product:"Product"
// }















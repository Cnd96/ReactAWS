import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/Header'
import DataInputComponent from './DataInputComponent'
import {techPackheaderNames,lineMatrixHeaderNames} from './sourceDocsHeadingsNames'

import XLSX from 'xlsx';

const placementNameText="placement name";
const placementNumberText="placement number";
const singleText="single";
const packText="pack";

const MainPage =props=> {
  const {sizeCommonLine,sizeSpecCommonLine,placementName,materialSupplier,materialSupplierArticeNumber,previousCode,product}=techPackheaderNames;

  const [downloadButtonDisabled,setDownloadButtonDisabled]=useState(true);
  const [combinedItemNameCheck,setCombinedItemNameCheck]=useState(false);
  const [techPacks,setTechPacks]=useState([]);
  const [lineMatrixUniqueschedules,setLineMatrixUniqueschedules]=useState([]);
  const [lineMatrixName,setLineMatrixName]=useState('');
  
  useEffect(() => {
     changeDownloadButtonDisabled();
  }, [techPacks])
  useEffect(() => {
    changeDownloadButtonDisabled();
  }, [lineMatrixUniqueschedules])
  const handleFileTeckPack=async(files)=> {
    // const existingFileNames=[...fileNames];
    const existingTechPacks=[...techPacks];
    async function readAllFiles () {
        for (const file of files) {
          const content = await readFileAsync(file);

          const wb = XLSX.read(content.result, {type:content.rABS ? 'binary' : 'array'});
          const wsname = wb.SheetNames[0];
          const ws = wb.Sheets[wsname];
          const data = XLSX.utils.sheet_to_json(ws, {header:1});
          //FirstCellName should be either placement name or placement number
          const firstCellName=data[0][0].trim().toLowerCase();
          //Extracting fileName (Style)
          const fileName=file.name.trim().substr(0, file.name.trim().indexOf('-')); 
          // //Check whether same file is uploaded twice
          const fileNameIndex=existingTechPacks.findIndex(techPack=>techPack.style==fileName);

          if(fileNameIndex<0){
            if(firstCellName.includes(placementNameText)){
          
                data[0]= data[0].map(line=>{return  line.trim()})
                const placementNameIndex=0;
                const materialSupplierIndex=data[0].findIndex(line=>line==(materialSupplier));
                const materialSupplierArticeNumberIndex=data[0].findIndex(line=>line==(materialSupplierArticeNumber));
                const previousCodeIndex=data[0].findIndex(line=>line==(previousCode));
                const productIndex=data[0].findIndex(line=>line==(product));
                const sizeCommonHeaderIndex=data[0].findIndex(line=>line.includes(sizeCommonLine.size)&&line.includes(sizeCommonLine.common));
                const sizeSpecCommonHeaderIndex=data[0].findIndex(line=>line.includes(sizeSpecCommonLine.sizeSpec)&&line.includes(sizeSpecCommonLine.common));
                let dataRows=data.slice(1,data.length).filter(line=>line.length>0&&line[0]!=undefined);
                let dataHeaders=data[0];

                
            
                //looping through the descriptions
                for(let i=sizeCommonHeaderIndex+1;i<sizeSpecCommonHeaderIndex;i++){
                  //Extracting NRfCode, garment color and color code from description and replacing description as an object of them
                  let firstTextWithLineBreaker=dataHeaders[i].slice(0, dataHeaders[i].indexOf('\n')+1);
                  dataHeaders[i]=dataHeaders[i].replace(firstTextWithLineBreaker,'');
                  firstTextWithLineBreaker=firstTextWithLineBreaker.replace(/\n/g,"");
                  let secondTextWithLineBreaker=dataHeaders[i].slice(0, dataHeaders[i].indexOf('\n')+1);
                  dataHeaders[i]=dataHeaders[i].replace(secondTextWithLineBreaker,'');
                  secondTextWithLineBreaker=secondTextWithLineBreaker.replace(/\n/g,"");
                  dataHeaders[i]=dataHeaders[i].replace(/\n/g,'');

                  dataHeaders[i]={nrfCode:firstTextWithLineBreaker,garmentColor:secondTextWithLineBreaker,colorCode:dataHeaders[i]};
                };
                existingTechPacks.push({dataHeaders,dataRows,sizeCommonHeaderIndex,sizeSpecCommonHeaderIndex,style:fileName,techPackMethod:singleText,
                  placementNameIndex,materialSupplierIndex,productIndex,previousCodeIndex,materialSupplierArticeNumberIndex});
            }
            else if(firstCellName.includes(placementNumberText)){
                data[0]= data[0].map(line=>{return  line.trim()})
                let dataRows=data.slice(1,data.length)
                const placementNameIndex=data[0].findIndex(line=>line==(placementName));
                const materialSupplierIndex=data[0].findIndex(line=>line==(materialSupplier));
                const materialSupplierArticeNumberIndex=data[0].findIndex(line=>line==(materialSupplierArticeNumber));
                const previousCodeIndex=data[0].findIndex(line=>line==(previousCode));
                const productIndex=data[0].findIndex(line=>line==(product));
                const sizeCommonHeaderIndex=data[0].findIndex(line=>line.includes(sizeCommonLine.size)&&line.includes(sizeCommonLine.common));
                const sizeSpecCommonHeaderIndex=data[0].findIndex(line=>line.includes(sizeSpecCommonLine.sizeSpec)&&line.includes(sizeSpecCommonLine.common));
                const dataHeaders=data[0];
                // console.log(data.length,data[data.length-1],data.slice(1,data.length),sizeCommonHeaderIndex,sizeSpecCommonHeaderIndex)
                for(let i=sizeCommonHeaderIndex+1;i<sizeSpecCommonHeaderIndex;i++){
                  //Extracting NRfCode, garment color and color code from description and replacing description as an object of them
                  let firstTextWithLineBreaker=dataHeaders[i].slice(0, dataHeaders[i].indexOf('\n')+1);
                  dataHeaders[i]=dataHeaders[i].replace(firstTextWithLineBreaker,'');
                  firstTextWithLineBreaker=firstTextWithLineBreaker.replace(/\n/g,"");
                  let secondTextWithLineBreaker=dataHeaders[i].slice(0, dataHeaders[i].indexOf('\n')+1);
                  dataHeaders[i]=dataHeaders[i].replace(secondTextWithLineBreaker,'');
                  secondTextWithLineBreaker=secondTextWithLineBreaker.replace(/\n/g,"");
                  dataHeaders[i]=dataHeaders[i].replace(/\n/g,'');

                  dataHeaders[i]={nrfCode:firstTextWithLineBreaker,garmentColor:secondTextWithLineBreaker,colorCode:dataHeaders[i]};
                };
            
                //Removing unneccesary lines before first placement
                while(dataRows[0][0]==undefined||dataRows[0][0].trim().length==0){
                  dataRows.shift();
                };
            
                
                for(let i=sizeCommonHeaderIndex+1;i<sizeSpecCommonHeaderIndex;i++){
                  let garmentColor="";
                  dataRows.forEach(row=>{
                    if(row[0]!=undefined&&row[0].trim().length>0){
                      garmentColor=row[i]
                    }
                    let rmColor=row[i];
                    row[i]={rmColor,garmentColor}
                  })
                };
                //Dropping of rows which has placement numbers.
                dataRows=dataRows.filter(row=>row[0]==undefined||row[0].trim().length<1);
                existingTechPacks.push({dataHeaders,dataRows,sizeCommonHeaderIndex,sizeSpecCommonHeaderIndex,style:fileName,
                  techPackMethod:packText,placementNameIndex,materialSupplierIndex,productIndex,previousCodeIndex,materialSupplierArticeNumberIndex})
            }
            else{
                alert("Wrong Sheet Uploaded")
            }
          }
        }
      }
    await readAllFiles();
    setTechPacks(existingTechPacks) ;
    // changeDownloadButtonDisabled();
  };
  const readFileAsync=(file)=> {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();
      const rABS = !!reader.readAsBinaryString;
      reader.onload = () => {
        resolve({result:reader.result,rABS});
      };
  
      reader.onerror = reject;
      if(rABS) reader.readAsBinaryString(file); else reader.readAsArrayBuffer(file);
      // reader.readAsArrayBuffer(file);
    })
  }
  const handleFileLineMatrix=(files)=> {
    const reader = new FileReader();
      const rABS = !!reader.readAsBinaryString;
     
      reader.onload = (e) => {
          const bstr = e.target.result;
          const fileName=files[0].name.trim().substr(0, files[0].name.length-5); 
          setLineMatrixName(fileName) 
          const wb = XLSX.read(bstr, {type:rABS ? 'binary' : 'array'});
          // const wsname = wb.SheetNames[0];
          const ws = wb.Sheets["LM"];
          const sheetDataRows = XLSX.utils.sheet_to_json(ws, {header:1});
          
          const lineMatrixFirstDataRow=sheetDataRows.map((row,index)=>{return {index,firstColumn:row[0]}})
                                                          .filter(row=>row.firstColumn!=undefined&&row.firstColumn.toString().trim()==="1")
          
          const dataHeader=sheetDataRows[lineMatrixFirstDataRow[0].index-1];
          const dataRows=sheetDataRows.slice(lineMatrixFirstDataRow[0].index,sheetDataRows.length);

          const globalStyleIndex=dataHeader.findIndex(line=>line!=undefined&&line==lineMatrixHeaderNames.globalStyle);
          const tyCollectionIndex=dataHeader.findIndex(line=>line!=undefined&&line==lineMatrixHeaderNames.tyCollection);
          const marketingNameIndex=dataHeader.findIndex(line=>line!=undefined&&line==lineMatrixHeaderNames.marketingName);

          const extractedDataRows=dataRows.map(row=>{return{ globalStyle:row[globalStyleIndex],tyCollection:row[tyCollectionIndex],marketingName:row[marketingNameIndex]}})
          let uniqueScheduleDataRows=[];
          const map = new Map();
          extractedDataRows.forEach(dataRow=>{
            if(!map.has(dataRow.globalStyle)){
              // console.log(dataRow.globalStyle,i)
              map.set(dataRow.globalStyle, true);    // set any value to Map
              if(dataRow.globalStyle){
                dataRow.globalStyle=dataRow.globalStyle.trim();
              }
              uniqueScheduleDataRows.push(dataRow);
            }
          })
          setLineMatrixUniqueschedules(uniqueScheduleDataRows);
      };
      if(rABS) reader.readAsBinaryString(files[0]); else reader.readAsArrayBuffer(files[0]);
  };
  const onDownloadClick=()=> {
    let ldChartHeaders=['Garment color','Rm Color','Placement Name','Material Supplier','Item Name','NRF','Color Code','Program','STYLE_NO_INDIVIDUAL','GMT_DESCRIPTION'];
    let ldChartData=[];
    techPacks.forEach(techPack=>{
     
      const {sizeCommonHeaderIndex,sizeSpecCommonHeaderIndex,techPackMethod,placementNameIndex,productIndex,previousCodeIndex,materialSupplierArticeNumberIndex
        ,materialSupplierIndex,dataHeaders,dataRows,style}=techPack;
      const matchingLineMatrixSchedule=lineMatrixUniqueschedules.find(schedule=>schedule.globalStyle==style);
      if(techPackMethod==packText){
        for(let i=sizeCommonHeaderIndex+1;i<sizeSpecCommonHeaderIndex;i++){
          dataRows.forEach(row=>{
             let ldChartDataRowToPush=[];
             ldChartDataRowToPush.push(row[i].garmentColor);
             ldChartDataRowToPush.push(row[i].rmColor);
             ldChartDataRowToPush.push(row[placementNameIndex]);
             ldChartDataRowToPush.push(row[materialSupplierIndex]);
             combinedItemNameCheck?ldChartDataRowToPush.push(row[materialSupplierArticeNumberIndex]+row[previousCodeIndex]):
                                  ldChartDataRowToPush.push(row[materialSupplierArticeNumberIndex]!=undefined&&row[materialSupplierArticeNumberIndex].trim().length>0?
                                                            row[materialSupplierArticeNumberIndex]:
                                                            row[previousCodeIndex]!=undefined&&row[previousCodeIndex].trim().length>0?
                                                            row[previousCodeIndex]:row[productIndex]);
             ldChartDataRowToPush.push(dataHeaders[i].nrfCode);
             ldChartDataRowToPush.push(dataHeaders[i].colorCode);
             if(matchingLineMatrixSchedule){
              ldChartDataRowToPush.push(matchingLineMatrixSchedule.tyCollection);
              ldChartDataRowToPush.push(matchingLineMatrixSchedule.globalStyle);
              ldChartDataRowToPush.push(matchingLineMatrixSchedule.marketingName);
             };
             ldChartData.push(ldChartDataRowToPush);

           })
        };
      }
      else if(techPackMethod==singleText){
        for(let i=sizeCommonHeaderIndex+1;i<sizeSpecCommonHeaderIndex;i++){
          dataRows.forEach(row=>{
             let ldChartDataRowToPush=[];
             ldChartDataRowToPush.push(dataHeaders[i].garmentColor);
             ldChartDataRowToPush.push(row[i]);
             ldChartDataRowToPush.push(row[placementNameIndex]);
             ldChartDataRowToPush.push(row[materialSupplierIndex]);
             combinedItemNameCheck?ldChartDataRowToPush.push(row[materialSupplierArticeNumberIndex]+row[previousCodeIndex]):
                                  ldChartDataRowToPush.push(row[materialSupplierArticeNumberIndex]!=undefined&&row[materialSupplierArticeNumberIndex].trim().length>0?
                                                            row[materialSupplierArticeNumberIndex]:
                                                            row[previousCodeIndex]!=undefined&&row[previousCodeIndex].trim().length>0?
                                                            row[previousCodeIndex]:row[productIndex]);
             ldChartDataRowToPush.push(dataHeaders[i].nrfCode);
             ldChartDataRowToPush.push(dataHeaders[i].colorCode);
             if(matchingLineMatrixSchedule){
              ldChartDataRowToPush.push(matchingLineMatrixSchedule.tyCollection);
              ldChartDataRowToPush.push(matchingLineMatrixSchedule.globalStyle);
              ldChartDataRowToPush.push(matchingLineMatrixSchedule.marketingName);
             };
             ldChartData.push(ldChartDataRowToPush);
          })
        };
      }
    })
    const ldChart= [ldChartHeaders].concat(ldChartData);
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(ldChart);
    XLSX.utils.book_append_sheet(wb, ws, "LD Sheet");

    XLSX.writeFile(wb, "LDChart.xlsx");
  };

  const changeDownloadButtonDisabled=()=>{
    // console.log(techPacks.length)
    if(techPacks.length>0&&lineMatrixUniqueschedules.length>0){
      setDownloadButtonDisabled(false);
    }
    else{
      setDownloadButtonDisabled(true)
    }
  }
  return(
    <React.Fragment>
      <Header appName="Tech Pack"/>
      <div className="container">
        <div className="row" style={{marginTop:'2vw'}}>
            <div className="col-sm-4">
              <div className="row">
                <div  style={{clear:'both'}}>
                 <DataInputComponent marginLeft='10px' buttonName="Upload Tech Packs"  handleFile={handleFileTeckPack} />
                </div>
                <div  style={{clear:'both',marginLeft:'1vw'}}>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" checked={combinedItemNameCheck} 
                      onChange={(e)=>{setCombinedItemNameCheck(!combinedItemNameCheck)}} value={combinedItemNameCheck} id="defaultCheck1" />
                    <p className="form-check-label" for="defaultCheck1">
                      Combine Item Name
                    </p>
                  </div>
                </div>
              </div>
              
                <ul style={{columns:'2'}}>
                  {
                      techPacks.map(
                          ({style,techPackMethod})=>
                              <li key={style}>{style}-{techPackMethod}</li>   
                          )
                  }
                </ul>
            </div>
            <div className="col-sm-2" >
              <div className="row">
                <div  style={{clear:'both'}}>
                <DataInputComponent marginLeft='10px'  buttonName="Upload Line Matrix"  handleFile={handleFileLineMatrix} />
                </div>
                {/* <div  style={{clear:'both',marginLeft:'1vw'}}>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" checked={combinedItemNameCheck} 
                      onChange={(e)=>{setCombinedItemNameCheck(!combinedItemNameCheck)}} value={combinedItemNameCheck} id="defaultCheck1" />
                    <p className="form-check-label" for="defaultCheck1">
                      Combine Item Name
                    </p>
                  </div>
                </div> */}
                <p style={{fontSize:'1.2vw'}}>{lineMatrixName}</p>
              </div>
            </div>
            <div className="col-sm-2" >
               
                <button className="btn btn-secondary" disabled={downloadButtonDisabled} onClick={onDownloadClick}>Download</button>
            </div>
        </div>
      </div>
    </React.Fragment>
  ) 
};

export default MainPage;













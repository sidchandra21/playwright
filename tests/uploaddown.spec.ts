const ExcelJS = require('exceljs');
import { test, expect, Locator } from '@playwright/test';
const workbook : any = new ExcelJS.Workbook();

async function writeExcel(searchtext : string, replacementText : string, change : { rowChange: number, colChange: number }, filePath : string) {
await workbook.xlsx.readFile(filePath);
const worksheet : any = workbook.getWorksheet('Sheet1');
const output : {row: number, column: number} = await ReadExcel(worksheet, searchtext, change);
   
const cell : any = worksheet.getCell(output.row, output.column+change.colChange);
cell.value = replacementText;
await workbook.xlsx.writeFile(filePath);    
}



async function ReadExcel(worksheet : any, searchtext : string, change : { rowChange: number, colChange: number })
{ 
    let output = {row:-1, column:-1};
    worksheet.eachRow((row : any, rowNumber : number) => {  // Changed row type to any
        row.eachCell((cell : any, colNumber : number) => {
            if(cell.value === searchtext) {  // Changed to cell.value
                output.row = rowNumber;
                output.column = colNumber;
                console.log(rowNumber, colNumber);
            }
        })
    });
    return output;
}

//writeExcel('Mango' , 450 ,{rowChange: 0, colChange:2}, 'C:\\Users\\sid\\OneDrive\\Documents\\SID\\exceltest.xlsx');

//update price of mango to 450

test ('Upload Download Excel', async ({page}) => 
{
    const textSearch : string = 'Mango';
    const updatevalue : string = '450';
    await page.goto('https://rahulshettyacademy.com/upload-download-test/');
    const downloadpromise = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Download' }).click();
    await downloadpromise;
    writeExcel(textSearch, updatevalue ,{rowChange: 0, colChange:2}, 'C:\\Users\\sid\\Downloads\\download.xlsx');
    await page.locator('#fileinput').click();
    await page.locator('#fileinput').setInputFiles('C:\\Users\\sid\\Downloads\\download.xlsx');
    const textlocator : Locator = page.getByText(textSearch);
    const rowlocator : Locator = await page.getByRole('row').filter({ has: textlocator });
    await expect(rowlocator.locator('#cell-4-undefined')).toContainText(updatevalue);
});
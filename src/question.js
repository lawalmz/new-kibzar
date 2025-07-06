
// const array = ["12345", "2345","6575","11111"];

// const response = [
//     {id: "432434", "name": "Samuel"},
//     {id:"12345", "name": "test"},
//     {id:"43240", "name": "sallah"},
//     {id: "432434", "name": "clive"},
//     {id:"6575", "name": "temi"},
//     {id:"2345", "name": "john"},
//     {id: "213323", "name": "Iwobe"}
// ];

// const inBoth = [];
// const notInBoth = [];


// for (let i = 0 ; i<response.length;i++){
//     let found = false;
//     for (let j = 0;j<array.length;j++){
//         if (array[j]=== response[i].id){
            
//             found = true;
//             inBoth.push(response[i])
//             break;

//         }
//      }
//      if (!found){
//          notInBoth.push(response[i])
//          array.push(response[i].id)
//      }
// }

// console.log(inBoth);
// console.log('\n-------------------\n');
// console.log(notInBoth);
// console.log('\n-------------------\n');
// console.log(array);


// const numbers = [30,10,40,80,90,100,20,70,50,60];
// const sorted = [];

// numbers.sort((a,b) => a-b);

// console.log(sorted)

// console.log('\n-------------------\n');

// console.log(numbers)


const arr1x = [1, 2, 3, 4, 5];
const arr2x = [3, 4, 5, 6, 7];

const commonElements = [];
const uniqueElements = [];
const uniqueElements2 = [];

for(let i = 0;i<arr1x.length || i<arr2x.length;i++){
    let found = false;

    
        if (i<arr1x.length){
         if (arr2x.includes(arr1x[i])){
            continue
         }else{
            uniqueElements.push(arr1x[i]);
            
         }
        }
  
}



console.log(commonElements);
console.log("unique elements: " + uniqueElements);
console.log(arr1x); 

console.log("unique elements2: "+ uniqueElements2)
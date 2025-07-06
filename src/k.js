
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

// let a = 0;

// function checkUser(array,response){

//     for (let i=0; i < array.length; i++) {
//         for(let j =0; j<response.length;j++){
//             if (array[i] === response[j].id  ){
            
//                 a++;
    
//             }
//             // console.log("array = "+i +"for response = "+j+"\n")

//         }
       
//     }

    
// }


// checkUser(array,response);
// console.log(response);
 
// console.log(a)



const userIds = ["111", "222", "333", "444"];

const registeredUsers = [
    { id: "111", name: "Alice" },
    { id: "222", name: "Bob" },
    { id: "555", name: "Charlie" }
];


function checkUser(userIds, registeredUsers) {

    let count = 0;
    

    for (let i = 0; i < userIds.length; i++) {
        let userFound = false;
        for (let j = 0; j < registeredUsers.length; j++) {
            if (userIds[i] === registeredUsers[j].id) {
                count++;
                userFound = true;
                break;
            }
        }if (!userFound){
            registeredUsers.push({id: userIds[i], name: "Unknown"});
        }
    }

    return count;

}

console.log(checkUser(userIds, registeredUsers));
console.log(registeredUsers);



const allUsers = ["A", "B", "C", "D", "E"];
const activeUsers = ["A", "C", "E"];
const notActiveUsers = [];

function getInactiveUsers(allUsers, activeUsers) {  
    for (let i = 0; i < allUsers.length; i++) {
        let foundUser = false;
        for (let j = 0; j < activeUsers.length; j++) {
            if (allUsers[i] === activeUsers[j]) {
                foundUser = true;
                break;
            }
        }
        if (!foundUser) {
            notActiveUsers.push(allUsers[i]);
        }
    }
}

getInactiveUsers(allUsers, activeUsers);

console.log("Users not in activeUsers: " + notActiveUsers);



const arr1x = [1, 2, 3, 4, 5];
const arr2x = [3, 4, 5, 6, 7];
const commonElements = [];


function getUniqueValues(arr1x, arr2x) {
    for (let i=0;i<arr1.length;i++){
      
        for (let j=0;j<arr2.length;j++){
            if (arr1[i] === arr2[j]){
                commonElements.push(arr1[i]);
                break;
            }

        }
    
           
      

    }
}


getUniqueValues(arr1x, arr2x);
console.log("common element: " + commonElements);


const numbers = [1, 2, 2, 3, 4, 4, 5, 6, 6];
const uniqueNumbers = [];

function sort(numbers){

    for (let i = 0; i < numbers.length; i++) {
        let found = true;
        for (let j = 0; j < uniqueNumbers.length; j++) {
          
            if (numbers[i] === uniqueNumbers[j]) {
               
                found = false;
                break;
            }
        }
        if (found) {
            uniqueNumbers.push(numbers
            [i]);   }
       
    }
}

sort(numbers);
console.log(uniqueNumbers);


const arr1 = [10, 20, 30, 40];
const arr2 = [30, 40, 50, 60];
const mergedArray = [];
const sortedArray = [];

function mergeArrays(arr1, arr2,mergedArray) {
    mergedArray.push(...arr1);
    mergedArray.push(...arr2);

    for (let i = 0; i < mergedArray.length; i++) {
        let found = true;
        for (let j = 0; j < sortedArray.length; j++) {
            if (mergedArray[i] === sortedArray[j]) {
                found = false;
                break;
            }
        }
        if (found) {
            sortedArray.push(mergedArray[i]);
        }
    }
   
}


mergeArrays(arr1, arr2,mergedArray);
console.log(mergedArray);
console.log("sorted array: " + sortedArray);
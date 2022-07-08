// import axios from "axios";

// export const getAllTypes: any = async () => {
//     // let testArr = [];
//     for (let i = 1; i <= 18; i++) {
//         try {
//             const typeResponse = await axios.get(
//                 `https://pokeapi.co/api/v2/type/${i}`
//             );
//             const typeData = typeResponse.data;
//             // console.log(typeData);
//             // testArr.push(testData);

//             // push if testData.id is not in types
//             if (!types.some((el) => el.id === typeData.id)) {
//                 types.push(typeData);
//             }

//             // types.push(testData);
//         } catch (e) {
//             console.error(e);
//         }
//     }
//     // console.log(testArr);
//     console.log(types);
//     // return types;
// };
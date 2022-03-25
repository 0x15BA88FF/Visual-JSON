import { BiBracket, BiCube } from 'react-icons/bi';
import { RiNumber1 } from 'react-icons/ri';
import { AiOutlineFieldString, AiOutlinePoweroff } from 'react-icons/ai';
import { BsFillHexagonFill } from 'react-icons/bs'; 
import { FaWindowMinimize } from 'react-icons/fa';

const handleToogleContent = (id) => {
    let children = document.getElementById(id)
    if(children.style.display == "block"){
        children.style.display = "none"
    } else {
        children.style.display = "block"
    }
}
const generateIcon = (type) => {
    if(type == 'string'){
        return (
            <div className="w-10 h-10 rounded-md flex items-center justify-center bg-orange-400 text-white">
                <AiOutlineFieldString />
            </div>
        )
    } else if(type == 'number'){
        return (
            <div className="w-10 h-10 rounded-md flex items-center justify-center bg-purple-500 text-white">
                <RiNumber1 />
            </div>
        )
    } else if(type == 'boolean'){
        return (
            <div className="w-10 h-10 rounded-md flex items-center justify-center bg-red-500 text-white">
                <AiOutlinePoweroff />
            </div>
        )
    } else if(type == 'object'){
        return (
            <div className="w-10 h-10 rounded-md flex items-center justify-center bg-blue-500 text-white">
                <BiCube />
            </div>
        )
    } else if(type == 'array'){
        return (
            <div className="w-10 h-10 rounded-md flex items-center justify-center bg-gray-500 text-white">
                <BiBracket />
            </div>
        )
    } else if(type == 'null'){
        return (
            <div className="w-10 h-10 rounded-md flex items-center justify-center bg-rose-500 text-white">
                <FaWindowMinimize />
            </div>
        )
    } else {
        return (
            <div className="w-10 h-10 rounded-md flex items-center justify-center bg-white text-black">
                <BsFillHexagonFill />
            </div>
        )
    }
}
const createCard = (key, value, type, itemId, parentId) => {  
    return (
        <div className={`flex flex-col my-2 ${parentId}`} key={itemId}>
            <div onClick={() => handleToogleContent(itemId)} className="w-full flex p-3 rounded-md items-center bg-gray-300 dark:bg-gray-600 shadow-md">
                <>{generateIcon(type)}</>
                <p className="w-40 h-max overflow-hidden whitespace-nowrap text-ellipsis dark:text-white ml-2">{key}</p>
                <p className="w-40 h-max ml-auto overflow-hidden whitespace-nowrap text-ellipsis dark:text-white text-right">{value}</p>
            </div>
            <div className="ml-3">
                <div id={itemId} className="hidden mt-2 w-full flex-col p-3 rounded-md bg-gray-300 dark:bg-gray-600 shadow-md">
                    <div className="flex"><p className="text-blue-900 dark:text-blue-200 font-semibold mr-2">Type: </p><p className="dark:text-white">{type}</p></div>
                    <div className="flex"><p className="text-blue-900 dark:text-blue-200 font-semibold mr-2">Key: </p><p className=" break-all dark:text-white">{key}</p></div>
                    <div className="flex"><p className="text-blue-900 dark:text-blue-200 font-semibold mr-2">Value: </p><p className=" break-all dark:text-white">{value}</p></div>
                </div>
            </div>
        </div>
    )
}
const createGroup = (key, value, type, itemId, parentId) => {
  return (
        <div key={itemId} className={parentId}>
          <div onClick={() => handleToogleContent(itemId)} className="flex p-3 rounded-md my-2 items-center dark:bg-gray-600 bg-gray-300 cursor-pointer shadow-md">
            <>{generateIcon(type)}</>
            <p className="w-40 h-max overflow-hidden dark:text-white whitespace-nowrap text-ellipsis ml-2">{key}</p>
          </div>
          <div id={itemId} className="ml-4 hidden">{value}</div>
        </div>
    )
}
const getArrayData = (array, itemId) => {
    let main = []
    for (let key = 0; key < array.length; key++) {
        let value = array[key]
        let type = typeof(value)
        let id = itemId + "_" + key
        
        if(value instanceof Object && value instanceof Array) type = 'array'
        
        if(type === 'array'){
            main.push(createGroup(key, getArrayData(value, id), type, id, itemId))
        }
        else if(value === null){
            main.push(getDataValue(key, "null", 'null', id, itemId))
        }
        else if(type === 'object'){
            main.push(createGroup(key, getObjectData(value, id), type, id, itemId))
        }
        else {
            main.push(getDataValue(key, value, typeof(value), id, itemId))
        }
    }
    return main
}
export const getObjectData = (object, itemId) => {
    let main = []
    for (let key in object) {
        let value = object[key]
        let type = typeof(value)
        let id = itemId + "_" + key

        if(value instanceof Object && value instanceof Array){ type = 'array' }
        
        if(type === 'array'){
            main.push(createGroup(key, getArrayData(value, id), type, id, itemId))
        }
        else if(value === null){
            main.push(getDataValue(key, "null", 'null', id, itemId))
        }
        else if(type === 'object'){
            main.push(createGroup(key, getObjectData(value, id), type, id, itemId))
        }
        else {
            main.push(getDataValue(key, value, typeof(value), id, itemId))
        }
    }
    return main
}
const getDataValue = (key, value, type, itemId, parentId) => {
    return createCard(key, value.toString(), type, itemId, parentId)
}
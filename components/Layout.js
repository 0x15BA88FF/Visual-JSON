import { BsSunFill, BsFillMoonStarsFill, BsFillPlayFill } from 'react-icons/bs';
import { FiMenu } from 'react-icons/fi';
import { AiOutlineClose, AiFillCheckCircle } from 'react-icons/ai';
import { CgSpinner } from 'react-icons/cg';
import { MdOutlineError } from 'react-icons/md';

import { DefaultButton } from './Buttons';
import SwitchInput from "./Switch";

import { getObjectData } from './useRenderData';

import React, { useState, useEffect, useRef } from 'react';

const Layout = ({}) => {
    const [fetchUrl, setFetchUrl] = useState("https://jsonplaceholder.typicode.com/todos/1")
    const [isFetching, setIsFetching] = useState(false)
    const [isFetchSuccesful, setIsFetchSuccesful] = useState(true)

    const [isMenuActive, setIsMenuActive] = useState(false)
    const [isWritable, setIsWritable] = useState(false)
    const [isWrap, setIsWrap] = useState(false)

    const [theme, setTheme] = useState(null)

    const [parsedCode, setParsedCode] = useState()
    const [isParsingSuccesful, setIsParsingSuccesful] = useState(true)

    const textareaRef = useRef(); 
    
    const [code, setCode] = useState()
    
    const [entryPoint, setEntryPoint] = useState([0, 0])

    const handleCodeChange = (e) => {
        let value = e.target.value
        let start = e.target.selectionStart
        let end = e.target.selectionEnd

        if (e.keyCode === 9) {
            e.preventDefault()
            setCode(value.substring(0, start) + '\t' + value.substring(end))
            setEntryPoint([end + 1, end + 1])
        }
        else if (e.keyCode === 219) {
            e.preventDefault()
            setCode(value.substring(0, start) + '[' + value.substring(start, end) + ']' + value.substring(end))
            setEntryPoint([end + 1, end + 1])
        }
        if (e.shiftKey) {
            if (e.keyCode === 219) {
                e.preventDefault()
                setCode(value.substring(0, start) + '{' + value.substring(start, end) + '}' + value.substring(end))
                setEntryPoint([end + 1, end + 1])
            }
            else if (e.keyCode === 222) {
                e.preventDefault()
                setCode(value.substring(0, start) + '"' + value.substring(start, end) + '"' + value.substring(end))
                setEntryPoint([end + 1, end + 1])
            }
        }
        else {}
    }
    const handleToogleTheme = (theme) => {
        let root = document.getElementsByTagName('body')[0]
        root.classList.remove('dark')
        root.classList.remove('light')
        root.classList.remove('null')

        if (typeof window !== 'undefined') {
            if(theme === 'dark') {
                localStorage.removeItem('theme')
                setTheme('light')
                localStorage.theme = theme
                root.classList.add(theme)
            }
            else if(theme === 'light') {
                localStorage.removeItem('theme')
                setTheme('dark')
                localStorage.theme = theme
                root.classList.add(theme)
            }
            else {
                setTheme(localStorage.theme || 'dark')
                root.classList.add(theme)
            }
        } else {
            setTheme('light')
        }
    }
    const handleParse = (data) => {
        try{
            setParsedCode(JSON.parse(data))
            
            setIsParsingSuccesful(true)
        } catch(e){
            setIsParsingSuccesful(false)
        }
    }
    const handleFetch = async (url) => {
        setIsFetching(true)

        try{
            const res = await fetch(url)
            const data = await res.json()
            
            setCode(JSON.stringify(data, undefined, "\t"))
            setIsFetchSuccesful(true)
            setIsFetching(false)
        }catch(e){
            setIsFetchSuccesful(false)
            setIsFetching(false)
        }
    }
    useEffect(() => {
        handleToogleTheme(theme)
    }, []);
    useEffect(() => {
        textareaRef.current.setSelectionRange(entryPoint[0],entryPoint[1])
    }, [entryPoint]);

    return ( 
        <>
            <div className="flex flex-col h-screen overflow-x-hidden">
                <>
                    <nav className="flex items-center justify-between p-2 bg-gray-300 dark:bg-slate-900">
                        { isMenuActive &&
                            <div  className="p-3 z-50 bg-white dark:bg-slate-900 dark:text-white shadow-md fixed top-14 left-2 w-max h-max rounded-md">
                                <h1 className="text-2xl mb-3">Settings</h1>
                                <div className="flex">
                                    <input value={fetchUrl} onChange={(e) => setFetchUrl(e.target.value)} type="text" placeholder="Load data with URL" className="p-2 bg-gray-200 dark:bg-gray-700 focus:outline-none focus:ring-2 rounded-sm" />
                                    <div onClick={() => handleFetch(fetchUrl)} className='p-2 mr-3 bg-gray-200 dark:bg-gray-700 shadow-md ml-2 w-max h-max rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 hover:cursor-pointer flex items-center justify-center'>
                                        <div className="animate-spin text-blue-500">{ isFetching && <CgSpinner/> }</div>
                                        <div className="text-green-500">{ isFetchSuccesful && !isFetching && <AiFillCheckCircle/> }</div>
                                        <div className="text-red-500">{ !isFetchSuccesful && !isFetching && <MdOutlineError/> }</div>
                                        <span className="mx-2 text-md">Fetch</span>
                                    </div>
                                </div>
                                <div className="flex mt-3 items-center justify-between">
                                    <label htmlFor='writable' className="text-md">Allow file writable:</label>
                                    <SwitchInput isOn={isWritable} id='writable' handleToggle={() => setIsWritable(!isWritable)} />
                                </div>
                                <div className="flex mt-3 items-center justify-between">
                                    <label htmlFor='wrapContent' className="text-md">Wrap content:</label>
                                    <SwitchInput isOn={isWrap} id='wrapContent' handleToggle={() => setIsWrap(!isWrap)} />
                                </div>
                            </div>
                        }  
                        <DefaultButton onClick={() => setIsMenuActive(!isMenuActive)} className=''>
                            { isMenuActive ? <AiOutlineClose /> : <FiMenu /> }
                        </DefaultButton>
                        <div className="flex items-center">
                            <DefaultButton onClick={() => handleToogleTheme(theme)} className='mr-1'>
                                { theme == 'dark' ? <BsFillMoonStarsFill /> : <BsSunFill /> }
                            </DefaultButton>
                            <DefaultButton onClick={() => handleParse(code)} className='ml-1'>
                                <div className="text-green-500">{ isParsingSuccesful && <BsFillPlayFill/> }</div>
                                <div className="text-red-500">{ !isParsingSuccesful && <MdOutlineError/> }</div>
                            </DefaultButton>
                        </div>
                    </nav>
                </>
                <div className="flex grow">
                    <textarea ref={textareaRef} spellCheck='false' onKeyDown={(e) => handleCodeChange(e)} value={code} disabled={!isWritable} onChange={(e) => setCode(e.target.value)} className={`${!isWrap && 'whitespace-nowrap'} w-0 md:grow disabled:bg-gray-100 bg-white dark:bg-darkIDE dark:disabled:bg-gray-800 dark:text-white focus:outline-none resize-none pl-2`}></textarea>
                    <div style={{height: "calc(100vh - 48px)"}} className={`p-2 h-full w-full grow md:grow-0 md:w-[500px] bg-gray-200 dark:bg-gray-700 overflow-scroll`}>
                        { getObjectData(parsedCode, 'main') }
                    </div>
                </div>
            </div>
        </>
    );
}
 
export default Layout;
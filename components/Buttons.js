export const DefaultButton = ({className, children, onClick}) => {
    return ( 
        <>
            <div onClick={onClick} className={`p-2 flex items-center justify-center shadow-md w-max h-max rounded-md hover:cursor-pointer bg-white hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white ${className}`}>
                { children }
            </div>
        </>
    );
}
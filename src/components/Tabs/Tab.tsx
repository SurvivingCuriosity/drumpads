export interface TabProps {
    id: string
    label: string
    onClick: (idNewTab: string) => void
    active?: boolean
    showDot?: boolean
}

export const Tab = (props: TabProps) => {
    const { id, label, onClick, active, showDot } = props

    return (
        <li
            onClick={() => { onClick(id) }}
            className={`relative w-full cursor-pointer text-lg rounded-lg px-2 py-0.5 text-center transition-colors duration-300 ${active ? 'text-primary' : 'text-neutral-400'} `}>  
            {label}
            {showDot && <span className='absolute right-8 top-1 size-1.5 rounded-full bg-primary'></span>} 
        </li>
    )
}
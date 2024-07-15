export interface TabProps {
    id: string
    label: string
    onClick: (idNewTab: string) => void
    active?: boolean
}

export const Tab = (props: TabProps) => {
    const { id, label, onClick, active } = props

    return (
        <li
            onClick={() => { onClick(id) }}
            className={`w-full cursor-pointer text-xl rounded-lg px-2 py-1 text-center transition-colors duration-300 ${active ? 'text-amber-500' : 'text-neutral-400'} `}>  
            {label}
        </li>
    )
}
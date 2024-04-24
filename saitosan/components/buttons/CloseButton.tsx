import IconComponent from '@/components/IconComponent'
import { GrClose } from 'react-icons/gr'

interface Props {
  onClose: () => void
  className?: string
  color?: 'primary' | 'gray' | 'black'
}

function CloseButton({ onClose, className, color = 'black' }: Props) {
  return (
    <button
      className={`absolute right-0 top-0 flex items-center pr-3 pt-2 ${className}`}
      onClick={onClose}
    >
      <IconComponent Icon={GrClose} color={color} />
    </button>
  )
}

export default CloseButton
